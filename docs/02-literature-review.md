# Phase 2: Literature Review

**Project:** BloodLink | رابط الحياة\
**Program:** DEPI (Digital Egypt Pioneers Initiative), 2026\
**Track:** Software Development - React Frontend Web Developer\
**Team:** Ibrahim Hassan Anwar, Khaled Atef Salah, Mohammed Eslam Mohammed, Hager Waleed Shaker, Zeyad Mohammed Mohammed, Marawan Hesham Tolba\
**Deadline:** 16 Oct 2026

## Contents

1. [Background](#1-background)
2. [Existing solutions](#2-existing-solutions)
3. [The gap BloodLink fills](#3-the-gap-bloodlink-fills)
4. [What we learned from them](#4-what-we-learned-from-them)
5. [Suggested Improvements](#5-suggested-improvements)
6. [References](#6-references)

---

## 1. Background

- **Voluntary, unpaid donation is the safest model.** The World Health Organization (WHO) recommends that all blood comes from voluntary, unpaid donors. WHO's 2025 global report says these donors now give more than 85 % of the world's blood, but the share is much lower in low-income countries (63.4 %) [1].
- **Families are often asked to find donors themselves.** A 2017 review of blood transfusion in WHO's Eastern Mediterranean region names Egypt among the countries still "under the weight of family/replacement blood donation" [2]. In practice, the patient's family has to find donors quickly.
- **Social media fills the gap, but badly.** Families post "blood type X needed urgently" on Facebook and WhatsApp. These posts reach people by chance, can't be checked, stay online after the need is over, and publish phone numbers to everyone.
- **Egyptians are willing to donate.** For World Blood Donor Day 2026, a Ministry of Health campaign registered more than 15,000 donors in 12 hours and set a Guinness World Record [3]. The willingness exists. What's missing is a trusted way to connect a specific patient with a nearby donor.

## 2. Existing solutions

| Solution | What it does | Strengths | Gaps |
|---|---|---|---|
| **Facebook and WhatsApp posts** | Families post urgent requests in groups and on their timelines | Huge reach, free, familiar | No checking, no matching by blood type or distance, phone numbers are public, posts stay up after the need ends |
| **Facebook Blood Donations** (in Egypt since June 2020, with the Ministry of Health) [4][5] | Users sign up as donors and get messages from the nearest blood transfusion center | Official partner, large user base | Connects donors to **centers**, not to a specific patient who needs blood now |
| **HOPE / GiveMeHope** (Egyptian app by the Hope foundation) [6][7] | Collects blood requests posted on Twitter, lets users post requests, and finds donors with the right blood type within 20 km. Earlier versions also worked by SMS. | Matching by blood type and distance, brings requests together in one place | Built on public posts, and requests aren't checked against hospital papers |
| **Law 3andak Dam** (2012) [8] | Matches donors and patients through Twitter and Facebook | One of the first Egyptian attempts | No way to verify donors or requests (noted by the source itself) |
| **University projects** (e.g. MSA blood donation app) [9] | Blood bank and donor management apps | Show the need is recognized | Usually built around blood banks, not a community with trust levels |

## 3. The gap BloodLink fills

None of the solutions above combines all of the following. BloodLink does:

| Need | How BloodLink answers it |
|---|---|
| Is the request real? | Every request needs an official hospital paper. Partner hospitals confirm it (**Verified**). Otherwise an AI checks it (**Paper looks valid**). |
| Is the donor real? | Donors upload an official blood-type certificate and get the same trust badges. |
| Will the right people see it? | Only compatible, available donors near the hospital are notified, in growing waves. |
| Is it safe? | Phone numbers stay hidden until a donor accepts, meetings happen only at the hospital, money is never allowed, and there's a report button. |
| Who is responsible medically? | Always the hospital. BloodLink only connects people. |

## 4. What we learned from them

| Solution | Lesson | How BloodLink uses it |
|---|---|---|
| Facebook and WhatsApp posts | People already share requests on social media, and that reach is valuable | A WhatsApp share card that links back to the checked request |
| Facebook Blood Donations | Working with official bodies builds trust | Partner hospitals confirm papers and give the **Verified** badge |
| HOPE / GiveMeHope | Matching by blood type and distance works | Matching by compatibility, distance waves (5 km, then 15 km) and trust level |
| HOPE / GiveMeHope | SMS reaches people without smartphones | SMS alerts are planned as a future improvement |
| Law 3andak Dam | Its main weakness was that nothing could be verified | Every request needs an official hospital paper |
| University projects | They focus on blood banks | BloodLink connects a specific patient with nearby donors |

## 5. Suggested Improvements

Improvements we have already planned, and ideas for after the course.

| # | Improvement | Why | When |
|---|---|---|---|
| 1 | English version of the interface | Reach foreigners living in Egypt and the evaluators | Sprint 5 (planned extra) |
| 2 | Map view of nearby requests | Easier to judge distance than a list | Sprint 5 (planned extra) |
| 3 | WhatsApp share card for a request | People already use WhatsApp; the card links back to the checked request | Sprint 5 (planned extra) |
| 4 | Donation history and simple charts | Motivates donors, shows impact | Sprint 5 (planned extra) |
| 5 | Signing real partner hospitals | More requests and donors get the stronger "Verified" badge | After the course |
| 6 | SMS alerts for donors without smartphones | Reach more donors | After the course (paid service) |
| 7 | Blood stock levels at partner hospitals | Donors can help before an emergency | After the course |
| 8 | Mobile app (Android and iPhone), built on the same backend | More reliable notifications, especially on iPhone | Future, not part of this project |

## 6. References

1. AABB, "Voluntary Donations Now Account for More Than 85% of Global Blood Collections, WHO Reports," June 2026. https://www.aabb.org/news-resources/news/article/2026/06/17/voluntary-donations-now-account-for-more-than-85--of-global-blood-collections--who-reports
2. Darbandi A. et al., "Status of blood transfusion in World Health Organization-Eastern Mediterranean Region (WHO-EMR): Successes and challenges," *Transfusion and Apheresis Science*, 56(3):448-453, 2017. https://pubmed.ncbi.nlm.nih.gov/28550979/
3. Ahram Online, "Egypt sets Guinness World Record for blood donor registrations in 12 hours," 2026. https://english.ahram.org.eg/News/572087.aspx
4. Arab News, "Egypt and Facebook unite for blood donation campaign to boost supplies," 2020. https://arabnews.pk/node/1688436
5. Adweek, "Facebook extends its Blood Donations feature to more countries," 2020. https://www.adweek.com/performance-marketing/facebook-extends-its-blood-donations-feature-to-more-countries/
6. ArabNet, "HOPE life saving app." https://arabnet.me/english/startups/hopelifesavingapp
7. CairoScene, "Groundbreaking Egyptian App Seeks to Break Guinness World Record for the Largest Blood Donation," 2025. https://cairoscene.com/Geek/Groundbreaking-Egyptian-App-Seeks-to-Break-Guinness-World-Record-for-the-Largest-Blood-Donation
8. Wamda, "Blood donation goes online in Egypt," 2013. https://www.wamda.com/en/2013/03/blood-donation-goes-online-in-egypt
9. MSA University repository, "Blood Donation Management mobile Application." https://repository.msa.edu.eg/items/5075b604-3339-484a-9d22-28ffa349d9f7/full
