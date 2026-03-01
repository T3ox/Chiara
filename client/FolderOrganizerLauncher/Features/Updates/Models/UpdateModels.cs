namespace FolderOrganizerLauncher.Features.Updates.Models
{
    public class UpdateCheckResult
    {
        public bool IsUpdateAvailable { get; set; }
        public string CurrentVersion { get; set; } = string.Empty;
        public string LatestVersion { get; set; } = string.Empty;
        public string DownloadUrl { get; set; } = string.Empty;
    }

    public class BackendVersionInfo
    {
        public string? Version { get; set; }
        public string? DownloadUrl { get; set; }
    }
}
