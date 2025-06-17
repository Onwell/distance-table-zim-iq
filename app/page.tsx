"use client"

import { useState, useMemo } from "react"
import { Search, Route, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"

// Expanded distance data for Zimbabwe cities
const distanceData = [
  // Major cities connections
  { from: "Harare", to: "Bulawayo", distance: 439, time: "4h 30m" },
  { from: "Harare", to: "Mutare", distance: 263, time: "3h 15m" },
  { from: "Harare", to: "Gweru", distance: 274, time: "3h 00m" },
  { from: "Harare", to: "Masvingo", distance: 292, time: "3h 30m" },
  { from: "Harare", to: "Chinhoyi", distance: 116, time: "1h 30m" },
  { from: "Harare", to: "Kadoma", distance: 140, time: "1h 45m" },
  { from: "Harare", to: "Chegutu", distance: 110, time: "1h 20m" },
  { from: "Harare", to: "Bindura", distance: 88, time: "1h 10m" },
  { from: "Harare", to: "Marondera", distance: 75, time: "1h 00m" },
  { from: "Harare", to: "Chitungwiza", distance: 25, time: "0h 30m" },
  { from: "Harare", to: "Norton", distance: 40, time: "0h 40m" },
  { from: "Harare", to: "Rusape", distance: 170, time: "2h 10m" },

  // Bulawayo connections
  { from: "Bulawayo", to: "Mutare", distance: 518, time: "5h 45m" },
  { from: "Bulawayo", to: "Gweru", distance: 165, time: "2h 00m" },
  { from: "Bulawayo", to: "Masvingo", distance: 284, time: "3h 15m" },
  { from: "Bulawayo", to: "Victoria Falls", distance: 440, time: "4h 30m" },
  { from: "Bulawayo", to: "Hwange", distance: 296, time: "3h 30m" },
  { from: "Bulawayo", to: "Plumtree", distance: 100, time: "1h 20m" },
  { from: "Bulawayo", to: "Gwanda", distance: 126, time: "1h 30m" },
  { from: "Bulawayo", to: "Beitbridge", distance: 322, time: "3h 45m" },
  { from: "Bulawayo", to: "Zvishavane", distance: 185, time: "2h 15m" },

  // Mutare connections
  { from: "Mutare", to: "Gweru", distance: 353, time: "4h 00m" },
  { from: "Mutare", to: "Masvingo", distance: 271, time: "3h 15m" },
  { from: "Mutare", to: "Chipinge", distance: 131, time: "1h 45m" },
  { from: "Mutare", to: "Rusape", distance: 93, time: "1h 15m" },
  { from: "Mutare", to: "Nyanga", distance: 115, time: "1h 30m" },

  // Gweru connections
  { from: "Gweru", to: "Masvingo", distance: 157, time: "2h 00m" },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m" },
  { from: "Gweru", to: "Kwekwe", distance: 67, time: "0h 50m" },
  { from: "Gweru", to: "Shurugwi", distance: 35, time: "0h 30m" },
  { from: "Gweru", to: "Zvishavane", distance: 120, time: "1h 30m" },

  // Masvingo connections
  { from: "Masvingo", to: "Chiredzi", distance: 166, time: "2h 15m" },
  { from: "Masvingo", to: "Beitbridge", distance: 288, time: "3h 30m" },
  { from: "Masvingo", to: "Zvishavane", distance: 96, time: "1h 15m" },
  { from: "Masvingo", to: "Triangle", distance: 140, time: "1h 50m" },

  // Other connections
  { from: "Victoria Falls", to: "Hwange", distance: 144, time: "1h 50m" },
  { from: "Chinhoyi", to: "Kadoma", distance: 89, time: "1h 10m" },
  { from: "Chegutu", to: "Kadoma", distance: 30, time: "0h 25m" },
  { from: "Chegutu", to: "Norton", distance: 70, time: "0h 55m" },
  { from: "Norton", to: "Chegutu", distance: 70, time: "0h 55m" },
  { from: "Kwekwe", to: "Kadoma", distance: 67, time: "0h 50m" },
  { from: "Kwekwe", to: "Redcliff", distance: 15, time: "0h 15m" },
  { from: "Bindura", to: "Shamva", distance: 29, time: "0h 30m" },
  { from: "Bindura", to: "Mt Darwin", distance: 118, time: "1h 30m" },
  { from: "Marondera", to: "Rusape", distance: 95, time: "1h 10m" },
  { from: "Marondera", to: "Macheke", distance: 40, time: "0h 35m" },
  { from: "Rusape", to: "Nyanga", distance: 98, time: "1h 15m" },
  { from: "Beitbridge", to: "Gwanda", distance: 196, time: "2h 15m" },
  { from: "Gwanda", to: "West Nicholson", distance: 72, time: "0h 55m" },
  { from: "Chiredzi", to: "Triangle", distance: 26, time: "0h 25m" },
  { from: "Chiredzi", to: "Chipinge", distance: 185, time: "2h 20m" },
  { from: "Nyanga", to: "Juliasdale", distance: 20, time: "0h 20m" },
  { from: "Zvishavane", to: "Shurugwi", distance: 85, time: "1h 00m" },

  // Additional connections for intermediate routes
  { from: "Harare", to: "Norton", distance: 40, time: "0h 40m" },
  { from: "Norton", to: "Chegutu", distance: 70, time: "0h 55m" },
  { from: "Chegutu", to: "Kadoma", distance: 30, time: "0h 25m" },
  { from: "Kadoma", to: "Kwekwe", distance: 67, time: "0h 50m" },
  { from: "Kwekwe", to: "Gweru", distance: 67, time: "0h 50m" },
  { from: "Gweru", to: "Shurugwi", distance: 35, time: "0h 30m" },
  { from: "Gweru", to: "Zvishavane", distance: 120, time: "1h 30m" },
  { from: "Zvishavane", to: "Masvingo", distance: 96, time: "1h 15m" },
  { from: "Masvingo", to: "Beitbridge", distance: 288, time: "3h 30m" },
  { from: "Harare", to: "Marondera", distance: 75, time: "1h 00m" },
  { from: "Marondera", to: "Rusape", distance: 95, time: "1h 10m" },
  { from: "Rusape", to: "Mutare", distance: 93, time: "1h 15m" },
]

const cities = Array.from(new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])).sort()

// Graph representation for finding routes
const buildGraph = () => {
  const graph = new Map()

  distanceData.forEach((route) => {
    // Add bidirectional edges
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
    })

    graph.get(route.to).push({
      city: route.from,
      distance: route.distance,
      time: route.time,
    })
  })

  return graph
}

// Find shortest path using Dijkstra's algorithm
const findShortestPath = (graph, start, end) => {
  const distances = new Map()
  const previous = new Map()
  const unvisited = new Set()

  // Initialize
  for (const city of graph.keys()) {
    distances.set(city, city === start ? 0 : Number.POSITIVE_INFINITY)
    unvisited.add(city)
  }

  while (unvisited.size > 0) {
    // Find city with minimum distance
    let current = null
    let minDistance = Number.POSITIVE_INFINITY

    for (const city of unvisited) {
      if (distances.get(city) < minDistance) {
        minDistance = distances.get(city)
        current = city
      }
    }

    // If we can't find a city or reached the end
    if (current === null || current === end) break

    unvisited.delete(current)

    // Update distances to neighbors
    for (const neighbor of graph.get(current)) {
      if (unvisited.has(neighbor.city)) {
        const alt = distances.get(current) + neighbor.distance
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
    if (!current) return [] // No path found
  }

  path.unshift(start)
  return path
}

// Get route details between two cities
const getRouteDetails = (from, to) => {
  const directRoute = distanceData.find(
    (route) => (route.from === from && route.to === to) || (route.from === to && route.to === from),
  )

  if (directRoute) {
    return {
      from: from,
      to: to,
      distance: directRoute.distance,
      time: directRoute.time,
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

export default function DistanceTableSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [selectedDistance, setSelectedDistance] = useState<(typeof distanceData)[0] | null>(null)
  const [routeSegments, setRouteSegments] = useState<any[]>([])
  const [totalDistance, setTotalDistance] = useState(0)
  const [totalTime, setTotalTime] = useState("")

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
      // Check for direct route first
      const directRoute = distanceData.find(
        (route) => (route.from === fromCity && route.to === toCity) || (route.from === toCity && route.to === fromCity),
      )

      if (directRoute) {
        setSelectedDistance(directRoute)
        setRouteSegments([])
        setTotalDistance(0)
        setTotalTime("")
        return
      }

      // Find path using graph
      const graph = buildGraph()
      const path = findShortestPath(graph, fromCity, toCity)

      if (path.length > 0) {
        const segments = buildRouteSegments(path)

        // Calculate total distance and time
        let distance = 0
        let timeInMinutes = 0

        segments.forEach((segment) => {
          distance += segment.distance

          // Parse time (e.g., "1h 30m" -> 90 minutes)
          const timeParts = segment.time.split(" ")
          const hours = Number.parseInt(timeParts[0]) || 0
          const minutes = Number.parseInt(timeParts[1]) || 0
          timeInMinutes += hours * 60 + minutes
        })

        // Format total time
        const totalHours = Math.floor(timeInMinutes / 60)
        const totalMinutes = timeInMinutes % 60
        const formattedTime = `${totalHours}h ${totalMinutes}m`

        setRouteSegments(segments)
        setTotalDistance(distance)
        setTotalTime(formattedTime)

        // Create a combined route object for the main display
        setSelectedDistance({
          from: fromCity,
          to: toCity,
          distance: distance,
          time: formattedTime,
        })
      } else {
        // No route found
        setSelectedDistance(null)
        setRouteSegments([])
        setTotalDistance(0)
        setTotalTime("")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Navigation />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate distances and travel times between major cities in Zimbabwe. Find the shortest routes for your
            journey planning.
          </p>
        </div>

        {/* Route Calculator */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Calculator
            </CardTitle>
            <CardDescription>
              Select your departure and destination cities to calculate distance and travel time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">From City</label>
                <Select value={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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

              <div className="flex items-end">
                <Button onClick={calculateRoute} className="w-full" disabled={!fromCity || !toCity}>
                  Calculate Route
                </Button>
              </div>
            </div>

            {selectedDistance && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Route</p>
                      <p className="text-lg font-semibold">
                        {selectedDistance.from} → {selectedDistance.to}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="text-2xl font-bold text-green-600">{selectedDistance.distance} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Time</p>
                      <p className="text-lg font-semibold text-blue-600">{selectedDistance.time}</p>
                    </div>
                  </div>

                  {/* Intermediate Routes */}
                  {routeSegments.length > 0 && (
                    <div className="mt-6 border-t border-green-200 pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Route Breakdown:</p>
                      <div className="space-y-2">
                        {routeSegments.map((segment, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/70 rounded-md p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{segment.from}</span>
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-800">{segment.to}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">{segment.distance} km</span>
                              <span className="text-sm text-blue-600">{segment.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-right text-sm text-gray-600">
                        Total: {totalDistance} km ({totalTime})
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Distance Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Distance Table</CardTitle>
            <CardDescription>Complete distance table between Zimbabwe cities</CardDescription>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger className="w-full sm:w-48">
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
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Distance (km)</TableHead>
                    <TableHead className="text-right">Travel Time</TableHead>
                    <TableHead className="text-right">Route Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item.from}</TableCell>
                        <TableCell>{item.to}</TableCell>
                        <TableCell className="text-right font-semibold">{item.distance} km</TableCell>
                        <TableCell className="text-right">{item.time}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={item.distance < 200 ? "default" : item.distance < 400 ? "secondary" : "outline"}
                          >
                            {item.distance < 200 ? "Short" : item.distance < 400 ? "Medium" : "Long"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No routes found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredData.length} of {distanceData.length} routes
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{cities.length}</p>
                <p className="text-sm text-gray-600">Cities Covered</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{distanceData.length}</p>
                <p className="text-sm text-gray-600">Total Routes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.min(...distanceData.map((d) => d.distance))} km
                </p>
                <p className="text-sm text-gray-600">Shortest Route</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {Math.max(...distanceData.map((d) => d.distance))} km
                </p>
                <p className="text-sm text-gray-600">Longest Route</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <p className="text-gray-600">
              Copyright © 2025, developed by <span className="font-semibold text-gray-800">Onwell Masaraure</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
