// Toll fees by vehicle type
export const tollFees = {
  motorcycle: 0.0,
  car: 4.0,
  minibus: 6.0,
  bus: 8.0,
  truck: 10.0,
  haulage: 20.0,
}

// Vehicle types with fuel consumption (km per litre) and toll category
export const vehicleTypes = {
  car: {
    name: "Light Motor Vehicle",
    consumption: 12,
    color: "text-primary",
    tollCategory: "car",
  },
  motorcycle: {
    name: "Motor Cycle",
    consumption: 25,
    color: "text-primary",
    tollCategory: "motorcycle",
  },
  minibus: {
    name: "MiniBus",
    consumption: 8,
    color: "text-primary",
    tollCategory: "minibus",
  },
  bus: { name: "Bus", consumption: 4, color: "text-primary", tollCategory: "bus" },
  truck: {
    name: "Heavy Vehicle",
    consumption: 3,
    color: "text-primary",
    tollCategory: "truck",
  },
  haulage: {
    name: "Haulage Truck",
    consumption: 2.5,
    color: "text-primary",
    tollCategory: "haulage",
  },
}

// Current fuel price in USD (ZERA regulated, June 2026)
export const FUEL_PRICE_USD = 2.08

// Zimbabwe toll gates with actual locations
export const zimbabweTollGates = [
  { id: "inkomo_toll", name: "Inkomo Toll Plaza", location: "A1 Highway, Inkomo (Harare-Chirundu Road)", highway: "A1", kmFromHarare: 40 },
  { id: "makuti_toll", name: "Makuti Toll Plaza", location: "A1 Highway, Makuti", highway: "A1", kmFromHarare: 180 },
  { id: "marondera_toll", name: "Marondera Toll Plaza", location: "A2 Highway, Marondera", highway: "A2", kmFromHarare: 75 },
  { id: "rusape_toll", name: "Rusape Toll Plaza", location: "A3 Highway, Rusape", highway: "A3", kmFromHarare: 170 },
  { id: "mvuma_toll", name: "Mvuma Toll Plaza", location: "A4 Highway, Mvuma", highway: "A4", kmFromHarare: 220 },
  { id: "masvingo_toll", name: "Masvingo Toll Plaza", location: "A4 Highway, Masvingo South", highway: "A4", kmFromHarare: 292 },
  { id: "beitbridge_toll", name: "Beitbridge Toll Plaza", location: "A4 Highway, Beitbridge North", highway: "A4", kmFromHarare: 572 },
  { id: "chegutu_toll", name: "Chegutu Toll Plaza", location: "A5 Highway, Chegutu", highway: "A5", kmFromHarare: 110 },
  { id: "kwekwe_toll", name: "Kwekwe Toll Plaza", location: "A5 Highway, Kwekwe", highway: "A5", kmFromHarare: 207 },
  { id: "gweru_toll", name: "Gweru Toll Plaza", location: "A5 Highway, Gweru East", highway: "A5", kmFromHarare: 274 },
  { id: "shangani_toll", name: "Shangani Toll Plaza", location: "A5 Highway, Shangani", highway: "A5", kmFromHarare: 350 },
  { id: "plumtree_toll", name: "Plumtree Toll Plaza", location: "A6 Highway, Plumtree", highway: "A6", kmFromBulawayo: 100 },
  { id: "gwanda_toll", name: "Gwanda Toll Plaza", location: "A7 Highway, Gwanda", highway: "A7", kmFromBulawayo: 126 },
  { id: "west_nicholson_toll", name: "West Nicholson Toll Plaza", location: "A7 Highway, West Nicholson", highway: "A7", kmFromBulawayo: 198 },
  { id: "hwange_toll", name: "Hwange Toll Plaza", location: "A8 Highway, Hwange", highway: "A8", kmFromBulawayo: 296 },
  { id: "victoria_falls_toll", name: "Victoria Falls Toll Plaza", location: "A8 Highway, Victoria Falls", highway: "A8", kmFromBulawayo: 440 },
  { id: "chinhoyi_toll", name: "Chinhoyi Toll Plaza", location: "Chinhoyi-Karoi Road", highway: "Regional", kmFromHarare: 116 },
  { id: "mutoko_toll", name: "Mutoko Toll Plaza", location: "A2 Highway, Mutoko", highway: "A2", kmFromHarare: 143 },
  { id: "chipinge_toll", name: "Chipinge Toll Plaza", location: "Chipinge-Triangle Road", highway: "Regional", kmFromMutare: 131 },
]

export type TollGate = typeof zimbabweTollGates[number]

// Route mappings to toll gates
const routeMappings: Record<string, string[]> = {
  "Harare-Chirundu": ["makuti_toll"],
  "Harare-Kariba": ["makuti_toll"],
  "Harare-Mutoko": ["marondera_toll", "mutoko_toll"],
  "Harare-Nyamapanda": ["marondera_toll", "mutoko_toll"],
  "Marondera-Mutoko": ["mutoko_toll"],
  "Harare-Mutare": ["rusape_toll"],
  "Harare-Rusape": ["rusape_toll"],
  "Mutare-Chipinge": ["chipinge_toll"],
  "Harare-Masvingo": ["mvuma_toll"],
  "Harare-Beitbridge": ["mvuma_toll", "masvingo_toll", "beitbridge_toll"],
  "Masvingo-Beitbridge": ["masvingo_toll", "beitbridge_toll"],
  "Masvingo-Triangle": ["masvingo_toll"],
  "Harare-Chegutu": ["chegutu_toll"],
  "Harare-Kadoma": ["chegutu_toll"],
  "Harare-Kwekwe": ["chegutu_toll", "kwekwe_toll"],
  "Harare-Gweru": ["chegutu_toll", "kwekwe_toll", "gweru_toll"],
  "Harare-Bulawayo": ["chegutu_toll", "kwekwe_toll", "gweru_toll", "shangani_toll"],
  "Gweru-Bulawayo": ["gweru_toll", "shangani_toll"],
  "Kwekwe-Gweru": ["kwekwe_toll", "gweru_toll"],
  "Bulawayo-Plumtree": ["plumtree_toll"],
  "Bulawayo-Gwanda": ["gwanda_toll"],
  "Bulawayo-Beitbridge": ["gwanda_toll", "west_nicholson_toll"],
  "Gwanda-Beitbridge": ["west_nicholson_toll"],
  "Bulawayo-Hwange": ["hwange_toll"],
  "Bulawayo-Victoria Falls": ["hwange_toll", "victoria_falls_toll"],
  "Hwange-Victoria Falls": ["victoria_falls_toll"],
  "Harare-Chinhoyi": ["chinhoyi_toll"],
}

export function findTollGatesOnSegment(fromCity: string, toCity: string): TollGate[] {
  const routeTollGates: TollGate[] = []
  const routeKey1 = `${fromCity}-${toCity}`
  const routeKey2 = `${toCity}-${fromCity}`
  const tollGateIds: string[] = routeMappings[routeKey1] || routeMappings[routeKey2] || []

  tollGateIds.forEach((tollId) => {
    const tollGate = zimbabweTollGates.find((tg) => tg.id === tollId)
    if (tollGate) routeTollGates.push(tollGate)
  })

  return routeTollGates
}

// Distance data type
export type DistanceRoute = {
  from: string;
  to: string;
  distance: number;
  time: string;
  routeType: string;
  scenic: boolean;
  tollGates: string[];
  alternative?: boolean;
}

// Expanded distance data
export const distanceData: DistanceRoute[] = [
  // Harare-Karoi-Kariba corridor
  { from: "Harare", to: "Karoi", distance: 205, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: ["Inkomo Toll Plaza", "Chinhoyi Toll Plaza"] },
  { from: "Karoi", to: "Harare", distance: 205, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: ["Chinhoyi Toll Plaza", "Inkomo Toll Plaza"] },
  { from: "Chinhoyi", to: "Karoi", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: ["Chinhoyi Toll Plaza"] },
  { from: "Karoi", to: "Chinhoyi", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: ["Chinhoyi Toll Plaza"] },
  { from: "Kariba", to: "Karoi", distance: 153, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Karoi", to: "Kariba", distance: 153, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Banket", distance: 23.9, time: "0h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Banket", to: "Chinhoyi", distance: 23.9, time: "0h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Banket", distance: 95, time: "1h 15m", routeType: "main_road", scenic: false, tollGates: ["Inkomo Toll Plaza"] },
  { from: "Banket", to: "Harare", distance: 95, time: "1h 15m", routeType: "main_road", scenic: false, tollGates: ["Inkomo Toll Plaza"] },
  { from: "Harare", to: "Kariba", distance: 365, time: "5h 30m", routeType: "main_road", scenic: true, tollGates: ["Makuti Toll Plaza"] },
  { from: "Kariba", to: "Harare", distance: 365, time: "5h 30m", routeType: "main_road", scenic: true, tollGates: ["Makuti Toll Plaza"] },

  // Major highways
  { from: "Harare", to: "Bulawayo", distance: 439, time: "4h 30m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Harare", to: "Mutare", distance: 263, time: "3h 15m", routeType: "highway", scenic: true, tollGates: ["Rusape Toll Plaza"] },
  { from: "Harare", to: "Gweru", distance: 274, time: "3h 00m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Harare", to: "Masvingo", distance: 292, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Chinhoyi", distance: 116, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Kadoma", distance: 140, time: "1h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Chegutu", distance: 110, time: "1h 20m", routeType: "main_road", scenic: false, tollGates: ["Chegutu Toll Plaza"] },
  { from: "Harare", to: "Bindura", distance: 88, time: "1h 10m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Harare", to: "Marondera", distance: 75, time: "1h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Chitungwiza", distance: 25, time: "0h 30m", routeType: "urban", scenic: false, tollGates: [] },
  { from: "Harare", to: "Norton", distance: 40, time: "0h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Rusape", distance: 170, time: "2h 10m", routeType: "secondary", scenic: true, tollGates: ["Rusape Toll Plaza"] },

  // Alternative routes
  { from: "Harare", to: "Mutare", distance: 285, time: "3h 45m", routeType: "scenic", scenic: true, tollGates: [], alternative: true },
  { from: "Harare", to: "Bulawayo", distance: 465, time: "5h 15m", routeType: "scenic", scenic: true, tollGates: [], alternative: true },

  // Bulawayo connections
  { from: "Bulawayo", to: "Mutare", distance: 518, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Gweru", distance: 165, time: "2h 00m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza"] },
  { from: "Bulawayo", to: "Masvingo", distance: 284, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Victoria Falls", distance: 440, time: "4h 30m", routeType: "highway", scenic: true, tollGates: ["Victoria Falls Toll Plaza"] },
  { from: "Bulawayo", to: "Hwange", distance: 296, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Plumtree", distance: 100, time: "1h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Gwanda", distance: 126, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Beitbridge", distance: 322, time: "3h 45m", routeType: "highway", scenic: false, tollGates: ["Beitbridge Toll Plaza"] },
  { from: "Bulawayo", to: "Zvishavane", distance: 185, time: "2h 15m", routeType: "secondary", scenic: false, tollGates: [] },

  // Mutare connections
  { from: "Mutare", to: "Gweru", distance: 353, time: "4h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Masvingo", distance: 271, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Chipinge", distance: 131, time: "1h 45m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Mutare", to: "Rusape", distance: 93, time: "1h 15m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Mutare", to: "Nyanga", distance: 115, time: "1h 30m", routeType: "secondary", scenic: true, tollGates: [] },

  // Other connections
  { from: "Gweru", to: "Masvingo", distance: 157, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Kwekwe", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Shurugwi", distance: 35, time: "0h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Zvishavane", distance: 120, time: "1h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Chiredzi", distance: 166, time: "2h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Beitbridge", distance: 288, time: "3h 30m", routeType: "highway", scenic: false, tollGates: ["Beitbridge Toll Plaza"] },
  { from: "Masvingo", to: "Zvishavane", distance: 96, time: "1h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Triangle", distance: 140, time: "1h 50m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Hwange", distance: 144, time: "1h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Kadoma", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chegutu", to: "Kadoma", distance: 30, time: "0h 25m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chegutu", to: "Norton", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Norton", to: "Chegutu", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Kadoma", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Redcliff", distance: 15, time: "0h 15m", routeType: "urban", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Shamva", distance: 29, time: "0h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Mt Darwin", distance: 118, time: "1h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Rusape", distance: 95, time: "1h 10m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Marondera", to: "Macheke", distance: 40, time: "0h 35m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Rusape", to: "Nyanga", distance: 98, time: "1h 15m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Beitbridge", to: "Gwanda", distance: 196, time: "2h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "West Nicholson", distance: 72, time: "0h 55m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Triangle", distance: 26, time: "0h 25m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Chipinge", distance: 185, time: "2h 20m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Nyanga", to: "Juliasdale", distance: 20, time: "0h 20m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Zvishavane", to: "Shurugwi", distance: 85, time: "1h 00m", routeType: "secondary", scenic: false, tollGates: [] },
]

// Extract cities list
export const cities: string[] = Array.from(new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])).sort()

// Provincial boundaries
export const provincialBoundaries = [
  { from: "Harare Province", to: "Mashonaland West", cities: ["Harare", "Chinhoyi"] },
  { from: "Harare Province", to: "Manicaland", cities: ["Harare", "Mutare"] },
  { from: "Harare Province", to: "Midlands", cities: ["Harare", "Gweru"] },
  { from: "Midlands", to: "Matabeleland South", cities: ["Gweru", "Bulawayo"] },
  { from: "Matabeleland South", to: "Matabeleland North", cities: ["Bulawayo", "Victoria Falls"] },
  { from: "Midlands", to: "Masvingo", cities: ["Gweru", "Masvingo"] },
  { from: "Masvingo", to: "Matabeleland South", cities: ["Masvingo", "Beitbridge"] },
]
