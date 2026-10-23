# Verification Report

**Date:** 2026-10-23
**Scope:** all 4 public pages of the original site (see `INVENTORY.md`).

## How it was verified

| Check | Method | Result |
|---|---|---|
| Text preservation | Script extracted every visible text node from each original page and each new page, then compared them line by line in both directions after normalising whitespace | **0 original lines missing**, apart from the 💬 noted below |
| Invented content | Same comparison, reversed: new text not found on the original page | Only additions: "×" (close button on the mobile menu) and the hidden form labels "Your Name", "Email", "Contact Number", "Subject", "Message" (decoded from the original SureForms field names) |
| Local links and assets | Script resolved every `href`, `src` and CSS `url()` and checked in-page anchors | 0 broken |
| Order links | Decoded all 45 `wa.me` URLs on the menu page | All 45 match the original `order('…')` strings, in order |
| Responsive layout | Headless Chrome at 320, 375, 425, 768, 1024, 1280, 1440 and 1920px on all 4 pages (32 runs). Checked for page-level horizontal overflow and any element extending past the viewport | **32/32 pass** |
| Images | Headless Chrome scrolled each page at 375px, then checked every `<img>` loaded | 0 failed |
| JavaScript errors | Console and page errors recorded during all runs | 0 |
| Visual review | Full-page screenshots reviewed: Home at 375 and 1280px, About and Contact at 1280px, Menu and the mobile drawer at 375px | OK. Two issues were found and fixed (an invisible BBQ icon and underlined Order links) |

## Functionality checklist

| Feature (original) | New implementation | Verified |
|---|---|---|
| Header navigation (4 links) | Desktop navigation with the current-page state | ✔ |
| Mobile hamburger menu (Astra) | Slide-in drawer. Works with touch, mouse and keyboard; Esc closes it, focus is trapped while open, `aria-expanded` updates | ✔ tested by touch tap and Esc |
| Header phone button (no link on the original) | `tel:+918660347150` link | ✔ |
| "Explore MENU" / "Menu" buttons | Link to `pages/menu.html` | ✔ |
| About "View Menu" (`#` on the original) | Links to `menu.html`. The dead `#` link was not kept | ✔ |
| Featured On carousel (2 logos, 2 per view) | Static logo row. With 2 logos shown 2 at a time, the original never visibly slid | ✔ |
| About image carousel (arrows, 5 s autoplay, pause on hover and interaction, infinite) | `js/carousel.js` with the same settings, plus dots, swipe and arrow keys | ✔ tested the next button |
| Menu category tabs | Sticky chip bar with scroll-spy | ✔ tapping a tab highlights it; scrolling updates the highlight |
| Menu "Order" buttons → WhatsApp | Plain `wa.me` links. They work without JavaScript | ✔ |
| Floating "WhatsApp us" widget | Fixed button to `wa.me/918660347150` on all pages | ✔ |
| Contact form validation | Same 4 required fields and the same "This field is required." message | ✔ all 4 errors shown on an empty submit |
| Contact form submission (SureForms backend) | Posts JSON to `data-endpoint` if one is set; otherwise opens WhatsApp with the message | ✔ WhatsApp hand-off tested. **Email delivery is not available until an endpoint is configured** (see the README) |
| Google Map | Same embed URL | Not loaded in the offline headless test. The URL is identical to the original |
| Facebook and Instagram links | Same URLs, opening in a new tab | ✔ URLs match |
| Skip-to-content link | Kept | ✔ |

## Remaining discrepancies and decisions

These are presented as they are. None were silently changed.

1. **Menu-page 💬 floating button** was removed as a separate element. It linked to the same `wa.me/918660347150` as the site-wide "WhatsApp us" button, and the two overlapped in the same corner. The site-wide button now covers this function.
2. **Google Reviews footer icon** had an empty `href` on the original, so it led nowhere. It is **not rendered**. Add the link in the footer of each page when the business supplies a Google Reviews URL.
3. **Menu-page heading:** the embedded menu's "Shawarma Grill Paradise" was a second `<h1>` on the original. It is now an `<h2>`, so each page has a single H1. The text is unchanged.
4. **Home intro tagline and kickers** ("Bold Flavors. Good Vibes.", "A Taste Worth Remembering", and so on) were `<p>` elements on the original and remain `<p>` elements.
5. **Inconsistencies on the original, preserved as-is:**
   - Happy-hour times: Home says "4 PM – 11 PM"; Contact says "5 PM – 11 PM".
   - Home dish prices differ from the Menu page. For example, Kuboos Shawarma is ₹109 on Home and ₹79 on the Menu.
   - On Home, the descriptions for "Rumali Shwarma +french fries + Coke" and "Kuboos Peri Peri Shwarma" appear swapped.
   - The Menu, Contact and Opening Hours texts mention BBQ, ribs, brisket, pints and a smoker. These are leftovers from the theme template.
   - Spellings kept as written: "Shawaram" (home page title), "Shwarma" (footer and dish names), "Matkha", "Monday – Sunday|".
6. **Image alt text:** the original images mostly had empty alt text or filename alt text ("download", "Screenshot 2026-04-17 …"). The About carousel keeps its original alt text. Other content images have short descriptive alt text, such as "Swiggy", "Zomato" and the dish names. Decorative images use `alt=""`.
7. **Meta descriptions** did not exist on the original. Each page now uses its own original intro sentence, unchanged.

## Not verified

- Real-device testing (iOS Safari, Android Chrome). Only Chromium-based headless tests and screenshots were run.
- Live delivery of the contact form to an inbox, because no endpoint exists yet.
- Google Maps embed rendering. It needs network access to Google.
