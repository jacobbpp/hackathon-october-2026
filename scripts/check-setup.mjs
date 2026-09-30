// Setup check for the web starter. Run with: npm run check
// Needs nothing installed beyond Node itself.
import { execSync } from "node:child_process";
import fs from "node:fs";

let problems = 0;

function ok(msg) {
  console.log(`  OK    ${msg}`);
}
function warn(msg) {
  console.log(`  NOTE  ${msg}`);
}
function fail(msg) {
  problems += 1;
  console.log(`  FIX   ${msg}`);
}
function version(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return null;
  }
}

console.log("LoopBike setup check (web starter)\n");

const major = Number(process.versions.node.split(".")[0]);
if (major >= 18) ok(`Node ${process.versions.node}`);
else fail(`Node ${process.versions.node} is too old. Install Node 20 or newer from https://nodejs.org`);

const npm = version("npm --version");
npm ? ok(`npm ${npm}`) : fail("npm not found. It comes with Node: reinstall Node from https://nodejs.org");

const git = version("git --version");
git ? ok(git) : fail("git not found. Install it from https://git-scm.com");

const python = version("python3 --version") || version("python --version");
python
  ? ok(`${python} (for the notebook starter: run notebook/check_setup.py too)`)
  : warn("Python not found. Fine if you are only using the web starter.");

if (!fs.existsSync(new URL("../data", import.meta.url))) {
  ok("No data folder yet: that's expected before the day");
} else if (fs.existsSync(new URL("../data/trips.csv", import.meta.url))) {
  ok("data/trips.csv found");
} else {
  fail("data/trips.csv missing: did the clone finish?");
}

for (const dir of ["server", "client"]) {
  const installed = fs.existsSync(new URL(`../${dir}/node_modules`, import.meta.url));
  installed ? ok(`${dir} dependencies installed`) : warn(`${dir} dependencies not installed yet: run npm run install:all`);
}

console.log(problems ? `\n${problems} thing(s) to fix before the day.` : "\nAll set. See you on the day.");
process.exit(problems ? 1 : 0);
