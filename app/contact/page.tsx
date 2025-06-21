"use client"

import { Phone, MessageCircle, MapPin, Clock, Users, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/263777224660", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />

      <div className="max-w-4xl mx-auto p-2 sm:p-4 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4 pt-4 sm:pt-8">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-2xl sm:text-4xl font-bold">Contact Us</h1>
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Get in touch with us for any questions, suggestions, or support regarding the Zimbabwe Distance Calculator.
          </p>
        </div>

        {/* About the App */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
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
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Accurate Calculations</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Precise distance and time estimates</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">User Friendly</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Easy-to-use interface for everyone</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-sm sm:text-base">WhatsApp Support</p>
                  <p className="text-sm sm:text-base text-muted-foreground">+263 777 224 660</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Available during business hours</p>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg"
                size="lg"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Contact us on WhatsApp
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
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
        <footer className="py-6 sm:py-8 border-t border-border bg-background/50 backdrop-blur-sm rounded-lg">
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
