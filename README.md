# Parth Babariya: Portfolio

Bento-grid portfolio built with **React 19 + Vite + TypeScript**, **Tailwind CSS v4**, **Motion** and **Lenis**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Editing content

All text, links and data live in **`src/data/portfolio.ts`**. Edit that file only; the design updates automatically.

| What | Where |
|---|---|
| Photo | `public/parth.jpg` |
| Resume (Download button) | `public/Parth_Babariya_Resume.pdf` |
| SEO title / description | `index.html` |
| Colours (light + dark) | `src/index.css` (`:root` and `.dark`) |

## Contact form (EmailJS)

Until keys are added, the form opens the visitor's email app instead.

1. Sign up at <https://www.emailjs.com> (free plan: 200 emails/month).
2. **Email Services** → *Add New Service* → Gmail → connect `parth.babariya70165@gmail.com`. Copy the **Service ID**.
3. **Email Templates** → *Create New Template*. Use these variables:
   - Subject: `New portfolio message from {{from_name}}`
   - Body: `{{message}}` … `From: {{from_name}} ({{from_email}})`
   - Reply To: `{{reply_to}}`

   Copy the **Template ID**.
4. **Account** → copy your **Public Key**.
5. Copy `.env.example` to `.env` and fill in the three values:

   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
   ```
6. Restart `npm run dev`. When you deploy, add the same three variables in your hosting dashboard.

## Project structure

```
src/
├─ data/          portfolio.ts (content), techIcons.tsx (logo map)
├─ components/    BentoCard, Navbar, DetailModal, visuals, ui helpers
├─ sections/      Hero, Experience, Projects, Skills, About, Contact, Footer
├─ hooks/         useTheme (circular theme switch), useTicker
└─ lib/           scroll.ts (Lenis smooth scroll)
```
