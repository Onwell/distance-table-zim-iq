"use client"

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

// Vehicle types with fuel consumption (km per litre)
const vehicleTypes = {
  car: { name: "Car", icon: Car, consumption: 12, color: "text-blue-600 dark:text-blue-400" },
  motorcycle: { name: "Motorcycle", icon: Bike, consumption: 25, color: "text-green-600 dark:text-green-400" },
  bus: { name: "Bus", icon: Bus, consumption: 4, color: "text-orange-600 dark:text-orange-400" },
  truck: { name: "Truck", icon: Truck, consumption: 3, color: "text-red-600 dark:text-red-400" },
  custom: { name: "Custom (60km/60L)", icon: Fuel, consumption: 1, color: "text-purple-600 dark:text-purple-400" },
}

// Current fuel price in USD
const FUEL_PRICE_USD = 1.45

// Toll gates information
const tollGates = [
  { name: "Harare-Bulawayo Toll", location: "A5 Highway", cost: 2.0, routes: ["Harare-Bulawayo", "Harare-Gweru"] },
  { name: "Mutare Toll Plaza", location: "A3 Highway", cost: 1.5, routes: ["Harare-Mutare", "Marondera-Mutare"] },
  {
    name: "Beitbridge Toll",
    location: "A4 Highway",
    cost: 3.0,
    routes: ["Masvingo-Beitbridge", "Bulawayo-Beitbridge"],
  },
  { name: "Victoria Falls Toll", location: "A8 Highway", cost: 2.5, routes: ["Bulawayo-Victoria Falls"] },
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
const distanceData = [
  // Major highways with route types
  { from: "Harare", to: "Bulawayo", distance: 439, time: "4h 30m", routeType: "highway", scenic: false, tollCost: 2.0 },
  { from: "Harare", to: "Mutare", distance: 263, time: "3h 15m", routeType: "highway", scenic: true, tollCost: 1.5 },
  { from: "Harare", to: "Gweru", distance: 274, time: "3h 00m", routeType: "highway", scenic: false, tollCost: 2.0 },
  { from: "Harare", to: "Masvingo", distance: 292, time: "3h 30m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Chinhoyi", distance: 116, time: "1h 30m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Kadoma", distance: 140, time: "1h 45m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Chegutu", distance: 110, time: "1h 20m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Bindura", distance: 88, time: "1h 10m", routeType: "secondary", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Marondera", distance: 75, time: "1h 00m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Chitungwiza", distance: 25, time: "0h 30m", routeType: "urban", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Norton", distance: 40, time: "0h 40m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Harare", to: "Rusape", distance: 170, time: "2h 10m", routeType: "secondary", scenic: true, tollCost: 0 },

  // Alternative routes (scenic/longer options)
  {
    from: "Harare",
    to: "Mutare",
    distance: 285,
    time: "3h 45m",
    routeType: "scenic",
    scenic: true,
    tollCost: 0,
    alternative: true,
  },
  {
    from: "Harare",
    to: "Bulawayo",
    distance: 465,
    time: "5h 15m",
    routeType: "scenic",
    scenic: true,
    tollCost: 0,
    alternative: true,
  },

  // Bulawayo connections
  { from: "Bulawayo", to: "Mutare", distance: 518, time: "5h 45m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Bulawayo", to: "Gweru", distance: 165, time: "2h 00m", routeType: "highway", scenic: false, tollCost: 0 },
  {
    from: "Bulawayo",
    to: "Masvingo",
    distance: 284,
    time: "3h 15m",
    routeType: "main_road",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Bulawayo",
    to: "Victoria Falls",
    distance: 440,
    time: "4h 30m",
    routeType: "highway",
    scenic: true,
    tollCost: 2.5,
  },
  { from: "Bulawayo", to: "Hwange", distance: 296, time: "3h 30m", routeType: "main_road", scenic: false, tollCost: 0 },
  {
    from: "Bulawayo",
    to: "Plumtree",
    distance: 100,
    time: "1h 20m",
    routeType: "main_road",
    scenic: false,
    tollCost: 0,
  },
  { from: "Bulawayo", to: "Gwanda", distance: 126, time: "1h 30m", routeType: "main_road", scenic: false, tollCost: 0 },
  {
    from: "Bulawayo",
    to: "Beitbridge",
    distance: 322,
    time: "3h 45m",
    routeType: "highway",
    scenic: false,
    tollCost: 3.0,
  },
  {
    from: "Bulawayo",
    to: "Zvishavane",
    distance: 185,
    time: "2h 15m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },

  // Mutare connections
  { from: "Mutare", to: "Gweru", distance: 353, time: "4h 00m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Mutare", to: "Masvingo", distance: 271, time: "3h 15m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Mutare", to: "Chipinge", distance: 131, time: "1h 45m", routeType: "secondary", scenic: true, tollCost: 0 },
  { from: "Mutare", to: "Rusape", distance: 93, time: "1h 15m", routeType: "secondary", scenic: true, tollCost: 0 },
  { from: "Mutare", to: "Nyanga", distance: 115, time: "1h 30m", routeType: "secondary", scenic: true, tollCost: 0 },

  // Other connections with route information
  { from: "Gweru", to: "Masvingo", distance: 157, time: "2h 00m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Gweru", to: "Kwekwe", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Gweru", to: "Shurugwi", distance: 35, time: "0h 30m", routeType: "secondary", scenic: false, tollCost: 0 },
  {
    from: "Gweru",
    to: "Zvishavane",
    distance: 120,
    time: "1h 30m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },

  {
    from: "Masvingo",
    to: "Chiredzi",
    distance: 166,
    time: "2h 15m",
    routeType: "main_road",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Masvingo",
    to: "Beitbridge",
    distance: 288,
    time: "3h 30m",
    routeType: "highway",
    scenic: false,
    tollCost: 3.0,
  },
  {
    from: "Masvingo",
    to: "Zvishavane",
    distance: 96,
    time: "1h 15m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Masvingo",
    to: "Triangle",
    distance: 140,
    time: "1h 50m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },

  // Additional connections
  {
    from: "Victoria Falls",
    to: "Hwange",
    distance: 144,
    time: "1h 50m",
    routeType: "main_road",
    scenic: true,
    tollCost: 0,
  },
  { from: "Chinhoyi", to: "Kadoma", distance: 89, time: "1h 10m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Chegutu", to: "Kadoma", distance: 30, time: "0h 25m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Chegutu", to: "Norton", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Norton", to: "Chegutu", distance: 70, time: "0h 55m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Kwekwe", to: "Kadoma", distance: 67, time: "0h 50m", routeType: "main_road", scenic: false, tollCost: 0 },
  { from: "Kwekwe", to: "Redcliff", distance: 15, time: "0h 15m", routeType: "urban", scenic: false, tollCost: 0 },
  { from: "Bindura", to: "Shamva", distance: 29, time: "0h 30m", routeType: "secondary", scenic: false, tollCost: 0 },
  {
    from: "Bindura",
    to: "Mt Darwin",
    distance: 118,
    time: "1h 30m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  { from: "Marondera", to: "Rusape", distance: 95, time: "1h 10m", routeType: "secondary", scenic: true, tollCost: 0 },
  {
    from: "Marondera",
    to: "Macheke",
    distance: 40,
    time: "0h 35m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  { from: "Rusape", to: "Nyanga", distance: 98, time: "1h 15m", routeType: "secondary", scenic: true, tollCost: 0 },
  {
    from: "Beitbridge",
    to: "Gwanda",
    distance: 196,
    time: "2h 15m",
    routeType: "main_road",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Gwanda",
    to: "West Nicholson",
    distance: 72,
    time: "0h 55m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Chiredzi",
    to: "Triangle",
    distance: 26,
    time: "0h 25m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  {
    from: "Chiredzi",
    to: "Chipinge",
    distance: 185,
    time: "2h 20m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
  { from: "Nyanga", to: "Juliasdale", distance: 20, time: "0h 20m", routeType: "secondary", scenic: true, tollCost: 0 },
  {
    from: "Zvishavane",
    to: "Shurugwi",
    distance: 85,
    time: "1h 00m",
    routeType: "secondary",
    scenic: false,
    tollCost: 0,
  },
]

const cities = Array.from(new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])).sort()

// Build graph for route finding
const buildGraph = () => {
  const graph = new Map()

  distanceData.forEach((route) => {
    if (!graph.has(route.from)) {
      graph.set(route.from, [])
    }
    if (!graph.has(route.to)) {
      graph.set(route.to, [])
    }

    graph.get(route.from).push({
      city: route.to,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollCost: route.tollCost || 0,
      alternative: route.alternative || false,
    })

    graph.get(route.to).push({
      city: route.from,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollCost: route.tollCost || 0,
      alternative: route.alternative || false,
    })
  })

  return graph
}

// Find multiple routes (shortest, fastest, scenic)
const findMultipleRoutes = (graph, start, end) => {
  const routes = []

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
const findShortestPath = (graph, start, end, optimizeFor = "distance") => {
  const distances = new Map()
  const previous = new Map()
  const unvisited = new Set()

  for (const city of graph.keys()) {
    distances.set(city, city === start ? 0 : Number.POSITIVE_INFINITY)
    unvisited.add(city)
  }

  while (unvisited.size > 0) {
    let current = null
    let minDistance = Number.POSITIVE_INFINITY

    for (const city of unvisited) {
      if (distances.get(city) < minDistance) {
        minDistance = distances.get(city)
        current = city
      }
    }

    if (current === null || current === end) break

    unvisited.delete(current)

    for (const neighbor of graph.get(current)) {
      if (unvisited.has(neighbor.city)) {
        let weight = neighbor.distance
        if (optimizeFor === "time") {
          // Convert time to minutes for comparison
          const timeParts = neighbor.time.split(" ")
          const hours = Number.parseInt(timeParts[0]) || 0
          const minutes = Number.parseInt(timeParts[1]) || 0
          weight = hours * 60 + minutes
        }

        const alt = distances.get(current) + weight
        if (alt < distances.get(neighbor.city)) {
          distances.set(neighbor.city, alt)
          previous.set(neighbor.city, current)
        }
      }
    }
  }

  // Reconstruct path
  const path = []
  let current = end

  while (current !== start) {
    path.unshift(current)
    current = previous.get(current)
    if (!current) return []
  }

  path.unshift(start)
  return path
}

// Find scenic route (prioritize scenic roads)
const findScenicRoute = (graph, start, end) => {
  // Simple implementation - find route that includes scenic segments
  const allRoutes = distanceData.filter((route) => route.scenic)
  const scenicCities = new Set()

  allRoutes.forEach((route) => {
    scenicCities.add(route.from)
    scenicCities.add(route.to)
  })

  // Try to find a path that goes through scenic cities
  if (scenicCities.has(start) || scenicCities.has(end)) {
    return findShortestPath(graph, start, end, "distance")
  }

  return []
}

// Get route details between two cities
const getRouteDetails = (from, to) => {
  const route = distanceData.find(
    (route) => (route.from === from && route.to === to) || (route.from === to && route.to === from),
  )

  if (route) {
    return {
      from: from,
      to: to,
      distance: route.distance,
      time: route.time,
      routeType: route.routeType,
      scenic: route.scenic,
      tollCost: route.tollCost || 0,
    }
  }

  return null
}

// Build route segments from path
const buildRouteSegments = (path) => {
  const segments = []

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
const calculateFuelCost = (distance, vehicleType) => {
  const consumption = vehicleTypes[vehicleType].consumption
  const litresNeeded = distance / consumption
  return litresNeeded * FUEL_PRICE_USD
}

// Get toll gates for route
const getRouteTollGates = (segments) => {
  const routeTolls = []
  let totalTollCost = 0

  segments.forEach((segment) => {
    if (segment.tollCost > 0) {
      const routeKey = `${segment.from}-${segment.to}`
      const toll = tollGates.find((toll) =>
        toll.routes.some((route) => route.includes(segment.from) && route.includes(segment.to)),
      )

      if (toll) {
        routeTolls.push(toll)
        totalTollCost += segment.tollCost
      }
    }
  })

  return { tolls: routeTolls, totalCost: totalTollCost }
}

// Check for border crossings
const getBorderCrossings = (segments) => {
  const crossings = []

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

export default function DistanceTableSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("car")
  const [selectedRoutes, setSelectedRoutes] = useState([])
  const [activeRouteIndex, setActiveRouteIndex] = useState(0)

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
          totalDistance += segment.distance
          const timeParts = segment.time.split(" ")
          const hours = Number.parseInt(timeParts[0]) || 0
          const minutes = Number.parseInt(timeParts[1]) || 0
          totalTimeMinutes += hours * 60 + minutes
        })

        const totalHours = Math.floor(totalTimeMinutes / 60)
        const remainingMinutes = totalTimeMinutes % 60
        const formattedTime = `${totalHours}h ${remainingMinutes}m`

        const fuelCost = calculateFuelCost(totalDistance, selectedVehicle)
        const tollInfo = getRouteTollGates(segments)
        const borderCrossings = getBorderCrossings(segments)

        return {
          ...route,
          segments,
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
                <Select value={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">To City</label>
                <Select value={toCity} onValueChange={setToCity}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select destination city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
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
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center mb-4 sm:mb-6">
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
                          <p className="text-xs sm:text-sm text-muted-foreground">Fuel Cost</p>
                          <p className="text-sm sm:text-lg font-bold text-orange-600 dark:text-orange-400">
                            ${activeRoute.fuelCost.toFixed(2)}
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
                            Toll Gates
                          </TabsTrigger>
                          <TabsTrigger value="borders" className="text-xs sm:text-sm">
                            Border Info
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="route" className="space-y-3 mt-4">
                          <h4 className="font-medium text-sm sm:text-base">Route Breakdown:</h4>
                          {activeRoute.segments.map((segment, index) => (
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
                              </div>
                              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                <span className="text-muted-foreground">{segment.distance} km</span>
                                <span className="text-blue-600 dark:text-blue-400">{segment.time}</span>
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {segment.routeType.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>
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
                                    {(activeRoute.totalDistance / vehicleTypes[selectedVehicle].consumption).toFixed(1)}{" "}
                                    L
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Price per litre:</span>
                                  <span>${FUEL_PRICE_USD}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                  <span>Total Fuel Cost:</span>
                                  <span>${activeRoute.fuelCost.toFixed(2)}</span>
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
                                  <span>${activeRoute.fuelCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Tolls:</span>
                                  <span>${activeRoute.tollInfo.totalCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2 text-sm sm:text-lg">
                                  <span>Total:</span>
                                  <span>${(activeRoute.fuelCost + activeRoute.tollInfo.totalCost).toFixed(2)}</span>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="tolls" className="space-y-3 mt-4">
                          {activeRoute.tollInfo.tolls.length > 0 ? (
                            <>
                              <h4 className="font-medium text-sm sm:text-base">Toll Gates on Route:</h4>
                              {activeRoute.tollInfo.tolls.map((toll, index) => (
                                <div key={index} className="bg-background/70 rounded-md p-3">
                                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                    <div>
                                      <h5 className="font-medium text-sm">{toll.name}</h5>
                                      <p className="text-xs text-muted-foreground">{toll.location}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      ${toll.cost.toFixed(2)}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                              <div className="text-right font-semibold text-sm">
                                Total Toll Cost: ${activeRoute.tollInfo.totalCost.toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <p className="text-muted-foreground text-center py-4 text-sm">
                              No toll gates on this route
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="borders" className="space-y-3 mt-4">
                          {activeRoute.borderCrossings.length > 0 ? (
                            <>
                              <h4 className="font-medium text-sm sm:text-base">Provincial Border Crossings:</h4>
                              {activeRoute.borderCrossings.map((crossing, index) => (
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
                            {item.tollCost > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Toll
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
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{tollGates.length}</p>
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
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Copyright © 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
