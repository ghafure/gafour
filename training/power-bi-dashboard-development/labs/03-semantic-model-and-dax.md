# Lab 03: Semantic Model and DAX

## Goal

Build a usable semantic model and create dashboard-ready measures.

## Tasks

1. Create a Date table that covers the sample sales dates.
2. Mark the Date table as the date table.
3. Relate `Date[Date]` to `Sales[OrderDate]`.
4. Create dimension tables for at least three of the following:
   - Region and Market
   - Product Category and Product
   - Salesperson
   - Customer Segment
5. Create relationships from dimensions to Sales.
6. Hide fields that report users should not drag directly into visuals.
7. Create measures from `templates/dax-measures.md`:
   - Revenue
   - Orders
   - Average Order Value
   - Target Revenue
   - Target Attainment %
   - Revenue Variance
   - Revenue Variance %
   - Returned Orders
   - Return Rate
8. Format measures correctly.
9. Validate measures in a table visual by Region, Product Category, and Month.

## Optional challenge

Add conditional formatting logic for target status:

- At or above 100% attainment: green.
- 90% to 99.9% attainment: yellow.
- Below 90% attainment: red.

## Deliverables

- Model view screenshot or description.
- Measure list.
- Validation table screenshot or notes.

## Success criteria

- Relationships filter from dimensions to fact table.
- Measures return expected values when sliced.
- Numeric formats match business meaning.
