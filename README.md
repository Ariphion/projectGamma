# Project Gamma - DevOps Academic Project

A responsive static website deployed via an automated CI/CD pipeline with continuous integration testing, health monitoring, and cloud hosting.

## 🚀 Project Overview
* **Version Control**: GitHub (`main` & `dev` branching strategy)[cite: 2]
* **CI/CD Automation**: GitHub Actions (3-stage pipeline: Build, Test, Deploy)[cite: 2]
* **Hosting Platform**: Vercel (Path B)[cite: 2]
* **Monitoring**: Python health-check script (`health_check.py`)

---

## 🛠️ Pipeline & Architecture
Our automated workflow triggers on every push to the `main` and `dev` branches, executing three core stages:
1. **Build**: Verifies repository structure and static asset placement.
2. **Test**: Executes automated unit tests (`test_site.js`) to validate required files.
3. **Deploy**: Completes pipeline verification and syncs with hosting.

### Pipeline Status (GitHub Actions)
![GitHub Actions CI/CD Pipeline](project_screenshots/githubActions.png)
![Detailed CI/CD Pipeline](project_screenshots/runningResultCICD.png)

---

## 🧪 Testing & Health Checks
* **Unit Tests (`test_site.js`)**: Validates that all critical HTML, CSS, and script assets exist prior to deployment.
  * ![Test Execution Logs:](project_screenshots/passingTheTest.png)

* **Health Monitoring (`health_check.py`)**: A backend script designed to check system file integrity and runtime readiness.
         
---

## 🌐 Live Deployment
The application is successfully hosted and live on Vercel.

* **Live App Preview**:
  ![Live Application on Vercel](project_screenshots/runningvercel.png)

---