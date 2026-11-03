"""Health check for the deployed Project Gamma site.
Sends HTTP requests to the live URL, verifies the status code and page
content, and appends every result to health_check.log.
Usage:
    python health_check.py [URL]
Exit code 0 = healthy, 1 = unhealthy (used by CI to trigger rollback).
"""

import sys
import time
import urllib.request
from datetime import datetime, timezone

DEFAULT_URL = "https://projectgamma-gamma.vercel.app"
PAGES = ["/", "/about.html", "/pricing.html", "/contact.html", "/style.css"]
EXPECTED_TEXT = "GammaTech"
LOG_FILE = "health_check.log"
RETRIES = 3
TIMEOUT = 10


def log(message):
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{stamp}] {message}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def check(url):
    """Return (ok, detail) for a single URL, retrying on failure."""
    last_error = ""
    for attempt in range(1, RETRIES + 1):
        try:
            start = time.monotonic()
            with urllib.request.urlopen(url, timeout=TIMEOUT) as resp:
                body = resp.read().decode("utf-8", errors="ignore")
                ms = int((time.monotonic() - start) * 1000)
                
                if resp.status != 200:
                    last_error = f"HTTP {resp.status}"
                elif url.endswith(".html") or url.endswith("/"):
                    if EXPECTED_TEXT not in body:
                        last_error = f"HTTP 200 but '{EXPECTED_TEXT}' not found"
                    else:
                        return True, f"HTTP 200 in {ms}ms"
                else:
                    return True, f"HTTP 200 in {ms}ms"
        except Exception as exc:
            last_error = str(exc)
        
        if attempt < RETRIES:
            time.sleep(2)
            
    return False, last_error


def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL).rstrip("/")
    log(f"Health check started for {base}")
    
    healthy = True
    for page in PAGES:
        ok, detail = check(base + page)
        status_label = "UP" if ok else "DOWN"
        log(f"  {status_label} {page} ({detail})")
        healthy = healthy and ok

    final_status = "STATUS: HEALTHY" if healthy else "STATUS: UNHEALTHY"
    log(final_status)
    sys.exit(0 if healthy else 1)


if __name__ == "__main__":
    main()