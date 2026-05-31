# Starter DAX Measure Patterns

Adapt table and column names to your model. Prefer explicit measures over dragging numeric columns directly into visuals.

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
Average Order Value =
DIVIDE ( [Revenue], [Orders] )
```

```DAX
Target Revenue =
SUM ( Sales[TargetRevenue] )
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
CALCULATE (
    [Orders],
    Sales[Status] = "Returned"
)
```

```DAX
Return Rate =
DIVIDE ( [Returned Orders], [Orders] )
```

```DAX
Revenue YTD =
TOTALYTD ( [Revenue], 'Date'[Date] )
```

```DAX
Revenue Previous Month =
CALCULATE ( [Revenue], DATEADD ( 'Date'[Date], -1, MONTH ) )
```

```DAX
Revenue Month over Month % =
DIVIDE ( [Revenue] - [Revenue Previous Month], [Revenue Previous Month] )
```
