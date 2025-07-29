
"use client"
import Link from "next/link";

import { useState, useMemo } from "react"
import { Search, Route, ArrowRight, Fuel, Car, Truck, Bus, Bike, MapPin, DollarSign, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"

// Updated toll fees by vehicle type
const tollFees = {
  motorcycle: 0.0,
  car: 4.0,
  minibus: 6.0,
  bus: 8.0,
  truck: 10.0,
  haulage: 20.0,
}

// Vehicle types with fuel consumption (km per litre) and toll category
const vehicleTypes = {
  car: {
    name: "Light Motor Vehicle",
    icon: Car,
    consumption: 12,
    color: "text-blue-600 dark:text-blue-400",
    tollCategory: "car",
  },
  motorcycle: {
    name: "Motor Cycle",
    icon: Bike,
    consumption: 25,
    color: "text-green-600 dark:text-green-400",
    tollCategory: "motorcycle",
  },
  minibus: {
    name: "MiniBus",
    icon: Bus,
    consumption: 8,
    color: "text-purple-600 dark:text-purple-400",
    tollCategory: "minibus",
  },
  bus: { name: "Bus", icon: Bus, consumption: 4, color: "text-orange-600 dark:text-orange-400", tollCategory: "bus" },
  truck: {
    name: "Heavy Vehicle",
    icon: Truck,
    consumption: 3,
    color: "text-red-600 dark:text-red-400",
    tollCategory: "truck",
  },
  haulage: {
    name: "Haulage Truck",
    icon: Truck,
    consumption: 2.5,
    color: "text-gray-600 dark:text-gray-400",
    tollCategory: "haulage",
  },
}

// Current fuel price in USD
const FUEL_PRICE_USD = 1.45

// Comprehensive Zimbabwe toll gates with actual locations
const zimbabweTollGates = [
  // A1 Highway (Harare-Banket)
  {
    id: "inkomo_toll",
    name: "Inkomo Toll Plaza",
    location: "A1 Highway, Inkomo (Harare-Chirundu Road)",
    highway: "A1",
    coordinates: { lat: -17.6833, lng: 30.7667 },
    kmFromHarare: 40,
    serves: ["Harare-Banket", "Banket-Harare", "Harare-Chirundu"],
  },
  // A1 Highway (Harare-Chirundu)
  {
    id: "makuti_toll",
    name: "Makuti Toll Plaza",
    location: "A1 Highway, Makuti",
    highway: "A1",
    coordinates: { lat: -16.0833, lng: 29.3833 },
    kmFromHarare: 180,
    serves: ["Harare-Chirundu", "Harare-Kariba"],
  },

  // A2 Highway (Harare-Nyamapanda)
  {
    id: "marondera_toll",
    name: "Marondera Toll Plaza",
    location: "A2 Highway, Marondera",
    highway: "A2",
    coordinates: { lat: -18.1833, lng: 31.55 },
    kmFromHarare: 75,
    serves: ["Harare-Nyamapanda", "Harare-Mutoko"],
  },

  // A3 Highway (Harare-Mutare)
  {
    id: "rusape_toll",
    name: "Rusape Toll Plaza",
    location: "A3 Highway, Rusape",
    highway: "A3",
    coordinates: { lat: -18.5276, lng: 32.1255 },
    kmFromHarare: 170,
    serves: ["Harare-Mutare", "Harare-Chipinge"],
  },

  // A4 Highway (Harare-Beitbridge)
  {
    id: "mvuma_toll",
    name: "Mvuma Toll Plaza",
    location: "A4 Highway, Mvuma",
    highway: "A4",
    coordinates: { lat: -19.2833, lng: 30.5333 },
    kmFromHarare: 220,
    serves: ["Harare-Masvingo", "Harare-Beitbridge"],
  },
  {
    id: "masvingo_toll",
    name: "Masvingo Toll Plaza",
    location: "A4 Highway, Masvingo South",
    highway: "A4",
    coordinates: { lat: -20.0833, lng: 30.8333 },
    kmFromHarare: 292,
    serves: ["Masvingo-Beitbridge", "Masvingo-Triangle"],
  },
  {
    id: "beitbridge_toll",
    name: "Beitbridge Toll Plaza",
    location: "A4 Highway, Beitbridge North",
    highway: "A4",
    coordinates: { lat: -22.2167, lng: 30.0 },
    kmFromHarare: 572,
    serves: ["Beitbridge Border", "South Africa Border"],
  },

  // A5 Highway (Harare-Bulawayo)
  {
    id: "chegutu_toll",
    name: "Chegutu Toll Plaza",
    location: "A5 Highway, Chegutu",
    highway: "A5",
    coordinates: { lat: -18.1348, lng: 30.1435 },
    kmFromHarare: 110,
    serves: ["Harare-Bulawayo", "Harare-Kadoma"],
  },
  {
    id: "kwekwe_toll",
    name: "Kwekwe Toll Plaza",
    location: "A5 Highway, Kwekwe",
    highway: "A5",
    coordinates: { lat: -18.9167, lng: 29.8167 },
    kmFromHarare: 207,
    serves: ["Harare-Gweru", "Kwekwe-Redcliff"],
  },
  {
    id: "gweru_toll",
    name: "Gweru Toll Plaza",
    location: "A5 Highway, Gweru East",
    highway: "A5",
    coordinates: { lat: -19.45, lng: 29.8167 },
    kmFromHarare: 274,
    serves: ["Gweru-Bulawayo", "Gweru-Shurugwi"],
  },
  {
    id: "shangani_toll",
    name: "Shangani Toll Plaza",
    location: "A5 Highway, Shangani",
    highway: "A5",
    coordinates: { lat: -19.7833, lng: 29.3667 },
    kmFromHarare: 350,
    serves: ["Gweru-Bulawayo", "Shangani-Zvishavane"],
  },

  // A6 Highway (Bulawayo-Francistown)
  {
    id: "plumtree_toll",
    name: "Plumtree Toll Plaza",
    location: "A6 Highway, Plumtree",
    highway: "A6",
    coordinates: { lat: -20.4833, lng: 27.8167 },
    kmFromBulawayo: 100,
    serves: ["Bulawayo-Plumtree", "Botswana Border"],
  },

  // A7 Highway (Bulawayo-Beitbridge)
  {
    id: "gwanda_toll",
    name: "Gwanda Toll Plaza",
    location: "A7 Highway, Gwanda",
    highway: "A7",
    coordinates: { lat: -20.9333, lng: 29.0 },
    kmFromBulawayo: 126,
    serves: ["Bulawayo-Gwanda", "Gwanda-Beitbridge"],
  },
  {
    id: "west_nicholson_toll",
    name: "West Nicholson Toll Plaza",
    location: "A7 Highway, West Nicholson",
    highway: "A7",
    coordinates: { lat: -21.6167, lng: 29.0333 },
    kmFromBulawayo: 198,
    serves: ["Gwanda-Beitbridge", "West Nicholson-Rutenga"],
  },

  // A8 Highway (Bulawayo-Victoria Falls)
  {
    id: "hwange_toll",
    name: "Hwange Toll Plaza",
    location: "A8 Highway, Hwange",
    highway: "A8",
    coordinates: { lat: -18.3667, lng: 26.5 },
    kmFromBulawayo: 296,
    serves: ["Bulawayo-Hwange", "Hwange-Victoria Falls"],
  },
  {
    id: "victoria_falls_toll",
    name: "Victoria Falls Toll Plaza",
    location: "A8 Highway, Victoria Falls",
    highway: "A8",
    coordinates: { lat: -17.9333, lng: 25.8167 },
    kmFromBulawayo: 440,
    serves: ["Victoria Falls", "Zambia Border"],
  },

  // Additional Regional Toll Gates
  {
    id: "chinhoyi_toll",
    name: "Chinhoyi Toll Plaza",
    location: "Chinhoyi-Karoi Road",
    highway: "Regional",
    coordinates: { lat: -17.3667, lng: 30.2 },
    kmFromHarare: 116,
    serves: ["Harare-Chinhoyi", "Chinhoyi-Karoi"],
  },
  {
    id: "mutoko_toll",
    name: "Mutoko Toll Plaza",
    location: "A2 Highway, Mutoko",
    highway: "A2",
    coordinates: { lat: -17.3967, lng: 32.2267 },
    kmFromHarare: 143,
    serves: ["Harare-Mutoko", "Mutoko-Nyamapanda"],
  },
  {
    id: "chipinge_toll",
    name: "Chipinge Toll Plaza",
    location: "Chipinge-Triangle Road",
    highway: "Regional",
    coordinates: { lat: -20.1833, lng: 32.6167 },
    kmFromMutare: 131,
    serves: ["Mutare-Chipinge", "Chipinge-Triangle"],
  },
]

// Function to find toll gates on a specific route segment
type TollGate = typeof zimbabweTollGates[number];
type DistanceRoute = {
  from: string;
  to: string;
  distance: number;
  time: string;
  routeType: string;
  scenic: boolean;
  tollGates: string[] | TollGate[];
  alternative?: boolean;
};

const findTollGatesOnSegment = (fromCity: string, toCity: string, distance: number): TollGate[] => {
  const routeTollGates: TollGate[] = []

  // Define route mappings to toll gates
  const routeMappings: Record<string, string[]> = {
    // A1 Routes
    "Harare-Chirundu": ["makuti_toll"],
    "Harare-Kariba": ["makuti_toll"],

    // A2 Routes
    "Harare-Mutoko": ["marondera_toll", "mutoko_toll"],
    "Harare-Nyamapanda": ["marondera_toll", "mutoko_toll"],
    "Marondera-Mutoko": ["mutoko_toll"],

    // A3 Routes
    "Harare-Mutare": ["rusape_toll"],
    "Harare-Rusape": ["rusape_toll"],
    "Mutare-Chipinge": ["chipinge_toll"],

    // A4 Routes
    "Harare-Masvingo": ["mvuma_toll"],
    "Harare-Beitbridge": ["mvuma_toll", "masvingo_toll", "beitbridge_toll"],
    "Masvingo-Beitbridge": ["masvingo_toll", "beitbridge_toll"],
    "Masvingo-Triangle": ["masvingo_toll"],

    // A5 Routes
    "Harare-Chegutu": ["chegutu_toll"],
    "Harare-Kadoma": ["chegutu_toll"],
    "Harare-Kwekwe": ["chegutu_toll", "kwekwe_toll"],
    "Harare-Gweru": ["chegutu_toll", "kwekwe_toll", "gweru_toll"],
    "Harare-Bulawayo": ["chegutu_toll", "kwekwe_toll", "gweru_toll", "shangani_toll"],
    "Gweru-Bulawayo": ["gweru_toll", "shangani_toll"],
    "Kwekwe-Gweru": ["kwekwe_toll", "gweru_toll"],

    // A6 Routes
    "Bulawayo-Plumtree": ["plumtree_toll"],

    // A7 Routes
    "Bulawayo-Gwanda": ["gwanda_toll"],
    "Bulawayo-Beitbridge": ["gwanda_toll", "west_nicholson_toll"],
    "Gwanda-Beitbridge": ["west_nicholson_toll"],

    // A8 Routes
    "Bulawayo-Hwange": ["hwange_toll"],
    "Bulawayo-Victoria Falls": ["hwange_toll", "victoria_falls_toll"],
    "Hwange-Victoria Falls": ["victoria_falls_toll"],

    // Regional Routes
    "Harare-Chinhoyi": ["chinhoyi_toll"],
  }

  // Check both directions
  const routeKey1 = `${fromCity}-${toCity}`
  const routeKey2 = `${toCity}-${fromCity}`
  const tollGateIds: string[] = routeMappings[routeKey1] || routeMappings[routeKey2] || []

  // Get toll gate details
  tollGateIds.forEach((tollId: string) => {
    const tollGate = zimbabweTollGates.find((tg) => tg.id === tollId)
    if (tollGate) {
      routeTollGates.push(tollGate)
    }
  })

  return routeTollGates
}

// Updated toll gates information with real Zimbabwe locations
const tollGates = [
  {
    name: "Harare-Bulawayo Toll",
    location: "A5 Highway (Chegutu)",
    routes: ["Harare-Bulawayo", "Harare-Gweru"],
    kmFromHarare: 110,
    coordinates: { lat: -18.1348, lng: 30.1435 },
  },
  {
    name: "Mutare Toll Plaza",
    location: "A3 Highway (Rusape)",
    routes: ["Harare-Mutare", "Marondera-Mutare"],
    kmFromHarare: 170,
    coordinates: { lat: -18.5276, lng: 32.1255 },
  },
  {
    name: "Beitbridge Toll",
    location: "A4 Highway (Masvingo South)",
    routes: ["Masvingo-Beitbridge", "Bulawayo-Beitbridge"],
    kmFromHarare: 350,
    coordinates: { lat: -20.1833, lng: 30.6167 },
  },
  {
    name: "Victoria Falls Toll",
    location: "A8 Highway (Hwange)",
    routes: ["Bulawayo-Victoria Falls"],
    kmFromHarare: 600,
    coordinates: { lat: -18.1076, lng: 25.8563 },
  },
  {
    name: "Gweru Toll Plaza",
    location: "A5 Highway (Gweru East)",
    routes: ["Harare-Gweru", "Gweru-Bulawayo"],
    kmFromHarare: 274,
    coordinates: { lat: -19.45, lng: 29.8167 },
  },
]

// Provincial boundaries
const provincialBoundaries = [
  { from: "Harare Province", to: "Mashonaland West", cities: ["Harare", "Chinhoyi"] },
  { from: "Harare Province", to: "Manicaland", cities: ["Harare", "Mutare"] },
  { from: "Harare Province", to: "Midlands", cities: ["Harare", "Gweru"] },
  { from: "Midlands", to: "Matabeleland South", cities: ["Gweru", "Bulawayo"] },
  { from: "Matabeleland South", to: "Matabeleland North", cities: ["Bulawayo", "Victoria Falls"] },
  { from: "Midlands", to: "Masvingo", cities: ["Gweru", "Masvingo"] },
  { from: "Masvingo", to: "Matabeleland South", cities: ["Masvingo", "Beitbridge"] },
]

// Expanded distance data with route types and toll information
const distanceData: DistanceRoute[] = [
  // Harare to Karoi and vice versa
  {
    from: "Harare",
    to: "Karoi",
    distance: 205,
    time: "2h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Inkomo Toll Plaza", "Chinhoyi Toll Plaza"],
  },
  {
    from: "Karoi",
    to: "Harare",
    distance: 205,
    time: "2h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Chinhoyi Toll Plaza", "Inkomo Toll Plaza"],
  },
  // Karoi to Chinhoyi and vice versa (if not present)
  {
    from: "Chinhoyi",
    to: "Karoi",
    distance: 89,
    time: "1h 10m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Chinhoyi Toll Plaza"],
  },
  {
    from: "Karoi",
    to: "Chinhoyi",
    distance: 89,
    time: "1h 10m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Chinhoyi Toll Plaza"],
  },
  // Kariba to Karoi and vice versa
  {
    from: "Kariba",
    to: "Karoi",
    distance: 153,
    time: "2h 00m",
    routeType: "main_road",
    scenic: true,
    tollGates: [],
  },
  {
    from: "Karoi",
    to: "Kariba",
    distance: 153,
    time: "2h 00m",
    routeType: "main_road",
    scenic: true,
    tollGates: [],
  },
  // Chinhoyi-Banket correct distance
  {
    from: "Chinhoyi",
    to: "Banket",
    distance: 23.9,
    time: "0h 20m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Banket",
    to: "Chinhoyi",
    distance: 23.9,
    time: "0h 20m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  // Major highways with route types
  {
    from: "Harare",
    to: "Banket",
    distance: 95,
    time: "1h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Inkomo Toll Plaza"],
  },
  {
    from: "Banket",
    to: "Harare",
    distance: 95,
    time: "1h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Inkomo Toll Plaza"],
  },
  {
    from: "Harare",
    to: "Kariba",
    distance: 365,
    time: "5h 30m",
    routeType: "main_road",
    scenic: true,
    tollGates: ["Makuti Toll Plaza"],
  },
  {
    from: "Kariba",
    to: "Harare",
    distance: 365,
    time: "5h 30m",
    routeType: "main_road",
    scenic: true,
    tollGates: ["Makuti Toll Plaza"],
  },
  {
    from: "Harare",
    to: "Bulawayo",
    distance: 439,
    time: "4h 30m",
    routeType: "highway",
    scenic: false,
    tollGates: ["Harare-Bulawayo Toll", "Gweru Toll Plaza"],
  },
  {
    from: "Harare",
    to: "Mutare",
    distance: 263,
    time: "3h 15m",
    routeType: "highway",
    scenic: true,
    tollGates: ["Mutare Toll Plaza"],
  },
  {
    from: "Harare",
    to: "Gweru",
    distance: 274,
    time: "3h 00m",
    routeType: "highway",
    scenic: false,
    tollGates: ["Harare-Bulawayo Toll", "Gweru Toll Plaza"],
  },
  {
    from: "Harare",
    to: "Masvingo",
    distance: 292,
    time: "3h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Harare",
    to: "Chinhoyi",
    distance: 116,
    time: "1h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  { from: "Harare", to: "Kadoma", distance: 140, time: "1h 45m", routeType: "main_road", scenic: false, tollGates: [] },
  {
    from: "Harare",
    to: "Chegutu",
    distance: 110,
    time: "1h 20m",
    routeType: "main_road",
    scenic: false,
    tollGates: ["Harare-Bulawayo Toll"],
  },
  { from: "Harare", to: "Bindura", distance: 88, time: "1h 10m", routeType: "secondary", scenic: false, tollGates: [] },
  {
    from: "Harare",
    to: "Marondera",
    distance: 75,
    time: "1h 00m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  { from: "Harare", to: "Chitungwiza", distance: 25, time: "0h 30m", routeType: "urban", scenic: false, tollGates: [] },
  { from: "Harare", to: "Norton", distance: 40, time: "0h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  {
    from: "Harare",
    to: "Rusape",
    distance: 170,
    time: "2h 10m",
    routeType: "secondary",
    scenic: true,
    tollGates: ["Mutare Toll Plaza"],
  },

  // Alternative routes (scenic/longer options)
  {
    from: "Harare",
    to: "Mutare",
    distance: 285,
    time: "3h 45m",
    routeType: "scenic",
    scenic: true,
    tollGates: [],
    alternative: true,
  },
  {
    from: "Harare",
    to: "Bulawayo",
    distance: 465,
    time: "5h 15m",
    routeType: "scenic",
    scenic: true,
    tollGates: [],
    alternative: true,
  },

  // Bulawayo connections
  {
    from: "Bulawayo",
    to: "Mutare",
    distance: 518,
    time: "5h 45m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Bulawayo",
    to: "Gweru",
    distance: 165,
    time: "2h 00m",
    routeType: "highway",
    scenic: false,
    tollGates: ["Gweru Toll Plaza"],
  },
  {
    from: "Bulawayo",
    to: "Masvingo",
    distance: 284,
    time: "3h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Bulawayo",
    to: "Victoria Falls",
    distance: 440,
    time: "4h 30m",
    routeType: "highway",
    scenic: true,
    tollGates: ["Victoria Falls Toll"],
  },
  {
    from: "Bulawayo",
    to: "Hwange",
    distance: 296,
    time: "3h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Bulawayo",
    to: "Plumtree",
    distance: 100,
    time: "1h 20m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Bulawayo",
    to: "Gwanda",
    distance: 126,
    time: "1h 30m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Bulawayo",
    to: "Beitbridge",
    distance: 322,
    time: "3h 45m",
    routeType: "highway",
    scenic: false,
    tollGates: ["Beitbridge Toll"],
  },
  {
    from: "Bulawayo",
    to: "Zvishavane",
    distance: 185,
    time: "2h 15m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },

  // Mutare connections
  { from: "Mutare", to: "Gweru", distance: 353, time: "4h 00m", routeType: "main_road", scenic: false, tollGates: [] },
  {
    from: "Mutare",
    to: "Masvingo",
    distance: 271,
    time: "3h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Mutare",
    to: "Chipinge",
    distance: 131,
    time: "1h 45m",
    routeType: "secondary",
    scenic: true,
    tollGates: [],
  },
  { from: "Mutare", to: "Rusape", distance: 93, time: "1h 15m", routeType: "secondary", scenic: true, tollGates: [] },
  { from: "Mutare", to: "Nyanga", distance: 115, time: "1h 30m", routeType: "secondary", scenic: true, tollGates: [] },

  // Other connections with route information
  {
    from: "Gweru",
    to: "Masvingo",
    distance: 157,
    time: "2h 00m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Kwekwe", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Gweru", to: "Shurugwi", distance: 35, time: "0h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  {
    from: "Gweru",
    to: "Zvishavane",
    distance: 120,
    time: "1h 30m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },

  {
    from: "Masvingo",
    to: "Chiredzi",
    distance: 166,
    time: "2h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Masvingo",
    to: "Beitbridge",
    distance: 288,
    time: "3h 30m",
    routeType: "highway",
    scenic: false,
    tollGates: ["Beitbridge Toll"],
  },
  {
    from: "Masvingo",
    to: "Zvishavane",
    distance: 96,
    time: "1h 15m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Masvingo",
    to: "Triangle",
    distance: 140,
    time: "1h 50m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },

  // Additional connections
  {
    from: "Victoria Falls",
    to: "Hwange",
    distance: 144,
    time: "1h 50m",
    routeType: "main_road",
    scenic: true,
    tollGates: [],
  },
  {
    from: "Chinhoyi",
    to: "Kadoma",
    distance: 89,
    time: "1h 10m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  { from: "Chegutu", to: "Kadoma", distance: 30, time: "0h 25m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Chegutu", to: "Norton", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Norton", to: "Chegutu", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Kadoma", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollGates: [] },
  { from: "Kwekwe", to: "Redcliff", distance: 15, time: "0h 15m", routeType: "urban", scenic: false, tollGates: [] },
  { from: "Bindura", to: "Shamva", distance: 29, time: "0h 30m", routeType: "secondary", scenic: false, tollGates: [] },
  {
    from: "Bindura",
    to: "Mt Darwin",
    distance: 118,
    time: "1h 30m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Marondera",
    to: "Rusape",
    distance: 95,
    time: "1h 10m",
    routeType: "secondary",
    scenic: true,
    tollGates: [],
  },
  {
    from: "Marondera",
    to: "Macheke",
    distance: 40,
    time: "0h 35m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  { from: "Rusape", to: "Nyanga", distance: 98, time: "1h 15m", routeType: "secondary", scenic: true, tollGates: [] },
  {
    from: "Beitbridge",
    to: "Gwanda",
    distance: 196,
    time: "2h 15m",
    routeType: "main_road",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Gwanda",
    to: "West Nicholson",
    distance: 72,
    time: "0h 55m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Chiredzi",
    to: "Triangle",
    distance: 26,
    time: "0h 25m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Chiredzi",
    to: "Chipinge",
    distance: 185,
    time: "2h 20m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
  {
    from: "Nyanga",
    to: "Juliasdale",
    distance: 20,
    time: "0h 20m",
    routeType: "secondary",
    scenic: true,
    tollGates: [],
  },
  {
    from: "Zvishavane",
    to: "Shurugwi",
    distance: 85,
    time: "1h 00m",
    routeType: "secondary",
    scenic: false,
    tollGates: [],
  },
]

const cities: string[] = Array.from(new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])).sort()

// Build graph for route finding
type Graph = Map<string, Array<{
  city: string;
  distance: number;
  time: string;
  routeType: string;
  scenic: boolean;
  tollGates: string[] | TollGate[];
  alternative: boolean;
}>>;
const buildGraph = (): Graph => {
  const graph: Graph = new Map()
  distanceData.forEach((route) => {
    if (!graph.has(route.from)) {
      graph.set(route.from, [])
    }
    if (!graph.has(route.to)) {
      graph.set(route.to, [])
    }
    graph.get(route.from)!.push({
      city: route.to,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollGates: route.tollGates || [],
      alternative: route.alternative || false,
    })
    graph.get(route.to)!.push({
      city: route.from,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollGates: route.tollGates || [],
      alternative: route.alternative || false,
    })
  })
  return graph
}

// Calculate real-time number of toll gates based on distance and route
const calculateTollGatesForRoute = (segments: Array<{ tollGates: TollGate[] }>): TollGate[] => {
  const uniqueTollGates = new Map<string, TollGate>()
  segments.forEach((segment) => {
    if (segment.tollGates && segment.tollGates.length > 0) {
      (segment.tollGates as TollGate[]).forEach((tollGate) => {
        uniqueTollGates.set(tollGate.id, tollGate)
      })
    }
  })
  return Array.from(uniqueTollGates.values())
}

// Find multiple routes (shortest, fastest, scenic)
type RouteResult = {
  type: string;
  path: string[];
  priority: number;
  segments?: Array<ReturnType<typeof getRouteDetails>>;
  totalDistance?: number;
  totalTime?: string;
  fuelCost?: number;
  tollInfo?: ReturnType<typeof calculateTollCosts>;
  borderCrossings?: Array<{ from: string; to: string; location: string }>;
};
const findMultipleRoutes = (graph: Graph, start: string, end: string): RouteResult[] => {
  const routes: RouteResult[] = []

  // Find shortest distance route
  const shortestRoute = findShortestPath(graph, start, end, "distance")
  if (shortestRoute.length > 0) {
    routes.push({ type: "shortest", path: shortestRoute, priority: 1 })
  }

  // Find fastest route (least time)
  const fastestRoute = findShortestPath(graph, start, end, "time")
  if (fastestRoute.length > 0 && JSON.stringify(fastestRoute) !== JSON.stringify(shortestRoute)) {
    routes.push({ type: "fastest", path: fastestRoute, priority: 2 })
  }

  // Find scenic route
  const scenicRoute = findScenicRoute(graph, start, end)
  if (scenicRoute.length > 0) {
    routes.push({ type: "scenic", path: scenicRoute, priority: 3 })
  }

  return routes
}

// Modified Dijkstra's algorithm
const findShortestPath = (graph: Graph, start: string, end: string, optimizeFor = "distance"): string[] => {
  const distances = new Map<string, number>()
  const previous = new Map<string, string>()
  const unvisited = new Set<string>()
  for (const city of graph.keys()) {
    distances.set(city, city === start ? 0 : Number.POSITIVE_INFINITY)
    unvisited.add(city)
  }
  while (unvisited.size > 0) {
    let current: string | null = null
    let minDistance = Number.POSITIVE_INFINITY
    for (const city of unvisited) {
      if ((distances.get(city) ?? Number.POSITIVE_INFINITY) < minDistance) {
        minDistance = distances.get(city) ?? Number.POSITIVE_INFINITY
        current = city
      }
    }
    if (current === null || current === end) break
    unvisited.delete(current)
    for (const neighbor of graph.get(current) ?? []) {
      if (unvisited.has(neighbor.city)) {
        let weight = neighbor.distance
        if (optimizeFor === "time") {
          const timeParts = neighbor.time.split(" ")
          const hours = Number.parseInt(timeParts[0]) || 0
          const minutes = Number.parseInt(timeParts[1]) || 0
          weight = hours * 60 + minutes
        }
        const alt = (distances.get(current) ?? 0) + weight
        if (alt < (distances.get(neighbor.city) ?? Number.POSITIVE_INFINITY)) {
          distances.set(neighbor.city, alt)
          previous.set(neighbor.city, current)
        }
      }
    }
  }
  const path: string[] = []
  let current: string | undefined = end
  while (current !== start) {
    path.unshift(current)
    current = previous.get(current)
    if (!current) return []
  }
  path.unshift(start)
  return path
}

// Find scenic route (prioritize scenic roads)
const findScenicRoute = (graph: Graph, start: string, end: string): string[] => {
  const allRoutes = distanceData.filter((route) => route.scenic)
  const scenicCities = new Set<string>()
  allRoutes.forEach((route) => {
    scenicCities.add(route.from)
    scenicCities.add(route.to)
  })
  if (scenicCities.has(start) || scenicCities.has(end)) {
    return findShortestPath(graph, start, end, "distance")
  }
  return []
}

// Update the getRouteDetails function to include actual toll gates
const getRouteDetails = (from: string, to: string) => {
  const route = distanceData.find(
    (route) => (route.from === from && route.to === to) || (route.from === to && route.to === from),
  )
  if (route) {
    const actualTollGates = findTollGatesOnSegment(from, to, route.distance)
    return {
      from: from,
      to: to,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollGates: actualTollGates,
    }
  }
  return null
}

// Build route segments from path
const buildRouteSegments = (path: string[]): Array<ReturnType<typeof getRouteDetails>> => {
  const segments: Array<ReturnType<typeof getRouteDetails>> = []
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i]
    const to = path[i + 1]
    const details = getRouteDetails(from, to)
    if (details) {
      segments.push(details)
    }
  }
  return segments
}

// Calculate fuel cost
const calculateFuelCost = (distance: number, vehicleType: keyof typeof vehicleTypes): number => {
  const consumption = vehicleTypes[vehicleType].consumption
  const litresNeeded = distance / consumption
  return litresNeeded * FUEL_PRICE_USD
}

// Update the calculateTollCosts function to work with actual toll gate objects
const calculateTollCosts = (tollGateObjects: TollGate[], vehicleType: keyof typeof vehicleTypes) => {
  const tollCategory = vehicleTypes[vehicleType].tollCategory
  const tollFeePerGate = tollFees[tollCategory as keyof typeof tollFees]
  const numberOfTollGates = tollGateObjects.length
  return {
    tollGates: tollGateObjects.map((tollGate) => ({
      ...tollGate,
      cost: tollFeePerGate,
    })),
    totalCost: numberOfTollGates * tollFeePerGate,
    numberOfGates: numberOfTollGates,
  }
}

// Check for border crossings
const getBorderCrossings = (segments: Array<{ from: string; to: string }>) => {
  const crossings: Array<{ from: string; to: string; location: string }> = []
  segments.forEach((segment) => {
    const crossing = provincialBoundaries.find(
      (boundary) => boundary.cities.includes(segment.from) && boundary.cities.includes(segment.to),
    )
    if (crossing) {
      crossings.push({
        from: crossing.from,
        to: crossing.to,
        location: `${segment.from} - ${segment.to}`,
      })
    }
  })
  return crossings
}

import type { FC } from "react"
export default function DistanceTableSystem() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [fromCity, setFromCity] = useState<string>("")
  const [toCity, setToCity] = useState<string>("")
  const [selectedVehicle, setSelectedVehicle] = useState<keyof typeof vehicleTypes>("car")
  const [selectedRoutes, setSelectedRoutes] = useState<RouteResult[]>([])
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0)

  const filteredData = useMemo(() => {
    return distanceData.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.to.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFrom = fromCity === "" || item.from === fromCity
      const matchesToCity = toCity === "" || item.to === toCity

      return matchesSearch && matchesFrom && matchesToCity
    })
  }, [searchTerm, fromCity, toCity])

  const calculateRoute = () => {
    if (fromCity && toCity) {
      const graph = buildGraph()
      const routes = findMultipleRoutes(graph, fromCity, toCity)

      const processedRoutes = routes.map((route) => {
        const segments = buildRouteSegments(route.path)
        let totalDistance = 0
        let totalTimeMinutes = 0

        segments.forEach((segment) => {
          if (segment) {
            totalDistance += segment.distance
            const timeParts = segment.time.split(" ")
            const hours = Number.parseInt(timeParts[0]) || 0
            const minutes = Number.parseInt(timeParts[1]) || 0
            totalTimeMinutes += hours * 60 + minutes
          }
        })

        const totalHours = Math.floor(totalTimeMinutes / 60)
        const remainingMinutes = totalTimeMinutes % 60
        const formattedTime = `${totalHours}h ${remainingMinutes}m`

        const fuelCost = calculateFuelCost(totalDistance, selectedVehicle)
        const nonNullSegments = segments.filter((s): s is NonNullable<typeof s> => s !== null)
        const tollGateObjects = calculateTollGatesForRoute(nonNullSegments)
        const tollInfo = calculateTollCosts(tollGateObjects, selectedVehicle)
        const borderCrossings = getBorderCrossings(nonNullSegments)

        return {
          ...route,
          segments: nonNullSegments,
          totalDistance,
          totalTime: formattedTime,
          fuelCost,
          tollInfo,
          borderCrossings,
        }
      })

      setSelectedRoutes(processedRoutes)
      setActiveRouteIndex(0)
    }
  }

  const activeRoute = selectedRoutes[activeRouteIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-2 sm:p-4">
      <Navigation />
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4 pt-2 sm:pt-4">
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Calculate distances, travel times, fuel costs, and get detailed route information between major cities in
            Zimbabwe.
          </p>
        </div>

        {/* Route Calculator */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Route className="h-4 w-4 sm:h-5 sm:w-5" />
              Advanced Route Calculator
            </CardTitle>
            <CardDescription className="text-sm">
              Select your departure and destination cities, choose vehicle type, and get comprehensive route information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">

              <div>
                <label className="text-sm font-medium mb-2 block">From City</label>
                <input
                  type="text"
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type to search departure city"
                  value={fromCity}
                  onChange={e => setFromCity(e.target.value)}
                  list="from-cities-list"
                  autoComplete="off"
                />
                <datalist id="from-cities-list">
                  {cities.filter(city => city.toLowerCase().includes(fromCity.toLowerCase())).map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">To City</label>
                <input
                  type="text"
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type to search destination city"
                  value={toCity}
                  onChange={e => setToCity(e.target.value)}
                  list="to-cities-list"
                  autoComplete="off"
                />
                <datalist id="to-cities-list">
                  {cities.filter(city => city.toLowerCase().includes(toCity.toLowerCase())).map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                <Select
                  value={selectedVehicle}
                  onValueChange={(val) => setSelectedVehicle(val as keyof typeof vehicleTypes)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(vehicleTypes).map(([key, vehicle]) => {
                      const IconComponent = vehicle.icon
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <IconComponent className={`h-4 w-4 ${vehicle.color}`} />
                            <span className="hidden sm:inline">{vehicle.name}</span>
                            <span className="sm:hidden">{vehicle.name.split(" ")[0]}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={calculateRoute} className="w-full h-10" disabled={!fromCity || !toCity}>
                  <span className="hidden sm:inline">Calculate Routes</span>
                  <span className="sm:hidden">Calculate</span>
                </Button>
              </div>
            </div>

            {/* Route Options */}
            {selectedRoutes.length > 0 && (
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {selectedRoutes.map((route, index) => (
                    <Button
                      key={index}
                      variant={activeRouteIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveRouteIndex(index)}
                      className="capitalize text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">{route.type} Route</span>
                      <span className="sm:hidden">{route.type}</span>
                      {route.type === "scenic" && " 🌄"}
                      {route.type === "fastest" && " ⚡"}
                      {route.type === "shortest" && " 📏"}
                    </Button>
                  ))}
                </div>

                {activeRoute && (
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-4 sm:pt-6">
                      {/* Route Summary */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-center mb-4 sm:mb-6">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Route</p>
                          <p className="text-sm sm:text-lg font-semibold">
                            {fromCity} → {toCity}
                          </p>
                          <Badge variant="secondary" className="mt-1 capitalize text-xs">
                            {activeRoute.type}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Distance</p>
                          <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                            {activeRoute.totalDistance} km
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Travel Time</p>
                          <p className="text-sm sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {activeRoute.totalTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Toll Gates</p>
                          <p className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {activeRoute.tollInfo?.numberOfGates ?? 0}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${tollFees[vehicleTypes[selectedVehicle].tollCategory as keyof typeof tollFees].toFixed(2)} each
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Fuel Cost</p>
                          <p className="text-sm sm:text-lg font-bold text-orange-600 dark:text-orange-400">
                            ${activeRoute.fuelCost !== undefined ? activeRoute.fuelCost.toFixed(2) : "-"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {vehicleTypes[selectedVehicle].name.split(" ")[0]} (
                            {vehicleTypes[selectedVehicle].consumption} km/L)
                          </p>
                        </div>
                      </div>

                      <Tabs defaultValue="route" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                          <TabsTrigger value="route" className="text-xs sm:text-sm">
                            Route Details
                          </TabsTrigger>
                          <TabsTrigger value="costs" className="text-xs sm:text-sm">
                            Costs
                          </TabsTrigger>
                          <TabsTrigger value="tolls" className="text-xs sm:text-sm">
                            Toll Gates ({activeRoute.tollInfo?.numberOfGates ?? 0})
                          </TabsTrigger>
                          <TabsTrigger value="borders" className="text-xs sm:text-sm">
                            Border Info
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="route" className="space-y-3 mt-4">
                          <h4 className="font-medium text-sm sm:text-base">Route Breakdown:</h4>
                          {activeRoute.segments?.map((segment, index) => (
                            segment ? (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between bg-background/70 rounded-md p-3 gap-2"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{segment.from}</span>
                                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                  <span className="font-medium text-sm">{segment.to}</span>
                                  {segment.scenic && (
                                    <Badge variant="outline" className="text-xs">
                                      Scenic
                                    </Badge>
                                  )}
                                  {segment.tollGates && segment.tollGates.length > 0 && (
                                    <Badge variant="outline" className="text-xs">
                                      {segment.tollGates.length} Toll{segment.tollGates.length > 1 ? "s" : ""}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{segment.distance} km</span>
                                  <span className="text-blue-600 dark:text-blue-400">{segment.time}</span>
                                  <Badge variant="secondary" className="text-xs capitalize">
                                    {segment.routeType.replace("_", " ")}
                                  </Badge>
                                </div>
                              </div>
                            ) : null
                          ))}
                        </TabsContent>

                        <TabsContent value="costs" className="space-y-4 mt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card className="p-3 sm:p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Fuel className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
                                <h4 className="font-medium text-sm sm:text-base">Fuel Costs</h4>
                              </div>
                              <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                  <span>Distance:</span>
                                  <span>{activeRoute.totalDistance} km</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Fuel needed:</span>
                                  <span>
                                    {activeRoute.totalDistance !== undefined ? (activeRoute.totalDistance / vehicleTypes[selectedVehicle].consumption).toFixed(1) : "-"} L
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Price per litre:</span>
                                  <span>${FUEL_PRICE_USD}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                  <span>Total Fuel Cost:</span>
                                  <span>${activeRoute.fuelCost !== undefined ? activeRoute.fuelCost.toFixed(2) : "-"}</span>
                                </div>
                              </div>
                            </Card>

                            <Card className="p-3 sm:p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                                <h4 className="font-medium text-sm sm:text-base">Total Trip Cost</h4>
                              </div>
                              <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                  <span>Fuel:</span>
                                  <span>${activeRoute.fuelCost !== undefined ? activeRoute.fuelCost.toFixed(2) : "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Tolls ({activeRoute.tollInfo?.numberOfGates ?? 0} gates):</span>
                                  <span>${activeRoute.tollInfo?.totalCost !== undefined ? activeRoute.tollInfo.totalCost.toFixed(2) : "-"}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2 text-sm sm:text-lg">
                                  <span>Total:</span>
                                  <span>${activeRoute.fuelCost !== undefined && activeRoute.tollInfo?.totalCost !== undefined ? (activeRoute.fuelCost + activeRoute.tollInfo.totalCost).toFixed(2) : "-"}</span>
                                </div>
                              </div>
                            </Card>
                          </div>

                          {/* Toll Fee Structure */}
                          <Card className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20">
                            <h4 className="font-medium text-sm sm:text-base mb-3">Zimbabwe Toll Fee Structure</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm">
                              {Object.entries(tollFees).map(([category, fee]) => (
                                <div key={category} className="flex justify-between">
                                  <span className="capitalize">{category.replace("_", " ")}:</span>
                                  <span className="font-semibold">${fee.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </TabsContent>

                        <TabsContent value="tolls" className="space-y-3 mt-4">
                          {activeRoute.tollInfo?.numberOfGates && activeRoute.tollInfo.numberOfGates > 0 ? (
                            <>
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium text-sm sm:text-base">Toll Gates on Route:</h4>
                                <Badge variant="outline" className="text-xs">
                              {activeRoute.tollInfo?.numberOfGates ?? 0} Gate
                                  {activeRoute.tollInfo && activeRoute.tollInfo.numberOfGates > 1 ? "s" : ""}
                                </Badge>
                              </div>
                              {activeRoute.tollInfo?.tollGates?.map((toll, index) => (
                                <div key={index} className="bg-background/70 rounded-md p-3">
                                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                    <div>
                                      <h5 className="font-medium text-sm">{toll.name}</h5>
                                      <p className="text-xs text-muted-foreground">{toll.location}</p>
                                      <p className="text-xs text-muted-foreground">Highway: {toll.highway}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Vehicle: {vehicleTypes[selectedVehicle].name}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <Badge variant="outline" className="text-xs mb-1">
                                        ${toll.cost.toFixed(2)}
                                      </Badge>
                                      <p className="text-xs text-muted-foreground">
                                        {toll.kmFromHarare
                                          ? `${toll.kmFromHarare}km from Harare`
                                          : toll.kmFromBulawayo
                                            ? `${toll.kmFromBulawayo}km from Bulawayo`
                                            : toll.kmFromMutare
                                              ? `${toll.kmFromMutare}km from Mutare`
                                              : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="text-right font-semibold text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded-md">
                                Total Toll Cost: ${activeRoute.tollInfo?.totalCost !== undefined ? activeRoute.tollInfo.totalCost.toFixed(2) : "-"}
                                <p className="text-xs text-muted-foreground font-normal">
                                  {activeRoute.tollInfo?.numberOfGates ?? 0} toll gate
                                  {activeRoute.tollInfo && activeRoute.tollInfo.numberOfGates > 1 ? "s" : ""} × $
                                  {tollFees[vehicleTypes[selectedVehicle].tollCategory as keyof typeof tollFees].toFixed(2)} each
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground text-sm mb-2">No toll gates on this route</p>
                              <p className="text-xs text-muted-foreground">
                                This route uses secondary roads or urban streets without toll facilities
                              </p>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="borders" className="space-y-3 mt-4">
                          {activeRoute.borderCrossings && activeRoute.borderCrossings.length > 0 ? (
                            <>
                              <h4 className="font-medium text-sm sm:text-base">Provincial Border Crossings:</h4>
                              {activeRoute.borderCrossings?.map((crossing, index) => (
                                <div key={index} className="bg-background/70 rounded-md p-3">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                                    <div>
                                      <p className="font-medium text-sm">
                                        {crossing.from} → {crossing.to}
                                      </p>
                                      <p className="text-xs text-muted-foreground">At: {crossing.location}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                  <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-medium">Border Crossing Information:</p>
                                    <p>
                                      Ensure you have proper identification when crossing provincial boundaries. Some
                                      areas may have checkpoints.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <p className="text-muted-foreground text-center py-4 text-sm">
                              No provincial border crossings on this route
                            </p>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Distance Table */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">Distance Table</CardTitle>
            <CardDescription className="text-sm">Complete distance table between Zimbabwe cities</CardDescription>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger className="w-full sm:w-48 h-10">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchTerm || fromCity || toCity) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFromCity("")
                    setToCity("")
                  }}
                  className="h-10"
                >
                  <span className="hidden sm:inline">Clear Filters</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">From</TableHead>
                    <TableHead className="min-w-[100px]">To</TableHead>
                    <TableHead className="text-right min-w-[80px]">Distance</TableHead>
                    <TableHead className="text-right min-w-[80px]">Time</TableHead>
                    <TableHead className="text-right min-w-[100px]">Route Type</TableHead>
                    <TableHead className="text-right min-w-[100px]">Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-sm">{item.from}</TableCell>
                        <TableCell className="text-sm">{item.to}</TableCell>
                        <TableCell className="text-right font-semibold text-sm">{item.distance} km</TableCell>
                        <TableCell className="text-right text-sm">{item.time}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="capitalize text-xs">
                            {item.routeType?.replace("_", " ") || "main road"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end flex-wrap">
                            {item.scenic && (
                              <Badge variant="outline" className="text-xs">
                                Scenic
                              </Badge>
                            )}
                            {item.tollGates && item.tollGates.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {item.tollGates.length} Toll{item.tollGates.length > 1 ? "s" : ""}
                              </Badge>
                            )}
                            {item.alternative && (
                              <Badge variant="outline" className="text-xs">
                                Alt
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                        No routes found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
              Showing {filteredData.length} of {distanceData.length} routes
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{cities.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Cities Covered</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {distanceData.length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Routes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {zimbabweTollGates.length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Toll Gates</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">${FUEL_PRICE_USD}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Fuel Price/Litre</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 py-6 sm:py-8 border-t border-border bg-background/50 backdrop-blur-sm rounded-lg">
          <div className="text-center space-y-2">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <Link
                href="/disclaimer"
                className="text-xs sm:text-sm text-blue-600 hover:underline"
              >
                Disclaimer
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-xs sm:text-sm text-blue-600 hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Copyright © 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
