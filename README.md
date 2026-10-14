# VoltFlow — EV Charging Management System

A portfolio-ready EV charging operations dashboard built with React, TypeScript, Vite, Recharts, and Vitest. This starter is intentionally frontend-only and uses realistic demo data stored in the browser session; it does not make real payments or control physical chargers.

## Features
- Operations overview with KPI cards and energy chart
- Searchable station inventory with status filters
- Live-session table with simulated start/stop controls
- Reservation list with status changes
- Analytics view with energy, utilization, and revenue charts
- Notifications panel and light/dark theme toggle
- Responsive sidebar/navigation for desktop and mobile
- Unit tests and coverage configuration
- GitHub Actions workflow for tests, coverage, and production build
- SonarQube Cloud properties file ready for your new project key

## Requirements
- Node.js 20 or newer
- npm
- VS Code

## Run locally
```powershell
npm install
npm run dev
```
Open the URL printed in the terminal (usually `http://localhost:5173`).

## Validate before pushing
```powershell
npm test
npm run coverage
npm run build
```
The LCOV report is generated at `coverage/lcov.info`.

## Important notes
- This demo does not include a production backend, account system, live charger telemetry, or real payment processing.
- All station/session/reservation records are demonstration data. Controls update local UI state only.
- Do not commit `.env` files or credentials.
- Replace the placeholder `sonar.projectKey` in `sonar-project.properties` after creating the project in SonarQube Cloud.
- The GitHub Actions workflow validates the project; it does not run a SonarQube scan until you configure the official SonarQube Cloud action and secret.

## Suggested presentation flow
1. Explain the problem: drivers and operators need one place to track charging infrastructure.
2. Show the operations overview and KPI cards.
3. Search/filter stations and explain station states.
4. Demonstrate session controls and reservation updates.
5. Show analytics and test/coverage workflow.
6. Explain how GitHub Actions and SonarQube Cloud support code quality.
