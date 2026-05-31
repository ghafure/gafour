# Slide Deck: Power BI Dashboard Development

Use this as a presentation-ready slide script. Each `---` separates one slide. Copy the content into PowerPoint, Google Slides, or your preferred authoring tool.

---

## 1. Course title

**Power BI Dashboard Development**

From business question to governed dashboard

**Outcomes:** discover, prepare, model, measure, design, validate, publish, improve

**Instructor note:** Ask learners to introduce their role and one reporting problem they want to solve.

---

## 2. Why dashboard projects fail

- Metrics are not defined consistently.
- Data quality issues are found too late.
- Reports are built around visuals instead of decisions.
- Models are hard to maintain or extend.
- Publishing, refresh, ownership, and access are afterthoughts.

**Discussion prompt:** Which of these have you experienced?

---

## 3. Dashboard development lifecycle

1. Discover the audience, decisions, KPIs, and risks.
2. Prepare clean, typed, documented data.
3. Model facts, dimensions, relationships, and measures.
4. Design pages around attention, context, and action.
5. Validate calculations, filters, accessibility, and performance.
6. Deploy with refresh, permissions, owner, and support path.
7. Improve based on usage and feedback.

**Key message:** Power BI development is a product workflow, not just report creation.

---

## 4. Start with decisions

A good dashboard answers:

- What happened?
- Is it good or bad?
- Why did it happen?
- Who or what needs attention?
- What action should the user take next?

**Activity:** Convert “show revenue by region” into a decision-focused requirement.

---

## 5. Requirements artifacts

Every dashboard project should produce:

- Dashboard brief.
- KPI catalog.
- Data source inventory.
- Wireframe.
- Acceptance criteria.
- Deployment and support plan.

**Instructor note:** Show the templates folder before learners open Power BI.

---

## 6. KPI definition checklist

A trusted KPI includes:

- Business definition.
- Formula.
- Grain.
- Filters and exclusions.
- Target or threshold.
- Business owner.
- Validation source.

**Example:** Revenue = Units × Unit Price × (1 - Discount), validated against Finance export.

---

## 7. Power Query responsibilities

Use Power Query to:

- Connect to sources.
- Profile data quality.
- Set data types.
- Clean text and standardize categories.
- Remove unused columns.
- Merge or append sources.
- Document repeatable transformation steps.

**Key message:** Power Query creates reliable inputs for the model.

---

## 8. Data profiling questions

Ask:

- Are dates valid and complete?
- Are numbers stored as numbers?
- Are categories spelled consistently?
- Are there duplicate rows?
- Are blanks meaningful or errors?
- Do returned, cancelled, or test records need special handling?

**Demo:** Review column quality, distribution, and profile.

---

## 9. Semantic model mindset

The semantic model is the business layer.

It should be:

- Understandable to report builders.
- Governed by consistent definitions.
- Validated against trusted sources.
- Designed for reuse.
- Easy to maintain.

**Key message:** A strong model makes every visual easier.

---

## 10. Star schema basics

- Fact tables contain measurable events.
- Dimension tables contain descriptive attributes.
- Relationships connect dimensions to facts.
- Measures calculate business metrics.

**Example:** Sales fact related to Date, Product, Region, Customer Segment, and Salesperson dimensions.

---

## 11. DAX measure-first approach

Prefer explicit measures for production metrics.

Build measures by:

1. Creating one measure at a time.
2. Testing totals in a table visual.
3. Slicing by key dimensions.
4. Comparing to expected results.
5. Formatting and naming for business users.

---

## 12. Core dashboard measures

Minimum sales dashboard measures:

- Revenue.
- Orders.
- Average Order Value.
- Target Revenue.
- Target Attainment %.
- Revenue Variance.
- Revenue Variance %.
- Returned Orders.
- Return Rate.
- Time-intelligence measures when a date table is available.

---

## 13. Design for attention

Users scan dashboards quickly.

Guide attention with:

- Clear title and business question.
- Important KPIs near the top-left.
- Context beside headline numbers.
- Limited and purposeful visuals.
- Consistent spacing, alignment, and color meaning.

**Exercise:** Remove one visual from a cluttered page without losing meaning.

---

## 14. Choose visuals by question

| Question | Visual pattern |
| --- | --- |
| What is the value? | Card or KPI |
| How is it trending? | Line chart |
| Which category is highest? | Bar chart |
| How do parts contribute? | Stacked bar or small multiples |
| Which records need action? | Table or matrix |
| Where is it happening? | Map only when geography matters |

---

## 15. Accessibility essentials

- Use readable font sizes.
- Maintain sufficient contrast.
- Do not rely on color alone.
- Use descriptive titles and alt text.
- Check tab order.
- Keep page navigation predictable.

**Key message:** Accessible reports are clearer for everyone.

---

## 16. Performance essentials

Improve performance by:

- Removing unused data.
- Keeping the model simple.
- Reducing visuals per page.
- Avoiding unnecessary high-cardinality fields.
- Testing slow visuals with Performance Analyzer.
- Simplifying expensive measures.

---

## 17. Publishing is not the finish line

Before release, document:

- Workspace.
- Audience and permissions.
- Refresh schedule.
- Credentials or gateway needs.
- Data sensitivity.
- Owner and support channel.
- Change log.
- User acceptance testing results.

---

## 18. Capstone expectations

Build and present:

- Dashboard brief and KPI catalog.
- Clean data and documented assumptions.
- Semantic model and explicit measures.
- Three or more report pages.
- QA checklist.
- Deployment plan.
- Five-minute presentation.

---

## 19. Presentation structure

In five minutes, explain:

1. Audience and decisions.
2. Metrics and definitions.
3. Model and DAX choices.
4. Design choices.
5. Validation performed.
6. Publishing and governance plan.
7. Next improvement.

---

## 20. Final takeaway

A successful Power BI dashboard is:

- Decision-focused.
- Model-driven.
- Measure-governed.
- Designed for usability.
- Validated with evidence.
- Operationally owned.

**Close:** Ask learners to name one practice they will apply in their next dashboard project.
