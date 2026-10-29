# BloodLink | رابط الحياة

**A website connecting people who need blood with nearby donors in Egypt.**
Hospital papers are checked, donor and patient meet only at the hospital, and no money is ever involved.

> **DEPI 2026 capstone** · Track: Software Development - React Frontend Web Developer\
> **Status:** Phases 1 to 3 done. Frontend setup is on `main`; pages are being built.

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

📄 **[Project Documentation (PDF)](BloodLink_Project_Documentation.pdf)**: phases 1 to 3 in one file.

| # | Phase | Deadline | Status |
|---|---|---|---|
| 1 | [Project Planning & Management](docs/01-project-planning.md) | 16 Oct 2026 | ✅ Done |
| 2 | [Literature Review](docs/02-literature-review.md) | 16 Oct 2026 | ✅ Done |
| 3 | [Requirements Gathering](docs/03-requirements.md) (incl. stakeholder analysis) | 16 Oct 2026 | ✅ Done |

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
    ├── 02-literature-review.md   # similar solutions, comparison, sources
    └── 03-requirements.md        # stakeholders, user stories, use cases, requirements
```

The `server/` folder, setup steps and the demo link will be added in the implementation phase.
