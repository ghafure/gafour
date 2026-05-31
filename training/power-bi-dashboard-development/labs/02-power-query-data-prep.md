# Lab 02: Power Query Data Preparation

## Goal

Import and prepare the sample sales data for modeling.

## Tasks

1. Open Power BI Desktop.
2. Select **Get data > Text/CSV** and import `data/sales_sample.csv`.
3. Open Power Query.
4. Review column quality, distribution, and profile.
5. Set data types:
   - `OrderDate`: Date
   - `Units`: Whole number
   - `UnitPrice`: Decimal number or fixed decimal number
   - `Discount`: Decimal number
   - `TargetRevenue`: Decimal number or fixed decimal number
   - Text fields: Text
6. Trim and clean all text columns.
7. Rename applied steps to explain intent.
8. Confirm whether returned orders should be included in revenue metrics or analyzed separately.
9. Close and apply.

## Optional challenge

Create a parameter for the file path so the report can be moved more easily between machines.

## Deliverables

- Clean Sales query loaded to the model.
- Notes describing data quality observations and assumptions.

## Success criteria

- Data types are correct.
- Applied steps are understandable.
- Assumptions are documented.
