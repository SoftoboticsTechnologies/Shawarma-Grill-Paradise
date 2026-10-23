# Original Site Inventory

**Source:** <https://shawarmagrillparadise.co.in/>. The site runs WordPress 7.1.3 with the Astra theme, Elementor 4.3.5, the SureForms form plugin and the "Click to Chat" (ht_ctc) WhatsApp plugin.
**Scanned:** 2026-10-23.
**Discovery method:** header and footer links, `wp-sitemap.xml` and its sub-sitemaps, and the WP REST API (`/wp-json/wp/v2/pages` and `/posts`). There are no blog posts.

## 1. Pages

| Original URL | Original title | Recreated as | Status |
|---|---|---|---|
| `/` | Shawarma Grill Paradise – Best Shawaram In Bangalore | `index.html` | Recreated |
| `/about-us/` | About Us – Shawarma Grill Paradise | `pages/about-us.html` | Recreated |
| `/menu/` | Menu – Shawarma Grill Paradise | `pages/menu.html` | Recreated |
| `/contact-us/` | Contact Us – Shawarma Grill Paradise | `pages/contact-us.html` | Recreated |
| `/elementor-hf/footer/` | (Elementor footer template, listed in the sitemap) | — | Not a public page. The live footer comes from the Astra theme and is recreated on every page |
| `/form/simple-form/` | (SureForms form record, listed in the sitemap) | — | Not a public page. The form is embedded on Contact Us and recreated there |

`/about-us/` and `/menu/` returned a transient "Database Error" (HTTP 500) on the first request. Both loaded successfully on retry.

No meta descriptions, Open Graph tags or structured data were present on the original site. The new meta descriptions reuse each page's own original intro sentence verbatim.

## 2. Navigation and links

- **Header navigation:** Home · About Us · Menu · Contact Us
- **Header button:** "+91 866-0347150". It had no `href` on the original; it is now a `tel:` link.
- **Footer:** divider graphic · "Shwarma Grill Paradise" (h2) · "Call Us" · "+91 866-0347150" · "Copyright © 2026 Shawarma Grill Paradise | Powered by Shawarma Grill Paradise"
- **Footer social links:**
  - Facebook: <https://www.facebook.com/share/1NS6DR5rRk/?mibextid=wwXIfr>
  - Instagram: <https://www.instagram.com/shawarma_grill_paradise?igsh=MWRmOTJ3b2Z6cGRsZw==>
  - Google Reviews: **empty `href`** on the original
- **Floating WhatsApp widget (all pages):** "WhatsApp us" → `https://wa.me/918660347150`, with no prefilled text
- **Menu page:** an extra floating 💬 link to `https://wa.me/918660347150`
- **Internal call-to-action buttons:**
  - Home: "Explore MENU" and "Menu" (×2) → `/menu/`
  - About: "View Menu" → `#`. This was a dead link on the original.
  - Menu: 15 in-page category tabs
- **Contact information:** phone +91 866-0347150. WhatsApp 918660347150. Map query "Attible Bangalore". **No email address or street address appears anywhere on the site.**

## 3. Content by page (heading hierarchy)

The full verbatim text of each page is in `docs/original-content/*.txt`.

### Home
- Kicker: Bold Flavors. Good Vibes.
- **H1** Made with Love, Served with a Smile, with an intro paragraph and an "Explore MENU" button
- **H2** Authentic Shawarma, Made Fresh Every Day, with 2 paragraphs, a "Menu" button and 2 photos
- **H3** Featured On, with Swiggy and Zomato logos (an Elementor carousel showing 2 logos at a time)
- Kicker: A Taste Worth Remembering
- **H2** Where Every Dish Tells a Story, with a paragraph and 6 dishes. Each dish has an H3 name, an H4 price, a description and a photo:

  | Dish | Price |
  |---|---|
  | Kuboos Shawarma | ₹109 |
  | Kuboos Cheese Shawarma | ₹139 |
  | Kuboos Plate Shawarma | ₹199 |
  | Rumali Shwarma +french fries + Coke | ₹219 |
  | Burger Shawarma | ₹119 |
  | Kuboos Peri Peri Shwarma | ₹119 |

- Kicker: Fresh Shawarma, Every Bite Matters
- **H2** It's Happy Hour Somewhere!, with a paragraph, "Monday – Sunday| 4 PM – 11 PM" and a "Menu" button
- **H2** What Our Guests Are Saying, with a paragraph and 4 testimonials (Monica, Rakesh, Mahesh, Ankit)

### About Us
- Kicker: Fresh Flavors, Crafted with Passion
- **H1** About Us, with a paragraph
- **H2** Our Shawarma Story
  - Subtitle: Serving Fresh & Flavorful Shawarmas Every Day
  - 3 paragraphs
  - Image carousel of 4 images: 2 per view, arrows, 5 s autoplay, infinite
- **H2** Your Shawarma, Your Flavor Adventure
  - Subtitle: Crafted with Passion, Served with Pride
  - A divider, a paragraph and a "View Menu" button
- **H2** The Shawarma Experience, with a paragraph
- **H2** Our Core Values, with a paragraph

### Menu
- Kicker: Feast Your Eyes
- **H1** Our Menu, with a paragraph
- Embedded HTML widget:
  - "Shawarma Grill Paradise" heading. It was an H1 on the original and is now an H2, so the page has one H1.
  - 15 tabs: Rolls, Special, Peri, Cheese, Plate, Veg, Signature, Combos, Snacks, Fries, Shakes, Extras, Drinks, Mojito, Dessert
  - 15 **H2** categories with 45 items. Each item has a name, a price and an "Order" button. Clicking Order opens `wa.me/918660347150?text=Hi, I want to order: <item>`.
  - The order strings differ from the display names for some items, for example "Cold Drink" for "Coke / Pepsi / Sprite". These strings are preserved exactly.

### Contact Us
- Kicker: Reserve A Table
- **H1** Contact Us, with a paragraph
- **H2** Ready for a Flavor Adventure?
  - Subtitle: Book Your Table or Order Online Today
  - A paragraph
  - **H3** For Restaurant, followed by **H4** +91 866-0347150
- **H2** We'd Love Your Thoughts, with a paragraph and a form:
  - Fields: Your Name \*, Email \*, Contact Number \*, Subject \*, Message
  - Button: "Send"
  - Messages: "This field is required." and "There was an error trying to submit your form. Please try again."
  - A Google Map embed
- **H3** Opening Hours, with a paragraph. Each H4 row reads "05 PM --- 11 PM":
  - Mon - Fri
  - Sat - Sun
- **H3** It's Happy Hour Somewhere!, with an H4 paragraph and "Monday – Sunday| 5 PM – 11 PM"

## 4. Assets

All assets were downloaded from `/wp-content/uploads/` with HTTP 200. None are missing.

| Local file | Original file | Where it was used |
|---|---|---|
| `brand/logo.png` | 2026/04/Shawarma-logo-2.JPG.png | Logo, full size |
| `brand/logo-150.png` | …Shawarma-logo-2.JPG-150x150.png | Header logo |
| `brand/favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | cropped-Shawarma-logo-2.JPG-32/192/180 | Favicons |
| `decor/divider.png` | 2018/10/divider-free-img-1.png | Section dividers, footer |
| `decor/bbq-icon.png` | 2018/10/bbbq-free-img.png | Home intro icon |
| `home/shawarma-intro.jpeg` | 2026/04/swaramaa.jpeg | Home intro photo and section background |
| `home/shawarma-intro-2.jpeg` | 2026/04/WhatsApp-Image-2026-04-29-at-11.21.57-AM-1.jpeg | Home intro photo. Byte-identical to Khuboo-Shawarma-with-peri-peri.jpeg (the "Rumali Shwarma +french fries + Coke" dish photo), so one copy is kept |
| `featured/featured-1.png`, `featured-2.jpg` | 2026/04/download.png, download.jpg | Swiggy and Zomato logos |
| `menu/kuboos-shawarma.jpeg` | 2026/05/WhatsApp-Image-2026-05-01-at-12.21.24-PM.jpeg | Dish photo |
| `menu/kuboos-cheese-shawarma.jpeg` | …12.24.10-PM.jpeg | Dish photo |
| `menu/kuboos-plate-shawarma.jpeg` | …12.22.56-PM.jpeg | Dish photo |
| `menu/burger-shawarma.jpeg` | 2026/04/Burger-showrmajpeg.jpeg | Dish photo |
| `menu/kuboos-peri-peri-shawarma.jpeg` | 2026/05/…12.24.39-PM.jpeg | Dish photo |
| `about/gallery-1.png` … `gallery-4.png` | Screenshot-2026-04-17-180048.png, Rumali-combo-.JPG.jpeg, Screenshot-…175508-1.png, Screenshot-…175101.png | About carousel. Screenshot-…175508.png (the About and Menu page banner) is byte-identical to gallery-3, so one copy is kept |
| `backgrounds/grill-food-banner.jpg` | 2019/12/Grill-food-banner.jpg | About "values" background |
| `backgrounds/blackboard.png` | 2026/04/blackboard-bg-free-img.png | Home section background |
| `backgrounds/food-pattern.png` | 2026/04/food-pattern-free-img.png | Home section background pattern |
| `backgrounds/shawarma-grill.jpeg` | 2026/04/WhatsApp-Image-2026-04-29-at-11.22.00-AM.jpeg | Home and Contact backgrounds |

Icons on the original came from the theme's icon fonts and inline SVGs (phone, social, WhatsApp). They are redrawn as inline SVG in the new site.
