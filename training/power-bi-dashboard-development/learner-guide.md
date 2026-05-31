# Learner Guide: Power BI Dashboard Development

## How to use this guide

Work through each lesson in sequence. Each lesson includes concepts, demonstrations, practice tasks, and deliverables. The module uses a small sales dataset so you can focus on the complete dashboard development workflow instead of data acquisition complexity.

## Dashboard development lifecycle

A Power BI dashboard project should be treated as a product, not a one-time file. Use this lifecycle:

1. **Discover:** identify audience, decisions, KPIs, scope, source systems, risks, and acceptance criteria.
2. **Prepare:** ingest data, profile quality, clean columns, standardize values, and document assumptions.
3. **Model:** design fact and dimension tables, relationships, date tables, hierarchies, and explicit measures.
4. **Design:** create report pages that answer business questions with clear visual hierarchy and interaction patterns.
5. **Validate:** reconcile calculations, test filters, review accessibility, check performance, and run user acceptance testing.
6. **Deploy:** publish to a workspace, configure refresh, permissions, app distribution, sensitivity labels, and support ownership.
7. **Improve:** monitor usage, capture feedback, retire unused pages, and maintain a change log.

## Lesson 1: Requirements, KPIs, and dashboard thinking

### Key concepts

- A dashboard summarizes the current state of a business area and helps users decide what to do next.
- A report can contain multiple pages, drill paths, tooltips, and detailed analysis; a dashboard or executive landing page should emphasize the highest-value signals.
- Good requirements describe decisions, actions, and definitions rather than just requested charts.
- Every KPI needs a business owner, formula, grain, default filters, target, and validation source.

### Stakeholder discovery questions

Ask stakeholders:

- What decision should this dashboard make faster or more accurate?
- Who will use it, how often, and on what device?
- Which metrics are trusted today, and where do users disagree?
- What actions should users take when a KPI is green, yellow, or red?
- What filters or segments are required for decision-making?
- Which data is sensitive or restricted?
- What would make the dashboard unacceptable?

### Exercise

Complete `templates/dashboard-brief.md` and `templates/kpi-catalog.md` for a sales performance dashboard. Focus on revenue, target attainment, average order value, and return rate.

### Deliverable

Submit a one-page dashboard brief, a KPI catalog, and a rough wireframe for the landing page.

## Lesson 2: Data ingestion and Power Query preparation

### Key concepts

Power Query is the right place for repeatable data shaping steps such as removing unused columns, fixing data types, replacing values, trimming text, splitting columns, merging sources, and appending tables. Keep transformation steps readable and named so future maintainers can understand the pipeline.

### Recommended query practices

- Keep raw source queries separate from cleaned staging queries when working with multiple sources.
- Rename applied steps to describe business intent.
- Remove columns that are not needed for the model.
- Set data types deliberately; do not rely only on automatic detection.
- Avoid hard-coded filters that silently exclude future data unless they are documented business rules.
- Create parameterized paths or connections when reports move between development and production.

### Practice task

Import `data/sales_sample.csv` and create a clean Sales table:

1. Confirm `OrderDate` is a date.
2. Confirm `Units` is a whole number.
3. Confirm `UnitPrice`, `Discount`, and `TargetRevenue` are decimal or fixed decimal numbers.
4. Trim and clean text columns.
5. Remove duplicate rows if any are discovered.
6. Add a custom column named `Revenue` only if your instructor wants the calculation materialized; otherwise create revenue as a DAX measure in Lesson 3.

### Deliverable

A loaded Sales table with correct data types and a short note documenting any assumptions.

## Lesson 3: Semantic model design

### Key concepts

A semantic model is the governed analytical layer that users build visuals from. A strong model is easier to use, easier to validate, and faster to maintain.

Use a star schema whenever practical:

- **Fact tables** store events or transactions such as order lines, invoices, tickets, or web sessions.
- **Dimension tables** store descriptive attributes such as date, product, customer, region, or salesperson.
- **Measures** calculate reusable business metrics at query time.

### Model design steps

1. Identify the grain of the fact table. For the sample file, the grain is one sales order line.
2. Create dimension tables for Date, Region or Market, Product, Salesperson, and Customer Segment if the project requires reusable slicing.
3. Create relationships from dimensions to the Sales fact table.
4. Hide technical keys and raw numeric columns that should not be used directly.
5. Create a dedicated measure table if helpful for organization.
6. Format measures as currency, percentages, or whole numbers.

### Date table pattern

Create a date table for time intelligence. A simple DAX date table can start as:

```DAX
Date =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2026, 1, 1 ), DATE ( 2026, 12, 31 ) ),
    "Year", YEAR ( [Date] ),
    "Month Number", MONTH ( [Date] ),
    "Month", FORMAT ( [Date], "MMM" ),
    "Year Month", FORMAT ( [Date], "YYYY-MM" )
)
```

After creating it, mark it as the date table and relate `Date[Date]` to `Sales[OrderDate]`.

## Lesson 4: DAX for dashboard metrics

### Key concepts

DAX measures respond to filter context from slicers, visual axes, page filters, report filters, and relationships. Build and test measures incrementally.

### Core measures

Use `templates/dax-measures.md` as a starter. At minimum, create:

- Revenue
- Orders
- Average Order Value
- Target Revenue
- Target Attainment %
- Revenue Variance
- Revenue Variance %
- Returned Orders
- Return Rate
- Revenue YTD or month-over-month measures if a date table is available

### DAX development workflow

1. Create one measure.
2. Test it in a table visual at total level.
3. Slice it by date, region, product, and salesperson.
4. Compare the result to manual calculations or source totals.
5. Format the measure.
6. Add it to a display folder or measure table.

### Common pitfalls

- Using implicit measures by dragging raw numeric columns into visuals.
- Dividing with `/` instead of `DIVIDE`, which handles zero or blank denominators more safely.
- Mixing calculated columns and measures without understanding refresh-time versus query-time behavior.
- Creating measures with names that only developers understand.

## Lesson 5: Report and dashboard design

### Key concepts

Design starts with user attention. Put the most important insight where users look first, then provide supporting breakdowns and action paths.

### Page blueprint

A practical sales dashboard can include:

1. **Executive Summary:** KPI cards, trend, target attainment, top drivers, and alerts.
2. **Regional Performance:** map or ranked bar chart, regional trend, market details.
3. **Product Performance:** category mix, product ranking, return rate, margin or revenue contribution if available.
4. **Salesperson Performance:** attainment by salesperson, customer segment mix, coaching opportunities.
5. **Detail or Drill-through:** filtered table for investigation.

### Visual selection guidance

- Use cards for headline KPIs.
- Use line charts for time trends.
- Use bar or column charts for comparisons.
- Use tables or matrices for precise lookup and exception lists.
- Use scatter plots for relationships between two measures.
- Use maps only when geography is important to the decision.
- Avoid decorative visuals that do not answer a business question.

### Layout and interaction guidance

- Use a consistent page grid, spacing, theme, and title pattern.
- Keep slicers visible but limited to the filters users genuinely need.
- Align visuals and avoid unnecessary borders.
- Use drill-through, report page tooltips, bookmarks, and buttons only when they reduce complexity.
- Design for desktop first, then create a mobile layout when mobile consumption is required.
- Use color consistently: for example, green for at or above target, red for below target, neutral gray for context.

### Accessibility checklist

- Provide descriptive titles.
- Avoid relying on color alone.
- Maintain readable font sizes.
- Check contrast.
- Add alt text where available.
- Verify tab order for keyboard navigation.

## Lesson 6: Performance and optimization

### Key concepts

Performance problems usually come from too much data, inefficient models, expensive DAX, excessive visuals, or unnecessary interactions.

### Optimization checklist

- Remove unused columns and rows before loading.
- Prefer star schema relationships over many-to-many shortcuts.
- Use measures efficiently and avoid overly complex row-by-row calculations.
- Limit visuals per page and avoid visuals that query high-cardinality fields unnecessarily.
- Disable visual interactions that do not help the user.
- Use Performance Analyzer in Power BI Desktop to identify slow visuals.
- Consider aggregations, incremental refresh, DirectQuery, or composite models only when the business and data architecture require them.

## Lesson 7: Publishing, refresh, and governance

### Key concepts

A production dashboard needs operational ownership. Publishing is not complete until users have secure access, data refresh works, and support expectations are documented.

### Deployment checklist

1. Publish to a development or training workspace.
2. Configure semantic model credentials.
3. Configure scheduled refresh or gateway access if needed.
4. Set workspace roles using least privilege.
5. Package reports in an app for broad consumption when appropriate.
6. Apply sensitivity labels when required by policy.
7. Document owner, refresh schedule, data sources, and support contact.
8. Maintain a change log.

### Governance practices

- Separate development, test, and production workspaces for important dashboards.
- Use certified or promoted semantic models for trusted enterprise reporting.
- Reuse shared semantic models instead of creating duplicate metric definitions.
- Review permissions periodically.
- Track usage metrics and retire unused content.

## Capstone project

Build a sales performance dashboard from the sample dataset or an approved dataset from your organization.

### Required deliverables

- Dashboard brief.
- KPI catalog with at least five metrics.
- Cleaned dataset or documented Power Query steps.
- Semantic model with relationships and explicit measures.
- At least three report pages.
- One mobile-optimized page or mobile design explanation.
- QA checklist.
- Five-minute presentation covering audience, data model, DAX measures, design decisions, and next iteration.

### Suggested report pages

1. Executive Summary.
2. Regional or Market Performance.
3. Product and Customer Segment Analysis.
4. Salesperson Detail or Drill-through.

### Presentation prompt

Explain:

- Who the dashboard serves.
- What business decisions it supports.
- Which KPI definitions mattered most.
- How your data model supports the visuals.
- What validation you performed.
- What you would improve with more time.
