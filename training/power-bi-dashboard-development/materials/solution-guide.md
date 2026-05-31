# Solution Guide: Sample Sales Dashboard

This guide provides one acceptable solution path for the sample sales dataset. It is intended for instructors and self-paced learners who need answer guidance.

## Expected data model

### Fact table

`Sales` at one row per sales order line.

Important columns:

- `OrderDate`
- `Region`
- `Market`
- `Salesperson`
- `CustomerSegment`
- `ProductCategory`
- `Product`
- `Units`
- `UnitPrice`
- `Discount`
- `TargetRevenue`
- `Status`

### Recommended dimensions

Small classes may keep the flat table for speed, but the preferred model includes:

- `Date`: date, year, month number, month name, year-month.
- `Dim Region`: region and market.
- `Dim Product`: product category and product.
- `Dim Salesperson`: salesperson.
- `Dim Customer Segment`: customer segment.

### Relationships

- `Date[Date]` one-to-many to `Sales[OrderDate]`.
- `Dim Region[Market]` one-to-many to `Sales[Market]` if market values are unique in the dimension.
- `Dim Product[Product]` one-to-many to `Sales[Product]`.
- `Dim Salesperson[Salesperson]` one-to-many to `Sales[Salesperson]`.
- `Dim Customer Segment[CustomerSegment]` one-to-many to `Sales[CustomerSegment]`.

## Expected measures

```DAX
Revenue =
SUMX (
    Sales,
    Sales[Units] * Sales[UnitPrice] * ( 1 - Sales[Discount] )
)
```

```DAX
Orders =
COUNTROWS ( Sales )
```

```DAX
Target Revenue =
SUM ( Sales[TargetRevenue] )
```

```DAX
Average Order Value =
DIVIDE ( [Revenue], [Orders] )
```

```DAX
Target Attainment % =
DIVIDE ( [Revenue], [Target Revenue] )
```

```DAX
Revenue Variance =
[Revenue] - [Target Revenue]
```

```DAX
Revenue Variance % =
DIVIDE ( [Revenue Variance], [Target Revenue] )
```

```DAX
Returned Orders =
CALCULATE ( [Orders], Sales[Status] = "Returned" )
```

```DAX
Return Rate =
DIVIDE ( [Returned Orders], [Orders] )
```

## Validation values for the sample CSV

These values assume every row is included, including returned orders. If your class decides to exclude returned orders from Revenue, document the changed rule and expected values.

| Metric | Expected value |
| --- | ---: |
| Rows / Orders | 24 |
| Returned Orders | 1 |
| Return Rate | 4.17% |
| Target Revenue | 127,800.00 |
| Revenue | 122,679.60 |
| Revenue Variance | -5,120.40 |
| Target Attainment % | 95.99% |
| Average Order Value | 5,111.65 |

## Expected revenue by region

| Region | Revenue |
| --- | ---: |
| Central | 29,601.95 |
| East | 31,383.30 |
| South | 30,500.25 |
| West | 31,194.10 |

## Expected revenue by product category

| Product Category | Revenue |
| --- | ---: |
| Hardware | 40,933.80 |
| Services | 36,831.00 |
| Software | 44,914.80 |

## Suggested page designs

### Executive Summary

- KPI cards: Revenue, Target Attainment %, Revenue Variance, Return Rate.
- Line chart: Revenue by Month.
- Bar chart: Revenue by Region.
- Bar chart: Revenue by Product Category.
- Table: Markets or salespeople below target.
- Slicers: Month, Region, Customer Segment.

### Regional Performance

- Matrix: Region and Market with Revenue, Target Revenue, Target Attainment %, Revenue Variance.
- Trend: Revenue by Month and Region.
- Bar chart: Target Attainment % by Region.

### Product and Customer Segment Analysis

- Bar chart: Revenue by Product.
- Stacked bar: Revenue by Product Category and Customer Segment.
- Table: Product, Orders, Revenue, Return Rate.

## Common acceptable variations

- Excluding returned orders from Revenue if documented.
- Combining region and market into one dimension.
- Using a single Product dimension for both category and product.
- Creating additional measures such as Units Sold, Discount Amount, or Average Discount.
- Publishing as a report instead of a dashboard if the class focuses on Power BI Desktop.

## Common issues to correct

- Using `SUM(Sales[UnitPrice])` as revenue.
- Forgetting to multiply by units.
- Forgetting discounts.
- Formatting target attainment as a decimal instead of a percentage.
- Using too many slicers on the Executive Summary page.
- Leaving raw numeric columns visible for users.
