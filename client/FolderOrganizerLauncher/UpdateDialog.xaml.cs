using System.Diagnostics;
using System.Windows;

namespace FolderOrganizerLauncher
{
    public partial class UpdateDialog : Window
    {
        private string _downloadUrl;

        public UpdateDialog(UpdateCheckResult result)
        {
            InitializeComponent();
            
            CurrentVersionTxt.Text = $"Versione attuale: {result.CurrentVersion}";
            NewVersionTxt.Text = $"Nuova versione: {result.LatestVersion}";
            _downloadUrl = result.DownloadUrl;
        }

        private void LaterButton_Click(object sender, RoutedEventArgs e)
        {
            // Just close the modal, allowing the app to continue normally (US-8.2)
            this.DialogResult = false;
            this.Close();
        }

        private void UpdateNowButton_Click(object sender, RoutedEventArgs e)
        {
            // For now, simulate the download/update by opening the URL in the browser
            // Real US-8.3 (Download con barra) and US-8.4 (Installazione) would go here
            try
            {
                if (!string.IsNullOrEmpty(_downloadUrl))
                {
                    Process.Start(new ProcessStartInfo
                    {
                        FileName = _downloadUrl,
                        UseShellExecute = true
                    });
                }
            }
            catch
            {
                MessageBox.Show("Impossibile aprire il link di download.", "Errore", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
            
            // Close the dialog after initiating "update"
            this.DialogResult = true;
            this.Close();
        }
    }
}
