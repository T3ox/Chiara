using System;
using System.Diagnostics;
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

            try
            {
                if (!string.IsNullOrEmpty(_updateInfo.DownloadUrl))
                {
                    // Use a temporary path for the download
                    string tempPath = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "FolderOrganizerUpdate.zip");
                    
                    var progress = new Progress<double>(p => DownloadProgress = p);
                    
                    await _updateService.DownloadFileAsync(_updateInfo.DownloadUrl, tempPath, progress, System.Threading.CancellationToken.None);
                    
                    StatusMessage = "Download completato! Pronto per l'installazione.";
                    
                    // Future US 8.4: Start installation
                    // For now, let's just open the folder or notify
                    MessageBox.Show($"Aggiornamento scaricato in: {tempPath}", "Download Completato");
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
            
            // RequestClose?.Invoke(this, EventArgs.Empty); // Don't close immediately if we want to show success
        }

        private void ExecuteLater()
        {
            RequestClose?.Invoke(this, EventArgs.Empty);
        }
    }
}
