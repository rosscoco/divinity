@Echo Off
:checkPrivileges
NET FILE 1>NUL 2>NUL
If '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )
:getPrivileges
If '%1'=='ELEV' (shift & goto gotPrivileges)
Setlocal DisableDelayedExpansion
Set "batchPath=%~0"
Setlocal EnableDelayedExpansion
Echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs"
Echo UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
"%temp%\OEgetPrivileges.vbs"
Exit /B
:gotPrivileges
Setlocal & pushd .
cd /d "%Windir%\System32"
takeown /F MusNotification.exe
icacls MusNotification.exe /deny Everyone:(X)
takeown /F MusNotificationUx.exe
icacls MusNotificationUx.exe /deny Everyone:(X)
pause