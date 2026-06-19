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
  "Mutare-Chimanimani": ["chipinge_toll"],
  "Harare-Masvingo": ["mvuma_toll"],
  "Harare-Beitbridge": ["mvuma_toll", "masvingo_toll", "beitbridge_toll"],
  "Masvingo-Beitbridge": ["masvingo_toll", "beitbridge_toll"],
  "Harare-Chegutu": ["chegutu_toll"],
  "Harare-Kadoma": ["chegutu_toll"],
  "Harare-Kwekwe": ["chegutu_toll", "kwekwe_toll"],
  "Harare-Gweru": ["chegutu_toll", "kwekwe_toll", "gweru_toll"],
  "Harare-Bulawayo": ["chegutu_toll", "kwekwe_toll", "gweru_toll", "shangani_toll"],
  "Gweru-Bulawayo": ["gweru_toll", "shangani_toll"],
  "Kwekwe-Gweru": ["kwekwe_toll", "gweru_toll"],
  "Bulawayo-Plumtree": ["plumtree_toll"],
  "Bulawayo-Beitbridge": ["gwanda_toll", "west_nicholson_toll"],
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

// Complete distance matrix from Zimbabwe Tourism official distance chart
// Cities: Beitbridge, Bindura, Birchenough Bridge, Bulawayo, Chimanimani, Chiredzi,
//         Chinhoyi, Gweru, Harare, Hwange, Kadoma, Kariba, Karoi, Kwekwe,
//         Marondera, Masvingo, Mutare, Nyanga, Plumtree, Rusape, Victoria Falls
//
// Distances in km. Times estimated at ~90 km/h average road speed.
function hrs(km: number): string {
  const h = Math.floor(km / 90)
  const m = Math.round(((km / 90) - h) * 60 / 5) * 5
  return `${h}h ${m.toString().padStart(2, "0")}m`
}

function route(from: string, to: string, distance: number, routeType: string, scenic: boolean, tollGates: string[]): DistanceRoute[] {
  return [
    { from, to, distance, time: hrs(distance), routeType, scenic, tollGates },
    { from: to, to: from, distance, time: hrs(distance), routeType, scenic, tollGates: [...tollGates].reverse() },
  ]
}

export const distanceData: DistanceRoute[] = [
  // Beitbridge row
  ...route("Beitbridge", "Bindura",            670, "main_road",  false, []),
  ...route("Beitbridge", "Birchenough Bridge", 461, "main_road",  false, []),
  ...route("Beitbridge", "Bulawayo",           322, "highway",    false, ["Gwanda Toll Plaza", "West Nicholson Toll Plaza", "Beitbridge Toll Plaza"]),
  ...route("Beitbridge", "Chimanimani",        527, "secondary",  false, []),
  ...route("Beitbridge", "Chiredzi",           204, "main_road",  false, []),
  ...route("Beitbridge", "Chinhoyi",           698, "main_road",  false, []),
  ...route("Beitbridge", "Gweru",              472, "main_road",  false, []),
  ...route("Beitbridge", "Harare",             382, "highway",    false, ["Beitbridge Toll Plaza", "Masvingo Toll Plaza", "Mvuma Toll Plaza"]),
  ...route("Beitbridge", "Hwange",             658, "main_road",  false, []),
  ...route("Beitbridge", "Kadoma",             606, "main_road",  false, []),
  ...route("Beitbridge", "Kariba",             947, "main_road",  false, []),
  ...route("Beitbridge", "Karoi",              786, "main_road",  false, []),
  ...route("Beitbridge", "Kwekwe",             534, "main_road",  false, []),
  ...route("Beitbridge", "Marondera",          656, "main_road",  false, []),
  ...route("Beitbridge", "Masvingo",           290, "highway",    false, ["Beitbridge Toll Plaza", "Masvingo Toll Plaza"]),
  ...route("Beitbridge", "Mutare",             586, "main_road",  false, []),
  ...route("Beitbridge", "Nyanga",             693, "main_road",  false, []),
  ...route("Beitbridge", "Plumtree",           424, "main_road",  false, []),
  ...route("Beitbridge", "Rusape",             759, "main_road",  false, []),
  ...route("Beitbridge", "Victoria Falls",     964, "main_road",  false, []),

  // Bindura row
  ...route("Bindura", "Birchenough Bridge",    478, "secondary",  false, []),
  ...route("Bindura", "Bulawayo",              527, "main_road",  false, []),
  ...route("Bindura", "Chimanimani",           560, "secondary",  false, []),
  ...route("Bindura", "Chiredzi",              506, "main_road",  false, []),
  ...route("Bindura", "Chinhoyi",              204, "secondary",  false, []),
  ...route("Bindura", "Gweru",                 355, "main_road",  false, []),
  ...route("Bindura", "Harare",                88,  "main_road",  false, []),
  ...route("Bindura", "Hwange",                789, "main_road",  false, []),
  ...route("Bindura", "Kadoma",                229, "main_road",  false, []),
  ...route("Bindura", "Kariba",                292, "main_road",  false, []),
  ...route("Bindura", "Karoi",                 393, "main_road",  false, []),
  ...route("Bindura", "Kwekwe",                301, "main_road",  false, []),
  ...route("Bindura", "Marondera",             131, "secondary",  false, []),
  ...route("Bindura", "Masvingo",              469, "main_road",  false, []),
  ...route("Bindura", "Mutare",                353, "main_road",  false, []),
  ...route("Bindura", "Nyanga",                340, "secondary",  false, []),
  ...route("Bindura", "Plumtree",              629, "main_road",  false, []),
  ...route("Bindura", "Rusape",                245, "secondary",  false, []),
  ...route("Bindura", "Victoria Falls",        891, "main_road",  false, []),

  // Birchenough Bridge row
  ...route("Birchenough Bridge", "Bulawayo",   560, "main_road",  false, []),
  ...route("Birchenough Bridge", "Chimanimani",106, "secondary",  true,  []),
  ...route("Birchenough Bridge", "Chiredzi",   225, "secondary",  false, []),
  ...route("Birchenough Bridge", "Chinhoyi",   495, "main_road",  false, []),
  ...route("Birchenough Bridge", "Gweru",      385, "main_road",  false, []),
  ...route("Birchenough Bridge", "Harare",     116, "highway",    false, ["Rusape Toll Plaza"]),
  ...route("Birchenough Bridge", "Hwange",     830, "main_road",  false, []),
  ...route("Birchenough Bridge", "Kadoma",     391, "main_road",  false, []),
  ...route("Birchenough Bridge", "Kariba",     640, "main_road",  false, []),
  ...route("Birchenough Bridge", "Karoi",      479, "main_road",  false, []),
  ...route("Birchenough Bridge", "Kwekwe",     204, "main_road",  false, []),
  ...route("Birchenough Bridge", "Marondera",  518, "main_road",  false, []),
  ...route("Birchenough Bridge", "Masvingo",   345, "main_road",  false, []),
  ...route("Birchenough Bridge", "Mutare",     63,  "main_road",  true,  []),
  ...route("Birchenough Bridge", "Nyanga",     161, "secondary",  true,  []),
  ...route("Birchenough Bridge", "Plumtree",   599, "main_road",  false, []),
  ...route("Birchenough Bridge", "Rusape",     102, "main_road",  false, []),
  ...route("Birchenough Bridge", "Victoria Falls", 891, "main_road", false, []),

  // Bulawayo row
  ...route("Bulawayo", "Chimanimani",          614, "main_road",  false, []),
  ...route("Bulawayo", "Chiredzi",             434, "main_road",  false, []),
  ...route("Bulawayo", "Chinhoyi",             555, "main_road",  false, []),
  ...route("Bulawayo", "Gweru",                164, "highway",    false, ["Shangani Toll Plaza"]),
  ...route("Bulawayo", "Harare",               439, "highway",    false, ["Chegutu Toll Plaza", "Gweru Toll Plaza", "Shangani Toll Plaza"]),
  ...route("Bulawayo", "Hwange",               295, "main_road",  false, ["Hwange Toll Plaza"]),
  ...route("Bulawayo", "Kadoma",               298, "highway",    false, ["Gweru Toll Plaza", "Shangani Toll Plaza"]),
  ...route("Bulawayo", "Kariba",               539, "main_road",  false, []),
  ...route("Bulawayo", "Karoi",                499, "main_road",  false, []),
  ...route("Bulawayo", "Kwekwe",               232, "highway",    false, ["Gweru Toll Plaza", "Shangani Toll Plaza"]),
  ...route("Bulawayo", "Marondera",            549, "main_road",  false, []),
  ...route("Bulawayo", "Masvingo",             280, "main_road",  false, []),
  ...route("Bulawayo", "Mutare",               636, "main_road",  false, []),
  ...route("Bulawayo", "Nyanga",               547, "main_road",  false, []),
  ...route("Bulawayo", "Plumtree",             102, "main_road",  false, ["Plumtree Toll Plaza"]),
  ...route("Bulawayo", "Rusape",               753, "main_road",  false, []),
  ...route("Bulawayo", "Victoria Falls",       439, "highway",    true,  ["Hwange Toll Plaza", "Victoria Falls Toll Plaza"]),

  // Chimanimani row
  ...route("Chimanimani", "Chiredzi",          325, "secondary",  false, []),
  ...route("Chimanimani", "Chinhoyi",          601, "main_road",  false, []),
  ...route("Chimanimani", "Gweru",             412, "main_road",  false, []),
  ...route("Chimanimani", "Harare",            293, "main_road",  false, ["Rusape Toll Plaza"]),
  ...route("Chimanimani", "Hwange",            909, "main_road",  false, []),
  ...route("Chimanimani", "Kadoma",            447, "main_road",  false, []),
  ...route("Chimanimani", "Kariba",            699, "main_road",  false, []),
  ...route("Chimanimani", "Karoi",             479, "main_road",  false, []),
  ...route("Chimanimani", "Kwekwe",            349, "main_road",  false, []),
  ...route("Chimanimani", "Marondera",         581, "main_road",  false, []),
  ...route("Chimanimani", "Masvingo",          497, "main_road",  false, []),
  ...route("Chimanimani", "Mutare",            150, "secondary",  true,  []),
  ...route("Chimanimani", "Nyanga",            278, "secondary",  true,  []),
  ...route("Chimanimani", "Plumtree",          716, "main_road",  false, []),
  ...route("Chimanimani", "Rusape",            269, "main_road",  false, []),
  ...route("Chimanimani", "Victoria Falls",    1045,"main_road",  false, []),

  // Chiredzi row
  ...route("Chiredzi", "Chinhoyi",             622, "main_road",  false, []),
  ...route("Chiredzi", "Gweru",                366, "main_road",  false, []),
  ...route("Chiredzi", "Harare",               458, "main_road",  false, []),
  ...route("Chiredzi", "Hwange",               734, "main_road",  false, []),
  ...route("Chiredzi", "Kadoma",               430, "main_road",  false, []),
  ...route("Chiredzi", "Kariba",               820, "main_road",  false, []),
  ...route("Chiredzi", "Karoi",                663, "main_road",  false, []),
  ...route("Chiredzi", "Kwekwe",               398, "main_road",  false, []),
  ...route("Chiredzi", "Marondera",            317, "main_road",  false, []),
  ...route("Chiredzi", "Masvingo",             166, "main_road",  false, []),
  ...route("Chiredzi", "Mutare",               362, "main_road",  false, []),
  ...route("Chiredzi", "Nyanga",               448, "main_road",  false, []),
  ...route("Chiredzi", "Plumtree",             536, "main_road",  false, []),
  ...route("Chiredzi", "Rusape",               543, "main_road",  false, []),
  ...route("Chiredzi", "Victoria Falls",       735, "main_road",  false, []),

  // Chinhoyi row
  ...route("Chinhoyi", "Gweru",                223, "main_road",  false, []),
  ...route("Chinhoyi", "Harare",               116, "main_road",  false, ["Chinhoyi Toll Plaza"]),
  ...route("Chinhoyi", "Hwange",               682, "main_road",  false, []),
  ...route("Chinhoyi", "Kadoma",               89,  "main_road",  false, []),
  ...route("Chinhoyi", "Kariba",               242, "main_road",  true,  []),
  ...route("Chinhoyi", "Karoi",                89,  "main_road",  false, []),
  ...route("Chinhoyi", "Kwekwe",               155, "main_road",  false, []),
  ...route("Chinhoyi", "Marondera",            143, "main_road",  false, []),
  ...route("Chinhoyi", "Masvingo",             388, "main_road",  false, []),
  ...route("Chinhoyi", "Mutare",               381, "main_road",  false, []),
  ...route("Chinhoyi", "Nyanga",               399, "main_road",  true,  []),
  ...route("Chinhoyi", "Plumtree",             489, "main_road",  false, []),
  ...route("Chinhoyi", "Rusape",               286, "main_road",  false, []),
  ...route("Chinhoyi", "Victoria Falls",       826, "main_road",  true,  []),

  // Gweru row
  ...route("Gweru", "Harare",                  275, "highway",    false, ["Chegutu Toll Plaza", "Kwekwe Toll Plaza", "Gweru Toll Plaza"]),
  ...route("Gweru", "Hwange",                  459, "main_road",  false, []),
  ...route("Gweru", "Kadoma",                  134, "highway",    false, ["Kwekwe Toll Plaza", "Gweru Toll Plaza"]),
  ...route("Gweru", "Kariba",                  374, "main_road",  false, []),
  ...route("Gweru", "Karoi",                   264, "main_road",  false, []),
  ...route("Gweru", "Kwekwe",                  68,  "highway",    false, ["Gweru Toll Plaza"]),
  ...route("Gweru", "Marondera",               213, "main_road",  false, []),
  ...route("Gweru", "Masvingo",                182, "main_road",  false, []),
  ...route("Gweru", "Mutare",                  341, "main_road",  false, []),
  ...route("Gweru", "Nyanga",                  378, "main_road",  false, []),
  ...route("Gweru", "Plumtree",                266, "main_road",  false, []),
  ...route("Gweru", "Rusape",                  245, "main_road",  false, []),
  ...route("Gweru", "Victoria Falls",          603, "highway",    true,  ["Victoria Falls Toll Plaza"]),

  // Harare row
  ...route("Harare", "Hwange",                 734, "main_road",  false, ["Hwange Toll Plaza"]),
  ...route("Harare", "Kadoma",                 141, "highway",    false, ["Chegutu Toll Plaza"]),
  ...route("Harare", "Kariba",                 365, "main_road",  true,  ["Makuti Toll Plaza"]),
  ...route("Harare", "Karoi",                  205, "main_road",  false, ["Inkomo Toll Plaza", "Chinhoyi Toll Plaza"]),
  ...route("Harare", "Kwekwe",                 207, "highway",    false, ["Chegutu Toll Plaza", "Kwekwe Toll Plaza"]),
  ...route("Harare", "Marondera",              75,  "highway",    false, ["Marondera Toll Plaza"]),
  ...route("Harare", "Masvingo",               292, "highway",    false, ["Mvuma Toll Plaza", "Masvingo Toll Plaza"]),
  ...route("Harare", "Mutare",                 265, "highway",    true,  ["Rusape Toll Plaza"]),
  ...route("Harare", "Nyanga",                 270, "main_road",  true,  []),
  ...route("Harare", "Plumtree",               539, "main_road",  false, []),
  ...route("Harare", "Rusape",                 170, "highway",    false, ["Rusape Toll Plaza"]),
  ...route("Harare", "Victoria Falls",         878, "highway",    true,  ["Victoria Falls Toll Plaza"]),

  // Hwange row
  ...route("Hwange", "Kadoma",                 593, "main_road",  false, []),
  ...route("Hwange", "Kariba",                 833, "main_road",  false, []),
  ...route("Hwange", "Karoi",                  723, "main_road",  false, []),
  ...route("Hwange", "Kwekwe",                 527, "main_road",  false, []),
  ...route("Hwange", "Marondera",              718, "main_road",  false, []),
  ...route("Hwange", "Masvingo",               575, "main_road",  false, []),
  ...route("Hwange", "Mutare",                 901, "main_road",  false, []),
  ...route("Hwange", "Nyanga",                 921, "main_road",  false, []),
  ...route("Hwange", "Plumtree",               397, "main_road",  false, []),
  ...route("Hwange", "Rusape",                 769, "main_road",  false, []),
  ...route("Hwange", "Victoria Falls",         144, "main_road",  true,  []),

  // Kadoma row
  ...route("Kadoma", "Kariba",                 303, "main_road",  false, []),
  ...route("Kadoma", "Karoi",                  130, "main_road",  false, []),
  ...route("Kadoma", "Kwekwe",                 66,  "highway",    false, ["Kwekwe Toll Plaza"]),
  ...route("Kadoma", "Marondera",              218, "main_road",  false, []),
  ...route("Kadoma", "Masvingo",               384, "main_road",  false, []),
  ...route("Kadoma", "Mutare",                 340, "main_road",  false, []),
  ...route("Kadoma", "Nyanga",                 357, "main_road",  false, []),
  ...route("Kadoma", "Plumtree",               400, "main_road",  false, []),
  ...route("Kadoma", "Rusape",                 245, "main_road",  false, []),
  ...route("Kadoma", "Victoria Falls",         683, "main_road",  true,  ["Victoria Falls Toll Plaza"]),

  // Kariba row
  ...route("Kariba", "Karoi",                  153, "main_road",  true,  []),
  ...route("Kariba", "Kwekwe",                 358, "main_road",  false, []),
  ...route("Kariba", "Marondera",              358, "main_road",  false, []),
  ...route("Kariba", "Masvingo",               538, "main_road",  false, []),
  ...route("Kariba", "Mutare",                 488, "main_road",  false, []),
  ...route("Kariba", "Nyanga",                 505, "main_road",  false, []),
  ...route("Kariba", "Plumtree",               641, "main_road",  false, []),
  ...route("Kariba", "Rusape",                 393, "main_road",  false, []),
  ...route("Kariba", "Victoria Falls",         1056,"main_road",  true,  []),

  // Karoi row
  ...route("Karoi", "Kwekwe",                  248, "main_road",  false, []),
  ...route("Karoi", "Marondera",               250, "main_road",  false, []),
  ...route("Karoi", "Masvingo",                417, "main_road",  false, []),
  ...route("Karoi", "Mutare",                  418, "main_road",  false, []),
  ...route("Karoi", "Nyanga",                  435, "main_road",  false, []),
  ...route("Karoi", "Plumtree",                601, "main_road",  false, []),
  ...route("Karoi", "Rusape",                  323, "main_road",  false, []),
  ...route("Karoi", "Victoria Falls",          915, "main_road",  true,  []),

  // Kwekwe row
  ...route("Kwekwe", "Marondera",              150, "main_road",  false, []),
  ...route("Kwekwe", "Masvingo",               318, "main_road",  false, []),
  ...route("Kwekwe", "Mutare",                 349, "main_road",  false, []),
  ...route("Kwekwe", "Nyanga",                 366, "main_road",  false, []),
  ...route("Kwekwe", "Plumtree",               334, "main_road",  false, []),
  ...route("Kwekwe", "Rusape",                 254, "main_road",  false, []),
  ...route("Kwekwe", "Victoria Falls",         671, "main_road",  true,  ["Victoria Falls Toll Plaza"]),

  // Marondera row
  ...route("Marondera", "Masvingo",            289, "main_road",  false, []),
  ...route("Marondera", "Mutare",              190, "highway",    false, []),
  ...route("Marondera", "Nyanga",              195, "main_road",  true,  []),
  ...route("Marondera", "Plumtree",            541, "main_road",  false, []),
  ...route("Marondera", "Rusape",              95,  "main_road",  false, []),
  ...route("Marondera", "Victoria Falls",      1016,"main_road",  true,  []),

  // Masvingo row
  ...route("Masvingo", "Mutare",               290, "main_road",  false, []),
  ...route("Masvingo", "Nyanga",               399, "main_road",  false, []),
  ...route("Masvingo", "Plumtree",             382, "main_road",  false, []),
  ...route("Masvingo", "Rusape",               374, "main_road",  false, []),
  ...route("Masvingo", "Victoria Falls",       719, "main_road",  false, []),

  // Mutare row
  ...route("Mutare", "Nyanga",                 107, "main_road",  true,  []),
  ...route("Mutare", "Plumtree",               738, "main_road",  false, []),
  ...route("Mutare", "Rusape",                 93,  "main_road",  true,  []),
  ...route("Mutare", "Victoria Falls",         1046,"main_road",  false, []),

  // Nyanga row
  ...route("Nyanga", "Plumtree",               649, "main_road",  false, []),
  ...route("Nyanga", "Rusape",                 113, "main_road",  true,  []),
  ...route("Nyanga", "Victoria Falls",         1046,"main_road",  false, []),

  // Plumtree row
  ...route("Plumtree", "Rusape",               719, "main_road",  false, []),
  ...route("Plumtree", "Victoria Falls",       539, "main_road",  true,  ["Victoria Falls Toll Plaza"]),

  // Rusape row
  ...route("Rusape", "Victoria Falls",         1046,"main_road",  false, []),
]

// All 21 cities from the official Zimbabwe Tourism distance chart
export const cities: string[] = Array.from(
  new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])
).sort()

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
