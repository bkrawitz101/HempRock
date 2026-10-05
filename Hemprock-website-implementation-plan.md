# HempRock Website Implementation Plan & Antigravity Prompt Sheet

**Document Version:** 1.0  
**Target Environment:** Antigravity (Gemini-powered Static Web Code Generator)  
**Output Format:** Static HTML5 / Modern CSS3 / Lightweight Vanilla JS  
**Source Baseline:** HempRock Business Strategy & Website Discussion Guidelines  
---

## 1\. Project Purpose & Scope

### Core Objective

Develop a clean, highly credible static HTML showcase website for **HempRock Plaster LLC**. The primary goal is to build consumer and general contractor trust by highlighting material performance (fire resilience, mold mitigation, carbon negativity) and driving inquiries for HempRock’s two primary business offerings.

### Business Offerings Featured (v1 Scope)

1. **HempRock Crew Application Services:** Premium, turn-key construction and application services for exterior siding and interior home renovations.  
2. **Contractor Training & Material Supply:** Standardized, documented training protocols for general contractors, bundled with HempRock material bucket distribution.

### Explicit Out-of-Scope Items (Excluded from v1)

* **No E-Commerce / Online Checkout:** Purchasing portals are reserved for future certified B2B user accounts.  
* **No Unreleased Consumer Goods:** Unproduced products (e.g., paper stones, bat houses, planter boxes) are excluded until field-tested in multiple live installations.  
* **No Individual Founder Profiles:** Credibility will be established through high-quality project imagery, physical sample displays, and material certifications rather than personal bios.

---

## 2\. Key Value Propositions & Core Messaging

* **Fire Resilience & Protection:** Approved for interior and exterior siding in Nevada County, California; engineered to provide home fire resilience in high-risk zones.  
* **Mold & Mildew Immunity:** Naturally alkali material composition prevents mold and mildew growth, promoting non-toxic indoor air quality.  
* **Carbon-Negative Footprint:** Traps atmospheric carbon (-50 lbs carbon footprint per unit vs. \+2,200 lbs for traditional concrete).  
* **Continuous Air Scrubbing:** Breathable material actively absorbs carbon and cleans indoor air over a multi-decade lifespan.

---

## 3\. Visual Identity & Styling Specifications

Designed for direct parsing into CSS variables within **Antigravity**:

```css
:root {
  /* Color Palette */
  --color-bg-primary: #F7F6F2;       /* Warm Off-White / Natural Cream */
  --color-bg-secondary: #EFECE6;     /* Light Stone Gray */
  --color-surface-card: #FFFFFF;     /* Pure White Card Surface */
  --color-text-primary: #1A1A1A;     /* Deep Charcoal Black */
  --color-text-muted: #5A5D5E;       /* Slate Neutral Gray */
  --color-accent-orange: #C85A2A;    /* Burnt Orange Accent */
  --color-accent-green: #2E5A44;     /* Deep Earth Green Accent */
  --color-border: #D8D4CC;           /* Subtle Sand Border */

  /* Typography */
  --font-heading: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
  --font-body: 'Open Sans', 'Roboto', system-ui, -apple-system, sans-serif;

  /* Layout Constants */
  --max-width: 1200px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```

---

## 4\. Site Architecture & Content Layout

### Section 1: Header & Navigation

* **Logo:** Text/SVG placeholder `HEMPROCK PLASTER` with subtle plaster texture motif.  
* **Nav Links:** `Overview` | `Material Performance` | `Services` | `Project Showcase` | `Contact`  
* **Header CTA:** `Request Consultation` (Scrolls to Contact Form).

### Section 2: Hero Section

* **Headline:** High-Performance, Fire-Resilient Hemp Plaster Wall Systems  
* **Subheadline:** Certified carbon-negative plaster protecting homes with proven fire resistance, mold immunity, and superior indoor air quality.  
* **Primary CTAs:**  
  * `Hire HempRock Crew` (Primary Button \- Burnt Orange)  
  * `Contractor Training & Buckets` (Secondary Button \- Outline)  
* **Hero Visual:** Full-width showcase photo of a completed HempRock exterior house application.

### Section 3: Material Performance Matrix (Comparison Table)

A clean side-by-side comparison table contrasting HempRock against standard Drywall and Concrete Siding:

| Feature / Benefit | HempRock Plaster | Stucco | Vinyl Siding | Fiber Cement |
| :---: | :---: | :---: | :---: | :---: |
| **Carbon Footprint** | **Carbon Negative\!\!\!** | High Carbon Impact | Moderate Carbon Impact | High Carbon Impact |
| **Fire Resilience** | **PENDING (Expected Class A)** | Class A or B | Not Fire Resilience Rated | Class A |
| **Mold & Mildew Resistance** | **High** | Low to Moderate | High | High |
| **Breathability (Humidity & Temperature Regulation)** | **Active \- High** | Passive \- Moderate | Non-Breathable | Low to Moderate |

| Feature / Benefit | HempRock Plaster | Standard Drywall | Plaster |
| :---: | :---: | :---: | :---: |
| **Carbon Footprint** | **Carbon Negative\!\!\!** | Moderate Carbon Impact | Moderate Carbon Impact |
| **Fire Resilience** | **PENDING (Expected Class A)** | Not Fire Resilience Rated | Not Fire Resilience Rated |
| **Mold & Mildew Resistance** | **High** | Low | Moderate to High |
| **Breathability (Humidity & Temperature Regulation)** | **Active \- High** | Low | Low to High |

### 

### Section 4: Core Services Showcase

1. **HempRock Application Crew Services**  
   * Turn-key exterior siding and interior renovation applications.  
   * Professional, coordinated crew execution.  
   * Custom smooth or stylized plaster finishes.  
2. **Contractor Training & Material Bucket Program**  
   * Standardized training protocols and documented SOPs for general contractors.  
   * Direct delivery of premixed HempRock plaster buckets to job sites.  
   * Certified material safety and quality compliance.

### Section 5: Project Visual Gallery

* High-resolution visual grid showcasing completed home applications, close-ups of plaster finishes, and physical demonstration samples to build immediate customer confidence.

### Section 6: Inquiries & Contact Form

* **Form Fields:**  
  * Full Name  
  * Email Address & Phone Number  
  * Role (`Homeowner / Property Owner`, `General Contractor`, `Architect / Designer`)  
  * Service Interest (`Hire HempRock Crew`, `Contractor Training & Buckets`, `General Inquiry`)  
  * Project Location & Details  
* **Direct Contact Info:** Telephone hotline and email consultation link.

---

## 5\. Antigravity Master Generation Prompt

To build this website directly in **Antigravity**, copy and paste the prompt below into the Antigravity prompt interface:  
```` ```text ````  
`Create a modern, clean, single-page static HTML5 website for HempRock Plaster LLC using semantic HTML, embedded clean CSS, and minimal vanilla JavaScript.`

`Design Guidelines:`  
`- Color Palette: Off-white background (#F7F6F2), dark charcoal text (#1A1A1A), light gray cards (#EFECE6), with burnt orange (#C85A2A) and dark green (#2E5A44) accents.`  
`- Typography: Use 'Montserrat' for headings and 'Open Sans' for body text via Google Fonts.`  
`- Aesthetic: Clean, professional, high-trust green-building corporate aesthetic. No overly complex animations. Responsive mobile-first design.`

`Structure Required:`  
`1. Header & Navigation bar with brand logo and smooth-scroll navigation links.`  
`2. Hero Section featuring a bold headline ("High-Performance, Fire-Resilient Hemp Plaster Wall Systems"), subheadline emphasizing fireproofing and carbon-negative properties, dual Call-to-Action buttons ("Hire HempRock Crew", "Contractor Training"), and a high-impact background card image container.`  
`3. Performance Comparison Table comparing HempRock Plaster vs Drywall vs Concrete Siding across Fire Resilience, Mold Immunity, Carbon Footprint, and Air Quality.`  
`4. Services Grid presenting two distinct service cards: "HempRock Crew Application Services" and "Contractor Training & Bucket Supply".`  
`5. Visual Project Gallery displaying a CSS grid of showcase project cards with image placeholders and captions.`  
`6. Contact & Inquiry Form with fields for Name, Email, Role Select (Homeowner / Contractor), Service Needed, and Project Notes, plus a direct hotline contact box.`

`Ensure valid, well-commented HTML5 and CSS3 in a single self-contained file ready for immediate deployment.`  
```` ``` ````  
---

## 6\. Execution Roadmap for Antigravity

1. **Prompt Ingestion:** Feed Section 5's Master Generation Prompt into Antigravity (Gemini-powered code tool).  
2. **Review Output:** Verify CSS styling against Section 3's variable palette and Section 4's layout structure.  
3. **Asset Replacement:** Replace image placeholders with high-resolution photos of completed HempRock site applications and sample bricks.  
4. **Deploy Static Build:** Publish the generated `index.html` file to a simple static host (e.g., Firebase Hosting, GitHub Pages, or Netlify).

