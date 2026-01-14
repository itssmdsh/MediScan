"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Calendar, Phone, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface DoctorFinderProps {
  disease: string
}

export function DoctorFinder({ disease }: DoctorFinderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/dermatologist+specializing+in+${disease.toLowerCase()}+near+me`,
      "_blank",
    )
  }

  const openZoomDoctor = () => {
    window.open("https://www.zocdoc.com/find-doctor/specialty/dermatologist", "_blank")
  }

  const openTelemedicine = () => {
    window.open("https://www.teladoc.com/", "_blank")
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Find a Specialist
        </CardTitle>
        <CardDescription>We recommend consulting with a dermatologist</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">
          Based on the analysis, we recommend consulting with a dermatologist who specializes in{" "}
          {disease === "SkinCancer" ? "skin cancer" : disease.toLowerCase()} treatment.
        </p>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-4"
          >
            <div
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={openGoogleMaps}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Find Nearby Dermatologists</h4>
                <p className="text-xs text-muted-foreground">Locate specialists in your area</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={openZoomDoctor}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Book an Appointment</h4>
                <p className="text-xs text-muted-foreground">Schedule a consultation</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={openTelemedicine}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Telemedicine Consultation</h4>
                <p className="text-xs text-muted-foreground">Talk to a doctor online</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show Options"}
        </Button>
      </CardFooter>
    </Card>
  )
}
