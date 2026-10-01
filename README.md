# Software and Data Hackathon: LoopBike

Turning messy data into something people can actually use.

**Event page:** https://jacobbpp.github.io/hackathon-october-2026/

## The client

**LoopBike** runs the bike-share scheme in Brackford, a (fictional) UK city: 40 docking stations, around 600 bikes (standard and electric), a few thousand members on Annual or Monthly plans, and pay-as-you-go casual riders.

The operations team, led by Priya Shah, has six months of data and three questions:

1. **Where and when do stations run out of bikes or docks?**
2. **Which riders are we losing, and which are worth keeping?**
3. **Can we see tomorrow's demand coming?**

They want answers they can trust and tools they can use, not just charts.

Trips and members were exported on **31 August 2026**. September's trips are stuck in a migration to LoopBike's new app; the ops team hope to get them to you during the day.

## The challenge: two jobs, one team

Your team has two jobs that depend on each other.

- **Make the data trustworthy.** Find what's wrong with it, fix it in a way you can repeat, and find out what it really says.
- **Build LoopBike Ops.** A tool Priya's team would actually use, running on the cleaned data. Build it in whatever your team knows: Power BI, Excel, Python or code.

Most teams are mainly data analysts, so expect most tools to be built in Power BI, Excel or Python. Where a team has a developer, they and an analyst lead the build together.

The two jobs meet in a **data contract** ([`DATA_CONTRACT.md`](DATA_CONTRACT.md)): the names and columns of the cleaned files, agreed by the first checkpoint. The people cleaning produce files that match it; the people building the tool build against it, using a few hand-written sample rows until the real files are ready. Nobody waits for anybody.

## Build LoopBike Ops

What Priya's team has asked for. Build in priority order: a few stories that work well beat many that half work.

| | As a... | I want... | so that... |
|---|---|---|---|
| **Must** | operations manager | every station listed once, with its real departures and arrivals | I know which numbers to trust |
| **Must** | van driver planning the morning run | a list of stations likely to be empty by 09:00 on a weekday | I know where to take bikes first |
| **Must** | operations manager | to pick a station and see its busiest hours, on weekdays and at weekends | I can plan repairs around them |
| **Should** | membership lead | a list of members whose riding has dropped off | we can contact them before they cancel |
| **Should** | anyone using the tool | to filter by date range and rider type | I can compare like with like |
| **Could** | operations manager | a map of stations, coloured by how often they run empty | I can see problem areas at a glance |
| **Could** | operations manager | tomorrow's expected departures for each station (Tier 3) | I can plan the vans the night before |

**Quality bar.** Whatever you build it in:

- Someone outside your team can open it and use it, following your instructions.
- A non-technical person can use it without you explaining it.
- Blank or odd values don't break it.
- It reads the cleaned files, so re-running the cleaning and refreshing the tool brings it up to date, with nothing else to change.

**Build it in what your team knows.** These are all equally good routes:

- **Power BI or Excel**: import the cleaned CSVs. Every Must story can be built with tables, slicers and a map visual.
- **Python**: a Streamlit app, or an interactive notebook.
- **Code**: the plain web starter, the React starter, or another stack you know, such as C# or Flask.

You're judged on whether it works for the user and whether you can explain your choices, not on the technology.

## What's in this repo

| Folder or file | What it is |
|---|---|
| `data/` | The raw export: `trips.csv` (about 50,000 rows), `stations.csv`, `members.csv`, `bikes.csv`, `weather.csv`, `maintenance.csv`. `data_dictionary.md` says what each column is *meant* to contain. |
| `web/` | **Plain web starter**: one HTML page, one CSS file and one JavaScript file. No install, no build step. |
| `react/` | **React + Node starter**: a small Express API and a React dashboard, for teams who already know them. |
| `notebook/` | **Python notebook starter**: loads and profiles all six files, draws one rough chart, and includes a Tier 3 baseline. |
| `tier3/` | Tier 3 instructions and submission templates. |
| `DATA_CONTRACT.md` | The agreement between your data and software halves. |
| `DATA_QUALITY_LOG.md` | Your record of every data problem found and what you did about it. |
| `docs/` | The event page. |

Nothing has been cleaned. The starters are there so nobody starts from a blank page; you don't have to use any of them. Power BI and Excel don't need a starter: point them at the CSVs in `data/`.

## Getting started

Pick the tools your team will use.

**Power BI or Excel.** Nothing to set up. In Power BI, choose **Get data**, then **Text/CSV**; in Excel, **Data**, then **From Text/CSV**. Pick files from `data/`, or `data/clean/` once your team has cleaned them.

**Plain web starter** (any browser, plus Python or VS Code). Browsers won't load data files into a page you open by double-clicking, so serve the repo folder instead. From the repo folder:

```bash
python -m http.server 8000
```

(`python3` on a Mac.) Then open http://localhost:8000/web/. Or, in VS Code, install the Live Server extension, open the repo folder, right-click `web/index.html` and choose **Open with Live Server**.

**React + Node starter** (Node 20 or newer):

```bash
cd react
npm install
npm run check
npm run install:all
npm run dev
```

Then open http://localhost:5173. The API runs on http://localhost:4000 (for example http://localhost:4000/api/stations).

**Notebook starter** (Python 3.10 or newer):

```bash
pip install -r notebook/requirements.txt
python notebook/check_setup.py
```

Then open `notebook/starter.ipynb` in Jupyter, VS Code or Google Colab.

## Challenge tiers

Every tier has somewhere easy to start and no ceiling. You don't need to finish a tier before a teammate starts the next one.

| Tier | Data side | Build side |
|---|---|---|
| **1. Clean and explain** | **Start:** find and fix three problems in one file. **Core:** cleaning you can re-run from scratch, and a `DATA_QUALITY_LOG.md` entry for every problem (what, evidence, decision, rows affected). **Further:** find the problems a quick look misses; show a chart where cleaning changes the story. | **Start:** get your tool started (Power BI, Excel, Python or a starter) and add one view. **Core:** agree the data contract, and get the tool reading the cleaned files (sample rows until they exist) with the first Must story working. **Further:** show the tool copes with blanks and odd values, or write tests that prove it. |
| **2. Explore and build** | **Start:** one chart that answers part of a client question. **Core:** answer the three questions, with evidence. **Further:** an insight that needs two or more files joined. | **Start:** a second Must story. **Core:** all three Must stories working on cleaned data. **Further:** the Should and Could stories. |
| **3. Predict** (optional) | **Start:** run the notebook's naive baseline. **Core:** a model for one of the tasks in `tier3/README.md`, with predictions submitted. **Further:** beat the baseline, and say honestly how wrong your model is and where. | **Start:** load the predictions file into the tool. **Core:** tomorrow's expected departures in the station view. **Further:** show how sure the prediction is, not just the number. |

### Stretch cards

Got time in hand? Each of these is recognised separately at the showcase.

- **Ship it**: get your tool working somewhere other than your laptop, so the client could use it. The plain web starter works on GitHub Pages: fork this repo, turn on Pages for the `main` branch, and your tool is at `https://<your-username>.github.io/hackathon-october-2026/web/`.
- **Prove it**: automated tests for your cleaning rules or your tool.
- **Watch it**: a data quality check that would flag the next bad file automatically.
- **Open it**: your tool passes a basic accessibility check (contrast, keyboard use, alt text).

## Rules of the day

- **AI assistants are allowed.** If you can't explain it, it doesn't count. Judges may ask any team member about any part of your work.
- **Every decision about the data is a decision.** Dropping rows, filling gaps, merging values: write it in the log with your reason. "We checked and it was fine" is a useful entry too.
- **Keep your cleaning repeatable.** You may need to run it again.
- **Agree the data contract early,** and change it only together.
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

**Best Technical Build** is for the best-made thing, whatever it's made in: a coded tool, a well-built Power BI or Excel tool, or a repeatable, tested cleaning pipeline.

A focused, well-explained Tier 1 and Tier 2 beats a half-finished Tier 3.

