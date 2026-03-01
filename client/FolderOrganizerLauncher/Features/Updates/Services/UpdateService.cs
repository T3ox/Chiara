using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using FolderOrganizerLauncher.Features.Updates.Models;

namespace FolderOrganizerLauncher.Features.Updates.Services
{
    public class UpdateService : IUpdateService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string BackendUrl = "http://localhost:3000/api/version";
        
        // Simulating the current version of the application. 
        public const string CurrentAppVersion = "0.9.0"; 

        public async Task<UpdateCheckResult?> CheckForUpdatesAsync()
        {
            try
            {
                _httpClient.Timeout = TimeSpan.FromSeconds(5);
                
                HttpResponseMessage response = await _httpClient.GetAsync(BackendUrl);
                
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    
                    var backendInfo = JsonSerializer.Deserialize<BackendVersionInfo>(jsonResponse, options);
                    
                    if (backendInfo != null && !string.IsNullOrEmpty(backendInfo.Version))
                    {
                        bool isUpdateAvailable = IsVersionGreater(backendInfo.Version, CurrentAppVersion);
                        
                        return new UpdateCheckResult
                        {
                            IsUpdateAvailable = isUpdateAvailable,
                            CurrentVersion = CurrentAppVersion,
                            LatestVersion = backendInfo.Version,
                            DownloadUrl = backendInfo.DownloadUrl ?? string.Empty
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Update check failed: {ex.Message}");
            }
            
            return null;
        }
        
        public async Task DownloadFileAsync(string url, string destinationPath, IProgress<double> progress, System.Threading.CancellationToken ct)
        {
            using (var response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct))
            {
                response.EnsureSuccessStatusCode();

                var totalBytes = response.Content.Headers.ContentLength;

                using (var contentStream = await response.Content.ReadAsStreamAsync(ct))
                using (var fileStream = new System.IO.FileStream(destinationPath, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.None, 8192, true))
                {
                    var buffer = new byte[8192];
                    long totalReadBytes = 0;
                    int readBytes;

                    while ((readBytes = await contentStream.ReadAsync(buffer, 0, buffer.Length, ct)) > 0)
                    {
                        await fileStream.WriteAsync(buffer, 0, readBytes, ct);
                        totalReadBytes += readBytes;

                        if (totalBytes.HasValue)
                        {
                            progress.Report((double)totalReadBytes / totalBytes.Value * 100);
                        }
                    }
                }
            }
        }

        private bool IsVersionGreater(string latestVersion, string currentVersion)
        {
            try
            {
                if (Version.TryParse(latestVersion, out Version? latest) && 
                    Version.TryParse(currentVersion, out Version? current))
                {
                    return latest > current;
                }
            }
            catch
            {
                return latestVersion != currentVersion;
            }
            return false;
        }
    }
}
