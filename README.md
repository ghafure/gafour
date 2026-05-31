# Power BI Sales Performance Dashboard

This repository contains a ready-to-build Power BI dashboard kit for sales performance analysis. It includes a generated PBIX starter package, sample sales data, Power Query scripts, DAX measures, a report theme, and a dashboard specification.

## Contents

- `data/sales_sample.csv` — sample 2025 sales transactions.
- `powerquery/queries.pq` — Power Query M scripts for the Sales fact table and Date dimension.
- `dax/measures.dax` — reusable DAX measures for revenue, profit, margin, discounting, and ranking.
- `themes/sales-dashboard-theme.json` — Power BI theme file.
- `docs/dashboard_spec.md` — recommended dashboard pages, visuals, and acceptance checklist.
- `scripts/create_pbix_package.py` — deterministic generator for `reports/sales_performance_dashboard.pbix`.
- `scripts/validate_dashboard_assets.py` — validation checks for the dashboard assets and PBIX package.

## Generate and Download the PBIX Package

Binary report outputs are intentionally not committed. Generate them locally when you need a downloadable PBIX:

```bash
python3 scripts/create_pbix_package.py
```

The generator writes these ignored files under `reports/`:

- `sales_performance_dashboard.pbix` — the Power BI starter package.
- `sales_performance_dashboard.pbix.zip` — a zipped fallback for browsers or Git hosting UIs that block direct `.pbix` downloads.
- `sales_performance_dashboard.pbix.sha256` and `sales_performance_dashboard.pbix.zip.sha256` — verification checksums.
- `index.html` — a local browser download page linking to both generated artifacts.

Open `reports/index.html` in a browser after generation, or open `reports/sales_performance_dashboard.pbix` directly in Power BI Desktop. If your browser does not download `.pbix` files, use the generated ZIP fallback and extract `sales_performance_dashboard.pbix`.

Validate the source assets and any generated package files with:

```bash
python3 scripts/validate_dashboard_assets.py
```

## Use the PBIX Package

1. Generate `reports/sales_performance_dashboard.pbix` with `python3 scripts/create_pbix_package.py`.
2. Open `reports/sales_performance_dashboard.pbix` in Power BI Desktop.
3. If prompted for source permissions, allow the embedded sample CSV and Power Query assets.
4. Confirm the `Sales` table, `Date` table, DAX measures, and report theme match the source files in this repository.
5. Save the file from Power BI Desktop after any interactive edits so Desktop can hydrate or normalize the binary model metadata for your local version.

## Build the Dashboard Manually in Power BI Desktop

If you prefer to build from source instead of the generated package:

1. Open Power BI Desktop and choose **Get data > Text/CSV**.
2. Import `data/sales_sample.csv` as the Sales table.
3. In **Transform data**, apply the data types documented in `powerquery/queries.pq` or paste the Sales query and update `SalesCsvPath`.
4. Create the Date query from `powerquery/queries.pq`, name it `Date`, and mark it as the date table.
5. Create a one-to-many relationship from `Date[Date]` to `Sales[Date]`.
6. Add each measure from `dax/measures.dax` to the Sales table.
7. Import `themes/sales-dashboard-theme.json` from **View > Browse for themes**.
8. Build the pages and visuals described in `docs/dashboard_spec.md`.

## Suggested KPIs

- Total Sales
- Gross Profit
- Gross Margin %
- Total Units
- Sales MoM %
- Average Order Value
- Discount %
