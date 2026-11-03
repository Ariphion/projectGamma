import sys
import os

def check_site_health():
    print("Running system health check...")
    required_files = ['index.html', 'about.html', 'style.css', 'test_site.js']

    for file in required_files:
        if not os.path.exists(file):
            print(f"HEALTH CHECK FAILED: Critical file missing -> {file}")
            sys.exit(1)

    print("HEALTH CHECK PASSED: All core static files are present and healthy.")
    sys.exit(0)

if __name__ == "__main__":
    check_site_health()