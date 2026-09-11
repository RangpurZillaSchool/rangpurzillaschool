# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Current students, guardians, and teachers of Rangpur Zilla School looking up live SIS information (student directories, fee and payment statements, notices, routines, and exam results), as well as visitors and alumni exploring school heritage.

## Product Purpose

A modernized, high-performance web portal for Rangpur Zilla School (established 1832). It provides instant, transparent access to live school information, real-time fee queries, and an accessible institutional archive.

## Positioning

An independent student educational project and technical showcase that provides a modern, responsive, and animated user experience while interfacing directly with the official Rangpur Zilla School backend without storing student data.

## Operating Context

Web portal accessed primarily via mobile devices and desktop web browsers by students, parents, and school staff in Rangpur, Bangladesh. Needs to work reliably on standard internet connections with instantaneous response times and authentic Bengali typography.

## Capabilities and Constraints

- **Capabilities**:
  - Live student directory lookup by class, shift, and section.
  - Live payment statement & quarter fee breakdown directly from the official school database.
  - Interactive payment popup modal on student cards.
  - Notice board with search and detail pages.
  - Academic exam results, downloads archive, and photo gallery lightbox.
  - Multi-theme support (Light, Dark, Sepia, Nord, Emerald, Sunset, Cyberpunk, Dracula, Forest, Ocean, Rose, Coffee).
  - Responsive layout, organic micro-interactions, and route change scroll restoration.
- **Constraints**:
  - Zero student, teacher, or payment data stored in code or database; all queried live from the school's official ASP.NET SIS server.
  - Authentic Bengali typography (Purno font) and institutional prestige preserved.
  - No git commits or pushes without explicit user permission.

## Brand Commitments

- Name: Rangpur Zilla School (রংপুর জিলা স্কুল)
- Identity: Established 1832 by Lord William Bentinck, 194 years of tradition.
- Institutional navy (`#0f2b5c`), gold/amber (`#c59b27`), and dark slate palettes.
- Prominent educational disclaimer badge and modal: Student Educational Project.

## Evidence on Hand

- Real scraped/live-fetched datasets: 494 notices, 195 official forms/downloads, 55 teachers/staff records, 2,109 students across 9 grades.
- Live ASP.NET WebForms endpoint integration (`http://automation.sib.gov.bd/PaymentHistory.aspx` and student directory).
- Official school logo and headmaster information.

## Product Principles

1. **Zero Data Retention**: Never save sensitive student or financial records on disk or in repository code; always proxy and query live.
2. **Speed & Accessibility**: Instantaneous page transitions, scroll restoration, and smooth mobile usability for everyday students and parents.
3. **Institutional Dignity with Organic Delight**: Balance 194 years of historic heritage with modern, fluid, organic animations and typography.

## Accessibility & Inclusion

- Bilingual interface (primarily Bengali with English secondary labels and numerals).
- Standard semantic markup, high-contrast theme options, and mobile-friendly touch targets.
