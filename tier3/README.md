# Tier 3: Predict

Optional. Pick one task, or both. Either way, the prediction has to appear in your tool (an API endpoint, a page, a "next week" view), not just in a notebook.

**Submissions close before the showcase.** The facilitators will tell you when, and how to hand your file in. Scores are revealed at the showcase.

## Option A: demand forecast

Predict how many **customer departures** each station will have on each day from **Monday 21 to Sunday 27 September 2026**.

- A departure is a customer trip (member or casual) starting at that station. Every customer trip counts, however short.
- Stations `LB001` to `LB040`, one row per station per day: 280 rows.
- `weather.csv` includes a forecast for that week.

**Submit:** fill in `demand_predictions_template.csv` and name it `<team>_demand.csv`.

**Scored by:** mean absolute error (the average number of departures your predictions are out by). Lower is better.

**Baseline to beat:** `weekday_baseline()` at the end of `notebook/starter.ipynb`, which predicts each day as the recent average for that station and weekday.

## Option B: members at risk

Which members will cancel next?

- Choose up to **100** members who were **active on 31 August** and who you think will cancel by **27 September**.

**Submit:** one `member_id` per row in `at_risk_members_template.csv`, named `<team>_at_risk.csv`.

**Scored by:** how many of your list actually cancelled. Higher is better. For scale, 100 members picked at random would get about 3 right.

## What judges look for

The score is only part of it. Be ready to say:

- what your model uses, and why
- how you checked it before submitting
- how wrong it is likely to be, and where it's weakest
- what LoopBike should do with it
