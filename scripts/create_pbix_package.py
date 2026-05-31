#!/usr/bin/env python3
"""Create a portable PBIX starter package from repository dashboard assets.

Power BI Desktop is the authoritative writer for fully hydrated PBIX data models.
This script creates a deterministic `.pbix` zip container that carries the report
layout specification, source data, Power Query, DAX, and theme assets so the
starter dashboard can be handed off as a single Power BI package artifact.
"""

from __future__ import annotations

import csv
import hashlib
import html
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORTS_DIR = ROOT / "reports"
PBIX_PATH = REPORTS_DIR / "sales_performance_dashboard.pbix"
CHECKSUM_PATH = REPORTS_DIR / "sales_performance_dashboard.pbix.sha256"
DOWNLOAD_PAGE_PATH = REPORTS_DIR / "index.html"
PBIX_ZIP_PATH = REPORTS_DIR / "sales_performance_dashboard.pbix.zip"
PBIX_ZIP_CHECKSUM_PATH = REPORTS_DIR / "sales_performance_dashboard.pbix.zip.sha256"
ZIP_TIMESTAMP = (2025, 1, 1, 0, 0, 0)


def read_text(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def currency(value: float) -> str:
    return f"${value:,.0f}"


def percentage(value: float) -> str:
    return f"{value:.1%}"


def build_summary() -> dict[str, object]:
    rows: list[dict[str, str]] = []
    with (ROOT / "data" / "sales_sample.csv").open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))

    total_sales = sum(float(row["Sales"]) for row in rows)
    total_cost = sum(float(row["Cost"]) for row in rows)
    total_units = sum(int(row["Units"]) for row in rows)
    gross_profit = total_sales - total_cost

    by_region: dict[str, float] = {}
    by_category: dict[str, float] = {}
    by_channel: dict[str, float] = {}
    for row in rows:
        sales = float(row["Sales"])
        by_region[row["Region"]] = by_region.get(row["Region"], 0) + sales
        by_category[row["Category"]] = by_category.get(row["Category"], 0) + sales
        by_channel[row["Channel"]] = by_channel.get(row["Channel"], 0) + sales

    return {
        "rows": len(rows),
        "totalSales": total_sales,
        "totalSalesDisplay": currency(total_sales),
        "grossProfit": gross_profit,
        "grossProfitDisplay": currency(gross_profit),
        "grossMargin": gross_profit / total_sales,
        "grossMarginDisplay": percentage(gross_profit / total_sales),
        "totalUnits": total_units,
        "regions": by_region,
        "categories": by_category,
        "channels": by_channel,
    }


def build_layout(summary: dict[str, object]) -> dict[str, object]:
    """Build a simple legacy-style report layout document."""
    return {
        "id": "SalesPerformanceDashboard",
        "resourcePackages": [],
        "config": json.dumps(
            {
                "version": "5.55",
                "themeCollection": {
                    "baseTheme": {
                        "name": "Sales Performance Dashboard",
                        "version": "1.0",
                        "type": 2,
                    }
                },
            }
        ),
        "layoutOptimization": 0,
        "sections": [
            {
                "id": 0,
                "name": "Executive Overview",
                "displayName": "Executive Overview",
                "width": 1280,
                "height": 720,
                "visualContainers": [
                    {
                        "x": 32,
                        "y": 24,
                        "z": 0,
                        "width": 280,
                        "height": 90,
                        "config": json.dumps(
                            {
                                "name": "Total Sales KPI",
                                "singleVisual": {
                                    "visualType": "card",
                                    "title": {"text": "Total Sales"},
                                    "prototypeQuery": {"Values": ["Sales[Total Sales]"]},
                                    "staticValue": summary["totalSalesDisplay"],
                                },
                            }
                        ),
                    },
                    {
                        "x": 328,
                        "y": 24,
                        "z": 1,
                        "width": 280,
                        "height": 90,
                        "config": json.dumps(
                            {
                                "name": "Gross Profit KPI",
                                "singleVisual": {
                                    "visualType": "card",
                                    "title": {"text": "Gross Profit"},
                                    "prototypeQuery": {"Values": ["Sales[Gross Profit]"]},
                                    "staticValue": summary["grossProfitDisplay"],
                                },
                            }
                        ),
                    },
                    {
                        "x": 624,
                        "y": 24,
                        "z": 2,
                        "width": 280,
                        "height": 90,
                        "config": json.dumps(
                            {
                                "name": "Gross Margin KPI",
                                "singleVisual": {
                                    "visualType": "card",
                                    "title": {"text": "Gross Margin %"},
                                    "prototypeQuery": {"Values": ["Sales[Gross Margin %]"]},
                                    "staticValue": summary["grossMarginDisplay"],
                                },
                            }
                        ),
                    },
                    {
                        "x": 32,
                        "y": 152,
                        "z": 3,
                        "width": 560,
                        "height": 250,
                        "config": json.dumps(
                            {
                                "name": "Sales by Region",
                                "singleVisual": {
                                    "visualType": "clusteredColumnChart",
                                    "title": {"text": "Sales by Region"},
                                    "prototypeQuery": {
                                        "Category": "Sales[Region]",
                                        "Values": "Sales[Total Sales]",
                                    },
                                    "staticSeries": summary["regions"],
                                },
                            }
                        ),
                    },
                    {
                        "x": 624,
                        "y": 152,
                        "z": 4,
                        "width": 560,
                        "height": 250,
                        "config": json.dumps(
                            {
                                "name": "Sales by Category",
                                "singleVisual": {
                                    "visualType": "barChart",
                                    "title": {"text": "Sales by Category"},
                                    "prototypeQuery": {
                                        "Category": "Sales[Category]",
                                        "Values": "Sales[Total Sales]",
                                    },
                                    "staticSeries": summary["categories"],
                                },
                            }
                        ),
                    },
                    {
                        "x": 32,
                        "y": 432,
                        "z": 5,
                        "width": 560,
                        "height": 220,
                        "config": json.dumps(
                            {
                                "name": "Sales by Channel",
                                "singleVisual": {
                                    "visualType": "donutChart",
                                    "title": {"text": "Sales by Channel"},
                                    "prototypeQuery": {
                                        "Category": "Sales[Channel]",
                                        "Values": "Sales[Total Sales]",
                                    },
                                    "staticSeries": summary["channels"],
                                },
                            }
                        ),
                    },
                ],
            }
        ],
    }


def parse_dax_measures() -> list[dict[str, str]]:
    measures: list[dict[str, str]] = []
    current_name: str | None = None
    current_expression: list[str] = []

    for raw_line in read_text("dax/measures.dax").splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()
        if not stripped or stripped.startswith("--"):
            continue

        is_measure_start = " =" in line and not raw_line.startswith((" ", "\t"))
        if is_measure_start:
            if current_name is not None:
                measures.append({"name": current_name, "expression": "\n".join(current_expression).strip()})
            name, expression = line.split("=", 1)
            current_name = name.strip()
            current_expression = [expression.strip()]
        elif current_name is not None:
            current_expression.append(line)

    if current_name is not None:
        measures.append({"name": current_name, "expression": "\n".join(current_expression).strip()})

    return measures


def build_data_model_schema() -> dict[str, object]:
    return {
        "name": "Sales Performance Model",
        "compatibilityLevel": 1550,
        "model": {
            "culture": "en-US",
            "tables": [
                {
                    "name": "Sales",
                    "columns": [
                        {"name": "Date", "dataType": "dateTime", "sourceColumn": "Date"},
                        {"name": "Region", "dataType": "string", "sourceColumn": "Region"},
                        {"name": "Country", "dataType": "string", "sourceColumn": "Country"},
                        {"name": "Segment", "dataType": "string", "sourceColumn": "Segment"},
                        {"name": "Category", "dataType": "string", "sourceColumn": "Category"},
                        {"name": "Product", "dataType": "string", "sourceColumn": "Product"},
                        {"name": "Customer", "dataType": "string", "sourceColumn": "Customer"},
                        {"name": "Sales", "dataType": "decimal", "sourceColumn": "Sales", "formatString": "$#,0"},
                        {"name": "Cost", "dataType": "decimal", "sourceColumn": "Cost", "formatString": "$#,0"},
                        {"name": "Units", "dataType": "int64", "sourceColumn": "Units"},
                        {"name": "Discount", "dataType": "decimal", "sourceColumn": "Discount", "formatString": "0.0%"},
                        {"name": "Channel", "dataType": "string", "sourceColumn": "Channel"},
                    ],
                    "partitions": [
                        {
                            "name": "Sales",
                            "mode": "import",
                            "source": {"type": "m", "expression": read_text("powerquery/queries.pq")},
                        }
                    ],
                    "measures": parse_dax_measures(),
                }
            ],
        },
    }


def file_sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def pbix_sha256() -> str:
    return file_sha256(PBIX_PATH)


def write_pbix_zip() -> None:
    with zipfile.ZipFile(PBIX_ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        write_zip_bytes(archive, PBIX_PATH.name, PBIX_PATH.read_bytes())


def write_download_files() -> None:
    write_pbix_zip()
    checksum = pbix_sha256()
    zip_checksum = file_sha256(PBIX_ZIP_PATH)
    CHECKSUM_PATH.write_text(f"{checksum}  {PBIX_PATH.name}\n", encoding="utf-8")
    PBIX_ZIP_CHECKSUM_PATH.write_text(f"{zip_checksum}  {PBIX_ZIP_PATH.name}\n", encoding="utf-8")
    DOWNLOAD_PAGE_PATH.write_text(
        "\n".join(
            [
                "<!doctype html>",
                '<html lang="en">',
                "<head>",
                '  <meta charset="utf-8">',
                "  <title>Download Sales Performance Dashboard PBIX</title>",
                '  <meta name="viewport" content="width=device-width, initial-scale=1">',
                "</head>",
                "<body>",
                "  <main>",
                "    <h1>Download Sales Performance Dashboard PBIX</h1>",
                f'    <p><a href="{html.escape(PBIX_PATH.name)}" download>Download {html.escape(PBIX_PATH.name)}</a></p>',
                f'    <p><a href="{html.escape(PBIX_ZIP_PATH.name)}" download>Download zipped PBIX fallback</a></p>',
                f"    <p>PBIX SHA-256: <code>{checksum}</code></p>",
                f"    <p>ZIP SHA-256: <code>{zip_checksum}</code></p>",
                '    <p>If your browser opens the PBIX instead of downloading it, use the zipped fallback or right-click the link and choose "Save link as".</p>',
                "  </main>",
                "</body>",
                "</html>",
                "",
            ]
        ),
        encoding="utf-8",
    )


def write_zip_bytes(archive: zipfile.ZipFile, path: str, data: bytes) -> None:
    zip_info = zipfile.ZipInfo(path, date_time=ZIP_TIMESTAMP)
    zip_info.compress_type = zipfile.ZIP_DEFLATED
    zip_info.external_attr = 0o644 << 16
    archive.writestr(zip_info, data)


def write_zip_text(archive: zipfile.ZipFile, path: str, content: str, utf16: bool = False) -> None:
    data = content.encode("utf-16le" if utf16 else "utf-8")
    write_zip_bytes(archive, path, data)


def create_pbix() -> Path:
    REPORTS_DIR.mkdir(exist_ok=True)
    summary = build_summary()
    content_types = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">
  <Default Extension=\"json\" ContentType=\"application/json\" />
  <Default Extension=\"csv\" ContentType=\"text/csv\" />
  <Default Extension=\"pq\" ContentType=\"text/plain\" />
  <Default Extension=\"dax\" ContentType=\"text/plain\" />
  <Override PartName=\"/Report/Layout\" ContentType=\"application/json\" />
  <Override PartName=\"/DataModelSchema\" ContentType=\"application/json\" />
  <Override PartName=\"/Metadata\" ContentType=\"application/json\" />
</Types>
"""
    metadata = {
        "name": "Sales Performance Dashboard",
        "description": "Starter PBIX package generated from source-controlled dashboard assets.",
        "sourceFiles": [
            "data/sales_sample.csv",
            "powerquery/queries.pq",
            "dax/measures.dax",
            "themes/sales-dashboard-theme.json",
            "docs/dashboard_spec.md",
        ],
        "summary": summary,
    }

    with zipfile.ZipFile(PBIX_PATH, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        write_zip_text(archive, "[Content_Types].xml", content_types)
        write_zip_text(archive, "Version", "2.128.0.0", utf16=True)
        write_zip_text(archive, "Metadata", json.dumps(metadata, indent=2), utf16=True)
        write_zip_text(archive, "Report/Layout", json.dumps(build_layout(summary), indent=2), utf16=True)
        write_zip_text(archive, "DataModelSchema", json.dumps(build_data_model_schema(), indent=2), utf16=True)
        write_zip_text(archive, "DataMashup", read_text("powerquery/queries.pq"), utf16=True)
        write_zip_bytes(archive, "Data/sales_sample.csv", (ROOT / "data" / "sales_sample.csv").read_bytes())
        write_zip_bytes(
            archive,
            "StaticResources/SharedResources/BaseThemes/sales-dashboard-theme.json",
            (ROOT / "themes" / "sales-dashboard-theme.json").read_bytes(),
        )
        write_zip_bytes(archive, "Model/measures.dax", (ROOT / "dax" / "measures.dax").read_bytes())
        write_zip_bytes(archive, "Documentation/dashboard_spec.md", (ROOT / "docs" / "dashboard_spec.md").read_bytes())
    write_download_files()
    return PBIX_PATH


def main() -> None:
    path = create_pbix()
    print(f"Created {path.relative_to(ROOT)}")
    print(f"Download page: {DOWNLOAD_PAGE_PATH.relative_to(ROOT)}")
    print(f"PBIX SHA-256: {pbix_sha256()}")
    print(f"ZIP package: {PBIX_ZIP_PATH.relative_to(ROOT)}")
    print(f"ZIP SHA-256: {file_sha256(PBIX_ZIP_PATH)}")


if __name__ == "__main__":
    main()
