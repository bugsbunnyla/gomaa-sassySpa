# Sassy Spa — Client Book v2

A premium, private internal tool for high-end barbershops, hair salons, braiding shops, and loc studios. Built for the team behind the chair — with Bilt Rewards loyalty, global location finder, marketing automation, and owner intelligence.

## What's New in v2

### 🔐 Staff-Only Login
- Three role-based accounts: Owner, Stylist, Barber
- Demo credentials pre-loaded
- Session persists via localStorage
- No customer access — shop data stays protected

### 💎 Bilt Rewards Integration
- Every visit earns Bilt Points (1x–2x based on tier)
- 4 tiers: Blue → Silver → Gold → Platinum
- Automatic tier progression tracking
- Redemption catalog: $5 off → Annual Platinum Membership
- Top earner leaderboard on Bilt dashboard
- Rent Day style 2x point promotions

### 📍 Global Location Finder (GPS)
- 8 flagship locations across 4 continents:
  - New York · Los Angeles · Miami
  - London · Paris · Tokyo · Dubai · Singapore
- Real-time geolocation to find nearest spa
- One-tap Google Maps directions
- Call, hours, ratings, reviews per location
- Designed for 5-star hotel and mall placements

### 📢 Marketing Hub
- **Coupons**: 5 pre-loaded campaigns (Bilt Rent Day 2x, VIP 25%, New Client $50, Referral $25, Birthday Free)
- **Win-Back List**: Auto-identifies clients 45+ days absent
- **Scheduled Reminders**: SMS/Email outreach with one-tap send
- **Blast Campaigns**: Multi-select recipients, custom message, SMS or Email delivery
- Copy-to-clipboard coupon codes

### 📊 Owner Dashboard v2
- Total clients, monthly visits, revenue, Bilt members
- "Haven't been in a while" count with amber alert
- Most popular service this month
- Pending reminders queue
- Last 7 days activity feed with Bilt points earned

### 🎨 Premium Design
- Dark luxury theme (ink navy + gold brand accents)
- Playfair Display serif headers (sign-over-the-door feel)
- Mobile-first, big touch targets, arm's-length readable
- Safe area insets for notched phones
- No scrollbars, card-based layout
- Bilt tier badges (Blue/Silver/Gold/Platinum) on every client card

## Pages

| Page | Purpose |
|------|---------|
| **Login** | Staff authentication with role-based access |
| **Home** | Search, "In the chair lately" (last 8), "Haven't been in a while" (45+ days, amber alert), all clients with Bilt tier badges |
| **Client Card** | Photo gallery, Bilt Rewards card with tier progress bar, editable Formula, editable Notes, visit history with prices & points, Add Visit button |
| **Add Visit** | Existing or new client, photo capture, service, price, Bilt auto-calculation, note, date |
| **Dashboard** | Stats grid, Bilt overview, popular service, pending reminders, 7-day activity |
| **Marketing** | Coupons (copy codes), Win-Back list, scheduled reminders, bulk SMS/Email blast campaigns |
| **Locations** | GPS nearest finder, 8 global spas, expand/collapse details, directions, call |
| **Bilt Rewards** | Member stats, top earner, tier system (Blue→Platinum), redemption catalog |

## Tech Stack

- **Vite** — Fast dev & optimized builds
- **React 18 + React Router** — SPA navigation
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons
- **localStorage** — Persistent data (no backend needed)
- **Geolocation API** — GPS location finder

## Demo Credentials

```
owner@sassyspa.com     / owner2026
stylist@sassyspa.com   / style2026
barber@sassyspa.com    / barber2026
```

## Getting Started

```bash
cd hairSpa-v2
npm install
npm run dev
```

Open `http://localhost:3000` on your phone or desktop. The app is wrapped in `max-w-md` for native mobile feel.

## Data

- 8 realistic clients with 2–3 visits each
- 3 clients pre-loaded on "haven't been in a while" (Chris 67d, Andre 93d, Kevin 67d)
- Bilt tier distribution: 1 Platinum, 2 Gold, 3 Silver, 2 Blue, 1 non-member
- 5 marketing coupons, 3 scheduled reminders
- 8 global locations with real coordinates

## Bilt Rewards Tiers

| Tier | Min Points | Multiplier | Key Perks |
|------|-----------|------------|-----------|
| Blue | 0 | 1x | Earn 1pt/$1, Birthday reward |
| Silver | 500 | 1.25x | Priority booking, Free neck trim |
| Gold | 1,500 | 1.5x | VIP lounge, Free beard trim monthly |
| Platinum | 3,000 | 2x | Dedicated stylist, Global access, Private events |

## License

Private internal use. Built for the shop.
