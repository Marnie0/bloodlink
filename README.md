# BloodLink | رابط الحياة

**A website connecting people who need blood with nearby donors in Egypt.**
Hospital papers are checked, donor and patient meet only at the hospital, and no money is ever involved.

> **DEPI 2026 capstone** · Track: Software Development - React Frontend Web Developer\
> **Status:** Planning, stakeholder analysis, database design and UI/UX design done. Frontend setup is on `main`; pages are being built.

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

## Documentation

📄 **[Project Documentation (PDF)](BloodLink_Project_Documentation.pdf)**: all four documents in one file.

| # | Document | Status |
|---|---|---|
| 1 | [Project Planning](docs/01-project-planning.md) | ✅ Done |
| 2 | [Stakeholder Analysis](docs/02-stakeholder-analysis.md) | ✅ Done |
| 3 | [Database Design](docs/03-database-design.md) | ✅ Done |
| 4 | [UI/UX Design](docs/04-ui-ux-design.md) | ✅ Done |

## Planned tech stack

| Layer | Tools |
|---|---|
| Frontend | React (JavaScript), React Compiler, React Router, Tailwind CSS v4 + daisyUI (Arabic RTL), Vite |
| Backend | Node.js, Express, TypeScript, Socket.io, Web Push |
| Database | MongoDB (Mongoose, geo queries) |
| AI paper check | Vision AI API behind one `checkPaper()` function (mock / free / paid) |
| DevOps | Docker Compose, GitHub Actions, Vercel, Render, MongoDB Atlas |
| Testing | Jest, Supertest |

## Team

| Member | Role | Area |
|---|---|---|
| Ibrahim Hassan Anwar | **Team leader** · Visitors | Home, Signup, Login, project setup |
| Zeyad Mohammed Mohammed | Donor | Nearby requests, Certificate, Donation history |
| Hager Waleed Shaker | Donation | Request details, Confirm donation, Terms + 404 |
| Mohammed Eslam Mohammed | Requester | New request, Request progress |
| Marawan Hesham Tolba | Hospital | Hospital dashboard, Confirm papers, Hospital signup |
| Khaled Atef Salah | Admin | Admin dashboard, Review papers, Reports, Approve hospitals |

Details are in the [planning document](docs/01-project-planning.md#3-task-assignment--roles).

## Repository structure

```
bloodlink/
├── README.md
├── BloodLink_Project_Documentation.pdf   # all documents in one PDF
├── client/                       # React + Vite + Tailwind frontend (JavaScript)
│   └── src/
│       ├── components/           # shared layout and UI components
│       ├── pages/                # pages, one folder per area
│       └── App.jsx               # all routes
└── docs/
    ├── 01-project-planning.md    # proposal, plan, roles, risks, KPIs
    ├── 02-stakeholder-analysis.md  # stakeholders, their needs and influence
    ├── 03-database-design.md     # collections, ERD, indexes, privacy rules
    ├── 04-ui-ux-design.md        # flows, screens, design system, accessibility
    └── img/ui/                   # screenshots used in the UI/UX document
```

The `server/` folder, setup steps and the demo link will be added in the implementation phase.
