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

// Complete distance data from Zimbabwe Tourism official distance matrix
// All 21 cities with accurate distances in kilometers
export const distanceData: DistanceRoute[] = [
  // Harare to all cities (row 1 of distance matrix)
  { from: "Harare", to: "Chinhoyi", distance: 116, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: ["Chinhoyi Toll Plaza"] },
  { from: "Harare", to: "Kariba", distance: 358, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: ["Makuti Toll Plaza"] },
  { from: "Harare", to: "Karoi", distance: 205, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: ["Inkomo Toll Plaza", "Chinhoyi Toll Plaza"] },
  { from: "Harare", to: "Kadoma", distance: 141, time: "1h 45m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza"] },
  { from: "Harare", to: "Kwekwe", distance: 207, time: "2h 30m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Kwekwe Toll Plaza"] },
  { from: "Harare", to: "Gweru", distance: 275, time: "3h 15m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Kwekwe Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Harare", to: "Bulawayo", distance: 439, time: "5h 00m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Harare", to: "Victoria Falls", distance: 878, time: "9h 30m", routeType: "highway", scenic: true, tollGates: ["Victoria Falls Toll Plaza"] },
  { from: "Harare", to: "Hwange", distance: 734, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: ["Hwange Toll Plaza"] },
  { from: "Harare", to: "Beitbridge", distance: 572, time: "6h 30m", routeType: "highway", scenic: false, tollGates: ["Mvuma Toll Plaza", "Masvingo Toll Plaza", "Beitbridge Toll Plaza"] },
  { from: "Harare", to: "Gwanda", distance: 565, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: ["Gwanda Toll Plaza"] },
  { from: "Harare", to: "Masvingo", distance: 292, time: "3h 30m", routeType: "highway", scenic: false, tollGates: ["Mvuma Toll Plaza", "Masvingo Toll Plaza"] },
  { from: "Harare", to: "Mutare", distance: 265, time: "3h 15m", routeType: "highway", scenic: true, tollGates: ["Rusape Toll Plaza"] },
  { from: "Harare", to: "Chipinge", distance: 303, time: "4h 00m", routeType: "main_road", scenic: true, tollGates: ["Chipinge Toll Plaza"] },
  { from: "Harare", to: "Nyanga", distance: 283, time: "3h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Harare", to: "Rusape", distance: 170, time: "2h 10m", routeType: "highway", scenic: false, tollGates: ["Rusape Toll Plaza"] },
  { from: "Harare", to: "Marondera", distance: 75, time: "1h 00m", routeType: "highway", scenic: false, tollGates: ["Marondera Toll Plaza"] },
  { from: "Harare", to: "Bindura", distance: 88, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Harare", to: "Mt Darwin", distance: 156, time: "2h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Harare", to: "Chiredzi", distance: 458, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Chinhoyi to all cities (row 2)
  { from: "Chinhoyi", to: "Kariba", distance: 242, time: "3h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Karoi", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Kadoma", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Kwekwe", distance: 155, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Gweru", distance: 223, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Bulawayo", distance: 387, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Victoria Falls", distance: 826, time: "9h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Hwange", distance: 682, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Beitbridge", distance: 690, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Gwanda", distance: 513, time: "6h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Masvingo", distance: 410, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Mutare", distance: 333, time: "4h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Chipinge", distance: 370, time: "4h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Nyanga", distance: 350, time: "4h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chinhoyi", to: "Rusape", distance: 238, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Marondera", distance: 143, time: "1h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Bindura", distance: 204, time: "2h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Mt Darwin", distance: 239, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chinhoyi", to: "Chiredzi", distance: 574, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Kariba to all cities (row 3)
  { from: "Kariba", to: "Karoi", distance: 153, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kariba", to: "Kadoma", distance: 240, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Kwekwe", distance: 306, time: "3h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Gweru", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Bulawayo", distance: 538, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Victoria Falls", distance: 977, time: "10h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kariba", to: "Hwange", distance: 833, time: "9h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Beitbridge", distance: 736, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Gwanda", distance: 664, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Masvingo", distance: 456, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Mutare", distance: 484, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Chipinge", distance: 520, time: "6h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kariba", to: "Nyanga", distance: 500, time: "6h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kariba", to: "Rusape", distance: 388, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Marondera", distance: 293, time: "3h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Bindura", distance: 354, time: "4h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Mt Darwin", distance: 389, time: "4h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kariba", to: "Chiredzi", distance: 620, time: "7h 15m", routeType: "main_road", scenic: false, tollGates: [] },

  // Karoi to all cities (row 4)
  { from: "Karoi", to: "Kadoma", distance: 130, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Kwekwe", distance: 196, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Gweru", distance: 264, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Bulawayo", distance: 428, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Victoria Falls", distance: 867, time: "9h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Karoi", to: "Hwange", distance: 723, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Beitbridge", distance: 626, time: "7h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Gwanda", distance: 554, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Masvingo", distance: 346, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Mutare", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Chipinge", distance: 410, time: "5h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Karoi", to: "Nyanga", distance: 390, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Karoi", to: "Rusape", distance: 278, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Marondera", distance: 183, time: "2h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Bindura", distance: 244, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Mt Darwin", distance: 279, time: "3h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Karoi", to: "Chiredzi", distance: 510, time: "6h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Kadoma to all cities (row 5)
  { from: "Kadoma", to: "Kwekwe", distance: 66, time: "0h 50m", routeType: "highway", scenic: false, tollGates: ["Kwekwe Toll Plaza"] },
  { from: "Kadoma", to: "Gweru", distance: 134, time: "1h 40m", routeType: "highway", scenic: false, tollGates: ["Kwekwe Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Kadoma", to: "Bulawayo", distance: 298, time: "3h 30m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Kadoma", to: "Victoria Falls", distance: 737, time: "8h 00m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Kadoma", to: "Hwange", distance: 593, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Beitbridge", distance: 496, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Gwanda", distance: 424, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Masvingo", distance: 316, time: "3h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Mutare", distance: 344, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Chipinge", distance: 380, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kadoma", to: "Nyanga", distance: 360, time: "4h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kadoma", to: "Rusape", distance: 248, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Marondera", distance: 153, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Bindura", distance: 214, time: "2h 40m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Mt Darwin", distance: 249, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Chiredzi", distance: 480, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Kwekwe to all cities (row 6)
  { from: "Kwekwe", to: "Gweru", distance: 68, time: "0h 50m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza"] },
  { from: "Kwekwe", to: "Bulawayo", distance: 232, time: "2h 45m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Kwekwe", to: "Victoria Falls", distance: 671, time: "7h 15m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Kwekwe", to: "Hwange", distance: 527, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Beitbridge", distance: 430, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Gwanda", distance: 358, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Masvingo", distance: 250, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Mutare", distance: 278, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Chipinge", distance: 314, time: "3h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kwekwe", to: "Nyanga", distance: 294, time: "3h 40m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kwekwe", to: "Rusape", distance: 182, time: "2h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Marondera", distance: 87, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Bindura", distance: 148, time: "1h 50m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Mt Darwin", distance: 183, time: "2h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Chiredzi", distance: 414, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Gweru to all cities (row 7)
  { from: "Gweru", to: "Bulawayo", distance: 164, time: "2h 00m", routeType: "highway", scenic: false, tollGates: ["Shangani Toll Plaza"] },
  { from: "Gweru", to: "Victoria Falls", distance: 603, time: "6h 30m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Gweru", to: "Hwange", distance: 459, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Beitbridge", distance: 498, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Gwanda", distance: 290, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Masvingo", distance: 182, time: "2h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Mutare", distance: 210, time: "2h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Chipinge", distance: 246, time: "3h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Gweru", to: "Nyanga", distance: 226, time: "2h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Gweru", to: "Rusape", distance: 114, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Marondera", distance: 155, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Bindura", distance: 216, time: "2h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Mt Darwin", distance: 251, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Chiredzi", distance: 398, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Bulawayo to all cities (row 8)
  { from: "Bulawayo", to: "Victoria Falls", distance: 439, time: "4h 45m", routeType: "highway", scenic: true, tollGates: ["Victoria Falls Toll Plaza"] },
  { from: "Bulawayo", to: "Hwange", distance: 295, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: ["Hwange Toll Plaza"] },
  { from: "Bulawayo", to: "Beitbridge", distance: 334, time: "4h 00m", routeType: "highway", scenic: false, tollGates: ["Gwanda Toll Plaza", "West Nicholson Toll Plaza", "Beitbridge Toll Plaza"] },
  { from: "Bulawayo", to: "Gwanda", distance: 126, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: ["Gwanda Toll Plaza"] },
  { from: "Bulawayo", to: "Masvingo", distance: 280, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Mutare", distance: 570, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Chipinge", distance: 606, time: "7h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Bulawayo", to: "Nyanga", distance: 586, time: "6h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Bulawayo", to: "Rusape", distance: 474, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Marondera", distance: 379, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Bindura", distance: 440, time: "5h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Mt Darwin", distance: 475, time: "5h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Chiredzi", distance: 434, time: "5h 15m", routeType: "main_road", scenic: false, tollGates: [] },

  // Victoria Falls to all cities (row 9)
  { from: "Victoria Falls", to: "Hwange", distance: 144, time: "1h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Victoria Falls", to: "Beitbridge", distance: 773, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Gwanda", distance: 565, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Masvingo", distance: 719, time: "7h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Mutare", distance: 1009, time: "11h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Chipinge", distance: 1045, time: "11h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Victoria Falls", to: "Nyanga", distance: 1025, time: "11h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Victoria Falls", to: "Rusape", distance: 913, time: "10h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Marondera", distance: 818, time: "9h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Bindura", distance: 879, time: "9h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Mt Darwin", distance: 914, time: "10h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Chiredzi", distance: 873, time: "9h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Hwange to all cities (row 10)
  { from: "Hwange", to: "Beitbridge", distance: 629, time: "7h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Gwanda", distance: 421, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Masvingo", distance: 575, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Mutare", distance: 865, time: "9h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Chipinge", distance: 901, time: "9h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Nyanga", distance: 881, time: "9h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Rusape", distance: 769, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Marondera", distance: 674, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Bindura", distance: 735, time: "8h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Mt Darwin", distance: 770, time: "8h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Hwange", to: "Chiredzi", distance: 729, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Beitbridge to all cities (row 11)
  { from: "Beitbridge", to: "Gwanda", distance: 138, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: ["West Nicholson Toll Plaza"] },
  { from: "Beitbridge", to: "Masvingo", distance: 280, time: "3h 15m", routeType: "highway", scenic: false, tollGates: ["Beitbridge Toll Plaza", "Masvingo Toll Plaza"] },
  { from: "Beitbridge", to: "Mutare", distance: 470, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Chipinge", distance: 506, time: "6h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Beitbridge", to: "Nyanga", distance: 486, time: "5h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Beitbridge", to: "Rusape", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Marondera", distance: 279, time: "3h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Bindura", distance: 340, time: "4h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Mt Darwin", distance: 375, time: "4h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Chiredzi", distance: 228, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Gwanda to all cities (row 12)
  { from: "Gwanda", to: "Masvingo", distance: 406, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Mutare", distance: 696, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Chipinge", distance: 732, time: "8h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Gwanda", to: "Nyanga", distance: 712, time: "8h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Gwanda", to: "Rusape", distance: 600, time: "7h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Marondera", distance: 505, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Bindura", distance: 566, time: "6h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Mt Darwin", distance: 601, time: "7h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Chiredzi", distance: 454, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Masvingo to all cities (row 13)
  { from: "Masvingo", to: "Mutare", distance: 290, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Chipinge", distance: 326, time: "4h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Masvingo", to: "Nyanga", distance: 306, time: "3h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Masvingo", to: "Rusape", distance: 194, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Marondera", distance: 217, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Bindura", distance: 278, time: "3h 20m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Mt Darwin", distance: 313, time: "3h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Chiredzi", distance: 166, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Mutare to all cities (row 14)
  { from: "Mutare", to: "Chipinge", distance: 131, time: "1h 45m", routeType: "main_road", scenic: true, tollGates: ["Chipinge Toll Plaza"] },
  { from: "Mutare", to: "Nyanga", distance: 111, time: "1h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Mutare", to: "Rusape", distance: 93, time: "1h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Mutare", to: "Marondera", distance: 190, time: "2h 20m", routeType: "highway", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Bindura", distance: 251, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Mt Darwin", distance: 286, time: "3h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Chiredzi", distance: 362, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Chipinge to all cities (row 15)
  { from: "Chipinge", to: "Nyanga", distance: 148, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chipinge", to: "Rusape", distance: 162, time: "2h 10m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Chipinge", to: "Marondera", distance: 281, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Bindura", distance: 342, time: "4h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Mt Darwin", distance: 377, time: "4h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Chiredzi", distance: 231, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Nyanga to all cities (row 16)
  { from: "Nyanga", to: "Rusape", distance: 98, time: "1h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Marondera", distance: 208, time: "2h 40m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Bindura", distance: 269, time: "3h 20m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Nyanga", to: "Mt Darwin", distance: 304, time: "3h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Nyanga", to: "Chiredzi", distance: 381, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Rusape to all cities (row 17)
  { from: "Rusape", to: "Marondera", distance: 108, time: "1h 20m", routeType: "highway", scenic: false, tollGates: [] },
  { from: "Rusape", to: "Bindura", distance: 169, time: "2h 05m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Rusape", to: "Mt Darwin", distance: 204, time: "2h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Rusape", to: "Chiredzi", distance: 363, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Marondera to all cities (row 18)
  { from: "Marondera", to: "Bindura", distance: 131, time: "1h 40m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Mt Darwin", distance: 166, time: "2h 05m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Chiredzi", distance: 383, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Bindura to all cities (row 19)
  { from: "Bindura", to: "Mt Darwin", distance: 68, time: "0h 55m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Chiredzi", distance: 370, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Mt Darwin to all cities (row 20)
  { from: "Mt Darwin", to: "Chiredzi", distance: 405, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Return routes (for bidirectional travel)
  { from: "Chinhoyi", to: "Harare", distance: 116, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: ["Chinhoyi Toll Plaza"] },
  { from: "Kariba", to: "Harare", distance: 358, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: ["Makuti Toll Plaza"] },
  { from: "Karoi", to: "Harare", distance: 205, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: ["Inkomo Toll Plaza", "Chinhoyi Toll Plaza"] },
  { from: "Kadoma", to: "Harare", distance: 141, time: "1h 45m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza"] },
  { from: "Kwekwe", to: "Harare", distance: 207, time: "2h 30m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Kwekwe Toll Plaza"] },
  { from: "Gweru", to: "Harare", distance: 275, time: "3h 15m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Kwekwe Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Bulawayo", to: "Harare", distance: 439, time: "5h 00m", routeType: "highway", scenic: false, tollGates: ["Chegutu Toll Plaza", "Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Victoria Falls", to: "Harare", distance: 878, time: "9h 30m", routeType: "highway", scenic: true, tollGates: ["Victoria Falls Toll Plaza"] },
  { from: "Hwange", to: "Harare", distance: 734, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: ["Hwange Toll Plaza"] },
  { from: "Beitbridge", to: "Harare", distance: 572, time: "6h 30m", routeType: "highway", scenic: false, tollGates: ["Mvuma Toll Plaza", "Masvingo Toll Plaza", "Beitbridge Toll Plaza"] },
  { from: "Gwanda", to: "Harare", distance: 565, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: ["Gwanda Toll Plaza"] },
  { from: "Masvingo", to: "Harare", distance: 292, time: "3h 30m", routeType: "highway", scenic: false, tollGates: ["Mvuma Toll Plaza", "Masvingo Toll Plaza"] },
  { from: "Mutare", to: "Harare", distance: 265, time: "3h 15m", routeType: "highway", scenic: true, tollGates: ["Rusape Toll Plaza"] },
  { from: "Chipinge", to: "Harare", distance: 303, time: "4h 00m", routeType: "main_road", scenic: true, tollGates: ["Chipinge Toll Plaza"] },
  { from: "Nyanga", to: "Harare", distance: 283, time: "3h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Harare", distance: 170, time: "2h 10m", routeType: "highway", scenic: false, tollGates: ["Rusape Toll Plaza"] },
  { from: "Marondera", to: "Harare", distance: 75, time: "1h 00m", routeType: "highway", scenic: false, tollGates: ["Marondera Toll Plaza"] },
  { from: "Bindura", to: "Harare", distance: 88, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Harare", distance: 156, time: "2h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Harare", distance: 458, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // More return routes
  { from: "Kariba", to: "Chinhoyi", distance: 242, time: "3h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Karoi", to: "Chinhoyi", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kadoma", to: "Chinhoyi", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Chinhoyi", distance: 155, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Chinhoyi", distance: 223, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Chinhoyi", distance: 387, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Chinhoyi", distance: 826, time: "9h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Chinhoyi", distance: 682, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Chinhoyi", distance: 690, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Chinhoyi", distance: 513, time: "6h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Chinhoyi", distance: 410, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Chinhoyi", distance: 333, time: "4h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Chinhoyi", distance: 370, time: "4h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Chinhoyi", distance: 350, time: "4h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Chinhoyi", distance: 238, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Chinhoyi", distance: 143, time: "1h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Chinhoyi", distance: 204, time: "2h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Chinhoyi", distance: 239, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Chinhoyi", distance: 574, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Kariba return routes
  { from: "Karoi", to: "Kariba", distance: 153, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Kadoma", to: "Kariba", distance: 240, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Kariba", distance: 306, time: "3h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Kariba", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Kariba", distance: 538, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Kariba", distance: 977, time: "10h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Kariba", distance: 833, time: "9h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Kariba", distance: 736, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Kariba", distance: 664, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Kariba", distance: 456, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Kariba", distance: 484, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Kariba", distance: 520, time: "6h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Kariba", distance: 500, time: "6h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Kariba", distance: 388, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Kariba", distance: 293, time: "3h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Kariba", distance: 354, time: "4h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Kariba", distance: 389, time: "4h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Kariba", distance: 620, time: "7h 15m", routeType: "main_road", scenic: false, tollGates: [] },

  // Karoi return routes
  { from: "Kadoma", to: "Karoi", distance: 130, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Karoi", distance: 196, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Karoi", distance: 264, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bulawayo", to: "Karoi", distance: 428, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Victoria Falls", to: "Karoi", distance: 867, time: "9h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Karoi", distance: 723, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Karoi", distance: 626, time: "7h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Karoi", distance: 554, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Karoi", distance: 346, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Karoi", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Karoi", distance: 410, time: "5h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Karoi", distance: 390, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Karoi", distance: 278, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Karoi", distance: 183, time: "2h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Karoi", distance: 244, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Karoi", distance: 279, time: "3h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Karoi", distance: 510, time: "6h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // More return routes for remaining cities (Kadoma onwards)
  { from: "Kwekwe", to: "Kadoma", distance: 66, time: "0h 50m", routeType: "highway", scenic: false, tollGates: ["Kwekwe Toll Plaza"] },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m", routeType: "highway", scenic: false, tollGates: ["Kwekwe Toll Plaza", "Gweru Toll Plaza"] },
  { from: "Bulawayo", to: "Kadoma", distance: 298, time: "3h 30m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Victoria Falls", to: "Kadoma", distance: 737, time: "8h 00m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Kadoma", distance: 593, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Kadoma", distance: 496, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Kadoma", distance: 424, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Kadoma", distance: 316, time: "3h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Kadoma", distance: 344, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Kadoma", distance: 380, time: "4h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Kadoma", distance: 360, time: "4h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Kadoma", distance: 248, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Kadoma", distance: 153, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Kadoma", distance: 214, time: "2h 40m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Kadoma", distance: 249, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Kadoma", distance: 480, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Kwekwe return routes
  { from: "Gweru", to: "Kwekwe", distance: 68, time: "0h 50m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza"] },
  { from: "Bulawayo", to: "Kwekwe", distance: 232, time: "2h 45m", routeType: "highway", scenic: false, tollGates: ["Gweru Toll Plaza", "Shangani Toll Plaza"] },
  { from: "Victoria Falls", to: "Kwekwe", distance: 671, time: "7h 15m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Kwekwe", distance: 527, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Kwekwe", distance: 430, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Kwekwe", distance: 358, time: "4h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Kwekwe", distance: 250, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Kwekwe", distance: 278, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Kwekwe", distance: 314, time: "3h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Kwekwe", distance: 294, time: "3h 40m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Kwekwe", distance: 182, time: "2h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Kwekwe", distance: 87, time: "1h 10m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Kwekwe", distance: 148, time: "1h 50m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Kwekwe", distance: 183, time: "2h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Kwekwe", distance: 414, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Gweru return routes
  { from: "Bulawayo", to: "Gweru", distance: 164, time: "2h 00m", routeType: "highway", scenic: false, tollGates: ["Shangani Toll Plaza"] },
  { from: "Victoria Falls", to: "Gweru", distance: 603, time: "6h 30m", routeType: "highway", scenic: true, tollGates: [] },
  { from: "Hwange", to: "Gweru", distance: 459, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Beitbridge", to: "Gweru", distance: 498, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Gweru", distance: 290, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Gweru", distance: 182, time: "2h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Gweru", distance: 210, time: "2h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Gweru", distance: 246, time: "3h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Gweru", distance: 226, time: "2h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Gweru", distance: 114, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Gweru", distance: 155, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Gweru", distance: 216, time: "2h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Gweru", distance: 251, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Gweru", distance: 398, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Bulawayo return routes
  { from: "Victoria Falls", to: "Bulawayo", distance: 439, time: "4h 45m", routeType: "highway", scenic: true, tollGates: ["Victoria Falls Toll Plaza"] },
  { from: "Hwange", to: "Bulawayo", distance: 295, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: ["Hwange Toll Plaza"] },
  { from: "Beitbridge", to: "Bulawayo", distance: 334, time: "4h 00m", routeType: "highway", scenic: false, tollGates: ["Gwanda Toll Plaza", "West Nicholson Toll Plaza", "Beitbridge Toll Plaza"] },
  { from: "Gwanda", to: "Bulawayo", distance: 126, time: "1h 30m", routeType: "main_road", scenic: false, tollGates: ["Gwanda Toll Plaza"] },
  { from: "Masvingo", to: "Bulawayo", distance: 280, time: "3h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Bulawayo", distance: 570, time: "6h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Bulawayo", distance: 606, time: "7h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Bulawayo", distance: 586, time: "6h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Bulawayo", distance: 474, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Bulawayo", distance: 379, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Bulawayo", distance: 440, time: "5h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Bulawayo", distance: 475, time: "5h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Bulawayo", distance: 434, time: "5h 15m", routeType: "main_road", scenic: false, tollGates: [] },

  // Victoria Falls return routes
  { from: "Hwange", to: "Victoria Falls", distance: 144, time: "1h 50m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Beitbridge", to: "Victoria Falls", distance: 773, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Victoria Falls", distance: 565, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Victoria Falls", distance: 719, time: "7h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Victoria Falls", distance: 1009, time: "11h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Victoria Falls", distance: 1045, time: "11h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Victoria Falls", distance: 1025, time: "11h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Victoria Falls", distance: 913, time: "10h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Victoria Falls", distance: 818, time: "9h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Victoria Falls", distance: 879, time: "9h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Victoria Falls", distance: 914, time: "10h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Victoria Falls", distance: 873, time: "9h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Hwange return routes
  { from: "Beitbridge", to: "Hwange", distance: 629, time: "7h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gwanda", to: "Hwange", distance: 421, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Masvingo", to: "Hwange", distance: 575, time: "6h 15m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Hwange", distance: 865, time: "9h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Hwange", distance: 901, time: "9h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Hwange", distance: 881, time: "9h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Hwange", distance: 769, time: "8h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Hwange", distance: 674, time: "7h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Hwange", distance: 735, time: "8h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Hwange", distance: 770, time: "8h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Hwange", distance: 729, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Beitbridge return routes
  { from: "Gwanda", to: "Beitbridge", distance: 138, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: ["West Nicholson Toll Plaza"] },
  { from: "Masvingo", to: "Beitbridge", distance: 280, time: "3h 15m", routeType: "highway", scenic: false, tollGates: ["Beitbridge Toll Plaza", "Masvingo Toll Plaza"] },
  { from: "Mutare", to: "Beitbridge", distance: 470, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Beitbridge", distance: 506, time: "6h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Beitbridge", distance: 486, time: "5h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Beitbridge", distance: 374, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Beitbridge", distance: 279, time: "3h 20m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Beitbridge", distance: 340, time: "4h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Beitbridge", distance: 375, time: "4h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Beitbridge", distance: 228, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Gwanda return routes
  { from: "Masvingo", to: "Gwanda", distance: 406, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Mutare", to: "Gwanda", distance: 696, time: "8h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Gwanda", distance: 732, time: "8h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Gwanda", distance: 712, time: "8h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Gwanda", distance: 600, time: "7h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Gwanda", distance: 505, time: "5h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Gwanda", distance: 566, time: "6h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Gwanda", distance: 601, time: "7h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Gwanda", distance: 454, time: "5h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Masvingo return routes
  { from: "Mutare", to: "Masvingo", distance: 290, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chipinge", to: "Masvingo", distance: 326, time: "4h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Nyanga", to: "Masvingo", distance: 306, time: "3h 45m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Masvingo", distance: 194, time: "2h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Marondera", to: "Masvingo", distance: 217, time: "2h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Masvingo", distance: 278, time: "3h 20m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Masvingo", distance: 313, time: "3h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Masvingo", distance: 166, time: "2h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Mutare return routes
  { from: "Chipinge", to: "Mutare", distance: 131, time: "1h 45m", routeType: "main_road", scenic: true, tollGates: ["Chipinge Toll Plaza"] },
  { from: "Nyanga", to: "Mutare", distance: 111, time: "1h 30m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Mutare", distance: 93, time: "1h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Marondera", to: "Mutare", distance: 190, time: "2h 20m", routeType: "highway", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Mutare", distance: 251, time: "3h 00m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Mutare", distance: 286, time: "3h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Mutare", distance: 362, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Chipinge return routes
  { from: "Nyanga", to: "Chipinge", distance: 148, time: "2h 00m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Rusape", to: "Chipinge", distance: 162, time: "2h 10m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Marondera", to: "Chipinge", distance: 281, time: "3h 30m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Chipinge", distance: 342, time: "4h 15m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Chipinge", distance: 377, time: "4h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Chipinge", distance: 231, time: "3h 00m", routeType: "main_road", scenic: false, tollGates: [] },

  // Nyanga return routes
  { from: "Rusape", to: "Nyanga", distance: 98, time: "1h 15m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Marondera", to: "Nyanga", distance: 208, time: "2h 40m", routeType: "main_road", scenic: true, tollGates: [] },
  { from: "Bindura", to: "Nyanga", distance: 269, time: "3h 20m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Nyanga", distance: 304, time: "3h 45m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Nyanga", distance: 381, time: "4h 45m", routeType: "main_road", scenic: false, tollGates: [] },

  // Rusape return routes
  { from: "Marondera", to: "Rusape", distance: 108, time: "1h 20m", routeType: "highway", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Rusape", distance: 169, time: "2h 05m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Rusape", distance: 204, time: "2h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Rusape", distance: 363, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Marondera return routes
  { from: "Bindura", to: "Marondera", distance: 131, time: "1h 40m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Mt Darwin", to: "Marondera", distance: 166, time: "2h 05m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Marondera", distance: 383, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Bindura return routes
  { from: "Mt Darwin", to: "Bindura", distance: 68, time: "0h 55m", routeType: "secondary", scenic: false, tollGates: [] },
  { from: "Chiredzi", to: "Bindura", distance: 370, time: "4h 30m", routeType: "main_road", scenic: false, tollGates: [] },

  // Mt Darwin return routes
  { from: "Chiredzi", to: "Mt Darwin", distance: 405, time: "5h 00m", routeType: "main_road", scenic: false, tollGates: [] },
]

// Extract all 21 cities from the distance data
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
