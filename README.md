# 🌿 Filamsi Mabda Ghifary — Full-Stack Portfolio & CMS

A high-performance, editorial portfolio web application designed with modern aesthetics and an integrated headless Flat-File CMS with Supabase/GitHub sync capabilities.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Core Library**: React 18, TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Semantic Design Tokens
- **Motion & Interactions**: Framer Motion
- **Icons**: Lucide React
- **Data Layer**: Flat-file database (`src/data/portfolio-db.json`) + Optional GitHub REST API auto-commit synchronization for zero-database serverless deployment
- **Asset Processing**: Sharp (WebP conversion on-the-fly)

---

## 🌟 Key Features

1. **Editorial Public Showcase**:
   - Dynamic Hero section with portrait showcase
   - Core capabilities & specialization cards
   - Filterable projects grid and detailed project view
   - Interactive Quick Info drawer for instant contact & metadata
   - Floating interactive navigation with WhatsApp & Instagram integration

2. **Custom Admin CMS Panel (`/admin`)**:
   - Secure PIN authentication lock screen
   - Dashboard KPI analytics & system diagnostics
   - Projects CRUD table with live search and multi-image gallery uploader
   - Real-time content editor for Hero, About, Quick Info, and Site Settings
   - Centralized semantic color tokens with instant ☀️ Light / 🌙 Dark Mode switching

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/filamsimg/my-portfolio.git

# Enter project directory
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to manage portfolio content (Default PIN: `123456`).

---

## 🔒 Environment Variables

Create a `.env.local` file in the root directory (this file is excluded from Git):
```env
# Admin Panel Security PIN
NEXT_PUBLIC_ADMIN_PIN=123456

# Optional: GitHub Auto-Commit sync on Serverless host (Vercel)
# GITHUB_TOKEN=ghp_your_personal_access_token
# GITHUB_REPO=filamsimg/my-portfolio
# GITHUB_BRANCH=main
```

---

## 📄 License

Created with care by [Filamsi Mabda Ghifary](https://github.com/filamsimg).
