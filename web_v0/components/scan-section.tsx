"use client"

import { useState } from "react"
import { ImageUploader } from "./image-uploader"
import { ResultsDisplay } from "./results-display"
import { DiseaseDetails } from "./disease-details"
import { Disclaimer } from "./disclaimer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PredictionResult = {
  prediction: string
  confidence_percentages: {
    Acne: number
    Eczema: number
    Psoriasis: number
    Warts: number
    SkinCancer: number
    Unknown_Normal: number
  }
}

export function ScanSection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (file: File) => {
    setSelectedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
    setResults(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError("Please upload an image first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedImage)

      // ✅ Update: use your own Next.js API route
      const response = await fetch("/api/predict/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || `API error: ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(`Error analyzing image: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const showDoctorSearch = results && results.prediction !== "Unknown_Normal"

  return (
    <section id="scan-section" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Scan Your Skin</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Upload a clear image of your skin condition for analysis
            </p>
          </div>

          <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <ImageUploader onImageUpload={handleImageUpload} previewUrl={previewUrl} />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button size="lg" onClick={handleAnalyze} disabled={!selectedImage || isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyse"
                )}
              </Button>

              {error && <div className="text-destructive text-sm font-medium">{error}</div>}

              {results && <ResultsDisplay results={results} />}

              {showDoctorSearch && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Search className="h-4 w-4" />
                      Find Dermatologists Near You
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Find a Dermatologist</DialogTitle>
                      <DialogDescription>
                        We recommend consulting with a professional for a proper diagnosis.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                      <Button
                        onClick={() =>
                          window.open("https://www.google.com/maps/search/dermatologist+near+me", "_blank")
                        }
                      >
                        Search on Google Maps
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {results && <DiseaseDetails disease={results.prediction} />}

          <Disclaimer />
        </div>
      </div>
    </section>
  )
}
