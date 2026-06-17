param(
    [string]$InstallPath = "$env:LOCALAPPDATA\SalesRecordSystem"
)

$ErrorActionPreference = "Stop"

$source = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktop = [Environment]::GetFolderPath("Desktop")
$programs = [Environment]::GetFolderPath("Programs")
$startMenuFolder = Join-Path $programs "Sales Record System"
$shortcutTargets = @(
    @{ Path = Join-Path $desktop "Sales Record System.lnk"; Working = $InstallPath },
    @{ Path = Join-Path $startMenuFolder "Sales Record System.lnk"; Working = $InstallPath }
)

Write-Host "Installing Sales Record System..."
Write-Host "Source: $source"
Write-Host "Install path: $InstallPath"

New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null
New-Item -ItemType Directory -Force -Path $startMenuFolder | Out-Null

$exclude = @("install.ps1", "uninstall.ps1", "Install Sales Record System.bat")
Get-ChildItem -LiteralPath $source -Force | Where-Object {
    $exclude -notcontains $_.Name
} | ForEach-Object {
    $destination = Join-Path $InstallPath $_.Name
    if ($_.PSIsContainer) {
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
    } else {
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
}

Copy-Item -LiteralPath (Join-Path $source "uninstall.ps1") -Destination (Join-Path $InstallPath "uninstall.ps1") -Force

$launchFile = Join-Path $InstallPath "index.html"
$shell = New-Object -ComObject WScript.Shell
foreach ($target in $shortcutTargets) {
    $shortcut = $shell.CreateShortcut($target.Path)
    $shortcut.TargetPath = $launchFile
    $shortcut.WorkingDirectory = $target.Working
    $shortcut.Description = "Open Sales Record System"
    $shortcut.Save()
}

$uninstallShortcut = $shell.CreateShortcut((Join-Path $startMenuFolder "Uninstall Sales Record System.lnk"))
$uninstallShortcut.TargetPath = "powershell.exe"
$uninstallShortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$InstallPath\uninstall.ps1`""
$uninstallShortcut.WorkingDirectory = $InstallPath
$uninstallShortcut.Description = "Uninstall Sales Record System"
$uninstallShortcut.Save()

Write-Host ""
Write-Host "Sales Record System installed successfully."
Write-Host "Use the Desktop or Start Menu shortcut to launch it."
Write-Host ""
Read-Host "Press Enter to close"
