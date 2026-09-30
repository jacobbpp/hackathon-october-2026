"""Setup check for the notebook starter. Run with: python notebook/check_setup.py"""
import importlib
import shutil
import sys
from pathlib import Path

problems = 0


def ok(msg):
    print(f"  OK    {msg}")


def note(msg):
    print(f"  NOTE  {msg}")


def fix(msg):
    global problems
    problems += 1
    print(f"  FIX   {msg}")


print("LoopBike setup check (notebook starter)\n")

v = sys.version_info
if v >= (3, 10):
    ok(f"Python {v.major}.{v.minor}.{v.micro}")
else:
    fix(f"Python {v.major}.{v.minor} is too old. Install Python 3.10 or newer from https://www.python.org")

for pkg, why in [("pandas", "data wrangling"), ("matplotlib", "charts")]:
    try:
        mod = importlib.import_module(pkg)
        ok(f"{pkg} {mod.__version__}")
    except ImportError:
        fix(f"{pkg} missing ({why}): pip install -r notebook/requirements.txt")

if any(importlib.util.find_spec(m) for m in ("jupyterlab", "notebook", "ipykernel")):
    ok("Jupyter available")
else:
    note("Jupyter not found. Fine if you use VS Code or Colab; otherwise pip install -r notebook/requirements.txt")

ok("git found") if shutil.which("git") else fix("git not found. Install it from https://git-scm.com")

root = Path(__file__).resolve().parent.parent
if not (root / "data").exists():
    ok("No data folder yet: that's expected before the day")
elif (root / "data" / "trips.csv").exists():
    ok("data/trips.csv found")
else:
    fix("data/trips.csv missing: did the clone finish?")

print(f"\n{problems} thing(s) to fix before the day." if problems else "\nAll set. See you on the day.")
sys.exit(1 if problems else 0)
