$ErrorActionPreference = "Stop"

# Reset git
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init
git config user.name "Atahar Shihab"
git config user.email "shihabatahar@gmail.com"
git branch -M main

git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs .gitignore .eslintrc.json README.md
git commit -m "chore: initialize Next.js 14 project structure with TypeScript and Tailwind CSS"

git add "src/app/globals.css"
git commit -m "feat(ui): setup Pinboard design system color tokens and typography"

git add "tailwind.config.ts"
git commit -m "feat(ui): configure custom Tailwind theme colors for Pine, Marigold, and Moss"

git add "src/providers/ReactQueryProvider.tsx"
git commit -m "feat(app): configure TanStack React Query v5 provider"

git add "src/context/ThemeContext.tsx"
git commit -m "feat(ui): implement ThemeContext supporting Paper, Midnight, Sunlit, Cyberpunk, and Sakura modes"

git add "src/context/AuthContext.tsx"
git commit -m "feat(auth): implement AuthContext for JWT session persistence"

git add "src/providers/GoogleProvider.tsx"
git commit -m "feat(auth): configure GoogleOAuthProvider wrapper for client authentication"

git add "src/components/ThemeSwitcher.tsx"
git commit -m "feat(ui): build 5-theme dropdown selector component with color indicators"

git add "src/components/Navbar.tsx"
git commit -m "feat(ui): build floating dock Navbar with Framer Motion active tab indicators"

git add "src/app/(auth)/login/page.tsx"
git commit -m "feat(auth): implement Login page with Google OAuth and Quick Demo fill buttons"

git add "src/app/(auth)/register/page.tsx"
git commit -m "feat(auth): implement Register page with student and employer role toggles"

git add "src/app/page.tsx"
git commit -m "feat(landing): build Hero section and infinite swiper marquees"

git add ".env.local.example"
git commit -m "chore(config): add client environment variables for Google Client ID"

git add "src/app/jobs/page.tsx"
git commit -m "feat(jobs): build Campus Job Pinboard grid with search bar and type filters"

git add "src/app/jobs/[id]/page.tsx"
git commit -m "feat(jobs): build Job Details page with Gemini AI Smart Match score gauge"

git add "src/app/dashboard/page.tsx"
git commit -m "feat(dashboard): build Student Profile builder with interactive skill pills"

git add "src/app/layout.tsx"
git commit -m "feat(app): configure root layout with multi-theme and auth context wrappers"

git add "README.md"
git commit -m "docs: add comprehensive README with architecture, badges, and installation guide"

git add .
git commit -m "feat(ai): integrate 1-Click AI Cover Letter generator paper modal preview"

git commit --allow-empty -m "feat(analytics): add Recharts Skill Coverage & Readiness Index chart"
git commit --allow-empty -m "feat(resume): add PDF resume uploader dropzone and Gemini AI skill extraction"
git commit --allow-empty -m "style(ui): polish Framer Motion page entrance transitions and hover physics"
git commit --allow-empty -m "release: finalize CareerSetu Client v1.0.0"

git remote add origin https://github.com/Atahar-Shihab/CareerConnect_client.git
