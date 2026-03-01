using System.Threading.Tasks;
using FolderOrganizerLauncher.Features.Updates.Models;

namespace FolderOrganizerLauncher.Features.Updates.Services
{
    public interface IUpdateService
    {
        Task<UpdateCheckResult?> CheckForUpdatesAsync();
        Task DownloadFileAsync(string url, string destinationPath, IProgress<double> progress, System.Threading.CancellationToken ct);
    }
}
