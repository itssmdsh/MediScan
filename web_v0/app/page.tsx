"use client"
import { useState } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { ScanSection } from "@/components/sections/scan-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"

export default function Home() {
  const [scanResult, setScanResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsLoading(true)
    setScanResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Use our own API route instead of calling the external API directly
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const data = await response.json()

      // Fix the confidence percentages to be in the range 0-100
      const fixedData = {
        ...data,
        confidence_percentages: Object.fromEntries(
          Object.entries(data.confidence_percentages).map(([key, value]) => {
            // If value is already in 0-1 range, multiply by 100
            // If value is already in 0-100 range, keep as is
            const fixedValue = typeof value === "number" && value <= 1 ? value * 100 : value
            return [key, fixedValue]
          }),
        ),
      }

      setScanResult(fixedData)
      return fixedData
    } catch (error) {
      console.error("Upload error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <HeroSection />
      <ScanSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}
