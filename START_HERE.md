# SendIT — Member 4: Testing + CI/CD + Deployment + Documentation

## Branch
`feature/testing-cicd-deployment`

## Your ownership
### Testing
- Expand frontend Jest/React Testing Library coverage.
- Expand backend pytest coverage.
- Cover auth, parcels, pagination, customer restrictions, payment gate, admin authorization, status/location updates, and maps where practical.

### CI/CD
- Verify frontend GitHub Actions.
- Verify backend GitHub Actions.
- Ensure PRs run tests.
- Fix workflow failures.

### Deployment
- Verify Vercel frontend deployment.
- Verify Render Flask deployment.
- Verify environment variables and production CORS.
- Verify production API and database connection.
- Never commit secrets/API keys.

### Documentation
- Keep README setup, testing, API, GitFlow and deployment instructions accurate.

## Main files
- `backend/tests/test_health.py`
- `frontend/src/pages/Dashboard.test.jsx`
- `frontend/src/testSetup.js`
- `.github/workflows/backend.yml`
- `.github/workflows/frontend.yml`
- `backend/requirements.txt`
- `frontend/package.json`
- `README.md`

You may add new test files instead of putting every test into existing files.

## Git workflow
```bash
git clone <TEAM_REPO_URL>
cd sendit-starter
git checkout develop
git pull origin develop
git checkout -b feature/testing-cicd-deployment
```

## Before PR
```bash
cd frontend
npm install
npm test

cd ../backend
source .venv/bin/activate
pip install -r requirements.txt
pytest -v
```

Commit examples:
- `test: expand frontend and backend coverage`
- `ci: improve github actions checks`
- `docs: update deployment instructions`

Push:
```bash
git push -u origin feature/testing-cicd-deployment
```

Open a PR: `feature/testing-cicd-deployment` → `develop`.
Do NOT merge it yourself.
