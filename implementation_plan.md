# Implementation Plan: Elevating Pratika's Website to the Elite Creative Standard

This plan outlines a complete transformation of the typography, copywriting, and visual hierarchy of Pratika's website to match the **Awwwards/FWA premium standard** (Elite Creative Standard v2.0).

---

## User Review Required

We propose major upgrades to typography and copywriting. Please review the design changes and copywriting samples before approval.

> [!IMPORTANT]
> **Recommended Action**: Trigger the **`/goal`** slash command in the chat to launch our thorough multi-agent polish workflow, ensuring all pages are visually verified on both desktop and mobile layouts.

---

## Proposed Changes

### 1. Typography Transformation
The current use of the ultra-bold, condensed `'Anton'` font across the entire site can feel harsh and unrefined. We will replace it with a sophisticated, high-contrast, double-display system typical of elite portfolios:
* **Primary Display Font**: `Syne` (An avant-garde, structurally wide, ultra-modern artistic sans-serif) or `Cinzel` (A luxury, Roman-inspired serif with timeless authority).
* **Secondary Editorial Font**: `Playfair Display` (Italicized, delicate editorial serif for secondary details).
* **Body Font**: `Inter` (Sleek, highly readable geometric sans-serif).

#### Changes in [index.css](file:///Users/sky/pratika-website%20copy/src/index.css)
* Import Google Fonts: `family=Syne:wght@400;700;800` and `family=Cinzel:wght@400;700;900`.
* Update CSS custom variables:
  ```css
  --font-display: 'Syne', sans-serif;
  --font-display-hero: 'Cinzel', serif;
  --font-body: 'Inter', sans-serif;
  ```

---

### 2. High-End Copywriting Polish
We will replace generic, repetitive AI copywriting ("powerful track", "multi-talented singer") with poetic, raw, and high-energy statements that match Pratika’s heavy metal, hip-hop, and alternative rap identity.

#### Copywriting Upgrades in [content.ts](file:///Users/sky/pratika-website%20copy/src/data/content.ts)

| Section | Current Copy (AI-Generic) | New Copy (Poetic & Defiant) |
| :--- | :--- | :--- |
| **Hero Tagline** | Rapper · Singer · Screamer · Bassist | Sonic Extremist · Rapper · Heavy Metal Vocalist · Bassist |
| **Artist Bio** | Multi-talented Indian singer, rapper, songwriter, and bassist based in Mumbai. Known for immense vocal versatility... | A genre-fluid musical force carving a defiant path through India's independent landscape. Shifting seamlessly between primal heavy metal growls, cerebral hip-hop flows, and gut-wrenching basslines, she exists where sonic extremes collide. |
| **Growing Up EP** | A critically acclaimed genre-bending EP fusing heavy metal riffs, hip-hop beats, and electronic elements. | A visceral descent into self-discovery. Industrial-metal riffs collide with experimental hip-hop pulses, creating a chaotic sanctuary for the restless soul. |
| **Survival Single** | An empowering track about resilience and overcoming adversity through raw, emotional delivery. | An unvarnished anthem of resilience. Captured in a single breath of defiance, it stands as a testament to surviving one's own shadows. |
| **Laagli Waat** | Bollywood debut — featured on the soundtrack of Netflix's 'Toaster' starring Rajkummar Rao & Sanya Malhotra. | A high-octane Bollywood debut. Infusing Netflix's 'Toaster' with raw street energy and an unapologetic attitude. |
| **Quote** | I don't fit in boxes. I break them. | My voice is not a box to be checked. It is a storm to be weathered. |

---

### 3. Layout and Structural Polishing
To ensure the layouts feel dynamic and alive, we will:
* **Intro Animation (`Intro.tsx`)**: Use the sleek `Syne` and `Cinzel` transition to make a cinematic first impression.
* **Hero Section (`Hero.tsx`)**: Balance the typography, improve text legibility over the background video, and refine the positioning of text elements.
* **Music Section (`Music.tsx`)**: Improve release card layouts, typography hierarchy, and transition micro-animations.

---

## Verification Plan

### Automated & Manual Verification
* Run local production build: `npm run build`
* Run local linter: `npm run lint`
* Verify mobile responsiveness and visual alignment using Puppeteer/Playwright preview checks on both **Desktop** and **Mobile** screen sizes.
