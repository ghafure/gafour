#!/usr/bin/env python3
"""Validate source assets for the Power BI dashboard kit."""

from __future__ import annotations

import csv
import hashlib
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_COLUMNS = [
    "Date",
    "Region",
    "Country",
    "Segment",
    "Category",
    "Product",
    "Customer",
    "Sales",
    "Cost",
    "Units",
    "Discount",
    "Channel",
]


def validate_csv() -> None:
    csv_path = ROOT / "data" / "sales_sample.csv"
    with csv_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != REQUIRED_COLUMNS:
            raise AssertionError(f"Unexpected columns: {reader.fieldnames}")
        rows = list(reader)

    if len(rows) < 12:
        raise AssertionError("Expected at least 12 rows of sample data")

    for row in rows:
        if float(row["Sales"]) <= 0:
            raise AssertionError(f"Sales must be positive: {row}")
        if float(row["Cost"]) < 0:
            raise AssertionError(f"Cost cannot be negative: {row}")
        if int(row["Units"]) <= 0:
            raise AssertionError(f"Units must be positive: {row}")
        discount = float(row["Discount"])
        if discount < 0 or discount > 1:
            raise AssertionError(f"Discount must be between 0 and 1: {row}")


def validate_theme() -> None:
    theme_path = ROOT / "themes" / "sales-dashboard-theme.json"
    with theme_path.open(encoding="utf-8") as handle:
        theme = json.load(handle)

    if theme.get("name") != "Sales Performance Dashboard":
        raise AssertionError("Theme name is missing or incorrect")
    if not theme.get("dataColors"):
        raise AssertionError("Theme must include data colors")


def validate_measure_file() -> None:
    measure_path = ROOT / "dax" / "measures.dax"
    content = measure_path.read_text(encoding="utf-8")
    required_measures = [
        "Total Sales",
        "Gross Profit",
        "Gross Margin %",
        "Sales YTD",
        "Sales MoM %",
        "Top Product Sales Rank",
    ]
    for measure in required_measures:
        if f"{measure} =" not in content:
            raise AssertionError(f"Missing measure: {measure}")


def validate_pbix_package() -> None:
    pbix_path = ROOT / "reports" / "sales_performance_dashboard.pbix"
    checksum_path = ROOT / "reports" / "sales_performance_dashboard.pbix.sha256"
    pbix_zip_path = ROOT / "reports" / "sales_performance_dashboard.pbix.zip"
    pbix_zip_checksum_path = ROOT / "reports" / "sales_performance_dashboard.pbix.zip.sha256"
    download_page_path = ROOT / "reports" / "index.html"
    generated_paths = [pbix_path, checksum_path, pbix_zip_path, pbix_zip_checksum_path, download_page_path]
    existing_paths = [path for path in generated_paths if path.exists()]
    if not existing_paths:
        print("Generated PBIX artifacts are absent; skipping package validation.")
        return

    missing_paths = [path.relative_to(ROOT).as_posix() for path in generated_paths if not path.exists()]
    if missing_paths:
        raise AssertionError(f"Generated PBIX artifact set is incomplete: {missing_paths}")

    expected_checksum = hashlib.sha256(pbix_path.read_bytes()).hexdigest()
    checksum_text = checksum_path.read_text(encoding="utf-8").strip()
    if checksum_text != f"{expected_checksum}  {pbix_path.name}":
        raise AssertionError("PBIX checksum file does not match reports/sales_performance_dashboard.pbix")

    expected_zip_checksum = hashlib.sha256(pbix_zip_path.read_bytes()).hexdigest()
    zip_checksum_text = pbix_zip_checksum_path.read_text(encoding="utf-8").strip()
    if zip_checksum_text != f"{expected_zip_checksum}  {pbix_zip_path.name}":
        raise AssertionError("PBIX ZIP checksum file does not match reports/sales_performance_dashboard.pbix.zip")

    with zipfile.ZipFile(pbix_zip_path) as zip_archive:
        if zip_archive.namelist() != [pbix_path.name]:
            raise AssertionError("PBIX ZIP fallback must contain only the PBIX file")
        if zip_archive.read(pbix_path.name) != pbix_path.read_bytes():
            raise AssertionError("PBIX ZIP fallback content does not match the PBIX file")

    download_page = download_page_path.read_text(encoding="utf-8")
    if f'href="{pbix_path.name}" download' not in download_page:
        raise AssertionError("Download page must link to the PBIX with a download attribute")
    if f'href="{pbix_zip_path.name}" download' not in download_page:
        raise AssertionError("Download page must link to the PBIX ZIP fallback with a download attribute")
    if expected_checksum not in download_page or expected_zip_checksum not in download_page:
        raise AssertionError("Download page must display the current PBIX and ZIP checksums")

    required_entries = {
        "[Content_Types].xml",
        "Version",
        "Metadata",
        "Report/Layout",
        "DataModelSchema",
        "DataMashup",
        "Data/sales_sample.csv",
        "StaticResources/SharedResources/BaseThemes/sales-dashboard-theme.json",
        "Model/measures.dax",
        "Documentation/dashboard_spec.md",
    }

    with zipfile.ZipFile(pbix_path) as archive:
        names = set(archive.namelist())
        missing_entries = required_entries - names
        if missing_entries:
            raise AssertionError(f"PBIX package is missing entries: {sorted(missing_entries)}")

        metadata = json.loads(archive.read("Metadata").decode("utf-16le"))
        if metadata.get("name") != "Sales Performance Dashboard":
            raise AssertionError("PBIX metadata name is missing or incorrect")
        if metadata.get("summary", {}).get("rows", 0) < 12:
            raise AssertionError("PBIX metadata summary is missing source row counts")

        layout = json.loads(archive.read("Report/Layout").decode("utf-16le"))
        if not layout.get("sections"):
            raise AssertionError("PBIX layout must include at least one report page")

        model = json.loads(archive.read("DataModelSchema").decode("utf-16le"))
        tables = model.get("model", {}).get("tables", [])
        if not any(table.get("name") == "Sales" for table in tables):
            raise AssertionError("PBIX model schema must include the Sales table")


def main() -> None:
    validate_csv()
    validate_theme()
    validate_measure_file()
    validate_pbix_package()
    print("Power BI dashboard assets validated successfully.")


if __name__ == "__main__":
    main()
