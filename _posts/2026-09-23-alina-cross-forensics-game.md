---
layout: post
title: "Solving the Alina Cross Forensics Game"
description: "How a false badge exit, a twenty-minute door gap, and staged digital activity exposed the murder of hackathon judge Dr. Alina Cross."
date: 2026-09-23 09:00:00 +0800
category: Forensics Game
tags:
  - digital forensics
  - evidence correlation
  - murder mystery
reading_time: "10 min read"
permalink: /posts/alina-cross-forensics-game/
---

> **Background:** The Alina Cross Investigation was a fictional murder-mystery forensics game held during APU Data Science Week. Participants collected and correlated evidence from suspect files, CCTV footage, interview recordings, QR codes, access logs, messages, and other digital clues to identify the killer and reconstruct the crime.

## 1. The crime and the first suspects

At approximately **12:45 PM**, campus authorities received a report of an unresponsive person inside an office. The victim was **Dr. Alina Cross**, a data scientist, researcher, and judge at a public hackathon taking place on campus. She was already dead when emergency and security personnel arrived.

Cross had suffered severe blunt-force trauma to the head. The likely weapon was a **heavy trophy from her own desk**. Investigators initially did not know when she had died, who had last seen her alive, or why anyone would want to kill her.

The first person identified was **Priya Nair**, Cross's research assistant and the person who found the body. Priya had been in Cross's office earlier that morning and had left visibly upset. The briefing warned us not to assume that the discoverer was responsible.

<div class="evidence-pair">
  <figure>
    <img src="{{ '/assets/images/alina-cross/victim-alina-cross.png' | relative_url }}" alt="Case-file profile of Dr. Alina Cross">
    <figcaption>The victim</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/images/alina-cross/person-of-interest-priya-nair.png' | relative_url }}" alt="Case-file profile of Priya Nair">
    <figcaption>The first person of interest</figcaption>
  </figure>
</div>

### The five people under scrutiny

| Person | Connection to Cross | Why investigators considered them |
|---|---|---|
| **Priya Nair** | Cross's research assistant and the person who found her. | She had visited that morning, left visibly upset, and was involved in a dispute over copied research files. |
| **Marcus Tan** | Hackathon participant whose submission Cross was reviewing. | He was called to a private meeting and was among the last people known to have seen Cross. |
| **Daniel Wong** | Participant from a team eliminated by the judges. | He had argued with Cross and expressed anger over the scoring. |
| **Dr. Sarah Lim** | Fellow judge and academic colleague. | She resented Cross for receiving a senior research position that she wanted. |
| **Dr. Rajesh Kumar** | Senior researcher in Cross's research group. | He was waiting for Cross to resolve a disputed project expenditure. |

At this stage, they were only leads. Each had a possible motive, but motive alone did not show who had the opportunity to kill Cross.

Instead of beginning with motive, we began with movement: **who was actually with Cross before she died?**

The access sequence initially looked routine. Cross entered at **10:30 AM**. Priya visited from **11:00 to 11:10**. Marcus entered at **11:15**.

Cross's calendar listed a private submission-review meeting with **“M,”** while her notebook fixed the meeting at **11:15**. A catering assistant also saw a tall young man in a dark-green shirt heading toward Cross's office shortly after 11:15. Marcus's profile, badge entry, and clothing connect “M” to Marcus Tan.

<p align="center">
  <img src="{{ '/assets/images/alina-cross/person-of-interest-marcus-tan.png' | relative_url }}" width="700" alt="Case-file profile of Marcus Tan in a dark-green overshirt">
</p>

<div class="evidence-pair">
  <figure>
    <img src="{{ '/assets/images/alina-cross/calendar-meeting.jpeg' | relative_url }}" alt="Cross's calendar listing a private submission-review meeting with M">
    <figcaption>Cross's calendar</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/images/alina-cross/marcus-approach-witness.jpeg' | relative_url }}" alt="Hana Yusof describes a tall young man in a dark-green shirt heading toward Cross's office">
    <figcaption>Witness sighting near Cross's office</figcaption>
  </figure>
</div>

This was the first break in the case. Priya had left, Cross was still alive, and Marcus became the final confirmed visitor before the fatal period.

## 2. Marcus's unexplained absence

Marcus had told his teammates that the meeting with Cross would take about ten minutes. They therefore expected him back shortly after 11:15.

He did not return.

At **11:32**, his teammates began asking where he was. At 11:38, one member noted that the ten-minute meeting had ended “ages ago.” Marcus remained silent until **12:31**, when he finally replied that he had lost track of time.

<p align="center">
  <img src="{{ '/assets/images/alina-cross/marcus-missing-team-chat.jpeg' | relative_url }}" width="430" alt="Team chat showing that Marcus was missing after meeting Cross and returned at 12:31">
</p>

An hour-long absence does not prove murder. Marcus could have gone elsewhere on campus. What made the absence significant was that it overlapped every unexplained event in the case: the false exit, the murder window, the CCTV manipulation, a witness sighting, and his eventual return.

The next question was therefore unavoidable: **if Marcus left Cross's office at 11:25, where was he for the following hour?**

## 3. The exit that never happened

The badge log appeared to answer that question. It recorded Marcus leaving at **11:25:03**, only ten minutes after he arrived.

But a badge system records a credential, not a person's continued movement. We compared it with the independent door-contact sensor. The door opened at **11:25:07** and did not close until **11:45:04**.

| System | Event | What it proves |
|---|---|---|
| Badge log | Exit at 11:25:03 | Marcus's credential was presented |
| Door sensor | Opened at 11:25:07 | The doorway was opened |
| Door sensor | Closed at 11:45:04 | The doorway remained unsecured for almost twenty minutes |

<div class="evidence-pair">
  <figure>
    <img src="{{ '/assets/images/alina-cross/badge-access-log.jpeg' | relative_url }}" alt="Badge-access log showing Marcus's recorded exit at 11:25:03">
    <figcaption>Badge record</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/images/alina-cross/door-contact-log.jpeg' | relative_url }}" alt="Door-contact log showing the door open from 11:25:07 until 11:45:04">
    <figcaption>Physical door record</figcaption>
  </figure>
</div>

Every ordinary visit followed the expected sequence: badge event, door opening, prompt closure. Marcus's supposed exit was the exception.

The badge-door mismatch supports one coherent reconstruction. Marcus stepped through far enough to trigger an exit, **jammed the door open**, and slipped back inside. The badge data was genuine, but he had deliberately made it misleading. He could later leave through the open doorway without presenting his badge again.

### The missing twenty minutes

The reconstructed timeline places Cross's death at approximately **11:26–11:30 AM**, immediately after the manufactured exit. Marcus struck her with the trophy from her desk.

Two intervals must be distinguished:

- **11:26–11:30 AM:** the approximate murder window;
- **11:25–11:45 AM:** the wider concealed-access and cover-up window.

The supplied CCTV activity log shows what occupied part of the remaining time:

- **11:35:** SD card removed;
- **11:36:** camera restarted;
- **11:40:** SD card reinserted; and
- **12:30:** recording resumed.

This was deliberate physical manipulation, not an ordinary outage. The card could be altered to remove incriminating footage, while the continuing blackout concealed the staging and Marcus's true exit. The door finally closed at 11:45, marking his actual departure.

## 4. The manufactured alibi

Cross's laptop contained an unsent message to the judging panel displaying a **12:30** time. Viewed alone, it looks like evidence that she was still alive and working.

![Unsent judging-panel draft used to create later apparent activity]({{ '/assets/images/alina-cross/staged-panel-draft.jpeg' | relative_url }})

A local draft timestamp does not identify the person at the keyboard. It also conflicts with the verified murder window and the physical access evidence. Three events converge around 12:30:

1. Cross's laptop appears active.
2. CCTV recording resumes.
3. Marcus becomes publicly visible again.

Together, they create a convenient alibi: Cross appears alive while Marcus appears elsewhere. The digital story seems persuasive until it is compared with the door sensor.

There was also a human trace between Marcus's real departure and public return. Near noon, a witness saw a sweaty man in a **dark-green shirt** washing his arm before hurrying toward the main hall. The description matched Marcus's profile and the earlier witness who had seen him approaching Cross's office.

<figure class="evidence-figure">
  <img src="{{ '/assets/images/alina-cross/cctv-marcus-near-toilets.jpeg' | relative_url }}" alt="CCTV frame showing Marcus leaving the toilet area at 11:50:01 in a dark-green overshirt">
  <figcaption>CCTV Footage 3 places Marcus outside the toilet area at 11:50:01, still wearing the dark-green overshirt described by witnesses.</figcaption>
</figure>

<div class="evidence-pair">
  <figure>
    <img src="{{ '/assets/images/alina-cross/arm-washing-witness.jpeg' | relative_url }}" alt="Witness describes a sweaty man in a dark-green shirt washing his arm">
    <figcaption>Clean-up sighting near noon</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/images/alina-cross/livestream-marcus-return.jpeg' | relative_url }}" alt="Livestream chat reports the team's last member returning by 12:33">
    <figcaption>Public return shortly after 12:30</figcaption>
  </figure>
</div>

The arm-washing statement does not name Marcus, so it would be weak by itself. In the combined sequence, it bridges the electronic records: someone matching his clothing cleaned himself while his team still considered him missing, and Marcus reappeared soon afterward.

The cover-up now had four connected parts:

1. **False badge exit** to create a record of departure.
2. **Jammed door** to preserve hidden access and permit an unlogged exit.
3. **CCTV manipulation** to remove the visual record.
4. **Staged laptop activity** to make Cross appear alive later.

Marcus had built a convincing timeline. What remained was to understand why he needed it.

## 5. The motive and final reconstruction

Cross had analyzed hackathon submission **HK2026-014**, associated with Marcus. The report found a **91.4% similarity** to the restricted `ContosoAI_CustomerInsights_v3` dataset. It flagged matching variable names, preprocessing, model comments, and sampled data rows.

![Final similarity report identifying HK2026-014, Marcus T., and a 91.4% match]({{ '/assets/images/alina-cross/similarity-report.jpeg' | relative_url }})

Cross's notebook connected the technical finding to the private meeting. She wrote that the similarity was confirmed, that she wanted to hear “M” first, and that she would raise the issue at the **1:00 PM awards ceremony** if his explanation failed.

<figure class="evidence-figure evidence-figure--portrait">
  <img src="{{ '/assets/images/alina-cross/cross-final-notebook-note.jpeg' | relative_url }}" alt="Cross's notebook recording the 11:15 meeting with M and her plan to raise the confirmed similarity at the ceremony">
  <figcaption>Cross's final note links the 11:15 meeting with M to the confirmed similarity and the planned disclosure.</figcaption>
</figure>

The rules required datasets to be publicly licensed or provided by the organizers and allowed disqualification for violations. Cross's scoring sheet also left the team's ethics score pending.

<div class="evidence-pair">
  <figure>
    <img src="{{ '/assets/images/alina-cross/hackathon-rulebook.jpeg' | relative_url }}" alt="Hackathon rulebook requiring authorized datasets">
    <figcaption>Rule permitting disqualification</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/images/alina-cross/judging-notes-ethics-pending.jpeg' | relative_url }}" alt="Judging sheet showing the ethics score as pending">
    <figcaption>Pending ethics score</figcaption>
  </figure>
</div>

Marcus faced immediate disqualification, public exposure, and serious reputational damage. The timing was urgent: Cross had the completed report, their confrontation had begun, and the ceremony was less than two hours away.

### Why the other suspects did not fit

| Suspect | Reason for suspicion | Why the evidence rules them out |
|---|---|---|
| **Priya Nair** | Found the body, left upset, and concealed why she copied research files. | Left at 11:10; Cross was alive afterward and met Marcus at 11:15. Priya returned at 12:45. |
| **Dr. Rajesh Kumar** | Project-expenditure dispute involving an unexplained RM5,000 variance. | Entered at noon, after the murder, and left normally at 12:05. |
| **Daniel Wong** | Angry after elimination and had argued with Cross. | No access record or other evidence placed him inside Cross's office. |
| **Dr. Sarah Lim** | Professional rivalry over the senior research position awarded to Cross. | No office access placed her at the scene during the fatal period. |

Several people had reasons to worry about Cross. Only Marcus combined **urgent motive, verified presence, concealed access, evidence manipulation, and a delayed public return**.

### The complete sequence

| Time | Event |
|---|---|
| **10:30** | Cross enters her office. |
| **11:00–11:10** | Priya visits and leaves while Cross is alive. |
| **11:15** | Marcus enters for the private meeting. |
| **11:25:03** | Marcus's badge records the manufactured exit. |
| **11:25:07** | Door opens and remains open. |
| **≈11:26–11:30** | Marcus kills Cross with the trophy. |
| **11:35–11:40** | CCTV recording medium is manipulated. |
| **11:45:04** | Door closes; Marcus has actually left. |
| **Near noon** | Green-shirted man seen washing his arm. |
| **12:00–12:05** | Rajesh visits after the murder. |
| **12:30–12:31** | CCTV and laptop activity appear; Marcus returns publicly. |
| **12:45** | Priya discovers Cross. |

<blockquote class="verdict">
  <p><strong>Verdict: Marcus Tan killed Dr. Alina Cross.</strong> He acted because Cross had confirmed that his submission used restricted copied material and planned to expose it at the awards ceremony, threatening him with disqualification and reputational damage.</p>
</blockquote>
