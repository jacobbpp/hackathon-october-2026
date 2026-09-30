# Software and Data Hackathon: LoopBike

Turning messy data into something people can actually use.

**Event page:** https://jacobbpp.github.io/hackathon-october-2026/

## The client

**LoopBike** runs the bike-share scheme in Brackford, a (fictional) UK city: 40 docking stations, around 600 bikes (standard and electric), a few thousand members on Annual or Monthly plans, and pay-as-you-go casual riders.

The operations team has six months of data and three questions:

1. **Where and when do stations run out of bikes or docks?**
2. **Which riders are we losing, and which are worth keeping?**
3. **Can we see tomorrow's demand coming?**

They want answers they can trust and tools they can use, not just charts.

Trips and members were exported on **31 August 2026**. September's trips are stuck in a migration to LoopBike's new app; the ops team hope to get them to you during the day.

## What's in this repo

| Folder | What it is |
|---|---|
| `data/` | The raw export: `trips.csv` (about 50,000 rows), `stations.csv`, `members.csv`, `bikes.csv`, `weather.csv`, `maintenance.csv`. `data_dictionary.md` says what each column is *meant* to contain. |
| `server/` | Web starter, part 1: a small Express API serving the raw data, plus a rough `/api/summary`. |
| `client/` | Web starter, part 2: a React dashboard (trips per day, trips by hour, top stations, a raw trips table). |
| `notebook/` | Python starter: loads all six files and profiles them, draws one rough chart, and includes a Tier 3 baseline. |
| `tier3/` | Tier 3 instructions and submission templates. |
| `DATA_QUALITY_LOG.md` | Your team's record of every problem found and what you did about it. |

Nothing has been cleaned. The starters are there so nobody starts from a blank page. You don't have to use them: Python, R, SQL, JavaScript, Power BI, Excel, whatever your team knows.

## Getting started

Run the setup check for the starter(s) you plan to use. It tells you what, if anything, to fix.

**Web starter** (Node 20+):

```bash
npm install
npm run check
npm run install:all
npm run dev
```

Then open http://localhost:5173. The API runs on http://localhost:4000 (for example http://localhost:4000/api/stations).

**Notebook starter** (Python 3.10+):

```bash
pip install -r notebook/requirements.txt
python notebook/check_setup.py
```

Then open `notebook/starter.ipynb` in Jupyter, VS Code or Google Colab.

## Challenge tiers

Every tier has somewhere easy to start and no ceiling. You do not need to finish a tier before a teammate starts the next one.

| Tier | Start here | The core | Going further |
|---|---|---|---|
| **1. Clean and explain** | Find and fix three problems in one file | Cleaning you can re-run from scratch (a script or notebook, not hand edits), and a `DATA_QUALITY_LOG.md` entry for every problem: what, evidence, decision, rows affected | Find the problems that don't show up in a quick look. Show a chart before and after cleaning where the story changes |
| **2. Explore and build** | Add one new chart or filter to a starter | Answer the client's three questions in a tool a non-technical person could use, served from cleaned data | An insight that needs two or more files joined. A map, a drill-down, a station view |
| **3. Predict** (optional) | Run the naive baseline in the notebook | Build a model for one of the two tasks in `tier3/README.md`, submit predictions, and show them in your app | Beat the baseline, and say honestly how wrong your model is and where |

### Stretch cards

Got time in hand? Each of these is recognised separately at the showcase.

- **Ship it**: deploy your tool to a public URL.
- **Prove it**: automated tests for your cleaning rules.
- **Watch it**: a data quality check that would flag the next bad file automatically.
- **Open it**: your dashboard passes a basic accessibility check (contrast, keyboard use, alt text).

## Rules of the day

- **AI assistants are allowed.** If you can't explain it, it doesn't count. Judges may ask any team member about any part of your work.
- **Every decision about the data is a decision.** Dropping rows, filling gaps, merging values: write it in the log with your reason. "We checked and it was fine" is a useful entry too.
- **Keep your cleaning repeatable.** You may need to run it again.
- **Ask the facilitators.** They won't build it for you, but they will help you get unstuck.

## Showcase and judging

Each team gets **5 minutes to demo** and **3 minutes of questions**. Cover the problem, what you built, what you found, and what you'd do next.

Judges score five things, from the FAQ:

1. A clear definition of the problem
2. Sensible use of data
3. The quality and clarity of the solution
4. Evidence of effective teamwork
5. How well the team explains its approach

Awards: **Best Overall Solution**, **Best Data Insight**, **Best Technical Build**, **Audience Favourite**.

A focused, well-explained Tier 1 and Tier 2 beats a half-finished Tier 3.

## The day

| Time | |
|---|---|
| 09:30 | Arrive, clone this repo, run the setup check |
| 09:45 | Kick-off |
| 10:05 | Teams and roles |
| 10:15 | Sprint 1: explore and clean |
| 11:30 | Checkpoint: two minutes per team |
| 11:45 | Sprint 2: build |
| 12:45 | Lunch |
| 13:30 | Update from the client |
| 13:40 | Sprint 3 |
| 15:15 | Tier 3 submissions close |
| 15:30 | Code freeze; prepare your demo |
| 15:50 | Showcase |
| 16:30 | Audience vote; judges confer |
| 16:45 | Awards and wrap-up |
| 17:00 | Close |
