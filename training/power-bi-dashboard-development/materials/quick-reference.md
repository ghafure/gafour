# Quick Reference: Power BI Dashboard Development

## End-to-end workflow

1. **Discover:** audience, decisions, KPIs, data sources, risks, acceptance criteria.
2. **Prepare:** profile, clean, type, document, and load data.
3. **Model:** define fact grain, create dimensions, relationships, date table, and measures.
4. **Design:** build pages around business questions and user actions.
5. **Validate:** reconcile, test filters, review accessibility, and check performance.
6. **Deploy:** publish, refresh, secure, document owner and support.
7. **Improve:** monitor usage, collect feedback, and maintain change history.

## Requirement questions

- Who uses the dashboard?
- What decisions will it support?
- Which KPIs are required?
- What is the definition of each KPI?
- Which data sources are trusted?
- How often must the data refresh?
- Which users can view or edit?
- What are the acceptance criteria?

## Power Query checklist

- [ ] Column names are readable.
- [ ] Data types are correct.
- [ ] Text fields are trimmed and cleaned.
- [ ] Unused columns are removed.
- [ ] Duplicate or invalid records are reviewed.
- [ ] Applied steps are named clearly.
- [ ] Business filters are documented.
- [ ] Refresh path or connection is documented.

## Model checklist

- [ ] Fact table grain is documented.
- [ ] Date table is present when time intelligence is needed.
- [ ] Dimensions contain descriptive fields.
- [ ] Relationships are correct.
- [ ] Raw numeric fields are hidden when explicit measures should be used.
- [ ] Measures are formatted and named for business users.

## DAX patterns

```DAX
Revenue =
SUMX ( Sales, Sales[Units] * Sales[UnitPrice] * ( 1 - Sales[Discount] ) )
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
Revenue Variance % =
DIVIDE ( [Revenue] - [Target Revenue], [Target Revenue] )
```

## Visual selection

| Need | Use |
| --- | --- |
| Headline status | Card or KPI |
| Trend over time | Line chart |
| Category comparison | Bar chart |
| Detailed lookup | Table or matrix |
| Contribution to total | Stacked bar, matrix, or decomposition tree |
| Geographic decision | Map |

## Design checklist

- [ ] Page title states the business question.
- [ ] Most important KPI appears first.
- [ ] Every visual has a purpose.
- [ ] Colors have consistent meaning.
- [ ] Labels are readable.
- [ ] Slicers are limited and consistent.
- [ ] Visual interactions are intentional.
- [ ] Mobile layout is prepared if needed.

## Publishing checklist

- [ ] Workspace selected.
- [ ] Viewer and contributor permissions defined.
- [ ] Refresh configured or documented.
- [ ] Credentials and gateway requirements documented.
- [ ] Sensitivity label or confidentiality note added where required.
- [ ] Owner and support contact named.
- [ ] QA checklist completed.
- [ ] Release notes shared.
