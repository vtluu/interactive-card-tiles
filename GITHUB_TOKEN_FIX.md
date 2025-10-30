# GitHub Actions Deployment - Token Issue Fix

## The Problem
Your Personal Access Token doesn't have the `workflow` scope needed to push GitHub Actions workflows.

## Solution 1: Update Your GitHub Token (Recommended)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Git Operations"
4. Select these scopes:
   - ✅ **repo** (all sub-items)
   - ✅ **workflow**
5. Click "Generate token"
6. Copy the token
7. Update your git credentials:
   ```bash
   # For macOS/Linux
   git config --global credential.helper osxkeychain  # macOS
   # or
   git config --global credential.helper cache  # Linux
   
   # Next time you push, it will ask for credentials - use the new token as password
   ```

## Solution 2: Create Workflow File via GitHub Web Interface

1. Go to your repository: https://github.com/vtluu/interactive-card-tiles
2. Click "Add file" → "Create new file"
3. Name it: `.github/workflows/deploy.yml`
4. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci --include=dev
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. Commit the file
6. Go to Settings → Pages → Source: GitHub Actions

## Solution 3: Deploy Manually with gh-pages

If you prefer to skip GitHub Actions:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Your site will be at: https://vtluu.github.io/interactive-card-tiles/

## The Fixed Files

I've already updated:
- ✅ `.github/workflows/deploy.yml` - Fixed the npm ci command to include dev dependencies
- ✅ `vite.config.js` - Added the correct base path for your repository

Once you can push the workflow file, the deployment will work automatically!
