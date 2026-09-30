import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Once your team has cleaned files in data/clean/, point this at that folder instead.
const DATA_DIR = path.join(__dirname, "..", "data");

function loadCsv(filename) {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
  return parse(raw, { columns: true, skip_empty_lines: true });
}

// Loaded once at startup. trips.csv is ~50,000 rows, so don't re-read it per request.
const data = {
  stations: loadCsv("stations.csv"),
  trips: loadCsv("trips.csv"),
  members: loadCsv("members.csv"),
  bikes: loadCsv("bikes.csv"),
  weather: loadCsv("weather.csv"),
  maintenance: loadCsv("maintenance.csv"),
};

const app = express();
app.use(cors());

// Page through a big table: ?limit=50&offset=0
function page(rows, req) {
  const limit = Math.min(Number(req.query.limit) || 50, 1000);
  const offset = Number(req.query.offset) || 0;
  return { total: rows.length, rows: rows.slice(offset, offset + limit) };
}

// Raw data, exactly as it sits in the CSVs. None of it has been cleaned.
app.get("/api/stations", (req, res) => res.json(data.stations));
app.get("/api/bikes", (req, res) => res.json(data.bikes));
app.get("/api/weather", (req, res) => res.json(data.weather));
app.get("/api/maintenance", (req, res) => res.json(data.maintenance));
app.get("/api/members", (req, res) => res.json(page(data.members, req)));
app.get("/api/trips", (req, res) => {
  const q = (req.query.station || "").trim().toLowerCase();
  const rows = q
    ? data.trips.filter((t) => t.start_station.toLowerCase().includes(q))
    : data.trips;
  res.json(page(rows, req));
});

// A quick-and-dirty summary so the starter dashboard has something to chart.
// It is not a cleaning pipeline: replacing it with a proper one is part of the challenge.
app.get("/api/summary", (req, res) => {
  const byDay = {};
  const byHour = Array.from({ length: 24 }, (_, hour) => ({ hour, trips: 0 }));
  const byStation = {};
  let unreadableStartTimes = 0;

  for (const t of data.trips) {
    const start = new Date(t.start_time);
    if (Number.isNaN(start.getTime())) {
      unreadableStartTimes += 1;
    } else {
      const day = [
        start.getFullYear(),
        String(start.getMonth() + 1).padStart(2, "0"),
        String(start.getDate()).padStart(2, "0"),
      ].join("-");
      byDay[day] = (byDay[day] || 0) + 1;
      byHour[start.getHours()].trips += 1;
    }
    byStation[t.start_station] = (byStation[t.start_station] || 0) + 1;
  }

  res.json({
    totalTrips: data.trips.length,
    totalStations: data.stations.length,
    totalMembers: data.members.length,
    unreadableStartTimes,
    tripsByDay: Object.entries(byDay)
      .map(([day, trips]) => ({ day, trips }))
      .sort((a, b) => a.day.localeCompare(b.day)),
    tripsByHour: byHour,
    topStartStations: Object.entries(byStation)
      .map(([station, trips]) => ({ station, trips }))
      .sort((a, b) => b.trips - a.trips)
      .slice(0, 10),
  });
});

// API_PORT rather than PORT: some machines and tools set PORT globally, which would
// clash with the dashboard. If you change it, change the proxy in client/vite.config.js too.
const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => console.log(`LoopBike API listening on http://localhost:${PORT}`));
