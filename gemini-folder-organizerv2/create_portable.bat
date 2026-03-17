@echo off
echo Building project...
call npm run build
echo Creating distributable folder...
if exist Portable (rmdir /s /q Portable)
mkdir Portable
echo Copying files...
xcopy /E /I dist Portable
copy start_server.bat Portable\start_server.bat
echo Done! The 'Portable' folder is ready to zip and share.
pause
