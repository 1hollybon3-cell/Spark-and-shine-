export interface WashProduct {
  id: string;
  name: string;
  categoryName: string;
  vehicleCode: 'Vehicle A' | 'Mini SUV' | 'Vehicle B' | 'Taxi' | 'Mini Bus' | 'Truck';
  price: number;
  slug: string;
  popular?: boolean;
  tagline: string;
  duration: string;
  description: string;
  suitableFor: string[];
  features: string[];
  accentColor: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
}

export interface CoverageArea {
  name: string;
  zone: string;
  distanceTier: string;
  popularSpots: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  comment: string;
  rating: number;
  washType: string;
  image?: string;
  imageCaption?: string;
  date: string;
}

export const PHONE_NUMBER = '+27 64 656 2391';
export const PHONE_RAW = '27646562391';
export const WHATSAPP_URL = 'https://wa.me/27646562391';
export const FACEBOOK_URL = 'https://www.facebook.com/share/18eyDZr7GM/';
export const BRAND_LOGO = '/logo.jpg';

export const WASH_PRODUCTS: WashProduct[] = [
  {
    id: 'sedan-hatchback',
    vehicleCode: 'Vehicle A',
    name: 'Sedan & Hatchback',
    categoryName: 'Vehicle A',
    price: 70,
    slug: 'spark-shine-sedan-hatchback',
    popular: true,
    tagline: 'Standard Cars, Compacts & Hatchbacks',
    duration: '25 - 35 mins',
    description: 'Complete high-pressure power wash, foaming shampoo, rim cleaning, and mirror-finish drying right at your yard or office.',
    suitableFor: [
      'VW Polo & Golf',
      'Toyota Corolla & Starlet',
      'Hyundai i20 & Grand i10',
      'Suzuki Swift & Baleno',
      'Renault Kwid & Clio',
      'Ford Fiesta & Figo',
      'BMW 3 Series & Mercedes C-Class'
    ],
    features: [
      'High-pressure pre-rinse to lift Mpumalanga red dust',
      'Snow-foam deep body shampoo wash',
      'Wheel face & hubcap brake dust scrub',
      'Full micro-fibre scratch-free hand dry',
      'Deep black tyre polish & shine',
      'Exterior windows streak-free crystal shine',
      'Cockpit & dashboard light dust wipe'
    ],
    accentColor: '#ffc107'
  },
  {
    id: 'mini-suv',
    vehicleCode: 'Mini SUV',
    name: 'Mini SUV & Crossover',
    categoryName: 'Mini SUV',
    price: 80,
    slug: 'spark-shine-mini-suv',
    popular: true,
    tagline: 'Compact SUVs, Crossovers & Raised Hatchbacks',
    duration: '30 - 40 mins',
    description: 'Specially priced for compact crossovers and small SUVs. High-pressure mud rinse, wheel arches blast, rich foam wash, and showroom finish.',
    suitableFor: [
      'Suzuki Jimny & Fronx',
      'Toyota Urban Cruiser',
      'Renault Kiger & Triber',
      'Nissan Magnite',
      'Hyundai Venue & Creta',
      'Chery Tiggo 4 Pro',
      'VW T-Cross',
      'Ford EcoSport',
      'Kia Sonet'
    ],
    features: [
      'High-pressure wheel arch & underbody mud blast',
      'Thick snow foam body shampoo wash',
      'Alloy wheels & brake dust scrub',
      'Full micro-fibre scratch-free hand dry',
      'Deep wet-look black tyre polish',
      'Streak-free crystal window cleaning',
      'Dashboard & center console dust wipe'
    ],
    accentColor: '#ffc107'
  },
  {
    id: 'suv-bakkie',
    vehicleCode: 'Vehicle B',
    name: 'SUV & Bakkie',
    categoryName: 'Vehicle B',
    price: 100,
    slug: 'spark-shine-suv-bakkie',
    popular: true,
    tagline: 'Single/Double Cabs, 4x4s, Crossovers & 7-Seaters',
    duration: '35 - 45 mins',
    description: 'Heavy-duty wash crafted for Bushbuckridge bakkies and family SUVs. Includes deep wheel arch mud removal and load-bin wash down.',
    suitableFor: [
      'Toyota Hilux (Single & Double Cab)',
      'Ford Ranger & Raptor',
      'Isuzu D-Max',
      'Toyota Fortuner & Prado',
      'VW Amarok',
      'Nissan Navara & NP200',
      'Haval Jolion & H6',
      'Mahindra Pik Up'
    ],
    features: [
      'High-pressure under-body & wheel-arch mud blast',
      'Dense snow-foam wash covering oversized body panels',
      'Alloy wheels heavy degrease & tire rejuvenation',
      'Bakkie load-bin high-pressure sweep & rinse',
      'Scratch-safe micro-fibre drying of tall roofs',
      'Tyre wet-look dressing with UV protection',
      'Dashboard & steering column dust wipe'
    ],
    accentColor: '#1565c0'
  },
  {
    id: 'taxi-minibus',
    vehicleCode: 'Taxi',
    name: 'Taxi (14-16 Seater)',
    categoryName: 'Taxi',
    price: 110,
    slug: 'spark-shine-taxi-minibus',
    popular: false,
    tagline: 'Toyota Quantum, Sesfikile, Commuters & Vans',
    duration: '40 - 50 mins',
    description: 'Rapid, thorough cleaning for passenger taxis and minibuses. We come straight to your rank, rank queue, or home parking before your next trip.',
    suitableFor: [
      'Toyota Quantum (Sesfikile & GL)',
      'Toyota HiAce',
      'Nissan NV350 Impendulo',
      'Inyathi Minibus',
      'Mercedes-Benz Sprinter (Short)',
      'Hyundai H1 & Staria'
    ],
    features: [
      'High-pressure grime removal for high-mileage taxis',
      'All 14-16 passenger window streak-free glass polish',
      'Sliding door step & runner pressure rinse',
      'Heavy-duty alloy or steel wheel scrub',
      'Commercial-grade tyre slick polish',
      'Fast turnaround so your taxi stays on the road earning',
      'Driver dashboard clean & cabin deodorizer'
    ],
    accentColor: '#ffc107'
  },
  {
    id: 'minibus-22-seater',
    vehicleCode: 'Mini Bus',
    name: 'Mini Bus 22-Seater',
    categoryName: 'Mini Bus',
    price: 130,
    slug: 'spark-shine-minibus-22-seater',
    popular: true,
    tagline: '22-Seater Midi Buses, Long Sprinters, Crafters & Commuters',
    duration: '45 - 60 mins',
    description: 'Specialized mobile power wash for larger 22-seater commuter minibuses, school coaches, church vans, and long-wheelbase transports.',
    suitableFor: [
      'Mercedes Sprinter 22-Seater',
      'VW Crafter Commuter',
      'Iveco Daily 22-Seater',
      'Toyota Quantum Long Wheelbase / Coaster',
      'School & Church Transport Buses',
      'Cross-border Long Distance Taxis'
    ],
    features: [
      'High-pressure exterior wash for 22-seater extra-long bodies',
      'All 22 passenger panoramic windows polished streak-free',
      'Sliding door track, steps, and grab handle sanitizing wipe',
      'Dual rear axle and alloy/steel wheel grime blast',
      'Long-lasting commercial tyre shine & wet-look guard',
      'We wash at the taxi rank, rank queue, depot, or your yard'
    ],
    accentColor: '#f59e0b'
  },
  {
    id: 'truck-wash',
    vehicleCode: 'Truck',
    name: 'Truck & Commercial',
    categoryName: 'Truck',
    price: 150,
    slug: 'spark-shine-truck-wash',
    popular: false,
    tagline: 'Delivery Trucks, Tippers, Dynas & Heavy Workhorses',
    duration: '50 - 75 mins',
    description: 'High-power industrial wash for commercial delivery vehicles, 4-tonners, tippers, and business trucks operating around Bushbuckridge.',
    suitableFor: [
      'Toyota Dyna & Hino 300/500',
      'Isuzu NPR / NQR / FTR',
      'Mitsubishi Canter',
      'Tata Super Ace / LPT',
      'Drop-side & Tipper Workhorses',
      'Box Bodies & Delivery Vans'
    ],
    features: [
      'Industrial pressure wash (grease, mud, construction dust)',
      'Cab exterior, high wind deflector & grill power wash',
      'Dual rear tyre & wheel rim degreasing',
      'Chassis rail & step pressure clean',
      'Front windscreen degreasing for night highway safety',
      'Fleet invoicing available on request'
    ],
    accentColor: '#1565c0'
  }
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'interior-vacuum',
    name: 'Interior Full Deep Vacuum & Seat Dusting',
    price: 40,
    description: 'Thorough suction of carpets, seats, crevices, boot area, and floor mats.',
    duration: '+15 mins'
  },
  {
    id: 'engine-wash',
    name: 'Engine Bay Foam & Degrease',
    price: 40,
    description: 'Safe water-resistant sensor covering, foam degreaser, and gentle pressure rinse to remove caked oil and red dust.',
    duration: '+15 mins'
  },
  {
    id: 'leather-dash-cream',
    name: 'Full Cockpit Silicone Treatment & UV Guard',
    price: 30,
    description: 'Premium anti-static dashboard and door panel milk dressing that repels dust and restores deep sheen.',
    duration: '+10 mins'
  },
  {
    id: 'seat-shampoo',
    name: 'Fabric Seat Foam Shampoo & Stain Removal',
    price: 60,
    description: 'Targeted foam agitation for sweat marks, drink spills, and deep seat fabric freshening.',
    duration: '+20 mins'
  },
  {
    id: 'headlight-polish',
    name: 'Headlight Oxidation & Foggy Lens Polish',
    price: 80,
    description: 'Restore cloudy, yellowed headlights to crystal clear visibility for safer Bushbuckridge night driving.',
    duration: '+20 mins'
  }
];

export const BUSHBUCKRIDGE_AREAS: CoverageArea[] = [
  { name: 'Thulamahashe', zone: 'Central North', distanceTier: 'Instant Dispatch', popularSpots: ['Thulamahashe Mall', 'Stadium Area', 'College', 'Section A, B, C'] },
  { name: 'Dwarsloop', zone: 'Central', distanceTier: 'Instant Dispatch', popularSpots: ['Dwarsloop Mall', 'Phase 1, 2 & 3', 'R40 Main Corridor'] },
  { name: 'Acornhoek', zone: 'North', distanceTier: 'Instant Dispatch', popularSpots: ['Acornhoek Mall', 'Greenvalley', 'Timbavati Road', 'Tintswalo Hospital Area'] },
  { name: 'Shatale', zone: 'Central East', distanceTier: 'Instant Dispatch', popularSpots: ['Shatale Plaza', 'Maviljan Road', 'Zone 1 - 4'] },
  { name: 'Maviljan', zone: 'Central', distanceTier: 'Instant Dispatch', popularSpots: ['Maviljan Clinic', 'Main Street', 'Extension 2'] },
  { name: 'Bushbuckridge Central', zone: 'CBD Hub', distanceTier: 'Instant Dispatch', popularSpots: ['Twin City Mall', 'Municipality Offices', 'Taxi Rank'] },
  { name: 'Casteel', zone: 'East', distanceTier: 'Mobile Unit Available', popularSpots: ['Casteel Rank', 'Rooiboklaagte Road', 'Section 1'] },
  { name: 'Agincourt', zone: 'East Hub', distanceTier: 'Mobile Unit Available', popularSpots: ['Research Centre', 'Agincourt Clinic', 'Kildare Turnoff'] },
  { name: 'Marite', zone: 'South', distanceTier: 'Mobile Unit Available', popularSpots: ['Marite Complex', 'R40 Waypoint', 'Madikane'] },
  { name: 'Mkhuhlu', zone: 'South East', distanceTier: 'Mobile Unit Available', popularSpots: ['Mkhuhlu Plaza', 'Kruger Road', 'Hazyview Border'] },
  { name: 'Cottondale', zone: 'North East', distanceTier: 'Mobile Unit Available', popularSpots: ['Cottondale Village', 'Buffelshoek Road'] },
  { name: 'Kildare', zone: 'East', distanceTier: 'Mobile Unit Available', popularSpots: ['Kildare A & B', 'Lillydale turn'] },
  { name: 'Arthurseat', zone: 'Central', distanceTier: 'Mobile Unit Available', popularSpots: ['Arthurstone', 'Greenvalley route'] },
  { name: 'Oakley', zone: 'South', distanceTier: 'Mobile Unit Available', popularSpots: ['Oakley Village', 'Cunningmore'] },
  { name: 'Rooiboklaagte', zone: 'Central', distanceTier: 'Mobile Unit Available', popularSpots: ['Rooibok A & B', 'Near Shatale'] }
];

export const TESTIMONIALS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Sipho Ndlovu',
    location: 'Dwarsloop Phase 2',
    vehicle: 'Toyota Hilux Single Cab with Canopy',
    comment: 'These guys are a blessing. Spark & Shine came right to my yard in Dwarsloop! My bakkie was sparkling like new for only R100, and they stamped my loyalty card toward my 5th free wash. Best mobile car wash in Bushbuckridge!',
    rating: 5,
    washType: 'Vehicle B (Bakkie) - R100',
    image: '/src/assets/images/hilux_wash_review_1791124581577.jpg',
    imageCaption: 'White Toyota Hilux with canopy being washed under shade with thick snow foam',
    date: 'Yesterday'
  },
  {
    id: 'rev-2',
    name: 'Mama Joyce Mashaba',
    location: 'Thulamahashe Section A',
    vehicle: 'VW Polo TSI',
    comment: 'Only R70 for a full mobile wash in my own driveway while I cooked Sunday lunch! Look at that thick snow foam shampoo lifting all the Mpumalanga red dust. Rims and tyres look brand new!',
    rating: 5,
    washType: 'Vehicle A (Sedan/Hatch) - R70',
    image: '/src/assets/images/polo_foam_review_1791124596610.jpg',
    imageCaption: 'Silver VW Polo completely covered in active snow foam in customer driveway',
    date: '3 days ago'
  },
  {
    id: 'rev-3',
    name: 'Thabo Mokwena',
    location: 'Acornhoek (Near Mall)',
    vehicle: 'VW Polo 1.0 TSI Highline',
    comment: 'Booked the R70 wash with the R30 cockpit treatment. My dashboard, steering wheel, air vents, and console are completely spotless! No dust residue and smells wonderful inside.',
    rating: 5,
    washType: 'Vehicle A + Cockpit Treatment - R100',
    image: '/src/assets/images/polo_dash_review_1791124608478.jpg',
    imageCaption: 'Spotless interior detailing of the VW Polo steering wheel, vents, and dashboard',
    date: 'This week'
  },
  {
    id: 'rev-4',
    name: 'Kgomotso Malatji',
    location: 'Dwarsloop Phase 1',
    vehicle: 'VW Polo Hatchback',
    comment: 'Finished result is unbelievable! Gleaming mirror shine on the silver paint, and wet black tyre slick polish that lasted for days even on our gravel roads. 10/10 recommend!',
    rating: 5,
    washType: 'Vehicle A (Sedan/Hatch) - R70',
    image: '/src/assets/images/polo_finished_review_1791124635195.jpg',
    imageCaption: 'Finished gleaming silver VW Polo parked on driveway with deep tyre shine',
    date: 'Last week'
  },
  {
    id: 'rev-5',
    name: 'Brother Themba (Taxi Operator)',
    location: 'Bushbuckridge Central Taxi Rank',
    vehicle: 'Toyota Quantum & 22-Seater Sprinter',
    comment: 'Best R110 and R130 we spend every week. They wash our Quantums and 22-seater mini buses right at the rank while we rest between trips. Passenger windows clean, wheels gleaming, customers love entering a spotless taxi.',
    rating: 5,
    washType: 'Taxi & 22-Seater Mini Bus (R110 - R130)',
    image: '/src/assets/images/polo_interior_review_1791124621064.jpg',
    imageCaption: 'Clean valeted cockpit interior, console, and gear shift detailing',
    date: '2 weeks ago'
  }
];

export const FAQS = [
  {
    question: 'Do you come directly to my home or rank?',
    answer: 'YES! We are 100% mobile. Our team arrives fully equipped with high-pressure washers, snow foam shampoo, tyre polish, and microfiber cleaning gear straight to your gate or workplace.'
  },
  {
    question: 'How do I provide my location?',
    answer: 'When booking, simply provide your Bushbuckridge village and stand number, or send your location directly in WhatsApp when the chat opens. Our mobile crew will navigate straight to your address!'
  },
  {
    question: 'What are the prices for Minibuses and Taxis?',
    answer: 'We wash standard 14–16 seater passenger taxis (Toyota Quantum, Sesfikile) for R110, and larger 22-seater Mini Buses (Mercedes Sprinter, Crafter, Iveco) for R130. We come straight to your rank queue or yard!'
  },
  {
    question: 'How do I book? Do I need to pay online in advance?',
    answer: 'No upfront payment required! You simply select your vehicle tier (R70, R80, R100, R110, R130, or R150), and hit Book via WhatsApp. You can pay via Cash, Capitec Pay, e-Wallet, or Card swipe when we finish and you inspect the sparkling car.'
  },
  {
    question: 'Do you offer multi-car discounts for households or taxi ranks?',
    answer: 'Yes! When you wash 2 or more vehicles at the same yard, workplace, or rank stand, you get R20 off the total bill. Use our Multi-Car Combo calculator on this page!'
  }
];
