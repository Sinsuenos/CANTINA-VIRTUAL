const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  LevelFormat, TableOfContents,
} = require("docx");
const fs = require("fs");

const P = {
  primary: "0B1220",
  body: "1C2A3D",
  secondary: "5B6B7D",
  accent: "D4A017",
  surface: "F5F7FA",
  white: "FFFFFF",
  codeBg: "F0F2F5",
};
const c = (hex) => hex.replace("#", "");

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const allNoBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder };
const thinBorder = (color = "D0D0D0") => ({ style: BorderStyle.SINGLE, size: 1, color });
const tableBorders = {
  top: thinBorder("C0C8D0"), bottom: thinBorder("C0C8D0"),
  left: thinBorder("C0C8D0"), right: thinBorder("C0C8D0"),
  insideHorizontal: thinBorder("E0E4E8"), insideVertical: thinBorder("E0E4E8"),
};

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, font: { ascii: "Calibri" }, color: c(P.primary) })],
  });
}
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160, line: 312 },
    children: [new TextRun({ text, bold: true, size: 28, font: { ascii: "Calibri" }, color: c(P.primary) })],
  });
}
function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 280, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, size: 24, font: { ascii: "Calibri" }, color: c(P.body) })],
  });
}
function body(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 120, line: 312 },
    children: [new TextRun({ text, size: 22, font: { ascii: "Calibri" }, color: c(P.body), ...opts })],
  });
}
function bodyRuns(runs) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 120, line: 312 },
    children: runs.map(r => new TextRun({ size: 22, font: { ascii: "Calibri" }, color: c(P.body), ...r })),
  });
}
function codeBlock(lines) {
  return lines.map(line => new Paragraph({
    spacing: { after: 0, line: 260 },
    shading: { type: ShadingType.CLEAR, fill: P.codeBg },
    indent: { left: 360 },
    children: [new TextRun({ text: line, size: 18, font: { ascii: "Courier New" }, color: c(P.body) })],
  }));
}
function spacer(twips = 120) {
  return new Paragraph({ spacing: { after: twips }, children: [] });
}
function makeTable(headers, rows, colWidths) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: (colWidths[i] / totalW) * 100, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: P.surface },
        borders: tableBorders,
        margins: { top: 50, bottom: 50, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: { ascii: "Calibri" }, color: c(P.primary) })] })],
      })
    ),
  });
  const dataRows = rows.map(row =>
    new TableRow({
      cantSplit: true,
      children: row.map((cell, i) =>
        new TableCell({
          width: { size: (colWidths[i] / totalW) * 100, type: WidthType.PERCENTAGE },
          borders: tableBorders,
          margins: { top: 40, bottom: 40, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 20, font: { ascii: "Calibri" }, color: c(P.body) })] })],
        })
      ),
    })
  );
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: tableBorders, rows: [headerRow, ...dataRows] });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: { ascii: "Calibri" }, size: 22, color: c(P.body) },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: { run: { font: { ascii: "Calibri" }, size: 32, bold: true, color: c(P.primary) }, paragraph: { spacing: { before: 480, after: 200, line: 312 } } },
      heading2: { run: { font: { ascii: "Calibri" }, size: 28, bold: true, color: c(P.primary) }, paragraph: { spacing: { before: 360, after: 160, line: 312 } } },
      heading3: { run: { font: { ascii: "Calibri" }, size: 24, bold: true, color: c(P.body) }, paragraph: { spacing: { before: 280, after: 120, line: 312 } } },
    },
  },
  numbering: {
    config: [
      { reference: "next-steps-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [
    // ─── COVER ───
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: [
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE }, borders: allNoBorders,
          rows: [new TableRow({
            height: { value: 16838, rule: "exact" },
            children: [new TableCell({
              width: { size: 100, type: WidthType.PERCENTAGE }, borders: allNoBorders,
              shading: { type: ShadingType.CLEAR, fill: P.primary },
              verticalAlign: "top",
              margins: { top: 0, bottom: 0, left: 0, right: 0 },
              children: [
                new Paragraph({ spacing: { before: 4800 }, children: [] }),
                new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 200 }, indent: { left: 1200 },
                  children: [new TextRun({ text: "CANTINA VIRTUAL", size: 56, bold: true, font: { ascii: "Calibri" }, color: c(P.accent) })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 600 }, indent: { left: 1200 },
                  children: [new TextRun({ text: "Complete Project Handoff", size: 32, font: { ascii: "Calibri" }, color: c(P.white) })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, indent: { left: 1200 }, spacing: { after: 100 },
                  children: [new TextRun({ text: "The exact state of the project so another thread can continue building.", size: 22, font: { ascii: "Calibri" }, color: "8899AA" })] }),
                new Paragraph({ spacing: { before: 4000 }, children: [] }),
                new Paragraph({ alignment: AlignmentType.LEFT, indent: { left: 1200 }, spacing: { after: 80 },
                  children: [new TextRun({ text: "Generated: July 4, 2026", size: 20, font: { ascii: "Calibri" }, color: "667788" })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, indent: { left: 1200 },
                  children: [new TextRun({ text: "Next.js 16  |  TypeScript  |  Tailwind CSS 4  |  CrakRevenue Affiliate", size: 20, font: { ascii: "Calibri" }, color: "667788" })] }),
              ],
            })],
          })],
        }),
      ],
    },
    // ─── TOC ───
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 },
          pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, font: { ascii: "Calibri" }, color: c(P.secondary) })] })] }) },
      children: [
        new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: "Table of Contents", size: 32, bold: true, font: { ascii: "Calibri" }, color: c(P.primary) })] }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "(Right-click the table of contents above and select 'Update Field' to refresh page numbers after opening in Word.)", size: 18, italics: true, font: { ascii: "Calibri" }, color: c(P.secondary) })] }),
        new Paragraph({ children: [new PageBreak()] }),
      ],
    },
    // ─── BODY ───
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 },
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, font: { ascii: "Calibri" }, color: c(P.secondary) })] })] }) },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Cantina Virtual \u2014 Project Handoff", size: 16, font: { ascii: "Calibri" }, color: c(P.secondary), italics: true })] })] }) },
      children: [
        // 1. FILE TREE
        heading1("1. File Tree"),
        body("The following is the complete file tree of all Cantina Virtual source files. Only files under src/ are listed; the project also contains standard Next.js infrastructure (package.json, tsconfig.json, next.config.ts, etc.) and a large set of unused shadcn/ui components under src/components/ui/ that are not part of the Cantina render path."),
        ...codeBlock([
          "src/",
          "\u251c\u2500\u2500 app/",
          "\u2502   \u251c\u2500\u2500 globals.css          # Full design system",
          "\u2502   \u251c\u2500\u2500 layout.tsx            # Root layout, metadata",
          "\u2502   \u2514\u2500\u2500 page.tsx              # Entry: state machine",
          "\u251c\u2500\u2500 components/",
          "\u2502   \u2514\u2500\u2500 cantina/",
          "\u2502       \u251c\u2500\u2500 DistrictScene.tsx     # Active",
          "\u2502       \u251c\u2500\u2500 EncounterCard.tsx     # Active",
          "\u2502       \u251c\u2500\u2500 FanvueCard.tsx        # DEAD",
          "\u2502       \u251c\u2500\u2500 MariposaCenterpiece.tsx # Active",
          "\u2502       \u251c\u2500\u2500 NectarHUD.tsx         # Active",
          "\u2502       \u251c\u2500\u2500 OfferButton.tsx       # DEAD",
          "\u2502       \u251c\u2500\u2500 RoomCard.tsx          # Unused",
          "\u2502       \u251c\u2500\u2500 SaleTier.tsx          # Unused",
          "\u2502       \u251c\u2500\u2500 SidebarHub.tsx        # Active",
          "\u2502       \u2514\u2500\u2500 SmokeParticles.tsx     # Active",
          "\u251c\u2500\u2500 data/",
          "\u2502   \u2514\u2500\u2500 rooms.ts              # Data layer + affiliates",
          "\u2514\u2500\u2500 hooks/",
          "    \u2514\u2500\u2500 useReveal.ts           # Unused",
        ]),
        spacer(),

        // 2. FILE INVENTORY
        heading1("2. File Inventory"),
        body("Every file in the Cantina Virtual source tree, its status in the render path, and a precise description of its role. Files marked DEAD have zero imports anywhere and are safe to delete. Files marked Unused are on disk but not currently referenced by any active render path."),
        makeTable(
          ["File", "Status", "Purpose"],
          [
            ["layout.tsx", "Active", "Root layout. Sets metadata (title, OG, Twitter). Imports globals.css. No custom fonts loaded; body uses system monospace."],
            ["page.tsx", "Active", "Entry point. State machine: locked > exiting > unlocked. Password gate, Cantina layout, district switching logic. Contains unused HERO_BG constant."],
            ["globals.css", "Active", "Complete design system. CSS custom properties, 15+ keyframe animations, all component styles, responsive breakpoint at 768px."],
            ["rooms.ts", "Active", "Data layer. Private AFFILIATE_MAP, resolveOfferLink() gate, RESIDENTS (4), DISTRICTS (5), SALE_TIERS (3, platform-only)."],
            ["SidebarHub.tsx", "Active", "Fixed sidebar with 5 district nav buttons. Renders brand header, divider, nav list, footer. Bottom bar on mobile."],
            ["DistrictScene.tsx", "Active", "Full-scene renderer per district: bg image at 0.12 opacity, gradient overlay, header with neon title, encounter cards."],
            ["EncounterCard.tsx", "Active", "Image-first card with resident portrait, name, subtitle, description, 'Send a Drink' CTA. Uses resolveOfferLink()."],
            ["MariposaCenterpiece.tsx", "Active", "Butterfly emoji + nectar drip SVG elements. 'dead' prop for password rejection state (opacity 0.1)."],
            ["SmokeParticles.tsx", "Active", "6 ambient CSS-only floating particles. Renders on password screen and inside Cantina main."],
            ["NectarHUD.tsx", "Active", "Fixed bottom-right overlay. Fake nectar count increments every 8s with pulse animation."],
            ["RoomCard.tsx", "Unused", "Legacy room doorway component. Imports non-existent Room type and ROOM_BG_IMAGES. Zero imports. Broken if rendered."],
            ["SaleTier.tsx", "Unused", "Platform mode pricing cell. Imports SaleTier type from rooms.ts. Zero imports in World render path."],
            ["FanvueCard.tsx", "Dead", "Imports non-existent LINKS and FanvueEntry from rooms.ts. Zero imports. Broken if rendered."],
            ["OfferButton.tsx", "Dead", "Imports non-existent LINKS and LinkKey from rooms.ts. Zero imports. Broken if rendered."],
            ["useReveal.ts", "Unused", "IntersectionObserver scroll-reveal hook. No elements currently use the 'reveal' class."],
          ],
          [25, 12, 63]
        ),
        spacer(),

        // 3. ROUTING
        heading1("3. Routing and Navigation"),
        body("The application uses a single route (/) with all navigation handled client-side through React state. There is no Next.js file-based routing, no dynamic routes, and no API routes used by the Cantina. The src/app/api/route.ts file exists from the project scaffold but is not consumed by any Cantina component."),
        heading2("3.1 State Machine (page.tsx)"),
        body("The Home component manages a three-state machine using useState. The initial state is 'locked', which renders the PasswordScreen. When the correct password is entered, the state transitions to 'exiting', which plays a 500ms blur-fade animation. After the timeout, the state becomes 'unlocked' and the Cantina component renders. There is no way to return to the password screen without a full page reload."),
        ...codeBlock([
          "type ViewState = 'locked' | 'exiting' | 'unlocked';",
          "",
          "locked    -> user enters 'mariposa' -> exiting (500ms blur-fade)",
          "exiting   -> setTimeout 500ms     -> unlocked (Cantina renders)",
          "unlocked  -> (no exit path)       -> stays until page reload",
        ]),
        heading2("3.2 District Switching"),
        body("Inside the Cantina component, district navigation is managed by two state variables: activeDistrict (the currently selected district ID) and displayedDistrict (the district actually rendered). When the user clicks a sidebar button, the handleDistrictChange callback triggers a 500ms scene-exit animation on the main content area, then swaps both state values, applies an 800ms scene-transition fade-in, and removes the animation class after it completes. A 'transitioning' boolean guard prevents double-clicks from interrupting the transition."),
        heading2("3.3 Mobile Navigation"),
        body("On screens narrower than 768px, the sidebar transforms into a fixed bottom tab bar via CSS media query. The brand header, divider, and footer text are hidden. Nav items switch from vertical to horizontal layout with icons-only (dot) display. The main content area shifts from left margin 220px to bottom margin 72px. Scene backgrounds and overlays extend to full width (left: 0)."),
        spacer(),

        // 4. DATA LAYER
        heading1("4. Data Layer (rooms.ts)"),
        body("The file src/data/rooms.ts is the single source of truth for all Cantina data. It is organized into three sections: an internal affiliate mapping that is never exported, a link resolution gate function, and world-facing data structures that UI components consume."),
        heading2("4.1 Affiliate Architecture"),
        body("The AFFILIATE_MAP is a private Record<string, string> that maps resident IDs to their CrakRevenue affiliate URLs. It is deliberately not exported. All outbound traffic flows through the single exported function resolveOfferLink(residentId: string): string, which looks up the ID, logs every resolution to the console, and returns '#' with a console warning if the ID is not found. This means adding a new affiliate link requires only adding an entry to AFFILIATE_MAP; no UI code changes are needed."),
        body("Current affiliate mappings:"),
        ...codeBlock([
          "girlfriendgpt   -> t.vlmai-1.com/413627/7477?aff_sub=SSUENOS...",
          "lina-rose       -> t.acust-9.com/413627/10396/0?aff_sub=SinNoches_REV25...",
          "ava-harrington  -> t.acust-9.com/413627/10397/0?aff_sub=GPrivado_REV_AvaH...",
          "isla-king       -> t.acust-9.com/413627/10364/0?aff_sub=SinNocturn_IslaKing...",
        ]),
        heading2("4.2 Resident Interface"),
        body("Each resident is defined by the Resident interface with five fields: id (string, used as the key in RESIDENTS and for affiliate lookup), name (display name), subtitle (atmospheric label), description (one-line flavor text), and image (URL to portrait hosted on sfile.chatglm.cn). Residents are stored in a Record<string, Resident> dictionary, keyed by their ID."),
        heading2("4.3 Current Residents (4)"),
        makeTable(
          ["ID", "Name", "Subtitle", "District"],
          [
            ["lina-rose", "Lina Rose", "Resident of Sinaloa Sue\u00f1os", "Dating Lounge"],
            ["ava-harrington", "Ava Harrington", "Evening residency, warm light", "Dating Lounge"],
            ["girlfriendgpt", "GirlfriendGPT", "Summer residency, Perla Puente", "AI Companions"],
            ["isla-king", "Isla King", "Private residency, Golfo Privado", "Live Cam District"],
          ],
          [22, 22, 36, 20]
        ),
        heading2("4.4 District Interface"),
        body("Each district is defined by the District interface. The id is used for React keys and state comparison. name and subtitle are the English and Spanish names displayed in the header. neonClass maps to one of five CSS neon-pulse classes. dividerClass maps to the corresponding gradient divider class. description is atmospheric flavor text. borderColor is an rgba color used for sidebar dot glow. textColor is a CSS variable reference string. bgImage is the URL for the fixed background at 0.12 opacity. encounters is an array of DistrictEncounter objects, each containing only a residentId string."),
        heading2("4.5 Current Districts (5)"),
        makeTable(
          ["District", "Spanish Name", "Neon", "Encounters"],
          [
            ["Dating Lounge", "Sinaloa Sue\u00f1os", "Amber", "2 (lina-rose, ava-harrington)"],
            ["AI Companions", "Perla Puente", "Cyan", "1 (girlfriendgpt)"],
            ["Live Cam District", "Golfo Privado", "Purple", "1 (isla-king)"],
            ["Gaming District", "Arcade Nocturno", "Emerald", "0 (empty)"],
            ["Communities", "Niche District", "Rose", "0 (empty)"],
          ],
          [25, 25, 15, 35]
        ),
        heading2("4.6 SaleTier (Platform Mode Only)"),
        body("The SaleTier interface and SALE_TIERS array are exported from rooms.ts but are not imported or rendered by any component in the World mode render path. They were designed for a platform-mode pricing display that was never implemented in the current World build. The three tiers are Premium ($109/yr, 39% off), Deluxe ($199/yr, 53% off), and Elite ($239/yr, 60% off, with 'BEST' badge). The SaleTier.tsx component exists but has zero imports."),
        spacer(),

        // 5. COMPONENT ARCHITECTURE
        heading1("5. Component Architecture"),
        heading2("5.1 page.tsx \u2014 Home (Entry Point)"),
        body("The Home component is the default export and root of the application. It renders three conditional branches based on the ViewState state machine. It always renders NectarHUD (fixed overlay, z-index 50). In the 'exiting' state, it renders a full-screen div with the password screen background and the scene-exit animation class. In 'locked', it renders PasswordScreen. In 'unlocked', it renders Cantina."),
        heading3("PasswordScreen"),
        body("A client component with local state for input, shaking, mariposaDead, and showReject. On mount, it auto-focuses the input. The handleSubmit callback compares the trimmed lowercase input to 'mariposa'. On match, it calls onUnlock(). On mismatch, it triggers the shake animation, sets mariposaDead to true (butterfly fades to 10% opacity), shows the rejection text 'Not tonight, forastero.' in red, and resets everything after 2000ms. The visual layout centers vertically with a radial gradient background, the MariposaCenterpiece butterfly, a typewriter-animated 'The cantina is listening...' text, a password input with amber border, an Enter button with amber fill-on-hover, and a hint at the bottom: 'The password hides in the videos'."),
        heading3("Cantina"),
        body("The Cantina component manages district navigation state and renders the full layout. It uses activeDistrict and displayedDistrict state (both initialized to DISTRICTS[0].id, which is 'dating-lounge'). The handleDistrictChange callback guards against double-clicks with a transitioning flag, applies scene-exit class to the main element, waits 500ms, swaps both district states, applies scene-transition class, clears transitioning, and removes scene-transition after 800ms. The layout includes two floating butterfly emojis with the mariposa class (positioned absolutely, one at top-right and one at left), the SidebarHub, the DistrictScene for the current district, SmokeParticles, a nectar teaser bar at the bottom, and a footer with a copyright line and a Discord link (currently pointing to 'https://discord.gg/' \u2014 a placeholder)."),
        heading2("5.2 SidebarHub"),
        body("Props: activeDistrict (string), onDistrictChange (callback). Renders a fixed-position nav element (sidebar-hub class). Contains a brand header ('Cantina' / 'Virtual'), a gradient divider, and a list of all 5 districts from the DISTRICTS array. Each district renders as a button with a colored dot (6px circle), the district name, and the Spanish subtitle. The active district gets a glowing dot (box-shadow using borderColor) and colored text. On mobile (<768px), CSS transforms this into a bottom tab bar with the brand, divider, and footer hidden."),
        heading2("5.3 DistrictScene"),
        body("Props: district (District object). Renders a full-viewport scene with three layers: a fixed background image at 0.12 opacity, a gradient overlay for readability, and a content area. The content includes a district header (Spanish subtitle in muted text, English name with neon pulse class, gradient divider, atmospheric description), and an encounter grid. If the district has encounters, each one renders as an EncounterCard with the resident data and the district's textColor. If the district has no encounters, it renders 'Residents arriving soon.' in dim italic text."),
        heading2("5.4 EncounterCard"),
        body("Props: resident (Resident object), ctaColor (string, CSS color for CTA border/text). The entire card is an <a> tag linking to resolveOfferLink(resident.id) in a new tab. The card has an image section (background-image, 3:2 aspect ratio, gradient overlay from bottom) and a body section with the resident name, subtitle, description, and a 'Send a Drink' CTA button using the cta-bordered class with inline border and color styles. This is the only consumer of resolveOfferLink()."),
        heading2("5.5 MariposaCenterpiece"),
        body("Props: dead (optional boolean). Renders a butterfly emoji with CSS mariposaGlow animation, three nectar drip elements with staggered animation delays (0s, 0.7s, 1.3s), and a nectar pool shimmer element. When dead=true, the entire wrapper gets opacity: 0.1 and filter: none (killing the glow animation) with a 0.3s transition. Used only on the password screen."),
        heading2("5.6 SmokeParticles"),
        body("No props. Renders a container div with 6 smoke-particle divs, each positioned at 15% + i*14% from the left, with staggered animation delays (i * 1.2s) and durations (5s + i * 0.8s). The smokeRise keyframe moves particles upward 120px while scaling to 2.5x and fading to 0. Used on both the password screen and inside the Cantina main area."),
        heading2("5.7 NectarHUD"),
        body("No props. A client component with useState for count (starts at 0) and pulse (boolean). A useEffect sets an 8-second interval that increments count and triggers a 600ms pulse animation. Renders a fixed bottom-right div with a honey emoji, 'Nectar' label, and the count. The HUD has a persistent 4s pulsing box-shadow glow. This is a cosmetic placeholder for a future loyalty/points system."),
        spacer(),

        // 6. UX FLOW
        heading1("6. Complete UX Flow"),
        body("This section describes every user interaction path through the application, including timing, animations, and conditional branches."),
        heading2("6.1 Password Gate"),
        body("When the user first loads the page, they see a dark screen with a radial gradient background (warm brown at center-bottom fading to deep navy). The MariposaCenterpiece butterfly glows pink with dripping nectar. Six smoke particles float upward. A typewriter animation reveals 'The cantina is listening...' in amber. Below, a label says 'Whisper the password' with a text input and Enter button."),
        body("Correct password ('mariposa'): The state transitions to 'exiting', playing a 500ms blur-fade-out animation on the password screen. The NectarHUD appears immediately. After 500ms, the Cantina renders with an 800ms blur-fade-in transition."),
        body("Incorrect password: The entire screen shakes (0.4s screenShake keyframe), the butterfly fades to near-invisible (opacity 0.1), and red text appears: 'Not tonight, forastero.' After 2 seconds, everything resets: shake stops, butterfly revives, rejection text disappears, input clears and re-focuses."),
        heading2("6.2 Cantina Navigation"),
        body("After unlocking, the user sees the Cantina layout: a 220px sidebar on the left (or bottom bar on mobile) and a main content area. The default district is 'Dating Lounge' (Sinaloa Sue\u00f1os). Two butterflies float in the main area. The district scene shows a fixed background image at low opacity with a gradient overlay, a neon-pulsing district name, a gradient divider, atmospheric description text, and encounter cards in a responsive grid."),
        body("District switching: Clicking a sidebar button triggers a 500ms blur-fade-out on the main content. After the exit animation, the district data swaps instantly (including background image). An 800ms blur-fade-in plays. During the transition, additional clicks are ignored. The background image has a 1.2s CSS opacity transition, so it crossfades with the overlay."),
        heading2("6.3 Encounter Interaction"),
        body("Each encounter card is a clickable link. Hovering lifts the card 2px and adds a deep box-shadow. Clicking opens the affiliate link in a new tab (target='_blank', rel='noopener noreferrer'). The link is resolved through resolveOfferLink(), which maps the resident ID to a CrakRevenue tracking URL. If no affiliate link exists for a resident, the link resolves to '#' and a console warning is logged."),
        heading2("6.4 Empty Districts"),
        body("Districts with zero encounters render a single line of text: 'Residents arriving soon.' in dim italic. Currently, Gaming District (Arcade Nocturno) and Communities (Niche District) show this state. No placeholder imagery or skeleton loading is rendered."),
        heading2("6.5 Nectar HUD"),
        body("A persistent fixed overlay in the bottom-right corner shows a honey emoji, 'Nectar' label, and a numeric count. The count increments by 1 every 8 seconds with a 0.6s pulse animation on the number. The entire HUD has a 4s ambient glow pulse. This is purely decorative with no backend integration. The count resets to 0 on every page load."),
        spacer(),

        // 7. CSS ARCHITECTURE
        heading1("7. CSS Architecture"),
        heading2("7.1 Design Tokens (CSS Custom Properties)"),
        body("All visual constants are defined as CSS custom properties on :root. These are the single source of truth for colors used throughout the application. Components reference these variables via var() rather than hardcoded values."),
        makeTable(
          ["Token", "Value", "Usage"],
          [
            ["--bg-deep", "#0a0e17", "Page background, sidebar background"],
            ["--bg-card", "#0f1520", "Card body background, encounter card body"],
            ["--bg-card-hover", "#151d2e", "Defined but not actively used"],
            ["--amber", "#d4a017", "Primary accent. Password screen, Dating Lounge, CTA"],
            ["--amber-dim", "#a67c12", "Scrollbar thumb, nectar drip gradient end"],
            ["--purple", "#7b2d8e", "Live Cam District neon and accent"],
            ["--purple-dim", "#5a1f6a", "Defined, not actively used in components"],
            ["--cyan", "#00f5ff", "AI Companions neon and accent"],
            ["--cyan-dim", "#00b8bf", "Defined, not actively used"],
            ["--emerald", "#00ff88", "Gaming District neon and accent"],
            ["--emerald-dim", "#00b860", "Defined, not actively used"],
            ["--rose", "#e91e8c", "Communities neon and accent"],
            ["--rose-dim", "#b0156a", "Defined, not actively used"],
            ["--text-primary", "#e8e0d4", "Main text color, headings, card names"],
            ["--text-muted", "#6b6560", "Descriptions, subtitles, secondary text"],
            ["--text-dim", "#3d3a37", "Hints, footer text, empty state, labels"],
            ["--sale-red", "#ff3b3b", "Password rejection text, sale pulse"],
            ["--sale-green", "#00e676", "Sale tier price text (platform mode)"],
            ["--card-radius", "4px", "Border radius for cards, HUD"],
          ],
          [22, 18, 60]
        ),
        heading2("7.2 Typography"),
        body("The body font-family is set to 'Courier New', 'Lucida Console', monospace. This gives the entire Cantina a terminal/noir aesthetic. There is no Inter or custom font loaded; the layout.tsx metadata references Inter in the original scaffold but does not import it. All text sizes are defined inline via Tailwind utility classes (text-xs, text-sm, text-lg, etc.) or in CSS classes with fixed pixel/rem values."),
        heading2("7.3 CSS Class Systems"),
        body("The globals.css file defines several reusable class systems that components use directly (not via Tailwind utility classes):"),
        bodyRuns([
          { text: "Neon pulse classes: ", bold: true },
          { text: ".neon-amber, .neon-purple, .neon-cyan, .neon-emerald, .neon-rose \u2014 each applies the district accent color as text color and a 2\u20132.5s infinite neonPulse keyframe animation with staggered delays (0s, 0.3s, 0.6s, 0.9s, 1.2s)." },
        ]),
        bodyRuns([
          { text: "Divider classes: ", bold: true },
          { text: ".divider-amber, .divider-purple, .divider-cyan, .divider-emerald, .divider-rose \u2014 each renders a 1px-tall element with a horizontal gradient from transparent through the district color to transparent at 0.3 opacity." },
        ]),
        bodyRuns([
          { text: "CTA system: ", bold: true },
          { text: ".cta-bordered \u2014 shared button/anchor style: transparent background, inline-block, 10px uppercase text with 0.15em letter-spacing, 2px border-radius, 0.4s transition. On hover: brightness(1.3) + 0 0 14px box-shadow in currentColor. Border and color are set inline per-instance." },
        ]),
        bodyRuns([
          { text: "Encounter card: ", bold: true },
          { text: ".encounter-card (flex column, 4px radius, 1px subtle border, 0.4s transition, no-underline), .encounter-card-image (3:2 aspect ratio, background cover, gradient overlay from transparent to bg-card), .encounter-card-body (14px padding, flex column, 4px gap)." },
        ]),
        bodyRuns([
          { text: "Sidebar: ", bold: true },
          { text: ".sidebar-hub (fixed, 220px wide, bg-deep, flex column), .sidebar-brand (brand name/sub), .sidebar-nav (list, flex column, 2px gap), .sidebar-item (button, flex row, 10px gap, hover bg), .sidebar-dot (6px circle, glow on active), .sidebar-item-name/sub (uppercase, tracked)." },
        ]),
        bodyRuns([
          { text: "District scene: ", bold: true },
          { text: ".district-scene (relative, min-height 100vh, flex column), .district-scene-bg (fixed, left: 220px, opacity 0.12, 1.2s opacity transition), .district-scene-overlay (fixed gradient), .district-scene-content (relative, z-2, max-width 900px, 60px/40px padding)." },
        ]),
        heading2("7.4 Animation Inventory"),
        body("Every keyframe animation defined in globals.css, its properties, and where it is used:"),
        makeTable(
          ["Animation", "Duration", "What It Does", "Used By"],
          [
            ["neonPulse", "2\u20132.5s infinite", "Pulsing text-shadow glow on text", "District name headings (5 neon classes)"],
            ["mariposaGlow", "3s infinite", "Drop-shadow glow on butterfly", "MariposaCenterpiece wrapper"],
            ["nectarDrip", "2s infinite", "TranslateY + scaleY drip motion", "3 nectar drip elements on password screen"],
            ["nectarShimmer", "2s infinite", "Opacity pulse on pool glow", "Nectar pool under butterfly"],
            ["typewriter", "2.5s steps(28)", "Width 0 to 100% reveal", "Password screen hint text"],
            ["blinkCaret", "0.8s infinite", "Border color amber/transparent", "Password screen caret"],
            ["butterflyFloat", "8s infinite", "Translate + rotate floating path", "2 floating butterflies in Cantina"],
            ["wingFlap", "0.4s infinite", "ScaleX 1 to 0.3 (wing flap)", "Butterfly emojis"],
            ["smokeRise", "5\u20139s infinite", "Rise 120px, scale 2.5x, fade out", "6 smoke particles"],
            ["screenShake", "0.4s", "TranslateX jitter (-8px to +8px)", "Wrong password"],
            ["sceneFadeOut", "500ms", "Opacity 1 to 0, blur 0 to 8px", "District switch exit, password exit"],
            ["sceneFadeIn", "800ms", "Opacity 0 to 1, blur 8px to 0", "District switch entry"],
            ["fadeIn", "1s", "Opacity 0 to 1", "Rejection text appearance"],
            ["nectarHudPulse", "4s infinite", "Box-shadow glow pulse", "Nectar HUD container"],
            ["nectarCountPulse", "0.6s", "Opacity 0.6 to 1 to 0.6", "Nectar count on increment"],
            ["salePulse", "2s infinite", "Box-shadow red glow pulse", "Sale cards (platform mode)"],
            ["heroDrift", "20s infinite", "Background-position drift", "UNUSED \u2014 hero section removed"],
          ],
          [18, 15, 37, 30]
        ),
        heading2("7.5 Responsive Breakpoint"),
        body("A single media query at max-width: 768px handles all mobile adaptations. The sidebar transforms from a 220px fixed left column to a full-width fixed bottom bar. The brand, divider, and footer are hidden. Nav items go horizontal with 7\u20138px font and ellipsis truncation. Main content loses the left margin and gains a 72px bottom margin. Scene backgrounds extend full width. The encounter grid goes from auto-fill minmax(260px, 1fr) to single column. Padding values decrease from 60px/40px to 32px/20px."),
        spacer(),

        // 8. IMAGE INVENTORY
        heading1("8. Image Inventory"),
        body("All images are hosted on sfile.chatglm.cn and referenced by URL. There are no local image assets in the public/ directory (only robots.txt and a logo.svg from the scaffold). The following table lists every image URL used in the application, where it is referenced, and its purpose."),
        makeTable(
          ["URL Path", "Used In", "Purpose"],
          [
            [".../efdf6cbf206b.jpg", "RESIDENTS lina-rose", "Portrait for Lina Rose encounter card"],
            [".../8c23e2c5aa19.jpg", "RESIDENTS ava-harrington", "Portrait for Ava Harrington encounter card"],
            [".../45b22e591c90.png", "RESIDENTS girlfriendgpt", "Portrait for GirlfriendGPT encounter card"],
            [".../8e81418a549d.jpg", "RESIDENTS isla-king", "Portrait for Isla King encounter card"],
            [".../91b93c38ff40.jpg", "DISTRICTS dating-lounge", "Background image at 0.12 opacity"],
            [".../0eb8607628ce.jpg", "DISTRICTS ai-companions", "Background image at 0.12 opacity"],
            [".../310a4b1925d7.jpg", "DISTRICTS live-cam", "Background image at 0.12 opacity"],
            [".../fcef82f7bbdf.png", "DISTRICTS gaming", "Background image at 0.12 opacity"],
            [".../508f8158b122.jpg", "DISTRICTS communities", "Background image at 0.12 opacity"],
            [".../b4e9051f97b1.jpg", "HERO_BG constant (unused)", "Declared but never referenced in render"],
          ],
          [30, 35, 35]
        ),
        spacer(),

        // 9. BUILD STATUS
        heading1("9. Build Status and Configuration"),
        heading2("9.1 Build Status"),
        body("The project builds cleanly with zero errors and zero warnings. The last verified build was confirmed after rolling back invented (non-affiliate) resident content. The build command is 'next build' and it produces a standalone output in .next/standalone/. The build script also copies .next/static and public/ into the standalone directory for deployment."),
        heading2("9.2 next.config.ts"),
        body("The Next.js config is minimal. Output mode is 'standalone' for containerized deployment. TypeScript build errors are suppressed (ignoreBuildErrors: true) because the scaffold includes many unused shadcn/ui components and the dead Cantina components that import non-existent exports. React strict mode is disabled (reactStrictMode: false) to prevent double-rendering effects during development."),
        heading2("9.3 tsconfig.json"),
        body("Target ES2017, strict mode enabled, noEmit true, noImplicitAny false. Path alias @/* maps to ./src/*. Module resolution is 'bundler'. The JSX transform is react-jsx (not the classic runtime). Incremental compilation is enabled."),
        heading2("9.4 Key Dependencies"),
        body("The project uses Next.js 16.1.1, React 19, TypeScript 5, Tailwind CSS 4, and a large set of scaffold dependencies including shadcn/ui (Radix primitives), Prisma, Zustand, Framer Motion, Recharts, and many others. The Cantina itself uses none of these heavy dependencies \u2014 it is pure React + CSS with no state management library, no database, no API routes, and no third-party UI components. The actual runtime footprint is minimal."),
        heading2("9.5 Font"),
        body("Despite the layout.tsx scaffold originally referencing Inter, no custom font is loaded. The body font-family in globals.css is 'Courier New', 'Lucida Console', monospace. This gives the noir/terminal aesthetic. The favicon is a data URI SVG lantern emoji."),
        spacer(),

        // 10. COMPLIANCE
        heading1("10. Compliance Status"),
        body("This section documents the current state of legal and compliance requirements for the Cantina Virtual site."),
        heading2("10.1 Password Gate"),
        body("Implemented. The password is 'mariposa', compared case-insensitively with trim. This prevents casual browsing but is client-side only \u2014 the password string is visible in the page.tsx source. This is a UX gate, not a security measure."),
        heading2("10.2 Affiliate Link Hygiene"),
        body("Verified clean. Zero matches for REV, PPS, %, $40, revenue, or affiliate in any .tsx or .css render path. All outbound links flow through resolveOfferLink() in rooms.ts. The AFFILIATE_MAP is private and never exported. The only CTA language in the UI is 'Send a Drink' (a single instance in EncounterCard.tsx). No raw affiliate URLs appear in any rendered component."),
        heading2("10.3 18+ / DMCA / 2257 Footer"),
        body("NOT IMPLEMENTED. This was identified as a locked requirement but no code has been written. The current footer only shows 'Cantina Virtual \u00b7 Pacific Coast \u00b7 2025' and a Discord link. An age verification disclaimer, DMCA notice, and 18 U.S.C. 2257 compliance statement need to be added to the district footer area."),
        spacer(),

        // 11. KNOWN BUGS
        heading1("11. Known Bugs and Dead Code"),
        body("The following issues exist in the current codebase. None are blocking, but all should be addressed before a production deployment."),
        heading2("11.1 Dead Code on Disk"),
        makeTable(
          ["File", "Issue", "Safe to Delete?"],
          [
            ["FanvueCard.tsx", "Imports non-existent LINKS and FanvueEntry. Zero imports. Would crash if rendered.", "Yes"],
            ["OfferButton.tsx", "Imports non-existent LINKS and LinkKey. Zero imports. Would crash if rendered.", "Yes"],
            ["RoomCard.tsx", "Imports non-existent Room and ROOM_BG_IMAGES. Zero imports. Would crash if rendered.", "Yes"],
            ["SaleTier.tsx", "Valid imports but zero consumers in World render path.", "Yes"],
            ["useReveal.ts", "Valid hook but no elements use the 'reveal' class.", "Yes, or keep for future use"],
          ],
          [22, 55, 23]
        ),
        heading2("11.2 Unused Constants"),
        body("The HERO_BG constant on line 11 of page.tsx ('https://sfile.chatglm.cn/images-ppt/b4e9051f97b1.jpg') is declared but never referenced. It was the hero section background image before that section was removed. Harmless dead code, but should be cleaned up."),
        heading2("11.3 Placeholder Discord Link"),
        body("The Discord link in the Cantina footer points to 'https://discord.gg/' \u2014 an incomplete URL. It will lead to a Discord error page. This needs to be replaced with the actual Discord invite link."),
        heading2("11.4 TypeScript Errors Suppressed"),
        body("The next.config.ts has ignoreBuildErrors: true, which hides TypeScript errors during builds. The dead components (FanvueCard, OfferButton, RoomCard) import non-existent exports and would cause type errors if this flag were removed. Once the dead files are deleted, this flag should be set to false."),
        heading2("11.5 NectarHUD Resets on Navigation"),
        body("The NectarHUD count resets to 0 on every full page reload because it uses local state with no persistence. This is by design for now (it is a decorative placeholder), but if a real loyalty system is implemented, the count will need server-side persistence."),
        heading2("11.6 No 18+ Compliance Footer"),
        body("As documented in Section 10.3, the required legal compliance footer is missing. This is the most significant gap before any public deployment."),
        spacer(),

        // 12. POPULATION RECIPE
        heading1("12. Population Recipe"),
        body("When the user provides content for the two empty districts (Gaming and Communities), the following three-step process adds a new resident. This is the only code change required \u2014 no new components or CSS classes are needed."),
        heading2("Step 1: Add Resident to RESIDENTS"),
        body("In src/data/rooms.ts, add a new entry to the RESIDENTS Record. The id must be unique and URL-safe (used as a dictionary key and for affiliate lookup). The image URL must point to a portrait hosted on an accessible CDN."),
        ...codeBlock([
          "'new-resident': {",
          "  id: 'new-resident',",
          "  name: 'Display Name',",
          "  subtitle: 'Atmospheric label',",
          "  description: 'Flavor text for the encounter card.',",
          "  image: 'https://example.com/portrait.jpg',",
          "},",
        ]),
        heading2("Step 2: Add Affiliate Link (if applicable)"),
        body("In the same file, add an entry to the private AFFILIATE_MAP. The key must match the resident ID exactly. The value is the full CrakRevenue tracking URL. If there is no affiliate link, skip this step \u2014 resolveOfferLink() will return '#' and log a warning."),
        ...codeBlock([
          "const AFFILIATE_MAP = {",
          "  // ... existing entries ...",
          "  'new-resident': 'https://t.acust-9.com/413627/XXXXX/0?aff_sub=...'",
          "};",
        ]),
        heading2("Step 3: Add Encounter to District"),
        body("Find the target district in the DISTRICTS array and add a new entry to its encounters array. Only the residentId is needed \u2014 the DistrictScene component handles all rendering."),
        ...codeBlock([
          "// In the 'gaming' district:",
          "encounters: [",
          "  { residentId: 'new-resident' },",
          "],",
        ]),
        body("After these three changes, the new resident will appear as an encounter card in the district scene with their portrait, name, subtitle, description, and a 'Send a Drink' CTA that opens the affiliate link. No other files need to be modified."),
        spacer(),

        // 13. NEXT STEPS
        heading1("13. Next Recommended Milestones"),
        body("The following are the recommended next steps, in priority order, for continuing development on Cantina Virtual."),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Implement compliance footer: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "Add 18+ age verification disclaimer, DMCA notice, and 18 U.S.C. 2257 compliance statement to the district-footer area in page.tsx. This is the most critical gap before any public deployment.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Delete dead code: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "Remove FanvueCard.tsx, OfferButton.tsx, RoomCard.tsx, and SaleTier.tsx. Remove the unused HERO_BG constant from page.tsx. Remove the SALE_TIERS export and SaleTier interface from rooms.ts if platform mode is definitively abandoned.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Update Discord link: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "Replace the placeholder 'https://discord.gg/' with the actual Discord server invite URL in the Cantina footer.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Enable TypeScript strict checks: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "After deleting dead files, set ignoreBuildErrors to false in next.config.ts and fix any remaining type errors. This prevents future broken imports from going undetected.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Populate empty districts: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "Follow the three-step population recipe in Section 12 to add residents to Gaming District (Arcade Nocturno) and Communities (Niche District). The user needs to provide resident data (name, subtitle, description, portrait image) and affiliate links.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "next-steps-list", level: 0 }, spacing: { after: 100, line: 312 },
          children: [
            new TextRun({ text: "Consider Nectar HUD persistence: ", bold: true, size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
            new TextRun({ text: "If the nectar/loyalty system becomes real, move the count to localStorage or a backend store so it survives page reloads.", size: 22, font: { ascii: "Calibri" }, color: c(P.body) }),
          ],
        }),
      ],
    },
  ],
});

const OUTPUT = "/home/z/my-project/download/Cantina_Virtual_Project_Handoff.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT, buf);
  console.log("Generated:", OUTPUT);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});