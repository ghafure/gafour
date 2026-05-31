# Instructor Guide: Power BI Dashboard Development

## Instructor preparation

Before class:

1. Confirm every learner has Power BI Desktop installed.
2. Confirm whether the organization permits publishing to the Power BI service during training.
3. Create a training workspace if learners will complete publishing exercises.
4. Review the sample dataset in `data/sales_sample.csv`.
5. Prepare one completed demonstration report if live building time is limited.
6. Decide whether learners should build from the sample dataset or bring an approved business dataset for the capstone.

## Recommended schedule

### Day 1: Dashboard foundations and data preparation

| Time | Topic | Activity |
| --- | --- | --- |
| 09:00-09:30 | Course introduction | Discuss dashboard pain points and goals. |
| 09:30-10:30 | Dashboard lifecycle | Walk through discover, prepare, model, design, validate, deploy, improve. |
| 10:30-10:45 | Break |  |
| 10:45-12:00 | Requirements and KPI catalog | Facilitate stakeholder role-play and Lab 01. |
| 12:00-13:00 | Lunch |  |
| 13:00-14:30 | Power Query fundamentals | Demo import, profiling, types, cleaning, and applied steps. |
| 14:30-14:45 | Break |  |
| 14:45-16:30 | Lab 02 | Learners clean the sample dataset and document assumptions. |
| 16:30-17:00 | Debrief | Discuss data quality discoveries and modeling implications. |

### Day 2: Modeling, DAX, and report design

| Time | Topic | Activity |
| --- | --- | --- |
| 09:00-10:15 | Star schema and semantic models | Build dimensions and relationships. |
| 10:15-10:30 | Break |  |
| 10:30-12:00 | DAX measures | Demo Revenue, Target Attainment, Variance, Return Rate, and time measures. |
| 12:00-13:00 | Lunch |  |
| 13:00-14:15 | Lab 03 | Learners build model and measures. |
| 14:15-14:30 | Break |  |
| 14:30-15:30 | Report design principles | Discuss visual selection, hierarchy, interactions, accessibility. |
| 15:30-16:45 | Lab 04 | Learners build report pages and test usability. |
| 16:45-17:00 | Peer critique | Use two stars and one wish: two strengths and one improvement. |

### Day 3: Governance, publishing, and capstone

| Time | Topic | Activity |
| --- | --- | --- |
| 09:00-10:00 | Performance and QA | Use Performance Analyzer and QA checklist. |
| 10:00-10:45 | Publishing and refresh | Demo workspace publishing and refresh settings if available. |
| 10:45-11:00 | Break |  |
| 11:00-12:00 | Lab 05 | Learners prepare deployment plan or publish to training workspace. |
| 12:00-13:00 | Lunch |  |
| 13:00-15:15 | Capstone build | Instructor circulates and reviews KPI/model/design decisions. |
| 15:15-15:30 | Break |  |
| 15:30-16:30 | Capstone presentations | Five minutes per learner or team. |
| 16:30-17:00 | Assessment and wrap-up | Knowledge check, feedback, next steps. |

## Facilitation notes

### Emphasize product thinking

Learners often start by asking, “What chart should I build?” Redirect them to ask, “What decision should this support?” Keep repeating the link between audience, decision, KPI, model, and visual.

### Keep DAX grounded

Introduce DAX through reusable business metrics, not syntax memorization. Have learners validate each measure in a table visual before placing it in charts.

### Encourage model-first design

If learners build all visuals from one flat table, use it as a teaching moment. Demonstrate how dimensions make slicing easier, reduce ambiguity, and create a model that can grow.

### Use design critique constructively

Ask learners to identify:

- The first thing their eyes notice.
- The decision the page supports.
- The action a user should take.
- Any element that can be removed without losing meaning.

## Lab answer guidance

### Lab 01

Strong submissions include:

- A specific audience such as regional sales managers.
- Decision-focused questions such as “Which markets need intervention this month?”
- KPI definitions with formulas and targets.
- Acceptance criteria tied to reconciliation, usability, refresh, and security.

### Lab 02

Strong submissions include:

- Correct data types.
- Cleaned text fields.
- Documented assumptions about returned orders and target revenue.
- No unnecessary columns loaded.

### Lab 03

Strong submissions include:

- Date table related to Sales by OrderDate.
- At least three useful dimensions or a clear explanation for a flat model in the small sample.
- Explicit measures for all KPIs.
- Formatted currency and percentage measures.

### Lab 04

Strong submissions include:

- Clear page title and business question.
- KPI cards with context.
- At least one trend and one comparison visual.
- Consistent colors and readable labels.
- Slicers that do not overwhelm the page.

### Lab 05

Strong submissions include:

- A deployment plan naming workspace, owner, refresh cadence, and permission groups.
- A completed QA checklist.
- If publishing is possible, correct workspace placement and refresh configuration.

## Capstone grading rubric

| Category | Weight | Excellent | Satisfactory | Needs improvement |
| --- | ---: | --- | --- | --- |
| Requirements and KPI definitions | 20% | Clear audience, decisions, formulas, targets, and acceptance criteria. | Most KPIs and decisions documented. | Metrics or audience are vague. |
| Data preparation | 15% | Clean, typed, documented transformations. | Data mostly clean with minor documentation gaps. | Types, quality issues, or assumptions missing. |
| Semantic model and DAX | 25% | Logical model, explicit measures, correct formatting, validated calculations. | Measures work with minor modeling issues. | Raw columns used as metrics or calculations not validated. |
| Report design and accessibility | 20% | Pages are focused, readable, accessible, and action-oriented. | Usable pages with some clutter or inconsistency. | Visuals are confusing, cluttered, or inaccessible. |
| Publishing and governance | 10% | Refresh, permissions, ownership, and support plan are documented. | Basic deployment plan exists. | Operational ownership is unclear. |
| Presentation | 10% | Concise explanation of decisions, tradeoffs, and next steps. | Covers most required topics. | Presentation lacks rationale or validation evidence. |

## Troubleshooting

- **Learners cannot publish:** Have them complete the deployment plan in Lab 05 instead of publishing.
- **Power BI Desktop version differences:** Focus on concepts and let menu labels vary slightly by version.
- **DAX errors:** Check table and column names, relationships, and whether measures reference other measures correctly.
- **Slow reports:** Reduce visuals, simplify measures, remove unused fields, and review Performance Analyzer output.
