# AWS App Runner Deployment Guide

Your React app is configured for AWS App Runner. Follow these steps to deploy.

## What's Already Done ✓

- **Production start script**: `npm run start:prod` serves the built app on port 8080
- **apprunner.yaml**: Build and run configuration for App Runner
- **serve package**: Installed to serve static files in production

---

## Prerequisites

1. **Git** – [Download](https://git-scm.com/download/win)
2. **GitHub account** – [github.com](https://github.com)
3. **AWS account** – [aws.amazon.com](https://aws.amazon.com) (Free tier eligible)

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub website

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `academic-task-manager`
3. Set to **Public**
4. **Do not** initialize with README (your project already has one)
5. Click **Create repository**

### Option B: Using GitHub CLI (if installed)

```powershell
gh repo create academic-task-manager --public --source=. --push
```

---

## Step 2: Initialize Git and Push Code

Open a terminal in your project folder and run:

```powershell
cd c:\Users\ibrah\academic-task-manager

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Academic Task Manager"

# Add your GitHub repo as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/academic-task-manager.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 3: Set Up AWS App Runner

1. Go to **AWS Console** → [App Runner](https://console.aws.amazon.com/apprunner)
2. Click **Create service**

### Configure source

- **Repository type**: Source code repository
- **Connect to GitHub**: 
  - Click **Add new** next to GitHub connection
  - Authorize AWS Connector for GitHub (OAuth)
  - Select your GitHub account
- **Repository**: `YOUR_USERNAME/academic-task-manager`
- **Branch**: `main`
- **Deployment trigger**: **Automatic** (deploys on every push)
- **Source directory**: Leave empty (root)

### Configure build

- **Runtime**: Node.js 22 (or use configuration file – App Runner will detect `apprunner.yaml`)
- **Build command**: `npm run build` (from apprunner.yaml)
- **Start command**: `npm run start:prod` (from apprunner.yaml)
- **Port**: 8080

*If you use the configuration file, App Runner reads these from `apprunner.yaml` automatically.*

### Configure service

- **Service name**: `academic-task-manager`
- **CPU**: 0.25 vCPU (free tier)
- **Memory**: 0.5 GB (free tier)
- **Environment variables**: None required (add if needed)

### Review and create

- Review settings and click **Create & deploy**

---

## Step 4: Get Your Live URL

1. After creation, wait 5–10 minutes for the first deployment
2. In App Runner, open your service
3. Copy the **Default domain** URL, e.g. `https://xxxxx.us-east-1.awsapprunner.com`
4. That is your live public URL

---

## Free Tier (AWS App Runner)

- **Build**: 2,000 build minutes/month
- **Compute**: 25 vCPU-hours and 50 GB-hours memory/month
- Valid for 12 months for new AWS accounts

---

## Automatic Deployments

With **Automatic** deployment trigger, every push to `main` triggers a new build and deploy. No manual steps needed.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs in App Runner. Ensure `npm run build` works locally. |
| 502/503 errors | Verify `start:prod` serves on port 8080. Run `npm run build && npm run start:prod` locally. |
| GitHub connection | Re-authorize in App Runner → Connections |
| Port mismatch | Ensure `apprunner.yaml` has `port: 8080` |
