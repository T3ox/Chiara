using Microsoft.Web.WebView2.Core;
using System;
using System.IO;
using System.Windows;

namespace FolderOrganizer.Desktop;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        try
        {
            var landingPath = FindLandingFile();
            if (landingPath is null)
            {
                ShowBootError(
                    "Landing file not found.",
                    "Expected: site_html/landing/index.html relative to repository root.");
                return;
            }

            PathText.Text = landingPath;

            await Browser.EnsureCoreWebView2Async();
            ConfigureBrowser(Browser.CoreWebView2);

            Browser.Source = new Uri(landingPath);
        }
        catch (Exception ex)
        {
            ShowBootError("Desktop preview startup failed.", ex.Message);
        }
    }

    private static void ConfigureBrowser(CoreWebView2 webView)
    {
        webView.Settings.AreDefaultContextMenusEnabled = true;
        webView.Settings.AreDevToolsEnabled = true;
        webView.Settings.IsStatusBarEnabled = false;
        webView.Settings.IsZoomControlEnabled = true;
    }

    private static string? FindLandingFile()
    {
        var probes = new[]
        {
            FindByWalkingUp(AppContext.BaseDirectory),
            FindByWalkingUp(Environment.CurrentDirectory),
        };

        foreach (var probe in probes)
        {
            if (!string.IsNullOrWhiteSpace(probe) && File.Exists(probe))
            {
                return probe;
            }
        }

        return null;
    }

    private static string? FindByWalkingUp(string startPath)
    {
        var current = new DirectoryInfo(startPath);

        while (current is not null)
        {
            var candidate = Path.Combine(current.FullName, "site_html", "landing", "index.html");
            if (File.Exists(candidate))
            {
                return candidate;
            }

            current = current.Parent;
        }

        return null;
    }

    private void ShowBootError(string title, string details)
    {
        var html = $"""
        <!doctype html>
        <html lang='en'>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Startup error</title>
          <style>
            body {{ margin:0; font-family: Segoe UI, Arial, sans-serif; background:#0b1325; color:#dce7f7; }}
            .wrap {{ max-width: 900px; margin: 64px auto; padding: 0 24px; }}
            .card {{ border:1px solid #304567; border-radius:14px; background:#121b32; padding:22px; }}
            h1 {{ margin:0 0 8px; font-size:26px; }}
            p {{ margin:0 0 10px; color:#9eb0ca; line-height:1.55; }}
            code {{ background:#17233f; border:1px solid #304567; padding:2px 6px; border-radius:6px; }}
          </style>
        </head>
        <body>
          <main class='wrap'>
            <section class='card'>
              <h1>{title}</h1>
              <p>{details}</p>
              <p>Verify that <code>site_html/landing/index.html</code> exists in the repository.</p>
            </section>
          </main>
        </body>
        </html>
        """;

        if (Browser.CoreWebView2 is not null)
        {
            Browser.CoreWebView2.NavigateToString(html);
        }
        else
        {
            Browser.NavigateToString(html);
        }
    }
}
