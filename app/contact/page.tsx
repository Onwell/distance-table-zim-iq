"use client"

import Link from "next/link"
import { Phone, MessageCircle, MapPin, Clock, Users, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/263777224660", "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4 pt-10 sm:pt-16">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold">Contact Us</h1>
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 text-pretty">
            Get in touch with us for any questions, suggestions, or support regarding the Zimbabwe Distance Calculator.
          </p>
        </div>

        {/* About the App */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-xl sm:text-2xl">
              <MapPin className="h-5 w-5 text-primary" />
              About Zimbabwe Distance Calculator
            </CardTitle>
            <CardDescription className="text-sm">
              Your comprehensive tool for travel planning in Zimbabwe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The Zimbabwe Distance Calculator is a comprehensive web application designed to help travelers, logistics
              companies, and anyone planning journeys within Zimbabwe. Our tool provides accurate distance calculations
              and estimated travel times between major cities and towns across the country.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Accurate Calculations</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Precise distance and time estimates</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">User Friendly</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Easy-to-use interface for everyone</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Time Efficient</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Quick route planning and calculations</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-sm sm:text-base mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li>Interactive route calculator between any two cities</li>
                <li>Comprehensive distance table with search and filter options</li>
                <li>Travel time estimates for better journey planning</li>
                <li>Route classification (Short, Medium, Long distances)</li>
                <li>Mobile-responsive design for use on any device</li>
                <li>Real-time search and filtering capabilities</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-border/60 bg-card/80 backdrop-blur shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-xl sm:text-2xl">
              <MessageCircle className="h-5 w-5 text-primary" />
              Get in Touch
            </CardTitle>
            <CardDescription className="text-sm">
              We'd love to hear from you! Reach out for support, feedback, or suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                For any inquiries, technical support, or feedback about the Zimbabwe Distance Calculator, feel free to
                contact us directly via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-6 bg-primary/5 rounded-lg border border-primary/20">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-sm sm:text-base">WhatsApp Support</p>
                  <p className="text-sm sm:text-base text-muted-foreground">+263 777 224 660</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Available during business hours</p>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg"
                size="lg"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Contact us on WhatsApp
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-secondary/50 rounded-lg border border-border/50">
              <h3 className="font-semibold text-sm sm:text-base mb-2">What can we help you with?</h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li>Technical support and troubleshooting</li>
                <li>Suggestions for new features or improvements</li>
                <li>Questions about distance calculations or data accuracy</li>
                <li>Feedback on user experience</li>
                <li>Partnership or collaboration opportunities</li>
                <li>General inquiries about the application</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-border">
          <div className="text-center space-y-2">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <Link href="/about" className="text-xs sm:text-sm text-primary hover:underline">
                About Us
              </Link>
              <Link href="/disclaimer" className="text-xs sm:text-sm text-primary hover:underline">
                Disclaimer
              </Link>
              <Link href="/terms-and-conditions" className="text-xs sm:text-sm text-primary hover:underline">
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
