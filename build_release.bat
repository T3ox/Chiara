@echo off
set "ROOT=C:\Users\User\Documents\GitHub\FolderOrganizer"
set "DIST=%ROOT%\FolderOrganizer_v0.0.9"
set "ZIP=%ROOT%\FolderOrganizer_v0.0.9.zip"

echo Building...
cd "%ROOT%\client\FolderOrganizerLauncher"
dotnet publish -c Release -o "%DIST%"

echo Copying files...
cd "%ROOT%"
copy FolderOrganizer.py "%DIST%\"
copy requirements.txt "%DIST%\"
copy prompt_*.json "%DIST%\"

echo Zipping...
powershell -Command "Compress-Archive -Path '%DIST%\*' -DestinationPath '%ZIP%' -Force"

echo Cleaning up...
rmdir /s /q "%DIST%"

echo Build complete!
