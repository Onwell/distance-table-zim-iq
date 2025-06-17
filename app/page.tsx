"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Route } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample distance data for Zimbabwe cities
const distanceData = [
  { from: "Harare", to: "Bulawayo", distance: 439, time: "4h 30m" },
  { from: "Harare", to: "Mutare", distance: 263, time: "3h 15m" },
  { from: "Harare", to: "Gweru", distance: 274, time: "3h 00m" },
  { from: "Harare", to: "Masvingo", distance: 292, time: "3h 30m" },
  { from: "Harare", to: "Chinhoyi", distance: 116, time: "1h 30m" },
  { from: "Harare", to: "Kadoma", distance: 140, time: "1h 45m" },
  { from: "Harare", to: "Chegutu", distance: 110, time: "1h 20m" },
  { from: "Bulawayo", to: "Mutare", distance: 518, time: "5h 45m" },
  { from: "Bulawayo", to: "Gweru", distance: 165, time: "2h 00m" },
  { from: "Bulawayo", to: "Masvingo", distance: 284, time: "3h 15m" },
  { from: "Bulawayo", to: "Victoria Falls", distance: 440, time: "4h 30m" },
  { from: "Bulawayo", to: "Hwange", distance: 296, time: "3h 30m" },
  { from: "Mutare", to: "Gweru", distance: 353, time: "4h 00m" },
  { from: "Mutare", to: "Masvingo", distance: 271, time: "3h 15m" },
  { from: "Mutare", to: "Chipinge", distance: 131, time: "1h 45m" },
  { from: "Gweru", to: "Masvingo", distance: 157, time: "2h 00m" },
  { from: "Gweru", to: "Kadoma", distance: 134, time: "1h 40m" },
  { from: "Masvingo", to: "Chiredzi", distance: 166, time: "2h 15m" },
  { from: "Victoria Falls", to: "Hwange", distance: 144, time: "1h 50m" },
  { from: "Chinhoyi", to: "Kadoma", distance: 89, time: "1h 10m" },
]

const cities = Array.from(new Set([...distanceData.map((d) => d.from), ...distanceData.map((d) => d.to)])).sort()

export default function DistanceTableSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [selectedDistance, setSelectedDistance] = useState<(typeof distanceData)[0] | null>(null)

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

  const findDistance = (from: string, to: string) => {
    if (!from || !to || from === to) return null

    // Check direct route
    const route = distanceData.find((d) => (d.from === from && d.to === to) || (d.from === to && d.to === from))

    return route
  }

  const calculateRoute = () => {
    if (fromCity && toCity) {
      const route = findDistance(fromCity, toCity)
      setSelectedDistance(route)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Zimbabwe Distance Calculator</h1>
          </div>
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
