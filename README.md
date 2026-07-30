# 📌 CareerConnect Client — Campus Job & Internship Board

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Pro-8E75B2?style=for-the-badge&logo=google" alt="Google Gemini" />
</p>

> **"Your bridge from campus to career."**  
> CareerConnect is a full-stack, AI-powered campus job & internship board connecting university students across Bangladesh with top local tech companies. Built with Next.js 14 App Router, TypeScript, Framer Motion, and Google Gemini API.

---

## 🎨 Pinboard Design System & 5 Dynamic Theme Modes

CareerConnect features a custom **Pinboard Aesthetics System** with floating dock navigation, pushpin note cards, and 5 instant theme modes:

1. 📄 **Paper Corkboard (Default)**: Warm corkboard paper background (`#FDFBF7`) with deep forest pine text & sunlit marigold gold.
2. 🌲 **Midnight Forest**: Sleek high-contrast dark green & charcoal palette (`#091A14`).
3. ☀️ **Sunlit Amber**: Warm golden-amber accent palette (`#FFFBF0`).
4. 🌌 **Cyberpunk Neon**: Deep space dark mode (`#0B0F19`) with neon cyan (`#00F2FE`) & electric pink pin accents.
5. 🌸 **Sakura Blossom**: Soft pastel rose (`#FDF7F9`) with deep berry text & blush pink accents.

---

## 🤖 Triple-Engine Agentic AI Features

- ⚡ **Smart Match Engine**: Compares student skills against job posting requirements using Google Gemini API (`gemini-2.5-pro`). Generates compatibility ratings, skill overlap badges, and missing skill recommendations.
- 📑 **1-Click AI Cover Letter Assistant**: Generates customized cover letters in 1-click tailored to the specific job posting and student profile in an interactive paper modal preview with copy-to-clipboard functionality.
- 📄 **PDF Resume Parser & Keyword Optimizer**: Accepts PDF resume uploads (`.pdf`), extracts text using `pdf-parse`, automatically extracts skills to update MongoDB student profiles, and evaluates resume readiness scores.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/Atahar-Shihab/CareerConnect_client.git
cd CareerConnect_client

# Install dependencies
npm install

# Configure Environment Variables
cp .env.local.example .env.local

# Run Development Server
npm run dev
```

Visit `http://localhost:3000` to view the client application.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Glassmorphic Utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State & Data Fetching**: TanStack React Query v5
- **Charts**: Recharts
- **OAuth Authentication**: `@react-oauth/google`

---

## 👤 Author
Developed with ❤️ by **Atahar Shihab**.
