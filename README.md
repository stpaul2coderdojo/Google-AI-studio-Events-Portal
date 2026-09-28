# 🌲 Wilderness Dojo CRM & Ecological Operations Platform

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-emerald.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED.svg)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/deploy-Render-46E3B7.svg)](https://render.com/)

A unified full-stack expedition management system, public enrollment portal, ecological research grant CRM, and autonomous Agentic AI operations hub for **Wilderness Dojo**.

---

## 🧭 System Capabilities & Modules

1. **Public Expedition Enrollment & Medical Triage Portal**
   - Participant registration with comprehensive Wilderness First Responder (WFR) medical intake.
   - High-altitude contraindication scanning, allergen triage, and evacuation insurance verification (Global Rescue / Ripcord / InReach).
   - Real-time cohort capacity tracking and waiting list management.

2. **Sponsor & Ecological Grant CRM**
   - Grant pipeline tracking for biodiversity conservation funds and benefactors (e.g., XPRIZE Rainforest, National Geographic, IUCN).
   - Funding stages, committed grants, deliverable milestones, and field telemetry reporting.

3. **Interactive Bioacoustic Spectrogram & Audio Synthesizer**
   - Live browser-based HTML5 Canvas FFT spectrogram with harmonic frequency visualization.
   - Synthetic acoustic generator modeling endangered indicator taxa:
     - *Chambal River Gharial* (14.2 kHz ultrasonic territorial resonance)
     - *Olive Ridley Sea Turtle* (sub-audible benthic navigational pulses)
     - *King Cobra* (acoustic hiss & resonant broadband telemetry)
     - *Great Malabar Pied Hornbill* (canopy wing-beat acoustic signature)

4. **Seeed Studio Open Hardware Sensor Blueprints**
   - Field-tested environmental edge nodes using Seeed Studio XIAO ESP32-S3, Grove ultrasonic sensors, and solar power harvesting.
   - Mesh telemetry blueprints over LoRaWAN and Meshtastic for off-grid backcountry deployment.

5. **Antigravity Agentic AI Autonomous Engine**
   - Integrated with Google's `@google/genai` Antigravity Agent sandbox (`antigravity-preview-05-2026`).
   - Autonomous execution of topography gradients, LiDAR DEM parsing, USFS permit compliance matrices, and research grant reporting.
   - Built-in zero-latency simulation engine fallback for offline or keyless operation.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/wilderness-dojo.git
cd wilderness-dojo

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY (optional for mock/simulation mode)

# 4. Start local development server (Express + Vite on http://localhost:3000)
npm run dev
```

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Express server with Vite middleware on port 3000 |
| `npm run build` | Compiles Vite production bundle + bundles Node server via esbuild into `dist/` |
| `npm run start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run lint` | Runs TypeScript compiler checks without emitting code |
| `npm run clean` | Cleans `dist` and build artifacts |

---

## 🐳 Docker Deployment

The application includes a multi-stage `Dockerfile` and `docker-compose.yml` optimized for low memory overhead and rapid container spin-up.

### Running with Docker Compose (Recommended)

```bash
# Build and launch the container
docker compose up --build -d

# Check health and logs
docker compose logs -f wilderness-dojo

# Stop container
docker compose down
```

The app will be accessible at `http://localhost:3000`.

### Building and Running Docker Image Directly

```bash
# Build production image
docker build -t wilderness-dojo:latest .

# Run container (pass optional GEMINI_API_KEY)
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e GEMINI_API_KEY="your_api_key_here" \
  --name wilderness-dojo-app \
  wilderness-dojo:latest
```

---

## ☁️ Deploying to Render

This repository includes a pre-configured `render.yaml` Blueprint specification.

### Method 1: Render Blueprint (1-Click Setup)

1. Push your repository to GitHub or GitLab.
2. Log into [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Blueprint**.
4. Connect your repository. Render will automatically detect `render.yaml`.
5. When prompted, fill in the environment variable:
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key.
6. Click **Apply**. Render will automatically provision the Node web service, install dependencies, compile the application, and assign a free HTTPS URL (e.g. `https://wilderness-dojo.onrender.com`).

### Method 2: Manual Web Service Setup on Render

If you prefer configuring the Web Service manually:
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `GEMINI_API_KEY`: `your_gemini_api_key`

---

## 🌐 Embedding into `wildernessdojo.home.blog` (WordPress)

If you encountered a **"Refused to connect"** error when embedding into WordPress.com (`*.home.blog`), this happens because WordPress.com free/personal tiers block raw iframe embeds or enforce strict content security policies.

### Recommended Solutions:

#### 1. Standalone Direct Link / CTA Button (Most Reliable)
Add a styled Call-To-Action button in your WordPress post or sidebar pointing directly to your deployed Render or Cloud Run instance:

```html
<div style="text-align: center; margin: 30px 0;">
  <a href="https://your-app-name.onrender.com" 
     target="_blank" 
     rel="noopener noreferrer"
     style="background-color: #10b981; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; font-family: sans-serif; display: inline-block;">
    🌲 Launch Wilderness Dojo Expedition & Medical Portal
  </a>
</div>
```

#### 2. Responsive iFrame Embed (For WordPress Custom HTML block or Business/Plugin tier)
If your WordPress plan allows iframes:

```html
<div style="position: relative; width: 100%; padding-bottom: 75%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
  <iframe 
    src="https://your-app-name.onrender.com" 
    style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;"
    allow="camera; microphone; geolocation"
    loading="lazy"
    title="Wilderness Dojo Portal">
  </iframe>
</div>
```

#### 3. Custom Domain (e.g. `portal.wildernessdojo.com`)
In Render or Cloud Run, navigate to **Custom Domains** and add a CNAME record from your DNS registrar pointing to your deployment.

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check returning status, agent version, and API key presence |
| `/api/antigravity/run` | `POST` | Dispatches task to Google Antigravity Agent sandbox or simulation engine |

---

## 📄 License

MIT License. Designed and engineered for Wilderness Dojo conservation initiatives.
