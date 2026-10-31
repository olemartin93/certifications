# Certified 😏

An offline-first Progressive Web App for studying professional certifications, with TL;DRs, study notes, key terms and quizzes.

**Live app:** https://olemartin93.github.io/certifications/

## Tracks

| Track | Exam | Source |
| --- | --- | --- |
| PRINCE2 Foundation (Version 7) | 60 questions · 60 min · 60% to pass | [PeopleCert](https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-2/PRINCE2-7-foundation-3579) |
| PRINCE2 Agile Foundation (Version 2) | 40 questions · 60 min · 60% to pass | [PeopleCert](https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074) |

Content is independent study material based on official, publicly available sources (PeopleCert/AXELOS, the Agile Manifesto, the Scrum Guide and the Kanban Guide). Quiz questions are practice questions, not official exam questions. Always check the official syllabus before sitting an exam.

## Install on your phone

1. Open the live app in Safari (iPhone) or Chrome (Android).
2. iPhone: tap **Share → Add to Home Screen**. Android: tap **⋮ → Install app**.
3. Open it once while online. After that it works fully offline.

## Add a new certification track

1. Create `src/data/certifications/<your-track>.ts` exporting a `Certification` (see `src/data/types.ts`).
2. Add it to the list in `src/data/catalog.ts`.
3. Run `npm test`. The data tests check ids, quiz answers, TL;DRs and that every source is an HTTPS link to a trusted official domain (extend `TRUSTED_DOMAINS` in `src/data/catalog.test.ts` if a new official body is needed).

## Development

```bash
npm install
npm run dev        # local dev server
npm test           # unit + component tests (Vitest)
npm run test:e2e   # end-to-end tests incl. offline check (Playwright)
npm run lint && npm run typecheck
npm run icons      # regenerate PNG icons from public/favicon.svg
```

Stack: React, TypeScript (strict), Tailwind CSS, Vite, vite-plugin-pwa (Workbox). Pull requests run CI; pushing to `main` runs the tests and deploys to GitHub Pages.

PRINCE2® and PRINCE2 Agile® are registered trademarks of PeopleCert group. This project is not affiliated with PeopleCert or AXELOS.
