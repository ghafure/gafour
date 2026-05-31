# Assessment: Power BI Dashboard Development

## Assessment structure

| Component | Weight |
| --- | ---: |
| Knowledge check | 30% |
| Practical build | 50% |
| Presentation and handoff | 20% |

Passing recommendation: **80% or higher**.

## Part 1: Knowledge check

Answer each question in one to three sentences.

1. What is the difference between a report page and an executive dashboard or landing page?
2. Why should KPI definitions include grain, exclusions, and validation source?
3. Name three transformations that are usually appropriate in Power Query.
4. What is the grain of a fact table, and why does it matter?
5. Why is a star schema recommended for most analytical Power BI models?
6. What is the difference between a calculated column and a measure?
7. Why is `DIVIDE` often safer than the `/` operator in DAX ratio measures?
8. Name two examples of filter context in Power BI.
9. Give two ways to make a report more accessible.
10. What operational details should be documented before a dashboard is considered production-ready?

## Part 2: Practical build

Using `data/sales_sample.csv` or an approved dataset, build a Power BI dashboard with:

- Cleaned and typed data.
- A documented semantic model.
- At least five explicit measures.
- At least three report pages.
- Slicers that support the audience's decisions.
- At least one trend visual and one comparison visual.
- A completed QA checklist.
- A deployment or publishing plan.

## Part 3: Presentation and handoff

Present your dashboard in five minutes. Cover:

1. Audience and business decisions.
2. KPI definitions.
3. Data preparation choices.
4. Model and DAX approach.
5. Design choices.
6. Validation performed.
7. Publishing, refresh, security, and support plan.
8. Recommended next iteration.

## Scoring rubric

| Criterion | Points | Evidence |
| --- | ---: | --- |
| Requirements and KPI clarity | 15 | Dashboard brief and KPI catalog are complete and decision-oriented. |
| Data preparation quality | 15 | Data types, transformations, and assumptions are correct and documented. |
| Semantic model quality | 15 | Relationships, dimensions, date table, hidden fields, and measure organization are logical. |
| DAX correctness | 15 | Measures calculate correct totals, ratios, targets, and variances under filters. |
| Report design | 15 | Layout, visual selection, interactions, and hierarchy support the audience. |
| Accessibility and usability | 10 | Report uses readable text, contrast, alt text, meaningful titles, and logical navigation. |
| Publishing and governance | 10 | Refresh, permissions, owner, support path, and QA are documented. |
| Presentation | 5 | Explanation is concise, evidence-based, and focused on business value. |

## Answer key guidance for knowledge check

1. A report page can provide detailed exploration; an executive dashboard or landing page prioritizes at-a-glance monitoring and action.
2. These details prevent metric disputes and make validation possible.
3. Examples include setting data types, removing unused columns, trimming text, replacing values, splitting columns, appending, and merging.
4. Grain is what one row represents; it determines valid aggregation and relationship design.
5. Star schemas simplify relationships, improve usability, and make measures easier to reason about.
6. Calculated columns are materialized during refresh; measures calculate at query time based on filter context.
7. `DIVIDE` handles zero or blank denominators more gracefully.
8. Examples include slicers, visual axes, page filters, report filters, row context transitioned through `CALCULATE`, and relationship filters.
9. Examples include descriptive titles, sufficient contrast, not relying only on color, readable fonts, alt text, and logical tab order.
10. Refresh schedule, credentials or gateway, permissions, owner, support process, sensitivity, validation, and change log should be documented.
