const BASE = "/api";

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json();
}

export const api = {
  summary: () => getJson("/summary"),
  stations: () => getJson("/stations"),
  bikes: () => getJson("/bikes"),
  weather: () => getJson("/weather"),
  maintenance: () => getJson("/maintenance"),
  members: (limit = 50, offset = 0) => getJson(`/members?limit=${limit}&offset=${offset}`),
  trips: ({ station = "", limit = 50, offset = 0 } = {}) =>
    getJson(`/trips?station=${encodeURIComponent(station)}&limit=${limit}&offset=${offset}`),
};
