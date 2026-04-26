import { siteConfig } from "@/app/config/site";

export type Property = {
  slug: string;
  title: string;
  location: string;
  area: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  builtSize: string;
  terraceSize: string;
  plotSize: string;
  propertyType: string;
  status: string;
  heroImage: string;
  galleryImages: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  amenities: string[];
  marketEstimate: string;
  marketRangeLow: string;
  marketRangeHigh: string;
  pricePerSqm: string;
  areaTrend: string;
  rentalEstimateLow: string;
  rentalEstimateHigh: string;
  confidence: "Low" | "Medium" | "High";
  /** When true, hide from the aggregate /properties/map (e.g. CMS entries without coordinates). */
  omitFromAggregateMap?: boolean;
  latitude: number;
  longitude: number;
  nearbyValues: {
    label: string;
    price: string;
    latitude: number;
    longitude: number;
  }[];
  communityFees?: number;
  specialHighlights: string[];
  propertyDetails: {
    interior: { label: string; value: string }[];
    exterior: { label: string; value: string }[];
    community: { label: string; value: string }[];
    costsAndFees: { label: string; value: string }[];
    legalAndOwnership: { label: string; value: string }[];
    locationDetails: { label: string; value: string }[];
  };
  nearbyLifestyle: { label: string; value: string }[];
  nearbyGuide: {
    label: string;
    category:
      | "airport"
      | "beach"
      | "school"
      | "healthcare"
      | "golf"
      | "dining"
      | "daily"
      | "marina"
      | "town"
      | "transport";
    travelTime: string;
    travelMode: "car" | "walk" | "cycle" | "transit";
    latitude: number;
    longitude: number;
    description?: string;
  }[];
  reasonToView: string;
  reference: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentPhoto?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
};

export const properties: Property[] = [
  {
    slug: "reserva-del-higueron-designer-villa",
    title: "Reserva del Higueron Designer Villa",
    location: "Reserva del Higueron, Fuengirola",
    area: "Reserva del Higueron",
    price: "€2,650,000",
    bedrooms: 4,
    bathrooms: 3,
    builtSize: "354m²",
    terraceSize: "68m²",
    plotSize: "N/A",
    propertyType: "Villa",
    status: "Exclusive",
    heroImage: "/images/listings/villa-higueron/hero.jpg",
    galleryImages: [
      "/images/listings/villa-higueron/hero.jpg",
      "/images/listings/villa-higueron/gallery-1.jpg",
      "/images/listings/villa-higueron/gallery-2.jpg",
      "/images/listings/villa-higueron/gallery-3.jpg",
      "/images/listings/villa-higueron/gallery-4.jpg",
    ],
    shortDescription:
      "A luxury detached villa in Reserva del Higueron, fully fitted and furnished with high-end appliances and designer interiors.",
    fullDescription:
      "A special luxury project in Reserva del Higueron, this detached villa is designed for modern Mediterranean living with open-plan interiors, expansive glazing, and seamless indoor-outdoor flow. The residence is fully fitted and furnished with high-end appliances and designer furniture, making it immediately ready for lifestyle use or investment. Located only a short walk from the 5-star Hilton Hotel in Reserva del Higueron, it offers a premium blend of convenience, privacy, and long-term rental appeal.",
    features: [
      "Close to sea",
      "Private pool",
      "Gated complex",
      "South-facing",
      "Private terrace",
      "Air conditioning",
      "Private parking",
      "Close to amenities",
    ],
    amenities: [
      "5-star Hilton nearby",
      "Designer furnishings",
      "Urbanisation services",
      "Shops and dining",
      "Investment potential",
    ],
    marketEstimate: "€2,580,000",
    marketRangeLow: "€2,420,000",
    marketRangeHigh: "€2,720,000",
    pricePerSqm: "€7,486",
    areaTrend: "+5.9% YoY",
    rentalEstimateLow: "€7,000/month",
    rentalEstimateHigh: "€10,500/month",
    confidence: "Medium",
    latitude: 36.5785,
    longitude: -4.6133,
    nearbyValues: [
      { label: "Valuation Point A", price: "€2.4M", latitude: 36.5801, longitude: -4.6163 },
      { label: "Valuation Point B", price: "€2.7M", latitude: 36.5771, longitude: -4.6109 },
      { label: "Valuation Point C", price: "€2.6M", latitude: 36.5762, longitude: -4.6148 },
      { label: "Valuation Point D", price: "€2.9M", latitude: 36.5793, longitude: -4.6097 },
      { label: "Valuation Point E", price: "€2.5M", latitude: 36.581, longitude: -4.6122 },
      { label: "Valuation Point F", price: "€2.8M", latitude: 36.5779, longitude: -4.6181 },
    ],
    specialHighlights: [
      "Sea views",
      "Private pool",
      "Gated community",
      "Walk to amenities",
      "High rental appeal",
      "New development",
    ],
    propertyDetails: {
      interior: [
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "3" },
        { label: "Built size", value: "354m²" },
        { label: "Heating / cooling", value: "Integrated climate control" },
        { label: "Furnishing status", value: "Designer furnished" },
      ],
      exterior: [
        { label: "Terrace size", value: "68m²" },
        { label: "Pool", value: "Private outdoor pool" },
        { label: "Garden", value: "Landscaped private areas" },
        { label: "Orientation", value: "South-west" },
      ],
      community: [
        { label: "Gated community", value: "Yes" },
        { label: "Parking", value: "Private parking" },
        { label: "Storage", value: "Integrated utility storage" },
        { label: "Security", value: "Controlled urbanisation access" },
      ],
      costsAndFees: [
        { label: "Community fees", value: "On request" },
        { label: "IBI estimate", value: "Approx. €2,100 / year" },
        { label: "Garbage tax", value: "Approx. €180 / year" },
        { label: "Estimated purchase costs", value: "10-12% of purchase price" },
      ],
      legalAndOwnership: [
        { label: "Property type", value: "Villa" },
        { label: "Reference", value: "ST5043" },
        { label: "Energy certificate", value: "Available on request" },
        { label: "Tourist licence potential", value: "Strong potential (subject to checks)" },
      ],
      locationDetails: [
        { label: "Beach distance", value: "8 min drive" },
        { label: "Airport distance", value: "20 min drive" },
        { label: "Golf distance", value: "6 min drive" },
        { label: "Restaurants", value: "Walkable and nearby options" },
        { label: "Schools", value: "International schools within 10-15 min" },
      ],
    },
    nearbyLifestyle: [
      { label: "Beach", value: "8 min" },
      { label: "Malaga Airport", value: "20 min" },
      { label: "Golf", value: "6 min" },
      { label: "Puerto Banus", value: "28 min" },
      { label: "International School", value: "12 min" },
      { label: "Restaurants", value: "5 min" },
    ],
    nearbyGuide: [
      {
        label: "Malaga Airport",
        category: "airport",
        travelTime: "20 mins",
        travelMode: "car",
        latitude: 36.6749,
        longitude: -4.4991,
        description: "Convenient for international arrivals and frequent city breaks.",
      },
      {
        label: "Carvajal Beach",
        category: "beach",
        travelTime: "8 mins",
        travelMode: "car",
        latitude: 36.5535,
        longitude: -4.6144,
      },
      {
        label: "Salliver International School",
        category: "school",
        travelTime: "14 mins",
        travelMode: "car",
        latitude: 36.5454,
        longitude: -4.6281,
      },
      {
        label: "Xanit Hospital",
        category: "healthcare",
        travelTime: "9 mins",
        travelMode: "car",
        latitude: 36.5908,
        longitude: -4.5648,
      },
      {
        label: "Higueron Golf",
        category: "golf",
        travelTime: "6 mins",
        travelMode: "car",
        latitude: 36.5768,
        longitude: -4.6158,
      },
      {
        label: "Benalmadena Marina",
        category: "marina",
        travelTime: "18 mins",
        travelMode: "car",
        latitude: 36.5985,
        longitude: -4.5168,
      },
      {
        label: "Mercadona",
        category: "daily",
        travelTime: "5 mins",
        travelMode: "car",
        latitude: 36.5727,
        longitude: -4.6043,
      },
      {
        label: "Fuengirola Centre",
        category: "town",
        travelTime: "12 mins",
        travelMode: "car",
        latitude: 36.538,
        longitude: -4.6248,
      },
    ],
    reasonToView: "Designer turnkey villa with strong lifestyle-rental balance.",
    reference: "ST5043",
    agentName: siteConfig.contact.advisorName,
    agentPhone: siteConfig.contact.advisorPhone,
    agentEmail: siteConfig.contact.advisorEmail,
    agentPhoto: "/images/agent.jpg",
  },
  {
    slug: "beachfront-duplex-penthouse-torre-bermeja",
    title: "Beachfront Duplex Penthouse",
    location: "Torre Bermeja, Estepona",
    area: "Torre Bermeja",
    price: "€4,995,000",
    bedrooms: 3,
    bathrooms: 4,
    builtSize: "206m²",
    terraceSize: "125m²",
    plotSize: "N/A",
    propertyType: "Penthouse",
    status: "New Listing",
    heroImage: "/images/listings/torre-bermeja-penthouse/hero.webp",
    galleryImages: [
      "/images/listings/torre-bermeja-penthouse/hero.webp",
      "/images/listings/torre-bermeja-penthouse/gallery-1.webp",
      "/images/listings/torre-bermeja-penthouse/gallery-2.webp",
      "/images/listings/torre-bermeja-penthouse/gallery-3.webp",
      "/images/listings/torre-bermeja-penthouse/gallery-4.webp",
    ],
    shortDescription:
      "A beachfront duplex penthouse in a prestigious gated development with rooftop terraces, private wellness areas, and direct Mediterranean access.",
    fullDescription:
      "Located in Torre Bermeja on the New Golden Mile, this duplex penthouse combines established beachfront prestige with contemporary comfort. Arranged across two levels, it features an open-plan living and dining space, a fully equipped designer kitchen, and integrated premium systems. The upper level opens to a rooftop terrace with private sauna and jacuzzi, while landscaped communal gardens and direct beach access reinforce its resort-style appeal for both lifestyle and investment buyers.",
    features: [
      "Beachfront position",
      "Duplex layout",
      "Rooftop terrace",
      "Private sauna and jacuzzi",
      "Underfloor heating throughout",
      "Gated beachfront community",
      "Indoor pool and spa",
      "Direct beach access",
    ],
    amenities: [
      "Condominium pool",
      "Indoor wellness spa",
      "Private parking",
      "Close to Puerto Banus",
      "Near Malaga Airport",
    ],
    marketEstimate: "€4,780,000",
    marketRangeLow: "€4,450,000",
    marketRangeHigh: "€5,120,000",
    pricePerSqm: "€24,248",
    areaTrend: "+6.7% YoY",
    rentalEstimateLow: "€14,000/month",
    rentalEstimateHigh: "€21,000/month",
    confidence: "Medium",
    latitude: 36.4807,
    longitude: -4.9962,
    nearbyValues: [
      { label: "Valuation Point A", price: "€4.3M", latitude: 36.4822, longitude: -4.9985 },
      { label: "Valuation Point B", price: "€5.1M", latitude: 36.4794, longitude: -4.9938 },
      { label: "Valuation Point C", price: "€4.7M", latitude: 36.4789, longitude: -4.9969 },
      { label: "Valuation Point D", price: "€5.0M", latitude: 36.4814, longitude: -4.9917 },
      { label: "Valuation Point E", price: "€4.6M", latitude: 36.4831, longitude: -4.9954 },
      { label: "Valuation Point F", price: "€4.9M", latitude: 36.4801, longitude: -4.9993 },
    ],
    communityFees: 350,
    specialHighlights: [
      "Beachfront position",
      "Sea views",
      "Rooftop terrace",
      "Gated community",
      "Walk to amenities",
      "High rental appeal",
    ],
    propertyDetails: {
      interior: [
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "4" },
        { label: "Built size", value: "206m²" },
        { label: "Heating / cooling", value: "Underfloor + integrated A/C" },
        { label: "Furnishing status", value: "Curated premium furnishing" },
      ],
      exterior: [
        { label: "Terrace size", value: "125m²" },
        { label: "Pool", value: "Communal indoor and outdoor pools" },
        { label: "Garden", value: "Landscaped community gardens" },
        { label: "Orientation", value: "South" },
      ],
      community: [
        { label: "Gated community", value: "Yes, beachfront gated complex" },
        { label: "Parking", value: "Private parking bay" },
        { label: "Storage", value: "Private storage room" },
        { label: "Security", value: "24h controlled access" },
      ],
      costsAndFees: [
        { label: "Community fees", value: "€350 / month" },
        { label: "IBI estimate", value: "Approx. €2,750 / year" },
        { label: "Garbage tax", value: "Approx. €190 / year" },
        { label: "Estimated purchase costs", value: "10-12% of purchase price" },
      ],
      legalAndOwnership: [
        { label: "Property type", value: "Duplex Penthouse" },
        { label: "Reference", value: "MAB83000379" },
        { label: "Energy certificate", value: "Available on request" },
        { label: "Tourist licence potential", value: "Attractive short-stay profile (subject to checks)" },
      ],
      locationDetails: [
        { label: "Beach distance", value: "Direct access" },
        { label: "Airport distance", value: "45 min drive" },
        { label: "Golf distance", value: "9 min drive" },
        { label: "Restaurants", value: "Walkable beachfront options" },
        { label: "Schools", value: "International schools within 20-30 min" },
      ],
    },
    nearbyLifestyle: [
      { label: "Beach", value: "Direct access" },
      { label: "Malaga Airport", value: "45 min" },
      { label: "Golf", value: "9 min" },
      { label: "Puerto Banus", value: "12 min" },
      { label: "International School", value: "25 min" },
      { label: "Restaurants", value: "Walk" },
    ],
    nearbyGuide: [
      {
        label: "Malaga Airport",
        category: "airport",
        travelTime: "45 mins",
        travelMode: "car",
        latitude: 36.6749,
        longitude: -4.4991,
      },
      {
        label: "Nearest Beach",
        category: "beach",
        travelTime: "Walk",
        travelMode: "walk",
        latitude: 36.4809,
        longitude: -4.9968,
      },
      {
        label: "International School Estepona",
        category: "school",
        travelTime: "24 mins",
        travelMode: "car",
        latitude: 36.4514,
        longitude: -5.0567,
      },
      {
        label: "Hospiten Estepona",
        category: "healthcare",
        travelTime: "16 mins",
        travelMode: "car",
        latitude: 36.4267,
        longitude: -5.1503,
      },
      {
        label: "Los Flamingos Golf",
        category: "golf",
        travelTime: "9 mins",
        travelMode: "car",
        latitude: 36.4933,
        longitude: -5.0465,
      },
      {
        label: "Puerto Banus",
        category: "marina",
        travelTime: "12 mins",
        travelMode: "car",
        latitude: 36.4885,
        longitude: -4.9541,
      },
      {
        label: "Local Gourmet Dining",
        category: "dining",
        travelTime: "6 mins",
        travelMode: "car",
        latitude: 36.4751,
        longitude: -4.9898,
      },
      {
        label: "Estepona Town",
        category: "town",
        travelTime: "20 mins",
        travelMode: "car",
        latitude: 36.4277,
        longitude: -5.1458,
      },
    ],
    reasonToView: "Rare beachfront duplex with rooftop wellness and direct shore access.",
    reference: "MAB83000379",
    agentName: siteConfig.contact.advisorName,
    agentPhone: siteConfig.contact.advisorPhone,
    agentEmail: siteConfig.contact.advisorEmail,
    agentPhoto: "/images/agent.jpg",
  },
  {
    slug: "villa-madrisa-nueva-andalucia",
    title: "Villa Madrisa",
    location: "Nueva Andalucia, Marbella",
    area: "Nueva Andalucia",
    price: "€2,995,000",
    bedrooms: 4,
    bathrooms: 4,
    builtSize: "262m²",
    terraceSize: "N/A",
    plotSize: "1,006m²",
    propertyType: "Villa",
    status: "New Development",
    heroImage: "/images/listings/villa-madrisa/hero.webp",
    galleryImages: [
      "/images/listings/villa-madrisa/hero.webp",
      "/images/listings/villa-madrisa/gallery-1.webp",
      "/images/listings/villa-madrisa/gallery-2.webp",
      "/images/listings/villa-madrisa/gallery-3.webp",
      "/images/listings/villa-madrisa/gallery-4.webp",
    ],
    shortDescription:
      "A refined villa in Nueva Andalucia that balances modern Mediterranean design, lush private gardens, and exceptional indoor-outdoor living.",
    fullDescription:
      "Villa Madrisa blends contemporary elegance with natural beauty in the heart of Nueva Andalucia. Surrounded by mature landscaping and tranquil greenery, it offers expansive interiors, a designer kitchen with premium finishes, and a private pool setting designed for relaxed entertaining. With open-plan living, refined material choices, and easy access to amenities, schools, and golf, the residence delivers an ideal mix of lifestyle quality and long-term Marbella investment appeal.",
    features: [
      "Private pool view",
      "Fully fitted kitchen",
      "Fitted wardrobes",
      "Garden view",
      "Close to golf",
      "Close to schools",
      "Marble floors",
      "Excellent condition",
    ],
    amenities: [
      "Nueva Andalucia location",
      "Close to shops",
      "Close to town",
      "Contemporary design",
      "Private terrace",
    ],
    marketEstimate: "€2,860,000",
    marketRangeLow: "€2,680,000",
    marketRangeHigh: "€3,120,000",
    pricePerSqm: "€11,431",
    areaTrend: "+7.3% YoY",
    rentalEstimateLow: "€8,500/month",
    rentalEstimateHigh: "€12,500/month",
    confidence: "Medium",
    latitude: 36.4914,
    longitude: -4.9726,
    nearbyValues: [
      { label: "Valuation Point A", price: "€2.7M", latitude: 36.493, longitude: -4.9741 },
      { label: "Valuation Point B", price: "€3.2M", latitude: 36.4898, longitude: -4.9708 },
      { label: "Valuation Point C", price: "€2.9M", latitude: 36.4905, longitude: -4.9697 },
      { label: "Valuation Point D", price: "€3.1M", latitude: 36.4921, longitude: -4.9762 },
      { label: "Valuation Point E", price: "€2.8M", latitude: 36.4889, longitude: -4.9734 },
      { label: "Valuation Point F", price: "€3.0M", latitude: 36.4942, longitude: -4.9716 },
    ],
    specialHighlights: [
      "Sea views",
      "Private pool",
      "Gated community",
      "Walk to amenities",
      "High rental appeal",
      "New development",
    ],
    propertyDetails: {
      interior: [
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "4" },
        { label: "Built size", value: "262m²" },
        { label: "Heating / cooling", value: "Air conditioning" },
        { label: "Furnishing status", value: "Partly furnished" },
      ],
      exterior: [
        { label: "Terrace size", value: "N/A" },
        { label: "Pool", value: "Private pool" },
        { label: "Garden", value: "Private landscaped garden" },
        { label: "Orientation", value: "South-east" },
      ],
      community: [
        { label: "Gated community", value: "Secure residential setting" },
        { label: "Parking", value: "Private parking" },
        { label: "Storage", value: "Built-in storage areas" },
        { label: "Security", value: "Residential surveillance in area" },
      ],
      costsAndFees: [
        { label: "Community fees", value: "On request" },
        { label: "IBI estimate", value: "Approx. €2,350 / year" },
        { label: "Garbage tax", value: "Approx. €185 / year" },
        { label: "Estimated purchase costs", value: "10-12% of purchase price" },
      ],
      legalAndOwnership: [
        { label: "Property type", value: "Villa" },
        { label: "Reference", value: "SV2298" },
        { label: "Energy certificate", value: "Available on request" },
        { label: "Tourist licence potential", value: "Strong potential (subject to checks)" },
      ],
      locationDetails: [
        { label: "Beach distance", value: "10 min drive" },
        { label: "Airport distance", value: "42 min drive" },
        { label: "Golf distance", value: "5 min drive" },
        { label: "Restaurants", value: "5 min drive" },
        { label: "Schools", value: "International schools within 10 min" },
      ],
    },
    nearbyLifestyle: [
      { label: "Beach", value: "10 min" },
      { label: "Malaga Airport", value: "42 min" },
      { label: "Golf", value: "5 min" },
      { label: "Puerto Banus", value: "7 min" },
      { label: "International School", value: "9 min" },
      { label: "Restaurants", value: "5 min" },
    ],
    nearbyGuide: [
      {
        label: "Malaga Airport",
        category: "airport",
        travelTime: "42 mins",
        travelMode: "car",
        latitude: 36.6749,
        longitude: -4.4991,
      },
      {
        label: "Mistral Beach",
        category: "beach",
        travelTime: "10 mins",
        travelMode: "car",
        latitude: 36.4817,
        longitude: -4.9669,
      },
      {
        label: "Aloha College",
        category: "school",
        travelTime: "9 mins",
        travelMode: "car",
        latitude: 36.5003,
        longitude: -4.9759,
      },
      {
        label: "HC Marbella",
        category: "healthcare",
        travelTime: "11 mins",
        travelMode: "car",
        latitude: 36.505,
        longitude: -4.928,
      },
      {
        label: "Las Brisas Golf",
        category: "golf",
        travelTime: "5 mins",
        travelMode: "car",
        latitude: 36.5017,
        longitude: -4.9789,
      },
      {
        label: "Puerto Banus",
        category: "marina",
        travelTime: "7 mins",
        travelMode: "car",
        latitude: 36.4885,
        longitude: -4.9541,
      },
      {
        label: "Supermarket",
        category: "daily",
        travelTime: "5 mins",
        travelMode: "car",
        latitude: 36.4975,
        longitude: -4.9704,
      },
      {
        label: "Marbella Old Town",
        category: "town",
        travelTime: "18 mins",
        travelMode: "car",
        latitude: 36.51,
        longitude: -4.8861,
      },
    ],
    reasonToView: "Private Nueva Andalucia villa with greenery, pool, and prime golf access.",
    reference: "SV2298",
    agentName: siteConfig.contact.advisorName,
    agentPhone: siteConfig.contact.advisorPhone,
    agentEmail: siteConfig.contact.advisorEmail,
    agentPhoto: "/images/agent.jpg",
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
