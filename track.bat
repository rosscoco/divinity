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
echo *      Disable Telemetry
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f
echo *      Disable DiagTrack
sc delete DiagTrack
sc delete dmwappushservice
reg add "HKLM\SYSTEM\CurrentControlSet\Services" /v DiagTrack /t REG_DWORD /d 4 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Services" /v dmwappushservice /t REG_DWORD /d 4 /f
echo *      Clear DiagTrack Log
echo "" > C:\ProgramData\Microsoft\Diagnosis\ETLLogs\AutoLogger\AutoLogger-Diagtrack-Listener.etl
echo *      Disable Cortana/Bing Search and Searchbar
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v "AllowCortana" /t REG_DWORD /d 0 /f > NUL 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Search" /v "CortanaEnabled" /t REG_DWORD /d 0 /f > NUL 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 4 /f > NUL 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Search" /v "BingSearchEnabled" /t REG_DWORD /d 0 /f > NUL 2>&1
pause