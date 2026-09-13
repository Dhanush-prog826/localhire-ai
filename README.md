# 📍 LocalHire AI

> **"Find the right part-time work, near you."**  
> An AI-powered hyperlocal part-time job matching platform connecting local job seekers with neighborhood businesses within a 5 km radius.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 💡 The Problem & AI Solution

* **The Problem:** Traditional job boards cater to corporate, remote, or city-wide full-time roles requiring long commutes. Meanwhile, neighborhood stores, local cafes, clinics, and tutoring hubs struggle to find reliable part-time staff for specific 3–4 hour evening or morning shifts. Local students and flexible workers want extra income within 15 minutes of home without commute fatigue.
* **Our AI Solution:** LocalHire AI bridges this hyper-local gap. Users simply type their availability, skills, and radius in plain English. The AI parses the criteria and matches them with verified local part-time opportunities in seconds.

---

## ✨ Key Features

### 1. 🔐 Role-Based Access & Authentication
* **Two Distinct Portals:**
  * **Job Seeker**: Discover matches, track applications, manage profile and saved jobs.
  * **Merchant / Employer**: Post openings in natural language, review applicants, and manage the hiring pipeline.
* **1-Click Hackathon Demo Logins:**
  * `Demo as Job Seeker (Rahul - 19y, Student • Excel)`
  * `Demo as Merchant (ABC Supermarket - 12 Applicants)`
* Instant role switching directly from the top navigation bar.

### 2. 🔍 Natural Language AI Job Matching (Job Seeker)
* **Natural-Language Search Box:**
  * e.g., *"I can work from 6 PM to 10 PM, I know basic Excel, and I'm looking for a part-time job within 5 km."*
* **AI UNDERSTANDS Card:**
  * **Job Type:** Part-time
  * **Skills:** Excel
  * **Availability:** 6 PM – 10 PM
  * **Distance:** Within 5 km
* **Top Job Matches:**
  * e.g. **Billing Assistant** at **ABC Supermarket** (94% Match, 2.1 km away, ₹6,000/month).
* **4-Pillar "Why This Matches" Breakdown:**
  * Skills match, Availability match, Distance match, and Job type match.
* **Commute & Role Details:** Interactive modal with walking/cycling commute estimations and 1-click apply.

### 3. 📋 Live Application Lifecycle Pipeline
* Synchronized real-time state between Seeker and Merchant:
  $$\text{Applied} \longrightarrow \text{Under Review} \longrightarrow \text{Shortlisted} \longrightarrow \text{Interview} \longrightarrow \text{Accepted}$$
* Visual status badge pills on cards (`● Under Review`, `● Shortlisted`, etc.).
* Step-by-step interactive timeline modal for candidates.

### 4. 🏪 Merchant Dashboard & Natural Language Job Posting
* **My Job Posts:**
  * Live applicant counter (e.g. `👥 12 people applied`), shortlisted counts, and active status tags.
* **Natural-Language Posting:**
  * e.g., *"I need someone for billing from 6 PM to 10 PM. Excel knowledge preferred. ₹6,000 per month."*
  * AI automatically extracts Position, Skills, Working Hours, Salary, Job Type, and Location.
* **Applicant Management:**
  * Review candidate distance, skills, age, and AI match %.
  * Direct action buttons: `[View Profile]`, `[Shortlist]`, `[Interview]`, `[Accept Offer]`, `[Reject]`.
  * Status updates instantly synchronize with the Job Seeker's application view.

### 5. 📱 Mobile-First Design & Hackathon Presentation Mode
* Fully responsive layout with mobile fixed **Bottom Navigation** (Dashboard, Jobs, Applications/Applicants, Profile).
* **Desktop Mobile Preview Mode:** A built-in toggle in the top navbar renders the app inside an iPhone-style mockup frame, allowing judges to experience the mobile viewport directly from desktop monitors.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **State Management:** Centralized React Context with persistent `localStorage` synchronization

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (v9 or higher)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/localhire-ai.git
   cd localhire-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
worknear-ai/
├── public/               # Static assets & favicon
├── src/
│   ├── assets/           # Images & brand assets
│   ├── components/
│   │   ├── merchant/     # Merchant dashboard, applicants & profile modals
│   │   ├── seeker/       # Seeker dashboard, applications & timeline stepper
│   │   ├── AiExtractionCard.tsx
│   │   ├── BottomNav.tsx
│   │   ├── HomePage.tsx
│   │   ├── JobCard.tsx
│   │   ├── JobDetailModal.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MatchBreakdown.tsx
│   │   ├── Navbar.tsx
│   │   └── Toast.tsx
│   ├── context/
│   │   └── AppContext.tsx # Central role-based auth & synced state
│   ├── data/
│   │   └── mockData.ts   # Curated demo jobs, profiles, and applicants
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   ├── utils/
│   │   └── aiParser.ts   # Client-side NLP intent parser & scoring
│   ├── App.tsx           # Application shell & route management
│   ├── index.css         # Tailwind CSS v4 styling
│   └── main.tsx          # Application entrypoint
├── index.html            # HTML template with mobile viewport
├── package.json          # Dependencies and npm scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration with Tailwind plugin
```

---

## 📄 License

This project was built for hackathon prototyping and local demonstration. Released under the [MIT License](LICENSE).
