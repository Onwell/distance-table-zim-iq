"use client"

import Link from "next/link"
import { useState, useMemo, useCallback } from "react"
import { Search, Route, ArrowRight, Fuel, Car, Truck, Bus, Bike, MapPin, DollarSign, TriangleAlert as AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  tollFees,
  vehicleTypes,
  FUEL_PRICE_USD,
  zimbabweTollGates,
  distanceData,
  cities,
  provincialBoundaries,
  findTollGatesOnSegment,
  type TollGate,
  type DistanceRoute,
} from "@/lib/distance-data"

// Vehicle icons map
const vehicleIcons = { car: Car, motorcycle: Bike, minibus: Bus, bus: Bus, truck: Truck, haulage: Truck }

// Build graph for route finding
type GraphEdge = { city: string; distance: number; time: string; routeType: string; scenic: boolean; tollGates: string[]; alternative: boolean }
type Graph = Map<string, GraphEdge[]>
type RouteResult = {
  type: string
  path: string[]
  segments?: Array<{ from: string; to: string; distance: number; time: string; routeType: string; scenic: boolean; tollGates: TollGate[] }>
  totalDistance?: number
  totalTime?: string
  fuelCost?: number
  tollInfo?: { tollGates: Array<TollGate & { cost: number }>; totalCost: number; numberOfGates: number }
  borderCrossings?: Array<{ from: string; to: string; location: string }>
}

function buildGraph(): Graph {
  const graph: Graph = new Map()
  distanceData.forEach((route) => {
    if (!graph.has(route.from)) graph.set(route.from, [])
    if (!graph.has(route.to)) graph.set(route.to, [])
    graph.get(route.from)!.push({ city: route.to, distance: route.distance, time: route.time, routeType: route.routeType, scenic: route.scenic, tollGates: route.tollGates || [], alternative: route.alternative || false })
    graph.get(route.to)!.push({ city: route.from, distance: route.distance, time: route.time, routeType: route.routeType, scenic: route.scenic, tollGates: route.tollGates || [], alternative: route.alternative || false })
  })
  return graph
}

function findShortestPath(graph: Graph, start: string, end: string, optimizeFor = "distance"): string[] {
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

function findScenicRoute(graph: Graph, start: string, end: string): string[] {
  const allRoutes = distanceData.filter((route) => route.scenic)
  const scenicCities = new Set<string>()
  allRoutes.forEach((route) => {
    scenicCities.add(route.from)
    scenicCities.add(route.to)
  })
  if (scenicCities.has(start) || scenicCities.has(end)) return findShortestPath(graph, start, end, "distance")
  return []
}

function findMultipleRoutes(graph: Graph, start: string, end: string): RouteResult[] {
  const routes: RouteResult[] = []
  const shortestRoute = findShortestPath(graph, start, end, "distance")
  if (shortestRoute.length > 0) routes.push({ type: "shortest", path: shortestRoute, priority: 1 })
  const fastestRoute = findShortestPath(graph, start, end, "time")
  if (fastestRoute.length > 0 && JSON.stringify(fastestRoute) !== JSON.stringify(shortestRoute)) routes.push({ type: "fastest", path: fastestRoute, priority: 2 })
  const scenicRoute = findScenicRoute(graph, start, end)
  if (scenicRoute.length > 0) routes.push({ type: "scenic", path: scenicRoute, priority: 3 })
  return routes
}

function getRouteDetails(from: string, to: string) {
  const route = distanceData.find((r) => (r.from === from && r.to === to) || (r.from === to && r.to === from))
  if (route) {
    const actualTollGates = findTollGatesOnSegment(from, to)
    return { from, to, distance: route.distance, time: route.time, routeType: route.routeType, scenic: route.scenic, tollGates: actualTollGates }
  }
  return null
}

function buildRouteSegments(path: string[]) {
  const segments: Array<ReturnType<typeof getRouteDetails>> = []
  for (let i = 0; i < path.length - 1; i++) {
    const details = getRouteDetails(path[i], path[i + 1])
    if (details) segments.push(details)
  }
  return segments
}

function calculateFuelCost(distance: number, vehicleType: keyof typeof vehicleTypes): number {
  return (distance / vehicleTypes[vehicleType].consumption) * FUEL_PRICE_USD
}

function calculateTollCosts(tollGateObjects: TollGate[], vehicleType: keyof typeof vehicleTypes) {
  const tollCategory = vehicleTypes[vehicleType].tollCategory
  const tollFeePerGate = tollFees[tollCategory as keyof typeof tollFees]
  const numberOfTollGates = tollGateObjects.length
  return {
    tollGates: tollGateObjects.map((tollGate) => ({ ...tollGate, cost: tollFeePerGate })),
    totalCost: numberOfTollGates * tollFeePerGate,
    numberOfGates: numberOfTollGates,
  }
}

function calculateTollGatesForRoute(segments: Array<{ tollGates: TollGate[] }>): TollGate[] {
  const uniqueTollGates = new Map<string, TollGate>()
  segments.forEach((segment) => {
    if (segment.tollGates && segment.tollGates.length > 0) {
      segment.tollGates.forEach((tollGate) => uniqueTollGates.set(tollGate.id, tollGate))
    }
  })
  return Array.from(uniqueTollGates.values())
}

function getBorderCrossings(segments: Array<{ from: string; to: string }>) {
  const crossings: Array<{ from: string; to: string; location: string }> = []
  segments.forEach((segment) => {
    const crossing = provincialBoundaries.find((b) => b.cities.includes(segment.from) && b.cities.includes(segment.to))
    if (crossing) crossings.push({ from: crossing.from, to: crossing.to, location: `${segment.from} - ${segment.to}` })
  })
  return crossings
}

export default function DistanceTableSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<keyof typeof vehicleTypes>("car")
  const [selectedRoutes, setSelectedRoutes] = useState<RouteResult[]>([])
  const [activeRouteIndex, setActiveRouteIndex] = useState(0)

  const filteredData = useMemo(() => {
    return distanceData.filter((item) => {
      const matchesSearch = searchTerm === "" || item.from.toLowerCase().includes(searchTerm.toLowerCase()) || item.to.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFrom = fromCity === "" || item.from === fromCity
      const matchesToCity = toCity === "" || item.to === toCity
      return matchesSearch && matchesFrom && matchesToCity
    })
  }, [searchTerm, fromCity, toCity])

  const calculateRoute = useCallback(() => {
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
        return { ...route, segments: nonNullSegments, totalDistance, totalTime: formattedTime, fuelCost, tollInfo, borderCrossings }
      })
      setSelectedRoutes(processedRoutes)
      setActiveRouteIndex(0)
    }
  }, [fromCity, toCity, selectedVehicle])

  const activeRoute = selectedRoutes[activeRouteIndex]
  const VehicleIcon = vehicleIcons[selectedVehicle]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <header className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] text-primary">
            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Zimbabwe Travel Intelligence
          </span>
          <h1 className="mt-4 sm:mt-6 font-serif text-2xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance">
            Plan Every Journey with <span className="text-primary">Precision</span>
          </h1>
          <p className="mt-3 sm:mt-5 text-xs sm:text-sm lg:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-2 sm:px-0">
            Calculate distances, travel times, fuel costs, and detailed toll information between major cities across Zimbabwe
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Route Calculator */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader className="pb-3 sm:pb-4 border-b border-border/50">
            <CardTitle className="flex items-center gap-2 sm:gap-2.5 font-serif text-lg sm:text-xl lg:text-2xl">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Route className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="leading-tight">Route Calculator</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Select departure & destination cities, choose vehicle type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">From City</label>
                <Select value={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">To City</label>
                <Select value={toCity} onValueChange={setToCity}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Select destination city" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">Vehicle Type</label>
                <Select value={selectedVehicle} onValueChange={(val) => setSelectedVehicle(val as keyof typeof vehicleTypes)}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm"><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(vehicleTypes).map(([key, vehicle]) => {
                      const IconComponent = vehicleIcons[key as keyof typeof vehicleIcons]
                      return (<SelectItem key={key} value={key}><div className="flex items-center gap-2"><IconComponent className="h-4 w-4" /><span>{vehicle.name}</span></div></SelectItem>)
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={calculateRoute} className="w-full h-10 sm:h-11 text-sm" disabled={!fromCity || !toCity}>Calculate Route</Button>
              </div>
            </div>

            {/* Route Results */}
            {selectedRoutes.length > 0 && activeRoute && (
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {selectedRoutes.map((route, index) => (
                    <Button key={index} variant={activeRouteIndex === index ? "default" : "outline"} size="sm" onClick={() => setActiveRouteIndex(index)} className="capitalize text-xs px-3 py-2">
                      {route.type === "scenic" && "🌄 "}{route.type === "fastest" && "⚡ "}{route.type === "shortest" && "📏 "}{route.type} Route
                    </Button>
                  ))}
                </div>
                <Card className="border-primary/20 bg-secondary/40">
                  <CardContent className="pt-4 sm:pt-6">
                    {/* Route Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center mb-4 sm:mb-6">
                      <div className="rounded-lg border border-border/50 bg-card/60 p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Route</p>
                        <p className="text-sm font-semibold mt-1 truncate">{fromCity} → {toCity}</p>
                        <Badge variant="secondary" className="mt-1 capitalize text-xs">{activeRoute.type}</Badge>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/60 p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Distance</p>
                        <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{activeRoute.totalDistance}<span className="text-sm ml-0.5">km</span></p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/60 p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Travel Time</p>
                        <p className="text-lg font-semibold text-foreground mt-1">{activeRoute.totalTime}</p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/60 p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Toll Gates</p>
                        <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{activeRoute.tollInfo?.numberOfGates ?? 0}</p>
                        <p className="text-xs text-muted-foreground">${tollFees[vehicleTypes[selectedVehicle].tollCategory as keyof typeof tollFees].toFixed(2)} each</p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/60 p-3 col-span-2 sm:col-span-1">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Fuel Cost</p>
                        <p className="text-lg font-bold text-primary mt-1">${activeRoute.fuelCost?.toFixed(2) ?? "-"}</p>
                        <p className="text-xs text-muted-foreground">{vehicleTypes[selectedVehicle].name}</p>
                      </div>
                    </div>

                    <Tabs defaultValue="route" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 h-auto">
                        <TabsTrigger value="route" className="text-xs px-2 py-2">Route</TabsTrigger>
                        <TabsTrigger value="costs" className="text-xs px-2 py-2">Costs</TabsTrigger>
                        <TabsTrigger value="tolls" className="text-xs px-2 py-2">Tolls ({activeRoute.tollInfo?.numberOfGates ?? 0})</TabsTrigger>
                        <TabsTrigger value="borders" className="text-xs px-2 py-2">Borders</TabsTrigger>
                      </TabsList>

                      <TabsContent value="route" className="space-y-3 mt-4">
                        <h4 className="font-medium text-sm">Route Breakdown:</h4>
                        {activeRoute.segments?.map((segment, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-card/60 border border-border/50 rounded-lg p-3 gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{segment.from}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="font-medium text-sm">{segment.to}</span>
                              {segment.scenic && <Badge variant="outline" className="text-xs">Scenic</Badge>}
                              {segment.tollGates && segment.tollGates.length > 0 && <Badge variant="outline" className="text-xs">{segment.tollGates.length} Toll{segment.tollGates.length > 1 ? "s" : ""}</Badge>}
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-muted-foreground">{segment.distance} km</span>
                              <span className="text-primary">{segment.time}</span>
                              <Badge variant="secondary" className="text-xs capitalize">{segment.routeType.replace("_", " ")}</Badge>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="costs" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Card className="p-4">
                            <div className="flex items-center gap-2 mb-3"><Fuel className="h-5 w-5 text-primary shrink-0" /><h4 className="font-medium text-sm">Fuel Costs</h4></div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span>Distance:</span><span>{activeRoute.totalDistance} km</span></div>
                              <div className="flex justify-between"><span>Fuel needed:</span><span>{activeRoute.totalDistance ? (activeRoute.totalDistance / vehicleTypes[selectedVehicle].consumption).toFixed(1) : "-"} L</span></div>
                              <div className="flex justify-between"><span>Price per litre:</span><span>${FUEL_PRICE_USD}</span></div>
                              <div className="flex justify-between font-semibold border-t pt-2"><span>Total Fuel Cost:</span><span className="text-primary">${activeRoute.fuelCost?.toFixed(2) ?? "-"}</span></div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="flex items-center gap-2 mb-3"><DollarSign className="h-5 w-5 text-primary shrink-0" /><h4 className="font-medium text-sm">Total Trip Cost</h4></div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span>Fuel:</span><span>${activeRoute.fuelCost?.toFixed(2) ?? "-"}</span></div>
                              <div className="flex justify-between"><span>Tolls ({activeRoute.tollInfo?.numberOfGates ?? 0}):</span><span>${activeRoute.tollInfo?.totalCost?.toFixed(2) ?? "-"}</span></div>
                              <div className="flex justify-between font-semibold border-t pt-2 text-base"><span>Total:</span><span className="text-primary">${(activeRoute.fuelCost && activeRoute.tollInfo?.totalCost) ? (activeRoute.fuelCost + activeRoute.tollInfo.totalCost).toFixed(2) : "-"}</span></div>
                            </div>
                          </Card>
                        </div>
                        <Card className="p-4 bg-secondary/40 border-border/50">
                          <h4 className="font-medium text-sm mb-3">Zimbabwe Toll Fee Structure</h4>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                            {Object.entries(tollFees).map(([category, fee]) => (<div key={category} className="flex justify-between"><span className="capitalize">{category}:</span><span className="font-semibold">${fee.toFixed(2)}</span></div>))}
                          </div>
                        </Card>
                      </TabsContent>

                      <TabsContent value="tolls" className="space-y-3 mt-4">
                        {activeRoute.tollInfo?.numberOfGates ? (
                          <>
                            <div className="flex justify-between items-center"><h4 className="font-medium text-sm">Toll Gates:</h4><Badge variant="outline" className="text-xs">{activeRoute.tollInfo.numberOfGates} Gate{activeRoute.tollInfo.numberOfGates > 1 ? "s" : ""}</Badge></div>
                            {activeRoute.tollInfo.tollGates?.map((toll, index) => (
                              <div key={index} className="bg-card/60 border border-border/50 rounded-lg p-3">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                  <div className="flex-1 min-w-0"><h5 className="font-medium text-sm truncate">{toll.name}</h5><p className="text-xs text-muted-foreground truncate">{toll.location}</p><p className="text-xs text-muted-foreground">Highway: {toll.highway}</p></div>
                                  <div className="text-right shrink-0"><Badge variant="outline" className="text-xs mb-1">${toll.cost.toFixed(2)}</Badge><p className="text-xs text-muted-foreground">{toll.kmFromHarare ? `${toll.kmFromHarare}km from Harare` : toll.kmFromBulawayo ? `${toll.kmFromBulawayo}km from Bulawayo` : ""}</p></div>
                                </div>
                              </div>
                            ))}
                            <div className="text-right font-semibold text-sm bg-primary/10 text-primary border border-primary/20 p-3 rounded-lg">
                              Total: ${activeRoute.tollInfo.totalCost?.toFixed(2)}
                              <p className="text-xs text-muted-foreground font-normal">{activeRoute.tollInfo.numberOfGates} × ${tollFees[vehicleTypes[selectedVehicle].tollCategory as keyof typeof tollFees].toFixed(2)} each</p>
                            </div>
                          </>
                        ) : (<div className="text-center py-8"><p className="text-muted-foreground text-sm mb-1">No toll gates on this route</p><p className="text-xs text-muted-foreground">Uses secondary roads or urban streets</p></div>)}
                      </TabsContent>

                      <TabsContent value="borders" className="space-y-3 mt-4">
                        {activeRoute.borderCrossings?.length ? (
                          <>
                            <h4 className="font-medium text-sm">Provincial Border Crossings:</h4>
                            {activeRoute.borderCrossings.map((crossing, index) => (
                              <div key={index} className="bg-card/60 border border-border/50 rounded-lg p-3">
                                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /><div className="min-w-0 flex-1"><p className="font-medium text-sm">{crossing.from} → {crossing.to}</p><p className="text-xs text-muted-foreground truncate">At: {crossing.location}</p></div></div>
                              </div>
                            ))}
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                              <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-primary mt-0.5 shrink-0" /><div className="text-sm text-foreground/90"><p className="font-medium">Border Crossing Info:</p><p>Ensure proper identification when crossing provincial boundaries.</p></div></div>
                            </div>
                          </>
                        ) : (<p className="text-muted-foreground text-center py-4 text-sm">No provincial border crossings</p>)}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Distance Table */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader className="pb-3 sm:pb-4 border-b border-border/50 px-4 sm:px-6">
            <CardTitle className="font-serif text-lg sm:text-xl lg:text-2xl">Distance Table</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Complete distance table between Zimbabwe cities ({cities.length} cities, {distanceData.length} routes)</CardDescription>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4">
              <div className="relative flex-1"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-10 sm:h-11 text-sm" /></div>
              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger className="w-full sm:w-52 h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Filter by departure city" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchTerm || fromCity || toCity) && <Button variant="outline" onClick={() => { setSearchTerm(""); setFromCity(""); setToCity(""); }} className="h-10 sm:h-11 text-sm w-full sm:w-auto">Clear Filters</Button>}
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="rounded-xl border border-border/60 overflow-hidden">
              <div className="overflow-auto max-h-[400px] sm:max-h-[480px]">
                <Table className="border-collapse">
                  <TableHeader className="sticky top-0 z-10"><TableRow className="border-0 hover:bg-transparent bg-secondary [&>th]:bg-secondary"><TableHead className="min-w-[180px] sm:min-w-[220px] h-10 sm:h-12 text-primary font-semibold uppercase tracking-wider text-xs px-4">Route</TableHead><TableHead className="text-right min-w-[80px] sm:min-w-[100px] h-10 sm:h-12 text-primary font-semibold uppercase tracking-wider text-xs px-4">Distance</TableHead><TableHead className="text-right min-w-[70px] sm:min-w-[80px] h-10 sm:h-12 text-primary font-semibold uppercase tracking-wider text-xs px-4">Time</TableHead><TableHead className="text-right min-w-[90px] sm:min-w-[100px] h-10 sm:h-12 text-primary font-semibold uppercase tracking-wider text-xs px-4">Route Type</TableHead><TableHead className="text-right min-w-[80px] sm:min-w-[100px] h-10 sm:h-12 text-primary font-semibold uppercase tracking-wider text-xs px-4">Features</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? filteredData.map((item, index) => (
                      <TableRow key={index} className="border-0 odd:bg-card even:bg-secondary/30 hover:bg-primary/5">
                        <TableCell className="py-3 sm:py-4 px-4"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary/70 shrink-0" /><span className="font-medium text-sm truncate">{item.from}</span><ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" /><span className="text-sm text-muted-foreground truncate">{item.to}</span></div></TableCell>
                        <TableCell className="text-right py-3 sm:py-4 px-4"><span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 font-semibold text-sm text-primary tabular-nums">{item.distance} km</span></TableCell>
                        <TableCell className="text-right text-sm text-foreground/80 tabular-nums py-3 sm:py-4 px-4">{item.time}</TableCell>
                        <TableCell className="text-right py-3 sm:py-4 px-4"><Badge variant="secondary" className="capitalize text-xs font-normal">{item.routeType?.replace("_", " ") || "main road"}</Badge></TableCell>
                        <TableCell className="text-right py-3 sm:py-4 px-4"><div className="flex gap-1 justify-end flex-wrap">{item.scenic && <Badge variant="outline" className="text-xs border-primary/30 text-primary">Scenic</Badge>}{item.tollGates && item.tollGates.length > 0 && <Badge variant="outline" className="text-xs border-primary/30 text-primary">{item.tollGates.length} Toll{item.tollGates.length > 1 ? "s" : ""}</Badge>}{item.alternative && <Badge variant="outline" className="text-xs">Alt</Badge>}</div></TableCell>
                      </TableRow>
                    )) : (<TableRow className="border-0"><TableCell colSpan={5} className="text-center py-8 sm:py-12 text-muted-foreground text-sm">No routes found</TableCell></TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">Showing {filteredData.length} of {distanceData.length} routes</div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <Card className="border-border/60 bg-card/80"><CardContent className="pt-3 sm:pt-4 lg:pt-6"><div className="text-center"><p className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-primary">{cities.length}</p><p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Cities Covered</p></div></CardContent></Card>
          <Card className="border-border/60 bg-card/80"><CardContent className="pt-3 sm:pt-4 lg:pt-6"><div className="text-center"><p className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-primary">{distanceData.length}</p><p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Total Routes</p></div></CardContent></Card>
          <Card className="border-border/60 bg-card/80"><CardContent className="pt-3 sm:pt-4 lg:pt-6"><div className="text-center"><p className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-primary">{zimbabweTollGates.length}</p><p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Toll Gates</p></div></CardContent></Card>
          <Card className="border-border/60 bg-card/80"><CardContent className="pt-3 sm:pt-4 lg:pt-6"><div className="text-center"><p className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-primary">${FUEL_PRICE_USD}</p><p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Fuel Price/Litre</p></div></CardContent></Card>
        </div>

        {/* Footer */}
        <footer className="mt-6 sm:mt-8 lg:mt-12 py-6 sm:py-8 border-t border-border">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-1 sm:mb-2">
              <Link href="/about" className="text-[10px] sm:text-xs text-primary hover:underline">About Us</Link>
              <Link href="/disclaimer" className="text-[10px] sm:text-xs text-primary hover:underline">Disclaimer</Link>
              <Link href="/terms-and-conditions" className="text-[10px] sm:text-xs text-primary hover:underline">Terms & Conditions</Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Copyright © 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span></p>
          </div>
        </footer>
      </div>
    </div>
  )
}
