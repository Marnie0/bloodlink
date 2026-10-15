# BloodLink | رابط الحياة

**A website connecting people who need blood with nearby donors in Egypt.**
Hospital papers are checked, donor and patient meet only at the hospital, and no money is ever involved.

> **Status:** Phases 1 to 3 submitted. Next: System Analysis & Design (DEPI capstone, 2026)

---

## The problem

When a patient needs blood, families post "blood type X needed urgently" on Facebook and WhatsApp and hope the right person sees it. The posts can be fake or out of date, and they reach people with the wrong blood type or who live too far away.

## Our solution

BloodLink is a community website that sends a request only to donors who match the blood type and live close to the hospital.

1. **Donors** sign up and upload an official hospital certificate showing their blood type.
2. **Patients or families** post a request, along with an official hospital paper proving the need.
3. **Papers get a trust badge:**
   - From a partner hospital: the hospital confirms it and the badge reads **Verified**.
   - From any other official hospital: an AI checks it and the badge reads **Paper looks valid**.
4. **Matching donors nearby** get a notification. If nobody answers, the search area grows.
5. **The donor accepts.** Only then are phone numbers shared.
6. **They meet at the hospital,** which makes every medical decision. At partner hospitals, staff scan the donor's QR code to record the donation.

**What we are not:** a medical service. We don't examine anyone or decide who can donate. We only connect people, and the hospital decides.

## Users

| Role | What they do |
|---|---|
| Donor | Uploads a certificate, gets matching requests, accepts or declines |
| Requester | Uploads the hospital paper, posts a request, follows the progress live |
| Partner hospital | Confirms papers, scans donor QR codes, records donations |
| Admin | Reviews unclear papers, handles reports, bans abusers |

## Project status

| # | Phase | Deadline | Status |
|---|---|---|---|
| 1 | [Project Planning & Management](docs/01-project-planning.md) | 16 Oct 2026 | ✅ Done |
| 2 | [Literature Review](docs/02-literature-review.md) | 16 Oct 2026 | ✅ Done |
| 3 | [Requirements Gathering](docs/03-requirements.md) | 16 Oct 2026 | ✅ Done |
| 4 | System Analysis & Design | 6 Nov 2026 | 🟡 Next |
| 5 | Implementation | 30 Nov 2026 | ⬜ Not started |
| 6 | Testing & Quality Assurance | 4 Dec 2026 | ⬜ Not started |
| 7 | Final Presentation & Reports | 4 Dec 2026 | ⬜ Not started |

## Planned tech stack

| Layer | Tools |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS (Arabic RTL), Vite |
| Backend | Node.js, Express, TypeScript, Socket.io, Web Push |
| Database | MongoDB (Mongoose, geo queries) |
| AI paper check | Vision AI API behind one `checkPaper()` function (mock / free / paid) |
| DevOps | Docker Compose, GitHub Actions, Vercel, Render, MongoDB Atlas |
| Testing | Jest, Supertest |

## Team

| Member | Role |
|---|---|
| Ibrahim Hassan Anwar | Team Leader & DevOps |
| Khaled Atef Salah | Backend: Matching & Alerts |
| Mohammed Eslam Mohammed | Backend: Papers & Trust |
| Hager Waleed Shaker | Frontend: Donor |
| Zeyad Mohammed Mohammed | Frontend: Requester & Hospital |
| Marawan Hesham Tolba | UI/UX & QA |

Roles are temporary. Full responsibilities are in the [planning document](docs/01-project-planning.md#3-task-assignment--roles).

## Repository structure

```
bloodlink/
├── README.md
└── docs/
    ├── 01-project-planning.md   # proposal, plan, roles, risks, KPIs
    ├── 02-literature-review.md  # existing solutions, feedback, improvements
    ├── 03-requirements.md       # stakeholders, user stories, use cases, requirements
    └── pdf/                     # PDF copies of each document
```

The `client/` and `server/` folders, setup steps and the demo link will be added in the implementation phase.
