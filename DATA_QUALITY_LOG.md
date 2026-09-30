# Data quality log

One row per problem you find, and per check that came back clean. Judges read this.

- **Evidence**: how you know (a count, a query, a chart), not just "it looked wrong".
- **Decision**: what you did and why. Dropping, fixing, flagging and leaving alone are all valid; not saying which is not.
- **Rows**: how many rows it affected.

Add as many rows as you need.

| # | File and column | What we found | Evidence | Decision and reason | Rows | Who |
|---|---|---|---|---|---|---|
| 0 | `stations.csv` `opened_date` | Example: no problem found | All 40 values parse as `YYYY-MM-DD`; all before March 2026 | No change | 0 | Facilitator |
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
