# FolderOrganizer Desktop (WebView2)

Native Windows desktop host for the static landing (`site_html/landing`).

## Prerequisites

- Windows 10/11
- .NET SDK 8+
- WebView2 Runtime (normally already installed with Microsoft Edge)

## Run

```powershell
cd desktop/FolderOrganizer.Desktop
dotnet restore
dotnet run
```

The app opens `site_html/landing/index.html` inside a native WPF window.

## Notes

- No npm is required.
- The loader searches upward from both `AppContext.BaseDirectory` and `Environment.CurrentDirectory` to find:
  `site_html/landing/index.html`.
- For production publishing, you can package this project as a standard Windows desktop app.
