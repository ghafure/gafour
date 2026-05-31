# Learner Workbook

Use this workbook during class to capture requirements, design choices, formulas, validation evidence, and deployment notes.

## Section 1: Project brief notes

### Audience

- Primary audience:
- Secondary audience:
- Usage cadence:
- Device or consumption pattern:

### Business decisions

List the decisions the dashboard should improve.

1. 
2. 
3. 

### Top business questions

1. 
2. 
3. 
4. 
5. 

## Section 2: KPI worksheet

| KPI | Formula | Grain | Filters/exclusions | Target | Owner | Validation method |
| --- | --- | --- | --- | --- | --- | --- |
| Revenue |  |  |  |  |  |  |
| Orders |  |  |  |  |  |  |
| Average Order Value |  |  |  |  |  |  |
| Target Attainment % |  |  |  |  |  |  |
| Return Rate |  |  |  |  |  |  |

### KPI risks

- Definitions that need stakeholder confirmation:
- Source data limitations:
- Edge cases to test:

## Section 3: Data preparation notes

### Source inventory

| Source | Fields used | Owner | Refresh cadence | Quality notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Power Query transformation log

| Step | Purpose | Business rule or technical cleanup? | Validation |
| --- | --- | --- | --- |
|  |  |  |  |

### Data assumptions

1. 
2. 
3. 

## Section 4: Model plan

### Fact table grain

One row represents:

### Dimension plan

| Dimension | Source columns | Relationship to fact | Notes |
| --- | --- | --- | --- |
| Date |  |  |  |
| Product |  |  |  |
| Region/Market |  |  |  |
| Salesperson |  |  |  |
| Customer Segment |  |  |  |

### Fields to hide

- 
- 
- 

## Section 5: DAX validation log

| Measure | Expected result | Power BI result | Sliced by | Pass/fail | Notes |
| --- | ---: | ---: | --- | --- | --- |
| Revenue |  |  |  |  |  |
| Orders |  |  |  |  |  |
| Target Attainment % |  |  |  |  |  |
| Return Rate |  |  |  |  |  |

## Section 6: Page design planner

### Executive Summary

- Main question:
- Primary KPI cards:
- Trend visual:
- Comparison visual:
- Slicers:
- User action:

### Detail page 1

- Main question:
- Visuals:
- Slicers:
- Drill-through or tooltip needs:

### Detail page 2

- Main question:
- Visuals:
- Slicers:
- Drill-through or tooltip needs:

## Section 7: Accessibility review

- [ ] Descriptive titles.
- [ ] Readable text.
- [ ] Sufficient contrast.
- [ ] Status is not communicated by color alone.
- [ ] Alt text used where appropriate.
- [ ] Tab order reviewed.

Accessibility notes:

## Section 8: Deployment plan

- Target workspace:
- Report owner:
- Semantic model owner:
- Audience/security groups:
- Refresh cadence:
- Gateway or credential requirements:
- Sensitivity/confidentiality notes:
- Support channel:
- Change request process:

## Section 9: Capstone presentation notes

Prepare a five-minute presentation.

1. Audience and decision:
2. Most important KPI definition:
3. Data/model choice:
4. Most important DAX measure:
5. Design decision:
6. Validation evidence:
7. Deployment/governance plan:
8. Next improvement:
