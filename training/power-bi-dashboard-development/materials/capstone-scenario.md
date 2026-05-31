# Capstone Scenario: Sales Performance Dashboard

## Business background

A national sales organization wants a Power BI dashboard that helps sales leaders identify revenue performance issues early, compare regions and products, and determine where coaching or operational follow-up is needed.

The team currently reviews spreadsheet exports manually. Different managers calculate revenue and target attainment differently, which causes disagreement in monthly performance meetings.

## Stakeholders

| Stakeholder | Role | Needs |
| --- | --- | --- |
| VP of Sales | Executive sponsor | At-a-glance performance against target and areas needing action. |
| Regional Sales Managers | Primary users | Region and market trends, product mix, and salesperson performance. |
| Sales Operations | Data owner | Consistent KPI definitions, refresh process, and issue tracking. |
| Finance Partner | Validation partner | Revenue and target totals that reconcile to approved sources. |

## Business questions

The dashboard should answer:

1. Are we above or below revenue target?
2. Which regions and markets are driving the variance?
3. Which products and categories contribute most to revenue?
4. Are returns concentrated in a region, product, or customer segment?
5. Which salespeople need attention or recognition?
6. How has revenue changed over time?

## Required KPIs

- Revenue.
- Orders.
- Average Order Value.
- Target Revenue.
- Target Attainment %.
- Revenue Variance.
- Revenue Variance %.
- Returned Orders.
- Return Rate.

## Required report pages

### Page 1: Executive Summary

Purpose: Give leaders an immediate readout of performance.

Required elements:

- KPI cards for Revenue, Target Attainment %, Revenue Variance, and Return Rate.
- Monthly revenue trend.
- Revenue by region.
- Top product categories or products.
- Slicers for date, region, and customer segment.
- One text box or visual callout explaining the biggest insight.

### Page 2: Regional Performance

Purpose: Help managers compare regions and markets.

Required elements:

- Revenue and target attainment by region.
- Market-level detail.
- Trend by month.
- Drill or filter path from region to market.

### Page 3: Product and Customer Segment Analysis

Purpose: Show which products and segments drive performance.

Required elements:

- Revenue by product category and product.
- Customer segment mix.
- Return rate by product category.
- Detail table for investigation.

### Optional Page 4: Salesperson Detail

Purpose: Support coaching and recognition.

Required elements:

- Revenue by salesperson.
- Target attainment by salesperson.
- Product mix or customer segment mix by salesperson.

## Constraints

- Use the sample dataset unless your instructor approves another dataset.
- Use explicit DAX measures for production KPIs.
- Include a date table if you use time-intelligence calculations.
- Complete the QA checklist before presentation.
- Prepare a deployment plan even if you cannot publish to the Power BI service.

## Acceptance criteria

- KPI definitions are documented and internally consistent.
- Revenue and target calculations are validated at total and sliced levels.
- Report pages answer the required business questions.
- Visuals are readable and accessible.
- Dashboard has an owner, refresh plan, and support path.
