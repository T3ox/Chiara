using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FolderOrganizerLauncher
{
    public class BackendVersionInfo
    {
        [JsonPropertyName("version")]
        public string? Version { get; set; }

        [JsonPropertyName("downloadUrl")]
        public string? DownloadUrl { get; set; }
    }

    public class UpdateCheckResult
    {
        public bool IsUpdateAvailable { get; set; }
        public string CurrentVersion { get; set; } = string.Empty;
        public string LatestVersion { get; set; } = string.Empty;
        public string DownloadUrl { get; set; } = string.Empty;
    }

    public static class UpdateService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string BackendUrl = "http://localhost:3000/api/version";
        
        // Simulating the current version of the application. 
        // In a real scenario this might come from Assembly.GetExecutingAssembly().GetName().Version
        public const string CurrentAppVersion = "0.9.0"; 

        public static async Task<UpdateCheckResult?> CheckForUpdatesAsync()
        {
            try
            {
                // Set a timeout so we don't hang if the server is down
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
                // Fail silently (offline mode) as specified in US-8.1
                Debug.WriteLine($"Update check failed (silently ignored): {ex.Message}");
            }
            
            return null; // Return null if check fails or server offline
        }
        
        private static bool IsVersionGreater(string latestVersion, string currentVersion)
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
                // Fallback basic check if semantic version parsing fails
                return latestVersion != currentVersion;
            }
            return false;
        }
    }
}
