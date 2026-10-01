# Data contract

The agreement between the people cleaning the data and the people building the tool. **Agree it by the first checkpoint.**

- The data people promise to produce these files, in exactly this shape.
- The software people build against them. Until the real files exist, write a few sample rows by hand (see the bottom of this page) and build against those.
- Change the contract only by agreeing the change together, and note it in the change log.

This is a starting point. Rename, add or remove columns to suit what your team is building.

## Where the files go

`data/clean/`, one CSV file per table, with a header row.

## `data/clean/trips.csv`

| Column | Type | Format or allowed values | Can be blank? | Notes |
|---|---|---|---|---|
| `trip_id` | text | | No | Unique |
| `bike_id` | text | | No | |
| `member_id` | text | | Yes | Blank for casual riders |
| `rider_type` | text | `member` or `casual` | No | |
| `start_station_id` | text | A `station_id` from `stations.csv` | No | |
| `start_time` | date and time | `YYYY-MM-DD HH:MM:SS`, UK local time | No | |
| `end_station_id` | text | A `station_id` from `stations.csv` | Yes | |
| `end_time` | date and time | `YYYY-MM-DD HH:MM:SS`, UK local time | No | |
| `duration_minutes` | number | | No | |

## `data/clean/stations.csv`

| Column | Type | Format or allowed values | Can be blank? | Notes |
|---|---|---|---|---|
| `station_id` | text | | No | Unique |
| `station_name` | text | | No | |
| `area` | text | | No | |
| `latitude` | number | Decimal degrees | No | |
| `longitude` | number | Decimal degrees | No | |
| `docks` | whole number | | Yes | |

## Other tables

Add the members, bikes, weather or maintenance tables here if your tool needs them.

## Sample rows

The software people can start straight away with a hand-written file like this, saved as `data/clean/trips.csv`. Swap it for the real file when it's ready; if the tool needs changing at that point, the contract wasn't clear enough.

```csv
trip_id,bike_id,member_id,rider_type,start_station_id,start_time,end_station_id,end_time,duration_minutes
T1,B0001,M00001,member,LB013,2026-03-02 08:01:00,LB007,2026-03-02 08:19:00,18
T2,B0002,,casual,LB031,2026-03-07 14:10:00,LB034,2026-03-07 14:42:00,32
T3,B0003,M00002,member,LB007,2026-03-02 17:35:00,LB013,2026-03-02 17:52:00,17
```

## Change log

| Time | What changed | Agreed by |
|---|---|---|
| | | |
