# YomaFleet CareShare Playwright Test Suite

Automated end-to-end (E2E) and UI regression tests for the Yoma Fleet CarShare web application using [Playwright](https://playwright.dev/) + TypeScript with integrated Allure reporting.

## Key Features
- Multi-browser execution: Chromium, Firefox, WebKit (configured in `playwright.config.ts`).
- Parallel test execution (`fullyParallel: true`).
- Automatic retries (2) when running in CI (`process.env.CI`).
- Allure reporting (`allure-results` output folder) + Playwright HTML report.
- Screenshots on failure, headless by default.
- Structured page object & utility layers (`pages/`, `elements/`, `utils/`).

## Project Structure (selected)
```
allure-results/       # Raw Allure result JSON & attachments
playwright-report/    # Generated Playwright HTML report (post run)
tests/                # Test specs (Playwright testDir)
pages/                # Page Object Model (POM) classes
elements/             # Shared element locators / component abstractions
utils/                # Helpers (auth, data, fixtures, etc.)
playwright.config.ts  # Central Playwright configuration
eslint.config.mjs     # ESLint setup (TypeScript + Playwright plugin)
tsconfig.json         # TypeScript configuration
```

## Prerequisites
- Node.js 18+ (Playwright recommends an actively supported LTS).
- (Optional) Java for Allure CLI if using standalone binary. If using the NPM package this is not required.

## Installation
```bash
npm install
npx playwright install    # Ensures browser binaries are present
```

## Running Tests
Basic run (all browsers defined as projects):
```bash
npx playwright test
```
Run a single file:
```bash
npx playwright test tests/carFinding/car.finding.spec.ts
```
Filter by title (grep):
```bash
npx playwright test --grep "smokeTest"
```
Headed mode (visual browser):
```bash
npx playwright test --headed
```
Disable parallelism (helpful for debugging):
```bash
npx playwright test --workers=1
```
Run only one browser project:
```bash
npx playwright test --project=chromium
```

## Reports
### Playwright HTML Report
Generate & open after a run:
```bash
npx playwright test --reporter=html
npx playwright show-report
```
(Note: The config already includes the HTML reporter; first command can be omitted if unchanged.)

### Allure Report
This suite uses the `allure-playwright` reporter which populates `allure-results/`.

Install the Allure command-line interface (choose one):
1. NPM package:
   ```bash
   npm install --save-dev allure-commandline
   ```
   (Adds `node_modules/.bin/allure`.)
2. Or download Allure from https://docs.qameta.io/allure/ and add `allure` to PATH.

Generate & open:
```bash
# Generate static report into allure-report (you can choose a different output dir)
allure generate allure-results --clean -o allure-report
# Open in browser
allure open allure-report
```

## Linting & Formatting
Run ESLint:
```bash
npx eslint . --ext .ts
```
Run Prettier (dry run):
```bash
npx prettier . --check
```
Format:
```bash
npx prettier . --write
```

## Page Object Model (POM)
- Keep selectors centralized in `elements/` or inside page classes in `pages/`.
- Each page class should expose high-level user actions (e.g., `login(email, password)`), not raw selectors.

## Scheduled & On-Demand CI Runs
Automated Playwright tests run in GitHub Actions both on a daily schedule (cron) and via manual dispatch. After each run, the generated Allure report (when published) can be viewed directly through the repository's GitHub Pages site: https://tanmle.github.io/ymf_playwright/.

## Troubleshooting
- Stale browser binaries: run `npx playwright install` again.
- Missing Allure CLI: ensure `allure` is on PATH or use the local NPM binary (`npx allure`).
- Tests hanging: retry with `--workers=1 --timeout=60000` or enable trace for diagnosis.
