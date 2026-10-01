import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { api } from "./api.js";

const TOOLTIP_STYLE = { background: "#18181b", border: "1px solid #3f3f46" };

function StatCard({ label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-value">{value.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function App() {
  const [summary, setSummary] = useState(null);
  const [trips, setTrips] = useState({ total: 0, rows: [] });
  const [station, setStation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    api.summary().then(setSummary).catch((e) => setError(e.message));
  }, []);

  // Starter filter: asks the API for trips whose start station contains the text typed.
  // A natural place to add date ranges, rider type, sorting, paging, etc.
  useEffect(() => {
    api.trips({ station }).then(setTrips).catch((e) => setError(e.message));
  }, [station]);

  if (error) {
    return (
      <div className="app">
        <p className="error">Could not load data: {error}. Is the API server running on port 4000?</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>LoopBike Dashboard</h1>
        <p className="subtitle">A fictional city bike-share scheme, built for the Software and Data Hackathon.</p>
      </header>

      {summary && (
        <section className="stats">
          <StatCard label="Trips (rows in trips.csv)" value={summary.totalTrips} />
          <StatCard label="Stations" value={summary.totalStations} />
          <StatCard label="Members (rows in members.csv)" value={summary.totalMembers} />
        </section>
      )}

      <section className="card wide">
        <h2>Trips per day</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={summary?.tripsByDay || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} minTickGap={40} />
            <YAxis stroke="#a1a1aa" fontSize={12} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="trips" stroke="#6366f1" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        {summary && (
          <p className="table-note">
            {summary.unreadableStartTimes.toLocaleString()} start times couldn't be read and are
            left out of the day and hour charts.
          </p>
        )}
      </section>

      <section className="charts">
        <div className="card">
          <h2>Trips by hour of day</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={summary?.tripsByHour || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="hour" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="trips" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Top 10 start stations</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={summary?.topStartStations || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis type="number" stroke="#a1a1aa" fontSize={12} />
              <YAxis type="category" dataKey="station" stroke="#a1a1aa" fontSize={11} width={140} interval={0} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="trips" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card table-card">
        <div className="table-header">
          <h2>Trips (raw)</h2>
          <input
            placeholder="Filter by start station..."
            value={station}
            onChange={(e) => setStation(e.target.value)}
          />
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Bike</th>
                <th>Member</th>
                <th>Rider</th>
                <th>Start station</th>
                <th>Start time</th>
                <th>End station</th>
                <th>End time</th>
                <th>duration_mins</th>
              </tr>
            </thead>
            <tbody>
              {trips.rows.map((t, i) => (
                <tr key={`${t.trip_id}-${i}`}>
                  <td>{t.trip_id}</td>
                  <td>{t.bike_id}</td>
                  <td>{t.member_id || "(blank)"}</td>
                  <td>{t.rider_type}</td>
                  <td>{t.start_station}</td>
                  <td>{t.start_time}</td>
                  <td>{t.end_station || "(blank)"}</td>
                  <td>{t.end_time}</td>
                  <td>{t.duration_mins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Showing the first {trips.rows.length} of {trips.total.toLocaleString()} matching rows,
          straight from the CSV.
        </p>
      </section>
    </div>
  );
}
