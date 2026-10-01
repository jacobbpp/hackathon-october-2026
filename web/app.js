// LoopBike plain web starter: HTML, CSS and JavaScript only. No install, no build step.
//
// It reads the CSV files straight from the data folder and draws a few rough charts.
// Like the other starters, it does no cleaning: that's your job.

// Where the CSV files live, relative to this page.
// Once your team has cleaned files in data/clean/, change this to "../data/clean/".
// The cleaned columns follow your DATA_CONTRACT.md, so expect to update the code below to match.
const DATA_DIR = "../data/";

// ------------------------------------------------------------------ loading data

async function loadCsv(name) {
  const response = await fetch(DATA_DIR + name);
  if (!response.ok) throw new Error(`Couldn't load ${name} (${response.status})`);
  return parseCsv(await response.text());
}

// Turns CSV text into a list of objects, one per row, keyed by the header row.
// Handles quoted fields, so commas and quotes inside a value don't break it.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows.filter((r) => r.length > 1 || r[0] !== "");
  return body.map((r) => Object.fromEntries(header.map((name, j) => [name, r[j] ?? ""])));
}

// ------------------------------------------------------------------ a rough summary

// Quick and dirty: only understands start times like "2026-03-14 08:12:33".
// Anything else is skipped and counted, not fixed.
function readStart(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):/.exec(text);
  return m ? { day: `${m[1]}-${m[2]}-${m[3]}`, hour: Number(m[4]) } : null;
}

function summarise(trips) {
  const byDay = {};
  const byHour = Array(24).fill(0);
  const byStation = {};
  let unreadable = 0;

  for (const trip of trips) {
    const start = readStart(trip.start_time);
    if (start) {
      byDay[start.day] = (byDay[start.day] || 0) + 1;
      byHour[start.hour] += 1;
    } else {
      unreadable += 1;
    }
    byStation[trip.start_station] = (byStation[trip.start_station] || 0) + 1;
  }

  return {
    days: Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b)),
    hours: byHour.map((count, hour) => [String(hour), count]),
    topStations: Object.entries(byStation).sort((a, b) => b[1] - a[1]).slice(0, 10),
    unreadable,
  };
}

// ------------------------------------------------------------------ simple charts
// Plain HTML and SVG. Want fancier charts? Chart.js or D3 can be added with one <script> tag.

function lineChart(el, points) {
  const max = Math.max(...points.map(([, v]) => v), 1);
  const coords = points
    .map(([, v], i) => `${(i / Math.max(points.length - 1, 1)) * 1000},${240 - (v / max) * 230}`)
    .join(" ");
  el.innerHTML = `
    <div class="axis-max">${max}</div>
    <svg viewBox="0 0 1000 240" preserveAspectRatio="none" role="img" aria-label="Trips per day">
      <polyline points="${coords}" fill="none" stroke="#6366f1" stroke-width="2" vector-effect="non-scaling-stroke" />
    </svg>
    <div class="axis-x"><span>${points[0]?.[0] ?? ""}</span><span>${points[points.length - 1]?.[0] ?? ""}</span></div>`;
}

function columnChart(el, items) {
  const max = Math.max(...items.map(([, v]) => v), 1);
  el.replaceChildren(
    ...items.map(([label, value]) => {
      const col = document.createElement("div");
      col.className = "column";
      col.title = `${label}:00  ${value.toLocaleString()} trips`;
      col.innerHTML = `<div class="column-bar" style="height:${(value / max) * 100}%"></div><span>${label}</span>`;
      return col;
    })
  );
}

function barChart(el, items) {
  const max = Math.max(...items.map(([, v]) => v), 1);
  el.replaceChildren(
    ...items.map(([label, value]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      const name = document.createElement("span");
      name.className = "bar-label";
      name.textContent = label;
      row.append(name);
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="bar-track"><div class="bar" style="width:${(value / max) * 100}%"></div></div><span class="bar-value">${value.toLocaleString()}</span>`
      );
      return row;
    })
  );
}

// ------------------------------------------------------------------ the raw trips table

const COLUMNS = ["trip_id", "bike_id", "member_id", "rider_type", "start_station", "start_time",
                 "end_station", "end_time", "duration_mins"];

// Starter filter: matches start stations containing the text typed.
// A natural place to add date ranges, rider type, sorting, paging, etc.
function renderTable(trips, filterText) {
  const q = filterText.trim().toLowerCase();
  const matches = q ? trips.filter((t) => t.start_station.toLowerCase().includes(q)) : trips;
  const tbody = document.getElementById("trip-rows");
  tbody.replaceChildren(
    ...matches.slice(0, 50).map((trip) => {
      const tr = document.createElement("tr");
      for (const col of COLUMNS) {
        const td = document.createElement("td");
        td.textContent = trip[col] || "(blank)";
        tr.append(td);
      }
      return tr;
    })
  );
  document.getElementById("table-note").textContent =
    `Showing the first ${Math.min(50, matches.length)} of ${matches.length.toLocaleString()} matching rows, straight from the CSV.`;
}

// ------------------------------------------------------------------ start up

async function main() {
  const status = document.getElementById("status");
  try {
    const [trips, stations, members] = await Promise.all([
      loadCsv("trips.csv"),
      loadCsv("stations.csv"),
      loadCsv("members.csv"),
    ]);

    document.getElementById("stat-trips").textContent = trips.length.toLocaleString();
    document.getElementById("stat-stations").textContent = stations.length.toLocaleString();
    document.getElementById("stat-members").textContent = members.length.toLocaleString();

    const summary = summarise(trips);
    lineChart(document.getElementById("chart-days"), summary.days);
    columnChart(document.getElementById("chart-hours"), summary.hours);
    barChart(document.getElementById("chart-stations"), summary.topStations);
    document.getElementById("unreadable").textContent =
      `${summary.unreadable.toLocaleString()} start times couldn't be read and are left out of the day and hour charts.`;

    const filter = document.getElementById("station-filter");
    filter.addEventListener("input", () => renderTable(trips, filter.value));
    renderTable(trips, "");
    status.hidden = true;
  } catch (error) {
    status.classList.add("error");
    status.textContent =
      location.protocol === "file:"
        ? "Browsers won't load data files from a page opened by double-clicking. Open it through a local web server instead: see the README."
        : `Could not load data: ${error.message}`;
  }
}

main();
