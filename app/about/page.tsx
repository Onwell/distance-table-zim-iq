"use client"

import { Calculator, MapPin, Fuel, Route, Clock, Filter, Navigation } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation as Nav } from "@/components/navigation"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4 pt-10 sm:pt-16">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold">About Us</h1>
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 text-pretty">
            Your trusted companion for travel planning and logistics across Zimbabwe
          </p>
        </div>

        {/* Main About Card */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-xl sm:text-2xl">
              <Navigation className="h-5 w-5 text-primary" />
              Zimbabwe Distance Calculator (ZDC)
            </CardTitle>
            <CardDescription className="text-sm">
              A logistics and travel planning web application designed to simplify journey mapping across Zimbabwe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The Zimbabwe Distance Calculator (ZDC) acts as a comprehensive travel intelligence tool designed to
              assist travelers, logistics professionals, and everyday commuters in planning their journeys with
              precision and confidence. Whether you're a tourist exploring Zimbabwe's scenic routes, a logistics
              manager optimizing delivery schedules, or a commuter planning your daily travel, ZDC provides the
              data and insights you need.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="font-serif text-xl sm:text-2xl">Key Features</CardTitle>
            <CardDescription className="text-sm">
              Discover what makes ZDC your essential travel companion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Calculate Route Metrics */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Calculate Key Route Metrics</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Get accurate travel distances in kilometers and estimated travel times between major cities
                    and regions across Zimbabwe, including Harare, Bulawayo, Mutare, Beitbridge, Victoria Falls,
                    Marondera, and many more destinations.
                  </p>
                </div>
              </div>

              {/* Track Toll Information */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Route className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Track Toll Information</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Dynamically highlights the presence and specific number of toll gates you'll encounter along
                    your selected highway or route, helping you budget for toll fees in advance.
                  </p>
                </div>
              </div>

              {/* Identify Route Characteristics */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Identify Route Characteristics</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Specifies the type of terrain or infrastructure layout of your trip, categorizing routes as
                    highways, main roads, or secondary roads. Scenic routes are specially flagged for those
                    seeking visually noteworthy drives.
                  </p>
                </div>
              </div>

              {/* Flexible Filtering */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Flexible Filtering</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Access a full matrix distance table covering over 420 routes and dozens of cities. Filter by
                    specific departure or arrival cities to find exact transit data instantly.
                  </p>
                </div>
              </div>

              {/* Fuel and Vehicle Logistics */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg sm:col-span-2">
                <Fuel className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Estimate Fuel and Vehicle Logistics</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Use our interactive route calculator to select departure points, destinations, and vehicle
                    types. Factor in precise planning parameters based on localized inputs like real-time fuel
                    pricing per liter. Supports multiple vehicle categories including motorcycles, light motor
                    vehicles, minibuses, buses, heavy vehicles, and haulage trucks.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Who We Serve */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="font-serif text-xl sm:text-2xl">Who We Serve</CardTitle>
            <CardDescription className="text-sm">
              ZDC is designed for a diverse range of users across Zimbabwe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border/50 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm sm:text-base">Travelers & Tourists</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Plan your adventures with accurate distance and time estimates
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border/50 text-center">
                <Route className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm sm:text-base">Logistics Companies</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Optimize delivery routes and calculate operational costs
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border/50 text-center">
                <Fuel className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm sm:text-base">Daily Commuters</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Make informed decisions about your regular travel routes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="font-serif text-xl sm:text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our mission is to provide accurate, reliable, and accessible travel intelligence for everyone
              navigating Zimbabwe's road network. We believe that informed travelers make better decisions,
              and by providing comprehensive distance, toll, and fuel cost data, we empower our users to
              plan journeys that are efficient, cost-effective, and enjoyable. ZDC is committed to continuously
              improving our data accuracy and expanding our coverage to serve the Zimbabwean travel community better.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-border">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-1 sm:mb-2">
              <Link href="/disclaimer" className="text-[10px] sm:text-xs text-primary hover:underline">
                Disclaimer
              </Link>
              <Link href="/terms-and-conditions" className="text-[10px] sm:text-xs text-primary hover:underline">
                Terms & Conditions
              </Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Copyright &copy; 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
