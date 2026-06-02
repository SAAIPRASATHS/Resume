# 🚀 Portfolio Deployment Guide

This guide explains how to deploy your full-stack portfolio website. The project is split into a **Vite React Frontend** (`./frontend`) and an **Express Node.js Backend** (`./backend`).

---

## 🛠️ Step 1: Deploying the Backend (Express API)

You can deploy the backend to hosting platforms like **Render**, **Railway**, or **Heroku**. Here, we use **Render** (which has a free tier for Web Services).

1. Sign in to [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Name**: `portfolio-backend`
   - **Environment**: `Node`
   - **Region**: Select the one closest to your audience.
   - **Branch**: `main` (or your active branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. In the **Environment** tab, click **Add Environment Variable** and add:
   - `RESEND_API_KEY`: Your Resend API key (e.g. `re_Q5dqevTn_...`)
   - `RECIPIENT_EMAIL`: `saaiprasath.s2024aids@sece.ac.in`
   - `PORT`: `5000` (or leave empty; Render assigns a port automatically)
6. Click **Deploy Web Service**.
7. Note down your deployed service URL (e.g., `https://portfolio-backend.onrender.com`).

---

## 💻 Step 2: Deploying the Frontend (Vite React SPA)

You can deploy the frontend to static hosts like **Vercel**, **Netlify**, or **Render**. Here, we use **Vercel**.

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Set the following configurations:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your deployed backend URL from Step 1 (e.g., `https://portfolio-backend.onrender.com`)
   > ⚠️ **Important**: Do not add a trailing slash to the URL.
6. Click **Deploy**.

---

## 🔒 Security & Local Development

- The root `.gitignore` is configured to prevent your `.env` files (containing API keys) and `node_modules` from being pushed to Git.
- **Local Dev Server**:
  - Run the backend: `cd backend && npm start`
  - Run the frontend: `cd frontend && npm run dev`
  - The frontend automatically defaults to hitting `http://localhost:5000` locally when `VITE_API_BASE_URL` is not set.
