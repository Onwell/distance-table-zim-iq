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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any questions, suggestions, or support regarding the Zimbabwe Distance Calculator.
          </p>
        </div>

        {/* About the App */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              About Zimbabwe Distance Calculator
            </CardTitle>
            <CardDescription>Your comprehensive tool for travel planning in Zimbabwe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The Zimbabwe Distance Calculator is a comprehensive web application designed to help travelers, logistics
              companies, and anyone planning journeys within Zimbabwe. Our tool provides accurate distance calculations
              and estimated travel times between major cities and towns across the country.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Calculator className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Accurate Calculations</h3>
                  <p className="text-sm text-gray-600">Precise distance and time estimates</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">User Friendly</h3>
                  <p className="text-sm text-gray-600">Easy-to-use interface for everyone</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Time Efficient</h3>
                  <p className="text-sm text-gray-600">Quick route planning and calculations</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
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
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              We'd love to hear from you! Reach out for support, feedback, or suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                For any inquiries, technical support, or feedback about the Zimbabwe Distance Calculator, feel free to
                contact us directly via WhatsApp.
              </p>

              <div className="flex items-center justify-center gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
                <MessageCircle className="h-8 w-8 text-green-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">WhatsApp Support</p>
                  <p className="text-gray-600">+263 777 224 660</p>
                  <p className="text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact us on WhatsApp
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">What can we help you with?</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
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
        <footer className="py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg">
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
