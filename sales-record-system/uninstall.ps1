param(
    [string]$InstallPath = "$env:LOCALAPPDATA\SalesRecordSystem"
)

$ErrorActionPreference = "Stop"

$desktop = [Environment]::GetFolderPath("Desktop")
$programs = [Environment]::GetFolderPath("Programs")
$startMenuFolder = Join-Path $programs "Sales Record System"
$desktopShortcut = Join-Path $desktop "Sales Record System.lnk"

Write-Host "Uninstalling Sales Record System..."

if (Test-Path -LiteralPath $desktopShortcut) {
    Remove-Item -LiteralPath $desktopShortcut -Force
}

if (Test-Path -LiteralPath $startMenuFolder) {
    Remove-Item -LiteralPath $startMenuFolder -Recurse -Force
}

if (Test-Path -LiteralPath $InstallPath) {
    Remove-Item -LiteralPath $InstallPath -Recurse -Force
}

Write-Host "Sales Record System uninstalled."
Read-Host "Press Enter to close"
