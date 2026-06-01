# Sales Performance Power BI Dashboard Specification

## Goal

Provide an executive sales dashboard that tracks revenue, profitability, volume, discounting, and product or regional performance across the 2025 sample dataset.

## Data Model

- **Sales**: fact table loaded from `data/sales_sample.csv`.
- **Date**: generated date dimension in Power Query from January 1, 2025 through December 31, 2025.
- Relationship: `Date[Date]` one-to-many to `Sales[Date]`.

## PBIX Deliverable

The dashboard package is generated locally at `reports/sales_performance_dashboard.pbix` and is intentionally not committed because it is a binary build artifact. It embeds the sample dataset, Power Query, DAX measure definitions, theme, and this dashboard specification so the starter report can be distributed as a single file after generation.

Generate it with `python3 scripts/create_pbix_package.py` after changing the source assets. The generator also writes ignored download artifacts: `reports/index.html`, `reports/sales_performance_dashboard.pbix.sha256`, `reports/sales_performance_dashboard.pbix.zip`, and `reports/sales_performance_dashboard.pbix.zip.sha256`.

## Dashboard Pages

### 1. Executive Overview

Recommended visuals:

1. KPI cards for Total Sales, Gross Profit, Gross Margin %, Total Units, and Sales MoM %.
2. Line chart for Total Sales by Date[Year Month].
3. Clustered column chart for Total Sales by Region.
4. Bar chart for Gross Profit by Category.
5. Donut chart for Total Sales by Channel.
6. Matrix with Product, Total Sales, Gross Profit, Gross Margin %, and Top Product Sales Rank.

### 2. Product & Customer Detail

Recommended visuals:

1. Product ranking table sorted by Total Sales.
2. Scatter chart with Total Sales on X-axis, Gross Margin % on Y-axis, and Units as bubble size.
3. Customer table with Total Sales, Average Order Value, and Discount %.
4. Slicers for Region, Segment, Category, Channel, and Date.

## Formatting Guidance

- Import `themes/sales-dashboard-theme.json` from Power BI Desktop's **View > Browse for themes** menu.
- Use currency formatting for Sales, Cost, Gross Profit, and Average Order Value.
- Use percentage formatting for Gross Margin %, Discount %, and Sales MoM %.
- Sort Date[Month] by Date[Month Number] and mark the Date query as a date table.

## Acceptance Checklist

- The Sales table loads all rows from `data/sales_sample.csv` with the documented data types.
- The Date table is related to Sales on the Date field.
- All measures in `dax/measures.dax` are created and return values.
- Executive Overview includes the five KPI cards and at least four supporting visuals.
- Product & Customer Detail includes product, customer, and slicer-driven analysis.
- Running `python3 scripts/create_pbix_package.py` creates `reports/sales_performance_dashboard.pbix` with the report layout, model schema, source CSV, DAX, Power Query, theme, and documentation entries.
- Generated download artifacts remain untracked and ignored by Git.
