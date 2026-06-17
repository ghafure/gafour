# Sales Record System

A dependency-free local sales record system for Windows. It runs in the browser, stores records in localStorage, and includes a user-level installer that creates Desktop and Start Menu shortcuts.

## Features

- Add, edit, view, delete, search, and filter sales records.
- Automatic invoice numbering.
- Quantity, unit price, tax, discount, and total amount calculation.
- Payment status tracking for Paid, Pending, and Partial records.
- KPI summary, monthly chart, and outstanding amount view.
- Export filtered records to CSV.
- Backup and restore all data as JSON.
- Import CSV or JSON records.
- Print-friendly layout.

## Run Without Installing

Open `index.html` in a browser, or double-click `Launch Sales Record System.bat`.

## Install On Windows

Double-click `Install Sales Record System.bat`.

The installer copies the app to:

```text
%LOCALAPPDATA%\SalesRecordSystem
```

It creates:

- Desktop shortcut: `Sales Record System`
- Start Menu folder: `Sales Record System`
- Start Menu uninstall shortcut

## Uninstall

Use the Start Menu uninstall shortcut, or run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\SalesRecordSystem\uninstall.ps1"
```

## Data Notes

Records are stored in the browser profile for the app URL. Use `Backup JSON` before moving browsers, clearing browser data, or reinstalling Windows.
