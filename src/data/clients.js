export const INITIAL_CLIENTS = [
  {
    id: 'c1', name: 'Marcus Johnson', phone: '4045550182',
    photo: 'https://picsum.photos/seed/marcus/400/400',
    email: 'marcus.j@email.com',
    biltPoints: 2450, biltTier: 'Silver', biltMemberSince: '2024-03',
    formula: { guards: '#2 sides, #4 top', fadeStyle: 'Mid fade crisp taper', lineup: 'Sharp line-up, natural temples', beard: '#1 guard, shape cheek line, oil after' },
    notes: ['Sensitive scalp — light pressure','Always asks for hot towel','Ask about daughter\'s basketball'],
    visits: [
      { id:'v1-1', date:'2026-08-10', service:'Full cut + beard trim', photo:'https://picsum.photos/seed/marcus1/400/400', note:'Higher fade, loved it', price:75, biltEarned:75 },
      { id:'v1-2', date:'2026-07-15', service:'Full cut + beard trim', photo:'https://picsum.photos/seed/marcus2/400/400', note:'', price:75, biltEarned:75 },
      { id:'v1-3', date:'2026-06-20', service:'Full cut', photo:'https://picsum.photos/seed/marcus3/400/400', note:'Skipped beard — event', price:55, biltEarned:55 },
    ]
  },
  {
    id: 'c2', name: 'Darius Williams', phone: '6785550294',
    photo: 'https://picsum.photos/seed/darius/400/400',
    email: 'd.williams@email.com',
    biltPoints: 890, biltTier: 'Blue', biltMemberSince: '2025-01',
    formula: { guards: '#1.5 sides, scissor top', fadeStyle: 'Low drop fade', lineup: 'Full razor finish', beard: 'Clean shave neck & cheeks' },
    notes: ['Layrite matte clay','Hates water in ears — cape clip','Usually 10 min late'],
    visits: [
      { id:'v2-1', date:'2026-08-12', service:'Full cut + lineup', photo:'https://picsum.photos/seed/darius1/400/400', note:'Extra texture on top', price:60, biltEarned:60 },
      { id:'v2-2', date:'2026-07-08', service:'Full cut', photo:'https://picsum.photos/seed/darius2/400/400', note:'', price:55, biltEarned:55 },
      { id:'v2-3', date:'2026-06-01', service:'Full cut + lineup', photo:'https://picsum.photos/seed/darius3/400/400', note:'First drop fade', price:60, biltEarned:60 },
    ]
  },
  {
    id: 'c3', name: 'Jamal Thompson', phone: '7705550431',
    photo: 'https://picsum.photos/seed/jamal/400/400',
    email: 'jamal.t@email.com',
    biltPoints: 3200, biltTier: 'Gold', biltMemberSince: '2023-08',
    formula: { guards: '#3 all over, blended top', fadeStyle: 'Skin fade bald sides', lineup: 'Natural, no razor', beard: 'Full beard #2, tapered into fade' },
    notes: ['Allergic to aftershaves — unscented','Likes mirror held up at end','Tips well when you remember name'],
    visits: [
      { id:'v3-1', date:'2026-08-05', service:'Full cut + beard', photo:'https://picsum.photos/seed/jamal1/400/400', note:'', price:80, biltEarned:80 },
      { id:'v3-2', date:'2026-07-20', service:'Full cut + beard', photo:'https://picsum.photos/seed/jamal2/400/400', note:'Beard longer this time', price:80, biltEarned:80 },
      { id:'v3-3', date:'2026-06-15', service:'Full cut', photo:'https://picsum.photos/seed/jamal3/400/400', note:'', price:55, biltEarned:55 },
    ]
  },
  {
    id: 'c4', name: 'Chris Brown', phone: '4045550765',
    photo: 'https://picsum.photos/seed/chrisb/400/400',
    email: 'chris.b@email.com',
    biltPoints: 0, biltTier: null, biltMemberSince: null,
    formula: { guards: '#2 sides, #5 textured top', fadeStyle: 'Mid fade burst ears', lineup: 'Sharp curved temples', beard: 'Goatee #1, line under lip' },
    notes: ['Very particular about symmetry','Scissors on top, no thinning','Ask about dealership job'],
    visits: [
      { id:'v4-1', date:'2026-05-15', service:'Full cut + goatee', photo:'https://picsum.photos/seed/chris1/400/400', note:'Might switch to full beard', price:65, biltEarned:0 },
      { id:'v4-2', date:'2026-04-20', service:'Full cut', photo:'https://picsum.photos/seed/chris2/400/400', note:'', price:55, biltEarned:0 },
      { id:'v4-3', date:'2026-03-10', service:'Full cut + goatee', photo:'https://picsum.photos/seed/chris3/400/400', note:'Brought son for first cut', price:65, biltEarned:0 },
    ]
  },
  {
    id: 'c5', name: 'Andre Miller', phone: '6785550812',
    photo: 'https://picsum.photos/seed/andre/400/400',
    email: 'andre.m@email.com',
    biltPoints: 120, biltTier: 'Blue', biltMemberSince: '2025-05',
    formula: { guards: '#1 sides, scissor top 2in', fadeStyle: 'High fade clean', lineup: 'Full razor straight forehead', beard: 'Stubble #0.5 no shape' },
    notes: ['Scalp gets dry — moisturize after','Sports talk only, no politics','Books same time every 3 weeks'],
    visits: [
      { id:'v5-1', date:'2026-05-30', service:'Full cut', photo:'https://picsum.photos/seed/andre1/400/400', note:'Traveling for work next month', price:55, biltEarned:55 },
      { id:'v5-2', date:'2026-04-15', service:'Full cut + stubble', photo:'https://picsum.photos/seed/andre2/400/400', note:'', price:60, biltEarned:60 },
      { id:'v5-3', date:'2026-03-05', service:'Full cut', photo:'https://picsum.photos/seed/andre3/400/400', note:'Wanted different fade', price:55, biltEarned:55 },
    ]
  },
  {
    id: 'c6', name: 'Kevin Hart', phone: '7705550934',
    photo: 'https://picsum.photos/seed/kevinh/400/400',
    email: 'kevin.h@email.com',
    biltPoints: 560, biltTier: 'Blue', biltMemberSince: '2025-02',
    formula: { guards: '#2 all over blended crown', fadeStyle: 'Low fade subtle taper', lineup: 'Natural soft edges', beard: 'Full beard #2 tapered cheeks' },
    notes: ['Always early, sometimes 15 min before','Sensitive neck — no straight razor','Likes cold drink while waiting'],
    visits: [
      { id:'v6-1', date:'2026-06-10', service:'Full cut + beard', photo:'https://picsum.photos/seed/kevin1/400/400', note:'Thinking about locs', price:80, biltEarned:80 },
      { id:'v6-2', date:'2026-05-05', service:'Full cut', photo:'https://picsum.photos/seed/kevin2/400/400', note:'', price:55, biltEarned:55 },
      { id:'v6-3', date:'2026-04-01', service:'Full cut + beard', photo:'https://picsum.photos/seed/kevin3/400/400', note:'Beard patchy left side', price:80, biltEarned:80 },
    ]
  },
  {
    id: 'c7', name: 'Tyrese Gibson', phone: '4045550156',
    photo: 'https://picsum.photos/seed/tyrese/400/400',
    email: 'tyrese.g@email.com',
    biltPoints: 4100, biltTier: 'Gold', biltMemberSince: '2023-01',
    formula: { guards: '#1.5 sides, #4 finger length', fadeStyle: 'Mid fade with shadow', lineup: 'Crisp razor neck', beard: 'Disconnected #1 sharp cheek' },
    notes: ['Likes chair leaned back for wash','Murray\'s pomade, warm in hands','Ask about music producing'],
    visits: [
      { id:'v7-1', date:'2026-08-08', service:'Full cut + beard', photo:'https://picsum.photos/seed/tyrese1/400/400', note:'Top longer this time', price:80, biltEarned:80 },
      { id:'v7-2', date:'2026-07-25', service:'Full cut', photo:'https://picsum.photos/seed/tyrese2/400/400', note:'', price:55, biltEarned:55 },
      { id:'v7-3', date:'2026-06-30', service:'Full cut + beard', photo:'https://picsum.photos/seed/tyrese3/400/400', note:'New pomade, liked it', price:80, biltEarned:80 },
    ]
  },
  {
    id: 'c8', name: 'Michael Jordan', phone: '6785550678',
    photo: 'https://picsum.photos/seed/michael/400/400',
    email: 'mj@email.com',
    biltPoints: 7800, biltTier: 'Platinum', biltMemberSince: '2022-06',
    formula: { guards: 'Bald fade no guard sides', fadeStyle: 'Skin fade high tight', lineup: 'Full razor every edge', beard: 'Clean shave no facial hair' },
    notes: ['Fade must be perfect — multi mirrors','No product on scalp','In and out in 20 min'],
    visits: [
      { id:'v8-1', date:'2026-08-14', service:'Bald fade + shave', photo:'https://picsum.photos/seed/michael1/400/400', note:'Extra tight for wedding', price:65, biltEarned:130 },
      { id:'v8-2', date:'2026-07-30', service:'Bald fade', photo:'https://picsum.photos/seed/michael2/400/400', note:'', price:50, biltEarned:50 },
      { id:'v8-3', date:'2026-07-01', service:'Bald fade + shave', photo:'https://picsum.photos/seed/michael3/400/400', note:'First time fully bald', price:65, biltEarned:65 },
    ]
  },
]

export const LOCATIONS = [
  { id: 'loc-ny', name: 'Sassy Spa — Fifth Avenue', address: '725 5th Ave, New York, NY 10022', phone: '(212) 555-0100', hours: '9AM–9PM Daily', lat: 40.7626, lng: -73.9735, rating: 4.9, reviews: 1240, flagship: true, image: 'https://picsum.photos/seed/nyspa/600/400' },
  { id: 'loc-la', name: 'Sassy Spa — Rodeo Drive', address: '421 N Rodeo Dr, Beverly Hills, CA 90210', phone: '(310) 555-0200', hours: '10AM–8PM Daily', lat: 34.0675, lng: -118.4010, rating: 4.8, reviews: 890, flagship: false, image: 'https://picsum.photos/seed/laspa/600/400' },
  { id: 'loc-mia', name: 'Sassy Spa — Design District', address: '140 NE 39th St, Miami, FL 33137', phone: '(305) 555-0300', hours: '9AM–9PM Daily', lat: 25.8134, lng: -80.1924, rating: 4.9, reviews: 670, flagship: false, image: 'https://picsum.photos/seed/miaspa/600/400' },
  { id: 'loc-lon', name: 'Sassy Spa — Mayfair', address: '15 Bruton St, London W1J 6QA, UK', phone: '+44 20 5550 4000', hours: '9AM–8PM Daily', lat: 51.5098, lng: -0.1456, rating: 4.9, reviews: 2100, flagship: true, image: 'https://picsum.photos/seed/londonspa/600/400' },
  { id: 'loc-par', name: 'Sassy Spa — Champs-Élysées', address: '99 Av. des Champs-Élysées, 75008 Paris', phone: '+33 1 5550 5000', hours: '10AM–8PM Daily', lat: 48.8698, lng: 2.3079, rating: 4.8, reviews: 1850, flagship: false, image: 'https://picsum.photos/seed/parisspa/600/400' },
  { id: 'loc-tok', name: 'Sassy Spa — Ginza', address: '5-4-6 Ginza, Chuo City, Tokyo 104-0061', phone: '+81 3 5550 6000', hours: '10AM–9PM Daily', lat: 35.6712, lng: 139.7650, rating: 5.0, reviews: 3200, flagship: true, image: 'https://picsum.photos/seed/tokyospa/600/400' },
  { id: 'loc-dub', name: 'Sassy Spa — Downtown Dubai', address: 'Sheikh Mohammed bin Rashid Blvd, Dubai', phone: '+971 4 555 0700', hours: '10AM–10PM Daily', lat: 25.1972, lng: 55.2744, rating: 4.9, reviews: 1500, flagship: false, image: 'https://picsum.photos/seed/dubaispa/600/400' },
  { id: 'loc-sin', name: 'Sassy Spa — Marina Bay', address: '10 Bayfront Ave, Singapore 018956', phone: '+65 5550 8000', hours: '9AM–9PM Daily', lat: 1.2834, lng: 103.8607, rating: 4.9, reviews: 980, flagship: false, image: 'https://picsum.photos/seed/sgspa/600/400' },
]

export const COUPONS = [
  { id: 'cp1', code: 'BILT2X', title: 'Bilt Rent Day', desc: '2x Bilt Points on all services today', discount: '2x Points', type: 'bilt', expires: '2026-08-31', usedCount: 45 },
  { id: 'cp2', code: 'VIP25', title: 'VIP Experience', desc: '25% off Platinum & Gold tier services', discount: '25% OFF', type: 'percent', expires: '2026-09-15', usedCount: 12 },
  { id: 'cp3', code: 'FIRST50', title: 'New Client Welcome', desc: '$50 off your first visit + 500 Bilt Points', discount: '$50 OFF', type: 'fixed', expires: '2026-12-31', usedCount: 89 },
  { id: 'cp4', code: 'REFERRAL', title: 'Refer a Friend', desc: 'You both get $25 + 250 Bilt Points', discount: '$25 OFF', type: 'fixed', expires: '2026-12-31', usedCount: 34 },
  { id: 'cp5', code: 'BIRTHDAY', title: 'Birthday Treat', desc: 'Free hot towel shave + 1,000 Bilt Points', discount: 'FREE', type: 'service', expires: '2026-12-31', usedCount: 8 },
]

export const REMINDERS = [
  { id: 'r1', clientId: 'c4', type: 'sms', message: 'Hi Chris, it\'s been 67 days! Your fade is calling. Book now & earn 2x Bilt Points.', sent: false, scheduled: '2026-08-17' },
  { id: 'r2', clientId: 'c5', type: 'email', message: 'Andre, your barber misses you. 93 days is too long. Come back for $10 off + 500 points.', sent: false, scheduled: '2026-08-17' },
  { id: 'r3', clientId: 'c6', type: 'sms', message: 'Kevin! Your chair is empty. 67 days since your last cut. Book this week for priority seating.', sent: false, scheduled: '2026-08-18' },
]

export const BILT_REWARDS = {
  tiers: [
    { name: 'Blue', minSpend: 0, multiplier: 1, perks: ['Earn 1pt/$1','Birthday reward','Member pricing'] },
    { name: 'Silver', minSpend: 500, multiplier: 1.25, perks: ['Earn 1.25pt/$1','Priority booking','Free neck trim','Quarterly gift'] },
    { name: 'Gold', minSpend: 1500, multiplier: 1.5, perks: ['Earn 1.5pt/$1','VIP lounge access','Complimentary beverage','Free beard trim monthly','Early access to events'] },
    { name: 'Platinum', minSpend: 3000, multiplier: 2, perks: ['Earn 2pt/$1','Dedicated stylist','Complimentary hot towel every visit','Free product sample monthly','Global location access','Private event invites'] },
  ],
  redemptions: [
    { points: 500, reward: '$5 Off Next Visit' },
    { points: 1000, reward: '$15 Off + Free Product' },
    { points: 2500, reward: 'Free Haircut + Beard Trim' },
    { points: 5000, reward: 'VIP Full Service Package' },
    { points: 10000, reward: 'Annual Platinum Membership' },
  ]
}

export function sortClientsByRecent(clients) {
  return [...clients].sort((a, b) => {
    const aLast = getLastVisit(a), bLast = getLastVisit(b)
    if (!aLast) return 1; if (!bLast) return -1
    return new Date(bLast.date) - new Date(aLast.date)
  })
}

export function getHaventBeenInAWhile(clients, days = 45) {
  return clients.filter(c => {
    const last = getLastVisit(c)
    if (!last) return true
    return getDaysSince(last.date) > days
  }).sort((a, b) => getDaysSince(getLastVisit(b)?.date || '2020-01-01') - getDaysSince(getLastVisit(a)?.date || '2020-01-01'))
}

export function getInTheChairLately(clients, count = 8) {
  return sortClientsByRecent(clients).slice(0, count)
}
