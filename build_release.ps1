$ErrorActionPreference = "Stop"

$workspaceRoot = "c:\Users\User\Documents\GitHub\FolderOrganizer"
$clientDir = "$workspaceRoot\client\FolderOrganizerLauncher"
$distDir = "$workspaceRoot\FolderOrganizer_v0.0.9"
$zipFile = "$workspaceRoot\FolderOrganizer_v0.0.9.zip"

Write-Host "Publishing C# client..."
Set-Location -Path $clientDir
dotnet publish -c Release -o "$distDir"

Write-Host "Copying python scripts and prompts..."
Set-Location -Path $workspaceRoot
Copy-Item "FolderOrganizer.py" -Destination $distDir
Copy-Item "requirements.txt" -Destination $distDir
Copy-Item "prompt_*.json" -Destination $distDir

Write-Host "Creating zip archive..."
if (Test-Path $zipFile) { Remove-Item $zipFile -Force }
Compress-Archive -Path "$distDir\*" -DestinationPath $zipFile -Force

Write-Host "Cleaning up staging directory..."
Remove-Item -Path $distDir -Recurse -Force

Write-Host "Done!"
