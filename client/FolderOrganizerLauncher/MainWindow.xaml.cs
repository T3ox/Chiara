using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace FolderOrganizerLauncher
{
    public partial class MainWindow : Window
    {
        private string? _selectedPath;

        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                // US-8.1 Controllo versione all'avvio
                var updateResult = await UpdateService.CheckForUpdatesAsync();
                
                if (updateResult != null && updateResult.IsUpdateAvailable)
                {
                    // US-8.2 Notifica aggiornamento disponibile
                    UpdateDialog updateDialog = new UpdateDialog(updateResult)
                    {
                        Owner = this
                    };
                    
                    updateDialog.ShowDialog();
                }
            }
            catch (Exception ex)
            {
                // Silently ignore errors (offline) to not block the app
                Debug.WriteLine($"Error showing update dialog: {ex.Message}");
            }
        }

        private void DropZone_DragOver(object sender, DragEventArgs e)
        {
            if (e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                e.Effects = DragDropEffects.Copy;
            }
            else
            {
                e.Effects = DragDropEffects.None;
            }
            e.Handled = true;
        }

        private void DropZone_Drop(object sender, DragEventArgs e)
        {
            if (e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
                if (files != null && files.Length > 0)
                {
                    string path = files[0];
                    if (Directory.Exists(path))
                    {
                        _selectedPath = path;
                        SelectedPathText.Text = path;
                        SelectedPathText.Foreground = Brushes.White;
                        StatusText.Text = "";
                    }
                    else
                    {
                        StatusText.Text = "Per favore trascina una cartella valida, non un file.";
                    }
                }
            }
        }

        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(_selectedPath))
            {
                StatusText.Text = "Seleziona prima una cartella!";
                return;
            }

            try
            {
                // Navigate up from client/FolderOrganizerLauncher/bin/Debug/net8.0-windows/ to root
                // Expected structure:
                // Root/
                //   testing.py
                //   client/
                //     FolderOrganizerLauncher/
                
                string currentDir = Directory.GetCurrentDirectory();
                
                // Potential paths to FolderOrganizer.py based on execution context
                string[] separatePaths = new[] 
                {
                    Path.Combine(currentDir, "../../../../..", "FolderOrganizer.py"), // bin/Debug/netX.X/ -> Root
                    Path.Combine(currentDir, "../..", "FolderOrganizer.py"),          // Client/FolderOrganizerLauncher/ -> Root
                    Path.Combine(currentDir, "FolderOrganizer.py")                    // Same folder
                };

                string scriptPath = "";
                foreach (var p in separatePaths)
                {
                    string fullPath = Path.GetFullPath(p);
                    if (File.Exists(fullPath))
                    {
                        scriptPath = fullPath;
                        break;
                    }
                }

                if (!File.Exists(scriptPath)) 
                {
                     StatusText.Text = "Errore: FolderOrganizer.py non trovato!";
                     return;
                }

                // Check for local virtual environment first
                string venvPython = Path.GetFullPath(Path.Combine(currentDir, "../../../../..", ".venv", "Scripts", "python.exe"));
                string pythonExe = "python"; // Default to system PATH
                
                if (File.Exists(venvPython))
                {
                    pythonExe = venvPython;
                }
                else
                {
                    // Fallback to project root venv if we are running from bin
                     string rootVenv = Path.GetFullPath(Path.Combine(currentDir, ".venv", "Scripts", "python.exe"));
                     if (File.Exists(rootVenv)) pythonExe = rootVenv;
                }

                ProcessStartInfo start = new ProcessStartInfo();
                start.FileName = pythonExe;
                start.Arguments = $"\"{scriptPath}\" \"{_selectedPath}\"";
                start.UseShellExecute = false; // Do not use OS shell
                start.RedirectStandardOutput = true;
                start.RedirectStandardError = true;
                start.CreateNoWindow = true; // Hide console window

                using (Process process = Process.Start(start))
                {
                    using (StreamReader reader = process.StandardOutput)
                    {
                        string result = reader.ReadToEnd();
                         MessageBox.Show($"Python Output:\n{result}", "Esecuzione Completata");
                    }
                    using (StreamReader reader = process.StandardError)
                    {
                        string stderr = reader.ReadToEnd();
                        if(!string.IsNullOrEmpty(stderr))
                             MessageBox.Show($"Python Error:\n{stderr}", "Errore Script");
                    }
                }
            }
            catch (System.Exception ex)
            {
                MessageBox.Show($"Errore nell'avvio dello script: {ex.Message}", "Errore");
            }
        }
    }
}
