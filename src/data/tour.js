import beachImage from "../assets/beach.jpg";
import cheetahImage from "../assets/cheetah-on-tree.jpg";
import wildebeestImage from "../assets/5969.jpg";
import elephantImage from "../assets/elephant.jpg";
import lionsImage from "../assets/lions-1.jpg";
import savannahImage from "../assets/savannah-road.jpg";

export const tours = [
  {
    id: 1,
    title: "Golden Coast Escape",
    location: "Diani, Kenya",
    description:
      "Relax on pristine beaches, snorkel in coral gardens, and enjoy a laid-back coastal retreat.",
    duration: "3 days",
    groupSize: "8 people",
    price: 180,
    rating: "4.9",
    badge: "Featured",
    image: beachImage,
    overview:
      "This beach-focused escape blends easygoing luxury with adventurous island experiences, making it ideal for couples, friends, and families seeking a relaxed Kenyan coast getaway.",
    highlights: [
      "Snorkeling in coral-rich waters",
      "Sunset dhow cruise along the shoreline",
      "Beachfront resort relaxation",
    ],
    itinerary: [
      "Day 1: Arrive in Diani, check in, and enjoy a relaxed sunset dinner by the ocean.",
      "Day 2: Explore coral gardens with snorkeling and beachside lunch stops.",
      "Day 3: Spend the morning at leisure before departing with unforgettable coastal memories.",
    ],
    includes: [
      "Accommodation",
      "Breakfast",
      "Snorkel gear",
      "Transport in-country",
    ],
  },
  {
    id: 2,
    title: "Big Five Safari",
    location: "Masai Mara",
    description:
      "Follow the wildebeest migration and spot lions, rhinos, elephants, and buffalo in the wild.",
    duration: "5 days",
    groupSize: "6 people",
    price: 320,
    rating: "4.8",
    badge: "Popular",
    image: cheetahImage,
    overview:
      "A classic Masai Mara safari designed for travelers who want unforgettable wildlife encounters, expert guiding, and immersive bush experiences across open savannah plains.",
    highlights: [
      "Game drives at sunrise and sunset",
      "Encounter with the Big Five",
      "Campsite or lodge bush evenings",
    ],
    itinerary: [
      "Day 1: Arrival, briefing, and evening bush drive to settle into camp life.",
      "Day 2: Full-day safari exploring predator-rich landscapes and river crossings.",
      "Day 3: Morning drive, picnic brunch, and a second evening game trail.",
      "Day 4: Flexible wildlife viewing and cultural visit to a local community.",
      "Day 5: Final drive and departure from the reserve.",
    ],
    includes: ["Safari vehicle", "Park fees", "Meals", "Professional guide"],
  },
  {
    id: 3,
    title: "Highland Adventure",
    location: "Aberdare Range",
    description:
      "Hike misty trails, discover hidden waterfalls, and camp under star-filled skies.",
    duration: "4 days",
    groupSize: "10 people",
    price: 240,
    rating: "4.7",
    badge: "New",
    image: wildebeestImage,
    overview:
      "Built for nature lovers and active travelers, this highland route combines hiking, wildlife viewing, and quiet nights under the stars in a cool, dramatic mountain landscape.",
    highlights: [
      "Waterfall hikes through hidden trails",
      "Stargazing nights in the highlands",
      "Forest and moorland exploration",
    ],
    itinerary: [
      "Day 1: Transfer to the highlands, light walk, and nighttime camp setup.",
      "Day 2: Trail hike to scenic viewpoints and waterfalls.",
      "Day 3: Guided forest walk and photography stop near moorland ridges.",
      "Day 4: Cultural visit and return trip with a final scenic lookout.",
    ],
    includes: ["Guide services", "Camping gear", "Meals", "Transport"],
  },
  {
    id: 4,
    title: "Elephant Trails",
    location: "Amboseli",
    description:
      "Enjoy sunrise game drives and memorable encounters with elephants against Mount Kilimanjaro.",
    duration: "2 days",
    groupSize: "5 people",
    price: 150,
    rating: "4.9",
    badge: "Best Seller",
    image: elephantImage,
    overview:
      "This short but powerful safari experience focuses on iconic elephant encounters, dramatic landscapes, and memorable sunrise photography in one of Kenya’s most cinematic parks.",
    highlights: [
      "Sunrise elephant viewing",
      "Mt. Kilimanjaro backdrop photography",
      "Conservation-focused storytelling",
    ],
    itinerary: [
      "Day 1: Early game drive, lunch in the park, and evening relaxation at camp.",
      "Day 2: Dawn departure to chase elephants and capture panoramic scenic frames.",
    ],
    includes: ["Game drives", "Breakfast", "Park entrance fee", "Guide"],
  },
  {
    id: 5,
    title: "Lion Pride Expedition",
    location: "Serengeti",
    description:
      "Experience dramatic plains, close wildlife sightings, and expert-led photography stops.",
    duration: "6 days",
    groupSize: "7 people",
    price: 410,
    rating: "5.0",
    badge: "Premium",
    image: lionsImage,
    overview:
      "A premium safari crafted for serious wildlife enthusiasts who want immersive game tracking, luxury stays, and exceptional sightings across the Serengeti plains.",
    highlights: [
      "Luxury tented accommodation",
      "Premium wildlife photo stops",
      "Expert tracking and guided encounters",
    ],
    itinerary: [
      "Day 1: Arrival and welcome briefing in camp.",
      "Day 2: Full-day plains exploration and big-cat tracking.",
      "Day 3: Sunrise drive followed by leisure and scenic picnic lunch.",
      "Day 4: Guided photography session and bush dinner under the stars.",
      "Day 5: Extended game drive through migration corridors.",
      "Day 6: Final safari and departure.",
    ],
    includes: [
      "Luxury lodging",
      "All meals",
      "Premium safari guide",
      "Transfers",
    ],
  },
  {
    id: 6,
    title: "Savannah Sunrise Drive",
    location: "Laikipia",
    description:
      "Watch the sunrise spill across grasslands and connect with Kenya’s most iconic landscapes.",
    duration: "1 day",
    groupSize: "4 people",
    price: 95,
    rating: "4.6",
    badge: "Scenic",
    image: savannahImage,
    overview:
      "A compact, scenic adventure perfect for travelers seeking a quick encounter with wide-open grasslands, dramatic sunrise light, and quiet savannah views.",
    highlights: [
      "Sunrise drive through open plains",
      "Landscape photography stop",
      "Short and easy itinerary",
    ],
    itinerary: [
      "Day 1: Early departure for sunrise viewing across the grasslands.",
      "Day 2: Scenic drive, short nature walk, and return before midday.",
    ],
    includes: ["Transport", "Guide", "Refreshments", "Park access"],
  },
];
