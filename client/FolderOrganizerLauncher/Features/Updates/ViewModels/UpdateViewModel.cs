using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using FolderOrganizerLauncher.Features.Common;
using FolderOrganizerLauncher.Features.Updates.Models;
using FolderOrganizerLauncher.Features.Updates.Services;

namespace FolderOrganizerLauncher.Features.Updates.ViewModels
{
    public class UpdateViewModel : ObservableObject
    {
        private readonly UpdateCheckResult _updateInfo;
        private readonly IUpdateService _updateService;
        private bool _isDownloading;
        private double _downloadProgress;
        private string _statusMessage = string.Empty;
        
        public UpdateViewModel(UpdateCheckResult updateInfo, IUpdateService updateService)
        {
            _updateInfo = updateInfo ?? throw new ArgumentNullException(nameof(updateInfo));
            _updateService = updateService ?? throw new ArgumentNullException(nameof(updateService));
            
            UpdateNowCommand = new RelayCommand(_ => ExecuteUpdateNow(), _ => !IsDownloading);
            LaterCommand = new RelayCommand(_ => ExecuteLater(), _ => !IsDownloading);

            StatusMessage = "Una nuova versione è disponibile per il download.";
        }

        public string CurrentVersion => $"Versione attuale: {_updateInfo.CurrentVersion}";
        public string LatestVersion => $"Nuova versione: {_updateInfo.LatestVersion}";

        public bool IsDownloading
        {
            get => _isDownloading;
            set => SetProperty(ref _isDownloading, value);
        }

        public double DownloadProgress
        {
            get => _downloadProgress;
            set => SetProperty(ref _downloadProgress, value);
        }

        public string StatusMessage
        {
            get => _statusMessage;
            set => SetProperty(ref _statusMessage, value);
        }
        
        public ICommand UpdateNowCommand { get; }
        public ICommand LaterCommand { get; }

        public event EventHandler? RequestClose;

        private async void ExecuteUpdateNow()
        {
            IsDownloading = true;
            DownloadProgress = 0;
            StatusMessage = "Download in corso...";

            string tempZipPath = Path.Combine(Path.GetTempPath(), "FolderOrganizerUpdate.zip");

            try
            {
                if (!string.IsNullOrEmpty(_updateInfo.DownloadUrl))
                {
                    var progress = new Progress<double>(p => DownloadProgress = p);
                    await _updateService.DownloadFileAsync(_updateInfo.DownloadUrl, tempZipPath, progress, System.Threading.CancellationToken.None);
                    
                    StatusMessage = "Download completato! Installazione in corso...";
                    await Task.Delay(1000); // Give user a moment to see completion

                    PerformInstallation(tempZipPath);
                }
            }
            catch (Exception ex)
            {
                StatusMessage = "Errore durante il download.";
                Debug.WriteLine($"Failed to download update: {ex.Message}");
                MessageBox.Show($"Errore nel download: {ex.Message}", "Errore");
            }
            finally
            {
                IsDownloading = false;
            }
        }

        private void PerformInstallation(string zipPath)
        {
            try
            {
                string extractPath = Path.Combine(Path.GetTempPath(), "FolderOrganizer_Extracted");
                if (Directory.Exists(extractPath)) Directory.Delete(extractPath, true);
                Directory.CreateDirectory(extractPath);

                ZipFile.ExtractToDirectory(zipPath, extractPath);

                // Identify the application directory and executable
                string currentExePath = Process.GetCurrentProcess().MainModule?.FileName ?? throw new Exception("Impossibile determinare il percorso dell'eseguibile.");
                string appDir = Path.GetDirectoryName(currentExePath)!;
                string exeName = Path.GetFileName(currentExePath);

                // Create a PowerShell script to handle the update after exit
                string scriptPath = Path.Combine(Path.GetTempPath(), "update_script.ps1");
                string scriptContent = $@"
$processId = {Process.GetCurrentProcess().Id}
Write-Host 'In attesa della chiusura dell''applicazione...'
while (Get-Process -Id $processId -ErrorAction SilentlyContinue) {{ Start-Sleep -Milliseconds 200 }}

Write-Host 'Copia dei nuovi file in corso...'
Copy-Item -Path '{extractPath}\*' -Destination '{appDir}' -Recurse -Force

Write-Host 'Riavvio dell''applicazione...'
Start-Process -FilePath '{currentExePath}'

Write-Host 'Pulizia file temporanei...'
Remove-Item -Path '{zipPath}' -Force
Remove-Item -Path '{extractPath}' -Recurse -Force
Remove-Item -Path $PSCommandPath -Force
";
                File.WriteAllText(scriptPath, scriptContent);

                // Start the script hidden
                Process.Start(new ProcessStartInfo
                {
                    FileName = "powershell.exe",
                    Arguments = $"-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File \"{scriptPath}\"",
                    UseShellExecute = false,
                    CreateNoWindow = true
                });

                // Close the application
                Application.Current.Shutdown();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Errore durante l'installazione: {ex.Message}", "Errore Installazione");
                Debug.WriteLine($"Installation failed: {ex.Message}");
            }
        }

        private void ExecuteLater()
        {
            RequestClose?.Invoke(this, EventArgs.Empty);
        }
    }
}
