using System;
using System.Diagnostics;
using System.Windows.Input;
using FolderOrganizerLauncher.Features.Common;
using FolderOrganizerLauncher.Features.Updates.Models;

namespace FolderOrganizerLauncher.Features.Updates.ViewModels
{
    public class UpdateViewModel : ObservableObject
    {
        private readonly UpdateCheckResult _updateInfo;
        
        public UpdateViewModel(UpdateCheckResult updateInfo)
        {
            _updateInfo = updateInfo ?? throw new ArgumentNullException(nameof(updateInfo));
            
            UpdateNowCommand = new RelayCommand(_ => ExecuteUpdateNow());
            LaterCommand = new RelayCommand(_ => ExecuteLater());
        }

        public string CurrentVersion => $"Versione attuale: {_updateInfo.CurrentVersion}";
        public string LatestVersion => $"Nuova versione: {_updateInfo.LatestVersion}";
        
        public ICommand UpdateNowCommand { get; }
        public ICommand LaterCommand { get; }

        public event EventHandler? RequestClose;

        private void ExecuteUpdateNow()
        {
            try
            {
                if (!string.IsNullOrEmpty(_updateInfo.DownloadUrl))
                {
                    Process.Start(new ProcessStartInfo
                    {
                        FileName = _updateInfo.DownloadUrl,
                        UseShellExecute = true
                    });
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Failed to open download URL: {ex.Message}");
            }
            
            RequestClose?.Invoke(this, EventArgs.Empty);
        }

        private void ExecuteLater()
        {
            RequestClose?.Invoke(this, EventArgs.Empty);
        }
    }
}
