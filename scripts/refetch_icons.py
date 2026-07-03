import json
import os
import re
import requests
from urllib.parse import urlparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "public" / "assets" / "imgs"
JSON_DIR = ROOT / "public" / "json"

# Simple Icons slug mapping for small/low-quality app icons
APP_SIMPLE_ICONS = {
    "Slack.png": "slack",
    "Target.png": "target",
    "Twitter_X.webp": "x",
    "Replit.png": "replit",
    "Bing.png": "bing",
    "eBay.png": "ebay",
    "Hulu.png": "hulu",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def get_domain(url):
    try:
        return urlparse(url).netloc
    except Exception:
        return None

def download(url, path):
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        r.raise_for_status()
        path.write_bytes(r.content)
        return len(r.content)
    except Exception as e:
        print(f"  failed {url}: {e}")
        return 0

def fix_apps(data):
    for item in data:
        img = item.get("img", "")
        fname = os.path.basename(img)
        if fname not in APP_SIMPLE_ICONS:
            continue
        slug = APP_SIMPLE_ICONS[fname]
        url = f"https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/{slug}.svg"
        new_fname = Path(fname).stem + ".svg"
        out = IMG_DIR / "a" / new_fname
        size = download(url, out)
        if size > 0:
            item["img"] = f"/assets/imgs/a/{new_fname}"
            print(f"app {fname} -> {new_fname} ({size} bytes)")
        else:
            print(f"app {fname} failed simple-icons")
    return data

# Manual overrides: map existing filename -> better domain to fetch favicon from
GAME_ICON_DOMAINS = {
    "Tunnel_Rush.png": "tunnelrush.app",
    "Agar_io.png": "agar.io",
    "Zombs_io.png": "zombs.io",
    "Moomoo_io.png": "moomoo.io",
    "Pac_Man.png": "pacman.com",
    "Snake.png": "googlesnakemods.com",
    "Wordle.png": "nytimes.com",
    "Getting_Over_It.png": "bennettfoley.com",
    "Missile_Command.png": "missilecommand.io",
    "The_I_of_It.webp": "crazygames.com",
    "Zombie_Shooter_Part_2.png": "silvergames.com",
    "Madness_Haphazard.png": "silvergames.com",
    "Subject_26.webp": "itch.io",
}

def fetch_favicon(domain, out_path):
    """Try multiple favicon sources, return best size."""
    sources = [
        f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
        f"https://icons.duckduckgo.com/ip3/{domain}.ico",
    ]
    best_size = 0
    best_data = None
    for url in sources:
        try:
            r = requests.get(url, headers=HEADERS, timeout=20)
            r.raise_for_status()
            if len(r.content) > best_size:
                best_size = len(r.content)
                best_data = r.content
        except Exception:
            continue
    if best_data:
        out_path.write_bytes(best_data)
    return best_size

def fix_games(data):
    small = []
    for item in data:
        img = item.get("img", "")
        fname = os.path.basename(img)
        path = IMG_DIR / "g" / fname
        if path.exists() and path.stat().st_size < 2048:
            small.append(item)
    for item in small:
        img = item.get("img", "")
        fname = os.path.basename(img)
        out = IMG_DIR / "g" / fname
        old_size = out.stat().st_size

        # Use manual override if available, else derive from URL
        domain = GAME_ICON_DOMAINS.get(fname) or get_domain(item.get("url", ""))
        if not domain:
            print(f"game {fname}: no domain")
            continue

        size = fetch_favicon(domain, out)
        if size > old_size:
            print(f"game {fname}: {old_size} -> {size} bytes ({domain})")
        else:
            print(f"game {fname}: no improvement ({size} bytes, {domain})")
    return data

def main():
    a_path = JSON_DIR / "a.json"
    g_path = JSON_DIR / "g.json"

    a_data = json.loads(a_path.read_text(encoding="utf-8"))
    g_data = json.loads(g_path.read_text(encoding="utf-8"))

    print("Fetching app icons from simple-icons...")
    a_data = fix_apps(a_data)

    print("\nFetching game icons from Google favicon...")
    g_data = fix_games(g_data)

    a_path.write_text(json.dumps(a_data, indent="\t"), encoding="utf-8")
    g_path.write_text(json.dumps(g_data, indent="\t"), encoding="utf-8")
    print("\nDone.")

if __name__ == "__main__":
    main()
