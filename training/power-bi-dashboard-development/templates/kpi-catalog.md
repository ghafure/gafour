# KPI Catalog Template

| KPI | Business definition | Formula | Grain | Filters/exclusions | Target | Owner | Validation source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Revenue | Net order value after discounts | Units × Unit Price × (1 - Discount) | Order line | Exclude returned orders unless analyzing returns | Monthly target | Sales Ops | Finance revenue export |
| Target Attainment | Revenue divided by target revenue | Revenue / Target Revenue | Month, region, salesperson | Same as Revenue | 100%+ | Sales Ops | Sales plan |
| Average Order Value | Revenue divided by number of orders | Revenue / Orders | Order | Same as Revenue | Varies | Sales Ops | CRM |

## KPI quality checklist

- [ ] The KPI has one business owner.
- [ ] The KPI definition avoids ambiguous terms.
- [ ] The formula includes numerator and denominator rules.
- [ ] The default time period is specified.
- [ ] Filters, exclusions, and edge cases are documented.
- [ ] The KPI can be reconciled to a trusted source.
