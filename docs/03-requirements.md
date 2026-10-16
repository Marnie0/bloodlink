# Phase 3: Requirements Gathering

**Project:** BloodLink | رابط الحياة\
**Program:** DEPI (Digital Egypt Pioneers Initiative), 2026\
**Track:** Software Development - React Frontend Web Developer\
**Team:** Ibrahim Hassan Anwar, Khaled Atef Salah, Mohammed Eslam Mohammed, Hager Waleed Shaker, Zeyad Mohammed Mohammed, Marawan Hesham Tolba\
**Deadline:** 16 Oct 2026

## Contents

1. [Stakeholder Analysis](#1-stakeholder-analysis)
2. [User Stories](#2-user-stories)
3. [Use Cases](#3-use-cases)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-functional Requirements](#5-non-functional-requirements)

**Priority:** **Must** is in the core and done by checkpoint 2 (13 Nov). **Should** is a planned extra for sprint 5. **Could** comes after the course.

---

## 1. Stakeholder Analysis

| Stakeholder | Who they are | What they need | Influence | How we involve them |
|---|---|---|---|---|
| **Requester** | A patient's family member or friend | Find compatible donors fast, without posting everywhere | High | Interviews, usability test of the request flow |
| **Donor** | A volunteer who wants to give blood | Only relevant, real requests close to home; privacy | High | Short survey, usability test of the donor flow |
| **Partner hospital** | Hospital staff using our portal | Confirm papers quickly, record donations, reach donors for their patients | High | Talk to 1 or 2 hospitals; demo uses fictional ones |
| **Non-partner hospital** | Any other official hospital | Nothing from us; it still examines the donor and decides | Low | None. Its papers are checked by AI |
| **Admin** | Our moderation team | Review unclear papers, handle reports, ban abusers | Medium | Built by the team |
| **AI service provider** | The vision AI API | Clear prompts, sample papers only on the free tier | Low | Through one `checkPaper()` function |
| **DEPI lecturer and evaluators** | Grade the project | Clear docs, working demo, good code | High | Phase reviews and the final presentation |
| **Project team** | The 6 members | A realistic plan and clear roles | High | Weekly meetings, GitHub board |

## 2. User Stories

Format: _As a [role], I want [goal], so that [benefit]._

### Donor

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-01 | As a donor, I want to sign up with my blood type and area, so that I only get requests that fit me | Signup asks for name, phone, blood type, governorate, area and location. The user must accept the terms of use. | Must |
| US-02 | As a donor, I want to upload my hospital blood-type certificate, so that people can trust me | Accepts JPG, PNG or PDF up to 5 MB. Shows the resulting badge: **Verified**, **Paper looks valid** or **Needs review**. | Must |
| US-03 | As a donor, I want to be notified about requests near me, so that I can help in time | A push notification arrives only when the blood type is compatible, I'm available, and the hospital is within the wave radius. | Must |
| US-04 | As a donor, I want to accept or decline a request, so that the requester knows quickly | One tap to accept or decline. On accept, I see the hospital address and the requester's phone number. | Must |
| US-05 | As a donor, I want a QR code when the hospital is a partner, so that the staff can record my donation | QR shows only for partner hospitals. At other hospitals, I see "No QR here, confirm after donating." | Must |
| US-06 | As a donor, I want to turn my availability off, so that I'm not disturbed | A visible on/off switch. No notifications while it's off. | Must |
| US-07 | As a donor, I want to see my donation history, so that I feel the impact | List of past donations with date, hospital and how each was confirmed | Should |

### Requester

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-08 | As a requester, I want to create a request with the hospital paper, so that donors trust it | The request can't be sent without a paper. Asks for blood type, units, hospital, urgency and deadline. | Must |
| US-09 | As a requester, I want to see the badge my request got, so that I know how it looks to donors | Shows **Verified** (partner confirmed), **Paper looks valid** (AI) or **Needs review** | Must |
| US-10 | As a requester, I want to follow the progress live, so that I don't keep calling people | "2 of 3 units pledged" updates without refreshing the page | Must |
| US-11 | As a requester, I want to see a donor's phone number only after they accept, so that contact is safe for both sides | No phone numbers appear before acceptance | Must |
| US-12 | As a requester at a non-partner hospital, I want to confirm the donation myself, so that the request can be closed | Both requester and donor confirm. The donor's badge does **not** change. | Must |
| US-13 | As a requester, I want to report a suspicious donor or message, so that abusers are removed | Report button on every profile and request, with a reason | Must |
| US-14 | As a requester, I want to share my request on WhatsApp, so that more people see it | Share card with a link back to the checked request | Should |

### Partner hospital

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-15 | As partner-hospital staff, I want to confirm papers issued by my hospital, so that requests and donors get the **Verified** badge | List of pending papers with Confirm and Reject buttons | Must |
| US-16 | As partner-hospital staff, I want to scan a donor's QR code, so that I can record what happened | Outcome: **Donated**, **Not able to donate today (medical decision)** or **Didn't show up** | Must |

### Admin

| ID | Story | Acceptance criteria | Priority |
|---|---|---|---|
| US-17 | As an admin, I want to review papers the AI marked as unclear, so that no user is stuck | Queue of unclear papers with Approve, Ask for a clearer photo and Reject | Must |
| US-18 | As an admin, I want to handle reports and ban accounts, so that the community stays safe | Reports list with Dismiss, Warn and Ban. Banned users can't log in. | Must |
| US-19 | As an admin, I want to approve partner hospitals, so that only real hospitals can confirm papers | Partner accounts are inactive until an admin approves them | Must |
| US-20 | As an admin, I want to see key numbers, so that I know if the platform works | Cards: active requests, donors, average time to first acceptance, open reports | Must |

## 3. Use Cases

### UC-01: Create a blood request

| Item | Details |
|---|---|
| **Actor** | Requester |
| **Precondition** | Logged in, terms accepted |
| **Main flow** | 1. Fill in blood type, units, hospital, urgency and deadline. 2. Upload the hospital paper. 3. Review the "check your answers" page. 4. Send. 5. The system checks the paper: partner hospital, so it goes to the hospital to confirm; non-partner, so the AI checks it. 6. The request becomes active with a badge and matching starts. |
| **Alternative flows** | 5a. The AI finds the paper unclear: the request waits in the admin review queue. 5b. The partner hospital rejects it: the request is rejected and the requester is told why. |
| **Postcondition** | An active request with a trust badge, and the first wave of notifications sent |

### UC-02: Notify donors and accept

| Item | Details |
|---|---|
| **Actor** | System, Donor |
| **Precondition** | An active request |
| **Main flow** | 1. The system finds compatible, available donors within 5 km and ranks them (distance, same type, trust, reliability). 2. It sends push notifications. 3. A donor opens the request and taps **I can donate**. 4. The pledge count goes up live for the requester. 5. Phone numbers are shown to both. |
| **Alternative flows** | 1a. Not enough donors accept: the next wave widens to 15 km. 3a. The donor declines: the system notifies the next donor. 3b. Nobody accepts before the deadline: the request expires. |
| **Postcondition** | A pledge linked to the request |

### UC-03: Record a donation at a partner hospital

| Item | Details |
|---|---|
| **Actor** | Donor, Partner-hospital staff |
| **Precondition** | The donor accepted a request at a partner hospital |
| **Main flow** | 1. The donor shows the QR code at the hospital. 2. Staff scan it in the portal. 3. The hospital examines the donor and decides. 4. Staff record **Donated**. 5. The donor becomes **Verified** and is paused from new requests for a while. 6. The request count updates. |
| **Alternative flows** | 4a. **Not able to donate today:** the pledge is released and the next wave may start. 4b. **Didn't show up:** the donor's reliability score goes down. |
| **Postcondition** | A recorded donation, confirmed by the hospital |

### UC-04: Confirm a donation at a non-partner hospital

| Item | Details |
|---|---|
| **Actor** | Donor, Requester |
| **Precondition** | The donor accepted a request at a non-partner hospital |
| **Main flow** | 1. They meet at the hospital, which decides medically. 2. The donor taps **I donated**. 3. The requester taps **Confirm**. 4. The donation is recorded as self-confirmed. |
| **Alternative flows** | 3a. The requester says it didn't happen: the case goes to an admin. |
| **Postcondition** | A self-confirmed donation. The donor's badge stays the same. |

### UC-05: Handle a report

| Item | Details |
|---|---|
| **Actor** | Any user, Admin |
| **Main flow** | 1. A user reports a profile or request with a reason, for example asking for money. 2. The admin reviews it. 3. The admin dismisses it, warns the user or bans the account. 4. The reporter is told the result. |
| **Postcondition** | The report is closed and the action is logged |

## 4. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| **Accounts** | | |
| FR-01 | Users can register and log in with email or phone and a password | Must |
| FR-02 | The system supports four roles: donor, requester, partner hospital, admin. A user can be both donor and requester. | Must |
| FR-03 | Users must accept the terms of use (the site only connects people) at signup | Must |
| FR-04 | Partner-hospital accounts stay inactive until an admin approves them | Must |
| **Papers and trust** | | |
| FR-05 | Donors upload an official hospital blood-type certificate | Must |
| FR-06 | Requesters must upload an official hospital paper before a request is published | Must |
| FR-07 | Papers from partner hospitals are sent to that hospital to confirm, and give the **Verified** badge | Must |
| FR-08 | Papers from other hospitals are checked by AI, and give the **Paper looks valid** badge | Must |
| FR-09 | The AI check confirms the paper looks official, the name and blood type match, and the date is recent. Unclear results go to the admin queue. | Must |
| FR-10 | The AI never labels a paper as genuine. The badge text is fixed. | Must |
| FR-11 | Uploaded papers are private and never shown to other users | Must |
| **Matching and notifications** | | |
| FR-12 | Matching uses blood compatibility, availability, pause period, distance and trust level | Must |
| FR-13 | Notifications go out in waves: 5 km first, then 15 km | Must |
| FR-14 | Donors get browser push notifications and a list of requests on the website | Must |
| FR-15 | Requests expire automatically after their deadline | Must |
| **Response and meeting** | | |
| FR-16 | Donors can accept or decline a request | Must |
| FR-17 | Phone numbers are shown only after the donor accepts | Must |
| FR-18 | Requesters see the pledge count live | Must |
| FR-19 | At partner hospitals, the donor gets a QR code, and staff scan it to record **Donated**, **Not able to donate today** or **Didn't show up** | Must |
| FR-20 | At non-partner hospitals, there is no QR code. Donor and requester confirm the donation themselves. This never upgrades the donor's badge. | Must |
| FR-21 | After a donation, the donor is paused from new requests for a period (general guidance; the hospital decides) | Must |
| **Safety and admin** | | |
| FR-22 | Every profile and request has a report button | Must |
| FR-23 | Admins can review unclear papers, handle reports and ban accounts | Must |
| FR-24 | The admin dashboard shows key numbers: active requests, donors, time to first acceptance, open reports | Must |
| **Extras** | | |
| FR-25 | English version of the interface | Should |
| FR-26 | Map view of requests | Should |
| FR-27 | WhatsApp share card | Should |
| FR-28 | Donation history and charts | Should |
| FR-29 | SMS alerts, blood stock at partner hospitals | Could |

## 5. Non-functional Requirements

| ID | Category | Requirement | How we check it |
|---|---|---|---|
| NFR-01 | Performance | 95 % of API requests answer in under 500 ms | Server logs |
| NFR-02 | Performance | Pages load in under 3 seconds on a phone over 4G | Lighthouse |
| NFR-03 | Performance | Matching for one request finishes in under 2 seconds | Unit test with demo data |
| NFR-04 | Security | Passwords are hashed with bcrypt. Login uses a JWT in an httpOnly cookie. | Code review |
| NFR-05 | Security | Every input is validated on the server (zod). Login and upload are rate-limited. | Code review, API tests |
| NFR-06 | Security | No secrets in the repo; all keys live in `.env` | CI check, `.env.example` |
| NFR-07 | Privacy | Phone numbers and papers are shared only as described in FR-11 and FR-17. Users consent before the AI check. We follow Egypt's Personal Data Protection Law (151/2020). | Code review, test cases |
| NFR-08 | Privacy | Only sample papers are sent to the free AI tier | Team rule, checklist |
| NFR-09 | Usability | Arabic first, right-to-left layout, works on phones from 360 px wide | Manual test on phones |
| NFR-10 | Usability | A first-time requester can send a request in under 3 minutes | Usability test |
| NFR-11 | Accessibility | Lighthouse accessibility score ≥ 90, visible keyboard focus, readable contrast | Lighthouse |
| NFR-12 | Reliability | Uptime ≥ 99 % during demo week | Uptime monitor |
| NFR-13 | Reliability | If the AI service fails, the website switches to mock mode or the review queue, never to an error page | Test with the AI turned off |
| NFR-14 | Maintainability | TypeScript on the backend, JavaScript on the frontend, ESLint and Prettier on both, small reviewed pull requests | CI |
| NFR-15 | Testability | ≥ 70 % test coverage of core logic (matching, trust badges, request states) | Jest coverage report |
| NFR-16 | Portability | The whole website runs locally with `docker compose up` | Fresh-laptop test |
| NFR-17 | Cost | The demo runs at $0 on free tiers | Monthly check of all accounts |
