# Facilitator Script

This script gives instructors a talk track, transitions, demo cues, and debrief prompts for the training module.

## Opening script

Welcome learners and set the expectation that the course is about building a dashboard as a governed analytics product. Emphasize that Power BI skills include technical execution and business judgment. The goal is not to create the most visuals; the goal is to create a dashboard that answers important questions reliably.

### Opening questions

- What dashboard do you use most often today?
- What makes it trustworthy or frustrating?
- What is one metric people debate in your organization?

## Lesson 1 talk track: requirements and KPIs

Start by saying: “Before we open Power BI, we need to know who the dashboard serves and what decision it improves.” Explain that many dashboard projects fail because the team accepts chart requests without clarifying the business question.

### Demo cue

Open `templates/dashboard-brief.md` and walk through each section. Show how the template moves from business context to audience, success criteria, data sources, scope, wireframe, and acceptance criteria.

### Facilitation prompt

Ask learners to rewrite vague requests:

- “I need a sales dashboard.”
- “Show everything by region.”
- “Add a trend chart.”

Better versions should identify audience, decision, metric, time frame, and action.

### Debrief questions

- Which KPI definition was hardest to write?
- Where might stakeholders disagree?
- Which acceptance criterion would prevent rework later?

## Lesson 2 talk track: Power Query

Explain that Power Query is where repeatable cleaning happens. The instructor should avoid presenting cleaning as cosmetic; every transformation should protect trust in the dashboard.

### Demo cue

Import `data/sales_sample.csv`. Show column profiling. Set data types deliberately. Trim and clean text fields. Rename applied steps with intent-focused labels.

### Common coaching notes

- If learners accept automatic type detection without checking, ask what could go wrong in refresh.
- If learners add many custom columns, ask whether the calculation belongs in Power Query or as a DAX measure.
- If learners filter records, ask whether the filter is a documented business rule.

### Debrief questions

- Which columns are dimensions?
- Which columns are measures or inputs to measures?
- How should returned orders affect the dashboard?

## Lesson 3 talk track: modeling and DAX

Explain that model quality determines how easy the report is to build and maintain. A simple star schema is usually easier for business users and future developers than one flat, overloaded table.

### Demo cue

Create a date table. Build at least three dimensions from the sales data. Create relationships from dimensions to Sales. Create Revenue, Orders, Target Revenue, Target Attainment %, and Return Rate measures.

### DAX coaching sequence

1. Type the measure slowly.
2. Explain each function in plain language.
3. Put the measure in a table visual.
4. Slice it by region or month.
5. Ask learners whether the total makes sense.
6. Format the measure.

### Debrief questions

- What does one row in Sales represent?
- Which fields should be hidden from report users?
- Which measures should be reused across pages?

## Lesson 4 talk track: report design

Frame design as decision support. The page should reduce effort for the user. If the user needs to explain the page before understanding the page, the design needs improvement.

### Demo cue

Build an Executive Summary page with KPI cards, a trend line, a comparison bar chart, and a small exception table. Show how the same measures appear consistently across visuals.

### Critique method

Use “two stars and one wish”:

- Star 1: One design choice that helps the user.
- Star 2: One metric or visual that is especially clear.
- Wish: One change that would improve clarity or actionability.

### Debrief questions

- Where does your eye go first?
- What question does the page answer?
- What action should the user take?
- Which visual could be removed?

## Lesson 5 talk track: publishing and governance

Explain that a report file is not a production dashboard until access, refresh, ownership, and support are defined. Publishing creates operational responsibility.

### Demo cue

If service access is available, publish to a training workspace and review semantic model settings. If service access is not available, complete the deployment plan and QA checklist as a class.

### Governance discussion prompts

- Who is allowed to edit versus view?
- Who owns metric definitions?
- How will users request changes?
- What happens when refresh fails?
- When should content be retired?

## Capstone facilitation

During build time, circulate with a consistent review sequence:

1. Show me your audience and decision.
2. Show me your KPI definitions.
3. Show me your model relationships.
4. Show me your measures in a validation table.
5. Show me your report page and explain the first insight.
6. Show me your QA or deployment plan.

## Closing script

Close by reinforcing the product workflow. Ask learners to identify one thing they will stop doing, one thing they will start doing, and one thing they will share with their team.
