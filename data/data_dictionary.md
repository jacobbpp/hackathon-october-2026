# Data dictionary: LoopBike

What each column is **meant** to contain, according to LoopBike's operations team. Whether the data actually matches is for you to find out.

Trips and members were exported on 31 August 2026. Times are UK local time. Station coordinates are borrowed from a real UK city centre so they plot sensibly on a map; the station names are made up.

## `stations.csv`

One row per docking station.

| Column | Meaning |
|---|---|
| `station_id` | Unique ID, e.g. `LB007` |
| `station_name` | Station name |
| `area` | Part of the city |
| `latitude`, `longitude` | Location (decimal degrees) |
| `docks` | Number of docking points |
| `dock_model` | Docking hardware installed at the station |
| `opened_date` | When the station opened |

## `trips.csv`

One row per trip, exported from the dock system, 1 March to 31 August 2026.

| Column | Meaning |
|---|---|
| `trip_id` | Unique trip ID |
| `bike_id` | Bike used; matches `bikes.csv` |
| `member_id` | Rider's member ID; matches `members.csv`. Blank for casual riders |
| `rider_type` | `member` or `casual` (pay as you go) |
| `start_station` | Station where the bike was taken out |
| `start_time` | When the bike was taken out |
| `end_station` | Station where the bike was returned |
| `end_time` | When the bike was returned |
| `duration_mins` | Trip length in minutes |

## `members.csv`

One row per member, as at 31 August 2026.

| Column | Meaning |
|---|---|
| `member_id` | Unique member ID |
| `join_date` | When they joined |
| `plan` | `Annual` or `Monthly` |
| `age_band` | Age group, e.g. `25-34` |
| `home_area` | Area of the city they live in |
| `status` | `active` or `cancelled` |
| `cancelled_date` | When they cancelled (blank if active) |
| `last_updated` | When this record last changed |

## `bikes.csv`

One row per bike in the fleet.

| Column | Meaning |
|---|---|
| `bike_id` | Unique bike ID |
| `model` | `Standard` or `E-bike` |
| `in_service_date` | When the bike entered service |

## `maintenance.csv`

One row per repair, reported 1 March to 31 August 2026.

| Column | Meaning |
|---|---|
| `repair_id` | Unique repair ID |
| `bike_id` | Bike repaired |
| `reported_date` | When the fault was reported |
| `fault_type` | What was wrong |
| `resolved_date` | When the bike went back into service (blank if still being repaired) |
| `cost_gbp` | Cost of the repair in pounds |

## `weather.csv`

Daily weather for Brackford from a weather service, 1 March to 27 September 2026.

| Column | Meaning |
|---|---|
| `date` | Date |
| `rain_mm` | Total rainfall (mm) |
| `temp_max_c` | Maximum temperature (°C) |
| `wind_mph` | Average wind speed (mph) |
| `type` | `observed`, or `forecast` for 21 to 27 September |
