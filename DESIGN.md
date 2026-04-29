---
version: alpha
name: Fabric (Encore)
description: BambooHR's production design system, Encore theme. A warm, confident, earnest voice expressed through high-contrast neutrals, a single saturated green for brand action, and carefully tuned container colors for feedback. Optimized for long-session HR workflows where clarity and trust matter more than flourish.
colors:
  primary: "#2E7918"
  on-primary: "#FFFFFF"
  primary-container: "#EBF5E8"
  on-primary-container: "#215C10"
  primary-hover: "#215C10"
  primary-pressed: "#163D0A"
  surface: "#FFFFFF"
  on-surface: "#38312F"
  surface-variant: "#F5F4F1"
  on-surface-variant: "#48413F"
  surface-muted: "#F6F6F4"
  surface-inverse: "#38312F"
  on-surface-inverse: "#FFFFFF"
  outline: "#D4D2D0"
  outline-variant: "#E4E3E0"
  error: "#DE1429"
  on-error: "#FFFFFF"
  error-container: "#FDEAEC"
  on-error-container: "#AE0718"
  warning: "#CD4A00"
  on-warning: "#FFFFFF"
  warning-container: "#FFF1E5"
  on-warning-container: "#A14300"
  success: "#028A01"
  on-success: "#FFFFFF"
  success-container: "#E8FDE8"
  on-success-container: "#016D00"
  info: "#007DB4"
  on-info: "#FFFFFF"
  info-container: "#E6F5FE"
  on-info-container: "#00618B"
  discovery: "#9853B9"
  on-discovery: "#FFFFFF"
  discovery-container: "#F9EDFF"
  on-discovery-container: "#683180"
  link: "#0B4FD1"
  action-highlight: "#FCC400"
  brand-green: "#599D15"
  gray-05: "#F6F6F4"
  gray-1: "#F5F4F1"
  gray-2: "#E4E3E0"
  gray-3: "#D4D2D0"
  gray-4: "#C6C2BF"
  gray-5: "#868180"
  gray-6: "#777270"
  gray-7: "#676260"
  gray-8: "#48413F"
  gray-9: "#38312F"
  sapphire-blue-500: "#0B4FD1"
  candy-red-500: "#DE1429"
  burnt-orange-500: "#CD4A00"
  pine-green-500: "#2E7918"
  cerulean-blue-500: "#1A6EB5"
  lilac-purple-500: "#9853B9"
  poppy-yellow-900: "#FCC400"
typography:
  headline-xl:
    fontFamily: Fields
    fontSize: 48px
    fontWeight: 700
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Fields
    fontSize: 36px
    fontWeight: 600
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Fields
    fontSize: 26px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Fields
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
  headline-xs:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  body-xs:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 700
    lineHeight: 16px
    letterSpacing: 0.08em
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 20px
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 48px
  5xl: 64px
  full: 1000px
spacing:
  none: 0px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  4xl: 64px
  page-gutter: 32px
  section-gap: 24px
  field-gap: 12px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.outline-variant}"
    textColor: "{colors.gray-7}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  button-secondary-hover:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
  button-outlined:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  button-outlined-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
  button-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
    typography: "{typography.label-md}"
    padding: 0 8px
    height: 36px
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  button-ai:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-discovery-container}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xs}"
    size: 36px
  text-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0 12px
    height: 34px
  text-field-focused:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  text-field-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  text-field-disabled:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.gray-7}"
  text-area:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
  select-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0 12px
    height: 34px
  field-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
  field-helper:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  field-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.body-sm}"
  checkbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xs}"
    size: 18px
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xs}"
    size: 18px
  radio:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 18px
  radio-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 18px
  toggle-off:
    backgroundColor: "{colors.outline}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    width: 36px
    height: 20px
  toggle-on:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    width: 36px
    height: 20px
  page-capsule:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.page-gutter}"
  page-header:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
    padding: 24px 0
  section:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  section-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-sm}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  tile-muted:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  gridlet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  divider:
    backgroundColor: "{colors.outline-variant}"
    textColor: "{colors.on-surface-variant}"
    height: 1px
  tab-unselected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    padding: 0 16px
    height: 40px
  tab-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    padding: 0 16px
    height: 40px
  tab-filled-unselected:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  tab-filled-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 0 16px
    height: 36px
  side-nav-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
  side-nav-item-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
  global-header:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-md}"
    height: 56px
  global-nav-item:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.label-md}"
    padding: 0 16px
  menu:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xs}"
    padding: 4px
  menu-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
  menu-item-hover:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  breadcrumb:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  badge-neutral:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  pill-neutral:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-info}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-discovery:
    backgroundColor: "{colors.discovery}"
    textColor: "{colors.on-discovery}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-muted-info:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-muted-success:
    backgroundColor: "{colors.success-container}"
    textColor: "{colors.on-success-container}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-muted-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  pill-muted-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  chip:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 2px 10px
  banner-info:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  banner-success:
    backgroundColor: "{colors.success-container}"
    textColor: "{colors.on-success-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  banner-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  banner-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  banner-discovery:
    backgroundColor: "{colors.discovery-container}"
    textColor: "{colors.on-discovery-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  inline-message:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 12px
  inline-message-ai:
    backgroundColor: "{colors.discovery-container}"
    textColor: "{colors.on-discovery-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 12px
  in-page-message:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  slidedown-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  slidedown-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  tooltip:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-surface-inverse}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
  popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  modal-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  modal-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-sm}"
    padding: 16px 24px
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  status-message-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-success-container}"
    typography: "{typography.body-md}"
  status-message-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-error-container}"
    typography: "{typography.body-md}"
  blank-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
    padding: "{spacing.2xl}"
  avatar:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    size: 32px
  icon-tile-neutral:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    size: 56px
  icon-tile-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
    rounded: "{rounded.sm}"
    size: 56px
  icon-tile-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
    rounded: "{rounded.sm}"
    size: 56px
  progress-bar-track:
    backgroundColor: "{colors.outline-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    height: 8px
  progress-bar-fill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    height: 8px
  loader:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    size: 24px
  footer:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
    padding: "{spacing.md}"
  action-footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    padding: 12px 24px
---

# Fabric (Encore) — Design System

## Overview

Fabric is BambooHR's production design system. Encore is its current theme — a warm, earnest, professional voice built for HR software. The target user is an HR administrator or employee inside a long session: reviewing someone's compensation, approving a time-off request, hiring a candidate, correcting a payroll error. The system is tuned for those stakes.

The personality is **friendly but not casual, confident but not loud**. Copy reads like an approachable coworker. Visual density leans spacious; content is organized into discrete containers (Sections, Cards, Gridlets) with clear headings and generous internal padding. Flourish is rare — a soft corner, a one-color brand accent, a small set of feedback container colors. Hierarchy comes from typography and whitespace, not from shadows or gradients.

The color strategy is high-contrast neutrals on a warm-white canvas, with a single saturated green (`primary`) carrying all affirmative action. Feedback colors (success, warning, error, info, discovery) live in two intensities: a strong solid for pills and toasts, and a muted "container" tint for banners and inline messages — the muted tints are what you'll reach for most often.

Motion is minimal. Transitions are short (120–200ms), easing is `ease-out`. No parallax, no scroll-linked animation, no celebratory effects outside of a dedicated confetti utility. When in doubt, choose the quieter option.

## Colors

The palette is organized into four layers:

1. **Brand and surface** — `primary` (brand green) with its `on-primary`, `primary-container`, `on-primary-container`, `primary-hover`, and `primary-pressed` siblings; plus `surface`, `on-surface`, `surface-variant`, `on-surface-variant`, `surface-muted`, `surface-inverse`, and `on-surface-inverse`. These are the everyday workhorses.
2. **Feedback roles** — `error`, `warning`, `success`, `info`, `discovery`. Each has a strong variant (for pills and toasts) and a `*-container` variant (for banners and inline messages). Always pair with its `on-*-container` foreground.
3. **Structural neutrals** — `outline` and `outline-variant` for borders and dividers; `link` for text links; `action-highlight` for the warm-yellow attention dot.
4. **Raw hues (reference only)** — `gray-05` through `gray-9`, `brand-green` (the BambooHR marketing green), and the Fabric accent hues (`sapphire-blue-500`, `candy-red-500`, etc.). These are intentionally exposed so tooling can trace the semantic-to-raw mapping and so chart palettes have a stable reference, but prefer the semantic names in application code.

**Key mappings (for engineers bridging to Fabric's MUI theme):**

- `primary` → `palette.primary.main` (default Encore brand green `#2E7918`, configurable per customer brand). The BambooHR marketing green `#599D15` is exposed as `brand-green` for logos and marketing surfaces only — it is intentionally **not** `primary` because its contrast with white is below WCAG AA.
- `on-surface` → `palette.text.primary` (`gray-9`, `#38312F`). Near-black, not pure black — it softens long-form reading.
- `on-surface-variant` → `palette.text.secondary` (`gray-8`, `#48413F`). Use for captions, helper text, and muted metadata.
- `surface` → `palette.background.default` (pure white). The resting canvas for Sections, Cards, form fields.
- `surface-muted` → the Page Capsule background (a warm off-white, `gray-05`). Content Sections sit on top of this.
- `link` → `#0B4FD1` (Fabric sapphire). Used for text links and `button-text`. Never used as a background fill.
- `discovery` / `tertiary` — the same purple (`#9853B9`). Reserved for AI features, discovery moments, and "what's new" markers.
- `action-highlight` — `#FCC400`. A warm yellow used sparingly for notice dots, unread indicators, and "action required" affordances.

**Container-plus-on-container pairs are load-bearing.** A `banner-warning` is always `warning-container` background with `on-warning-container` text; never mix a strong fill with a muted foreground or vice versa.

**Accessibility.** Every foreground/background pair defined as a component token meets WCAG AA (4.5:1 for normal text). Solid feedback fills (`error`, `warning`, `success`, `info`, `discovery`) paired with white foreground sit between 4.5:1 and 6.0:1 — prefer the `*-container` variants for anything text-heavy, and reserve the solid fills for compact pills, toasts, and iconography where large type or redundant iconic cues carry the meaning.

## Typography

Two type families carry the system:

- **Fields** — a humanist serif, used only for Headlines at `headline-md` and larger. Fields gives the system its voice: editorial, confident, distinctly BambooHR. Weights in use: Semibold (600) and Bold (700).
- **Inter** — the neutral sans used for everything else: body copy, labels, buttons, form fields, micro type, and the smallest `headline-xs`. Weights in use: Regular (400), Medium (500), Semibold (600), Bold (700).

**Scale.** Headlines follow a decreasing scale (`xl` 48, `lg` 36, `md` 26, `sm` 22, `xs` 18). Body copy has four sizes (`lg` 16, `md` 15, `sm` 14, `xs` 13) with a default of `body-md` — this 15px default is slightly smaller than many systems and is intentional, trading a little visual softness for tighter information density on form-heavy pages. Labels (`label-*`) share body sizes but step the weight up to Semibold; use them for button text, field labels, and in-table column headers. `label-caps` is the sole all-caps treatment — tight 11px, bold, with letter-spacing — reserved for badges, pills, and table headers.

**Hierarchy rules.**

- `headline-xl` is page-title only, and only on the most signature experiences (Payroll Command Center, full-screen reports). Most pages top out at `headline-md` or `headline-sm`.
- Never put `headline-lg` or larger on a page that also uses a global navigation chrome — the visual weight fights.
- Two type weights per screen is the target. Three is the ceiling. More than three signals a hierarchy problem, not a typography problem.
- Body copy sits at `body-md` (15px) by default. Drop to `body-sm` for helper text and metadata. Only use `body-lg` (16px) for long-form reading contexts (policy documents, onboarding guides).

**Numerals.** All numerals render tabular (`font-feature-settings: "tnum"`) in data tables and currency fields. Inline currency in prose uses proportional figures.

## Layout

Fabric is a structured, container-based system. Every page is assembled from a small set of layout primitives — it does not improvise page chrome.

**The base unit is 4px.** All spacing, padding, and sizing uses 4px multiples. The canonical steps are `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Never 5, 10, 15, or 25 — those signal custom-CSS drift and are the first thing to audit in a code review.

**Page chrome (top to bottom):**

1. **Global Header** — dark inverse surface (`surface-inverse`), 56px tall, company switcher and utility actions on the right.
2. **Global Navigation** — horizontal primary nav, directly beneath the Global Header.
3. **Page Capsule** — the warm off-white (`surface-muted`) canvas with 32px gutters. All content sits inside the capsule.
4. **Page Header V2** — page title, subtitle, and the page's primary action(s). Exists in single-row and double-row variants.
5. **Sections** — white (`surface`) containers with soft 8px radius. Every piece of content goes inside a Section, with the following exceptions:
   - Vertical Wizard (it provides its own chrome)
   - Side Navigation (lives at the page-chrome layer)
   - Page Header (above)
   - Filled Tabs (above the Sections they switch between)
6. **Action Footer** — optional sticky footer for page-level save/cancel actions.

**Page widths.** Content caps between 1124px (minimum) and 1348px (maximum), centered in the viewport with the 32px gutter on each side. Tables and wide data views can overflow horizontally inside a Section; the Section itself does not grow.

**Single-Section pages fill the capsule.** If a page has exactly one Section, it expands to fill the full Page Capsule height — do not shrink it to hug the content.

**Spacing rhythm.**

- Inside a Section: `lg` (24px) padding on all sides; `md` (16px) between field rows.
- Between Sections: `lg` (24px) vertical gap (`section-gap`).
- Inside a Card or Gridlet: `md` (16px) padding.
- Between form fields: `field-gap` (12px).
- At page gutters: `page-gutter` (32px).

## Elevation & Depth

Fabric is a **flat system with tonal layering**, not a shadow-stacked one. Depth is conveyed by:

1. **Surface color contrast** — `surface-muted` (warm off-white) for the Page Capsule, `surface` (pure white) for Sections on top of it, `surface-variant` (slightly darker) for muted tiles and hover states.
2. **1px borders** — `outline-variant` for subtle separations, `outline` for definition that carries meaning.
3. **Corner radius** — a soft 8px corner signals a container you can interact with.

**Shadows exist but are restrained.** Fabric defines four elevation levels (100, 300, 500, 700). Use them like this:

- **Level 100** (barely there, 1px tight spread, 4% opacity) — hoverable cards, non-sticky chips that respond to pointer.
- **Level 300** (soft 2px, 3% opacity) — Popovers and Dropdown menus.
- **Level 500** (larger 2px with offset, 5% opacity) — sticky headers and floating toolbars.
- **Level 700** (10px blur, 10% opacity) — Modals and Sheets only.

**Never stack shadows.** A Card inside a Section inside a Page Capsule should not have a shadow; the tonal step from `surface-muted` → `surface` is the entire elevation story.

**Focus states use a 2px outline**, color `link` (Fabric sapphire), offset 2px from the element — not a box-shadow.

## Shapes

Corner radius is the one place the system expresses warmth. The intent is "softened, not rounded" — a corner you notice subconsciously, not one that reads as cute.

- **Fields, buttons, selection controls, pills, tabs** use `rounded.xs` (4px). This is the default.
- **Cards, Sections, Tiles, Gridlets, Modals, Sheets** use `rounded.sm` (8px). Slightly softer because the surface area is larger.
- **Toggles, avatars, status dots, some chips** use `rounded.full` (pill). Fully round the short axis.
- **Icon Tiles** inside confirmation Modals use `rounded.sm` (8px) with an inner icon at 24px centered in a 56px tile.
- **Fabric does not use hard 0px corners** except on in-table cell separators and dividers.

The radius scale exists in 4px steps up through `4xl` (48px), but practical use rarely exceeds `sm` (8px). Anything `md` (12px) and above reads as a deliberate focal moment; use it sparingly.

## Components

Components are organized below by the role they play in the UI. For each group, the YAML `components:` entries define the ground-truth style tokens; the notes here describe intent, states, and selection rules so a tool rendering the system without other context can make correct choices.

### Buttons

Five button treatments, in decreasing emphasis: `primary`, `secondary`, `outlined`, `text`, `danger`. Plus `button-ai` for actions inside AI-themed messaging.

- **One `primary` per context.** The primary button carries the screen's single most important action. A page with two "Save" buttons has a hierarchy problem.
- **Secondary** supports optional actions ("Save and exit"). **Outlined** is a neutral affordance with a visible edge. **Text** is for low-emphasis actions ("Cancel" inside a modal, "Learn more" inline).
- **Danger** is the destructive `primary` — same visual weight, red fill. Use only for irreversible actions; pair with a confirmation modal.
- **Icon-only buttons** use a square 36px footprint at the same radius. Never use a full Button for icon-only — it ships with visible padding for a text label that isn't there.
- **Sizes.** Default is 36px tall (`medium`). Small (32px) in data tables and section-header actions. Large (40px+) only for signature experiences like marketing shell pages.
- **States.** Default / hover (slightly darker fill) / pressed (one step darker) / disabled (muted gray fill + gray-6 text) / focus (2px `link` outline). Never fade the entire button by lowering opacity — that harms contrast.
- **Button with icon + text:** ship the icon as a leading element beside the text label, both in the same color. A button with an icon but no label is a different component (icon-only); see above.

### Form fields

Form fields share a 34px height, 4px radius, 12px horizontal padding, and a `body-md` inner typography — `text-field`, `select-field`, search inputs, currency fields, and date inputs all present the same shell. What changes is the affordance *inside*.

- **Labels** sit above the field in `label-md`. Required fields are marked with `*` in the label — do not disable the submit button based on required-field state.
- **Helper text** (`field-helper`) sits below the field in `body-sm` at `on-surface-variant`.
- **Error state** replaces helper text with `field-error` at `on-error-container` color and adds a 2px `error` border to the field.
- **Disabled state** fills the field with `surface-variant` and drops the text to `gray-6` — do not lower opacity.
- **Focus** draws a 2px `link` outline around the entire field.
- **Validation timing.** Validate on submit for most errors. Validate on blur only for formatting errors (invalid date, malformed email). Never validate on keystroke.

### Selection controls

- **Checkboxes** for selecting 0–N options from a set, or for a standalone on/off in a form that has a Save button.
- **Radio buttons** for selecting 1 of 2–5 options. Always pre-select a default; if "no selection" is meaningful, add an explicit "None" option.
- **Toggles** (rounded pill switches) for an immediately-committed on/off. Never put a toggle inside a form that has a Save button — toggles commit the moment the user flips them.
- **Max 8 checkboxes in a group.** Beyond 8, switch to a multi-select SelectField or Autocomplete.

### Containers

- **Section** is the universal content container. White surface, 8px radius, 24px padding, optional header with a title and description, optional trailing actions.
- **Card** is a smaller, self-contained unit — can sit inside a Section or stand alone in a grid.
- **Tile** is a compact, image-forward or icon-forward card. `tile-muted` for the soft-filled variant.
- **Gridlet** is a dashboard widget container — header + body, with a mandatory single-child body wrapper (the body uses space-between alignment, so multiple direct children will spread apart).

### Navigation

- **Global Header** (`surface-inverse`, 56px) — the dark top bar. Contains the company switcher, search, and utility actions.
- **Global Navigation** — primary product navigation; horizontal on desktop.
- **Side Navigation** — for multi-section pages (Settings, Employee Profile). Active item uses `primary-container` fill with `on-primary-container` text.
- **Tabs** come in two styles:
  - **Lined Tabs** (inside a Section) for switching views within one content area.
  - **Filled Tabs** (above Sections) for switching the Section itself.
  - If both are on the same page, Filled Tabs always sit above Lined Tabs.
- **Breadcrumbs** — `body-sm`, `on-surface-variant`, separated by chevrons. Lives in the Page Header area.

### Indicators (badges, pills, chips)

- **Pills** communicate a status or category. Six variants: `neutral`, `info`, `success`, `warning`, `error`, `discovery`. Each has a **strong** (saturated fill, white foreground) and **muted** (soft container fill, dark foreground) treatment. Prefer `muted` when multiple pills appear on the same row — the strong treatment is for rare, attention-grabbing moments.
- **Badges** are compact numeric or dot indicators, often on an avatar or an icon button.
- **Chips** are input-field tokens (removable tags inside an Autocomplete or tag input). Unlike Pills they are interactive — a chip has a delete affordance.

Never use a Pill where a Chip belongs, or vice versa: Pills are read-only status; Chips are user-editable input tokens.

### Feedback and messaging

Five surfaces, from most to least prominent:

1. **Banner** — page-level persistent notice at the top of the Page Capsule (trial warnings, compliance notices). Uses a `*-container` fill.
2. **In-Page Message** — between the Page Header and the first Section. Dismissable. One per page.
3. **Inline Message** — inside a Section, near the element it refers to. Uses `surface-variant` fill, or `discovery-container` for AI messages.
4. **Slidedown (toast)** — temporary success/failure acknowledgment after an action. Uses a saturated fill (`success` or `error`) because it's transient.
5. **Field-level validation** — inline under the field, red text, 2px red border on the field.

**AI theming.** AI suggestions always live inside an `inline-message-ai` surface (discovery purple container + dark purple text). Action buttons inside AI messages use the `button-ai` treatment — **outlined**, with the purple text color.

### Overlays

- **Tooltip** — dark inverse surface, short text, 8–12px padding. For hover-revealed hints.
- **Popover** — white surface, rich content allowed, for click-triggered panels (filter menus, date ranges).
- **Menu** — dropdown list of actions, 4px outer padding, 8×12 inner item padding.
- **Modal** — focused interruption. 8px radius, shadow level 700, horizontally centered. Right-aligned action buttons for small/medium modals; left-aligned for full-screen modals. Cancel is always a `button-text`, not a styled button.
- **Sheet** — a sub-modal inside a Modal. Maximum one level deep; no sheet-inside-sheet.

### Data display

- **Tables** use `surface` background, 14px body cells, `label-caps` header row, `outline-variant` row dividers, and `outline` at the top and bottom edges. Hover reveals a `surface-variant` row tint. Numeric cells are tabular-aligned and right-justified.
- **Progress bars** use `outline-variant` for the track and `primary` for the fill, both at `rounded.full` and 8px height. Never more than one per screen area.
- **Avatars** default to 32px, `rounded.full`, with a `primary-container` fill and the user's initials in `on-primary-container`. Photo avatars drop the fill.
- **Loaders** use `primary` as the spinner color on a white surface.

### Typography components

- **Headline** — titles only. Sizes: `extra-large` (48px, `headline-xl`), `large` (36px, `headline-lg`), `medium` (26px, `headline-md`), `small` (22px, `headline-sm`), `extra-small` (18px, `headline-xs`).
- **BodyText** — all non-headline copy. Sizes: `large` (16px), `medium` (15px, default), `small` (14px), `extra-small` (13px).
- **Link** — inline textual link, `link` color, underline-on-hover.
- **Text Button** — low-emphasis action in `link` color that reads like a link but behaves like a button. Never use a Link where an action belongs or a Text Button where navigation belongs.

## Do's and Don'ts

**Do**
- Do use the semantic tokens (`primary`, `surface`, `on-surface`, `error`, etc.) in application code; leave the raw hues (`gray-5`, `sapphire-blue-500`) for chart palettes and one-off marketing surfaces.
- Do put all page content inside a `Section`. The few exceptions are page-chrome elements (Page Header, Side Navigation, Vertical Wizard, Filled Tabs).
- Do keep spacing on a 4px grid. The canonical values are `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64`.
- Do use the `*-container` color pair (e.g. `warning-container` + `on-warning-container`) for anything text-heavy; reserve the solid feedback fills for pills, toasts, and icons.
- Do meet WCAG AA contrast (4.5:1 for normal text, 3:1 for large text and UI components). Every defined component token pair already clears this bar.
- Do pair every icon with a text label, except for icons that are universally understood (close, trash, back).
- Do use Title Case for page titles, section titles, tab labels, button labels, modal titles, and column headers. Use sentence case for body copy, helper text, placeholders, and most in-context messaging.
- Do pre-select a default option in every Radio group. If "no selection" is a valid choice, add an explicit "None".
- Do put one — and only one — `primary` button per context.
- Do use Title Case for all button labels, including destructive actions.

**Don't**
- Don't hardcode colors, spacing, or typography. If you're reaching for a hex code or a pixel value that isn't a token, the system is missing a token — ask first, don't improvise.
- Don't use the BambooHR marketing green (`brand-green`, `#599D15`) as a button fill or any text background. Its contrast with white is below WCAG AA. Use `primary` (`#2E7918`) for actions.
- Don't mix the strong and muted variants of a feedback color in the same component (e.g. don't put `on-error-container` text on an `error` background).
- Don't stack shadows. A Card inside a Section does not get a shadow; the surface-color step is the entire elevation story.
- Don't render multiple `primary` buttons in the same view.
- Don't put a Toggle inside a form that has a Save button. Toggles commit immediately; Checkboxes commit on submit.
- Don't disable the Submit/Save button because a required field is empty. Let the user submit, then show field-level errors.
- Don't validate on keystroke. Validate on blur only for formatting, and on submit for everything else.
- Don't use Tabs for navigation between pages or for comparing information side-by-side. Tabs switch views *within* a single context.
- Don't use a Modal for optional information, success feedback, or non-blocking failure. Reserve Modals for content the user must attend to before proceeding.
- Don't exceed two type weights on a single screen if you can help it. Three is the ceiling.
- Don't mix `rounded.xs` and `rounded.md` (or larger) in the same cluster of controls — corner radius is part of the rhythm.
- Don't use `headline-xl` or `headline-lg` on a page that also shows Global Navigation — they fight for visual weight.
- Don't use "click here" as a link label. Label the link with what it does.
