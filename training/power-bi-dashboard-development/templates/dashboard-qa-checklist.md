# Dashboard QA Checklist

## Data and model

- [ ] Source file, database, or lakehouse connection is documented.
- [ ] Data types are correct in Power Query and the model.
- [ ] Fact and dimension tables are clearly named.
- [ ] Relationships use the intended cardinality and filter direction.
- [ ] Hidden technical columns are not exposed to report users.
- [ ] All production calculations are explicit measures.

## DAX and validation

- [ ] Measures reconcile to source totals at overall and sliced levels.
- [ ] Divide-by-zero scenarios return a user-friendly blank or zero.
- [ ] Time-intelligence measures use a marked date table where applicable.
- [ ] Measure names are business-friendly and grouped logically.

## Report experience

- [ ] The top-left area communicates the most important takeaway.
- [ ] Slicers are necessary, consistently placed, and easy to reset.
- [ ] Visuals use appropriate chart types for the analytical question.
- [ ] Titles explain the business meaning, not just the field names.
- [ ] Colors have consistent meaning across pages.
- [ ] Report pages avoid clutter and unnecessary decoration.

## Accessibility

- [ ] Text is large enough to read on intended devices.
- [ ] Color is not the only way to interpret status or category.
- [ ] Visuals have meaningful titles and alt text where available.
- [ ] Tab order and keyboard navigation are reviewed.

## Publishing and operations

- [ ] Workspace, app, permissions, and sensitivity label are approved.
- [ ] Refresh schedule and data gateway requirements are documented.
- [ ] Endorsement, owner, support path, and change log are documented.
- [ ] User acceptance testing feedback is resolved or triaged.
