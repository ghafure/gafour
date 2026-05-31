# Power BI Dashboard Development Training Module

A complete, instructor-ready training module for building production-quality Power BI dashboards from raw business requirements through data preparation, semantic modeling, DAX measures, report design, publishing, governance, and handoff.

## Audience

This module is designed for business analysts, data analysts, reporting specialists, operations leaders, and aspiring BI developers who need to create trustworthy, usable Power BI dashboards.

## Duration

Recommended delivery: **3 days / 18 hours**.

Alternative formats:

- **Intensive bootcamp:** 2 days / 14 hours by assigning the capstone and optional labs as pre-work.
- **Weekly cohort:** 6 sessions / 3 hours each.
- **Self-paced:** 4 to 6 weeks with one lab checkpoint per week.

## Prerequisites

Learners should have:

- Basic spreadsheet skills, including tables, filters, formulas, and pivots.
- Basic understanding of business KPIs and data quality issues.
- Access to Power BI Desktop and, for publishing labs, a Power BI service workspace.
- Optional but helpful: familiarity with SQL concepts such as tables, joins, and aggregations.

## Learning objectives

By the end of the module, learners will be able to:

1. Translate stakeholder goals into a dashboard brief, KPI catalog, and acceptance criteria.
2. Import, profile, clean, and transform data with Power Query.
3. Design a star-schema semantic model with clear relationships and reusable measures.
4. Write core DAX measures for totals, ratios, time intelligence, targets, and conditional formatting.
5. Build clear report pages and dashboard views using visual hierarchy, interaction design, accessibility, and performance-conscious layouts.
6. Publish, share, refresh, secure, monitor, and iterate on a Power BI dashboard.
7. Complete a capstone dashboard development project and present design decisions.

## Module contents

| File | Purpose |
| --- | --- |
| [`learner-guide.md`](learner-guide.md) | Full lesson content, exercises, checklists, and capstone instructions. |
| [`instructor-guide.md`](instructor-guide.md) | Facilitation plan, timing, prompts, answer guidance, and grading rubric. |
| [`assessment.md`](assessment.md) | Knowledge check, practical assessment, and scoring rubric. |
| [`data/sales_sample.csv`](data/sales_sample.csv) | Small sample dataset for labs and demonstrations. |
| [`templates/dashboard-brief.md`](templates/dashboard-brief.md) | Stakeholder discovery and requirements template. |
| [`templates/kpi-catalog.md`](templates/kpi-catalog.md) | KPI definition template. |
| [`templates/dashboard-qa-checklist.md`](templates/dashboard-qa-checklist.md) | Quality assurance checklist before publishing. |
| [`templates/dax-measures.md`](templates/dax-measures.md) | Reusable starter DAX measure patterns. |
| [`labs/01-requirements-and-wireframe.md`](labs/01-requirements-and-wireframe.md) | Requirements and wireframing lab. |
| [`labs/02-power-query-data-prep.md`](labs/02-power-query-data-prep.md) | Data ingestion and transformation lab. |
| [`labs/03-semantic-model-and-dax.md`](labs/03-semantic-model-and-dax.md) | Modeling and DAX lab. |
| [`labs/04-report-design-and-accessibility.md`](labs/04-report-design-and-accessibility.md) | Report design and accessibility lab. |
| [`labs/05-publish-refresh-and-governance.md`](labs/05-publish-refresh-and-governance.md) | Publishing, refresh, and governance lab. |
| [`materials/slide-deck.md`](materials/slide-deck.md) | Presentation-ready slide outline with speaker notes and prompts. |
| [`materials/facilitator-script.md`](materials/facilitator-script.md) | Instructor talk track, demo cues, and debrief prompts. |
| [`materials/learner-workbook.md`](materials/learner-workbook.md) | Printable learner workbook for class notes and capstone planning. |
| [`materials/quick-reference.md`](materials/quick-reference.md) | One-stop checklist and pattern reference for dashboard development. |
| [`materials/capstone-scenario.md`](materials/capstone-scenario.md) | Detailed capstone scenario, stakeholder context, and acceptance criteria. |
| [`materials/solution-guide.md`](materials/solution-guide.md) | Instructor solution path with expected measures and validation values. |
| [`materials/email-templates.md`](materials/email-templates.md) | Pre-work, recap, and post-training communication templates. |

## Tools and setup

1. Install Power BI Desktop.
2. Download or clone this repository.
3. Open Power BI Desktop and use **Get data > Text/CSV** to import `data/sales_sample.csv`.
4. If your class will publish reports, create a training workspace in the Power BI service before the course.

## Training materials

The `materials/` folder contains ready-to-use classroom assets: a slide-deck outline, facilitator script, learner workbook, quick reference, capstone scenario, solution guide, and email templates. These files are designed to turn the module from an outline into deliverable course material for live, virtual, or self-paced training.

## Suggested delivery agenda

### Day 1: Foundation and data preparation

- BI product mindset and dashboard lifecycle.
- Stakeholder discovery, KPI definition, and dashboard wireframing.
- Data import, profiling, cleaning, and query design in Power Query.
- Lab 01 and Lab 02.

### Day 2: Modeling, DAX, and analytical design

- Star-schema modeling and relationship design.
- Measure-first DAX development.
- Time intelligence, targets, variance, and formatting patterns.
- Visual selection, page layout, interaction design, and accessibility.
- Lab 03 and Lab 04.

### Day 3: Publishing, governance, and capstone

- Workspace deployment, refresh, sharing, security, endorsement, and lifecycle management.
- Performance troubleshooting and quality assurance.
- Capstone build, peer review, presentation, and assessment.
- Lab 05 and final practical assessment.

## Reference documentation

This module aligns with current Microsoft Learn guidance for Power BI reports, dashboard design, semantic models, star schema modeling, and mobile-optimized report design:

- Power BI documentation: <https://learn.microsoft.com/en-us/power-bi/>
- Power BI report overview: <https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-overview>
- Dashboard design tips: <https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards-design-tips>
- Semantic model documentation: <https://learn.microsoft.com/en-us/power-bi/personas/semantic-model-designer/>
- Star schema guidance: <https://learn.microsoft.com/en-us/power-bi/guidance/star-schema>
- Mobile-optimized report best practices: <https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-best-practices>
