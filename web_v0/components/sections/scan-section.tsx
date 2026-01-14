"use client"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Upload, RefreshCw } from "lucide-react"
import { DiseaseDetails } from "@/components/ui/disease-details"
import { DoctorFinder } from "@/components/ui/doctor-finder"
import { Disclaimer } from "@/components/ui/disclaimer"
import Image from "next/image"

type PredictionResult = {
  prediction: string
  confidence_percentages: Record<string, number>
}

export function ScanSection() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (file: File) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      toast.error("Only JPEG, PNG, or WEBP images are supported")
      return
    }

    // Validate file size (4MB max)
    const maxSize = 4 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("Image must be smaller than 4MB")
      return
    }

    // Create preview
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResults(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      toast.error("Please upload an image first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", fileInputRef.current.files[0])

      toast.info("Analyzing your image...")

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to analyze image (${response.status})`)
      }

      // Fix confidence percentages
      const fixedData = {
        ...data,
        confidence_percentages: Object.fromEntries(
          Object.entries(data.confidence_percentages).map(([key, value]) => {
            const fixedValue = typeof value === "number" && value <= 1 ? value * 100 : value
            return [key, Math.min(100, Math.max(0, fixedValue))] // Clamp between 0-100
          }),
        ),
      }

      setResults(fixedData)
      toast.success(`Analysis complete: ${fixedData.prediction.replace("_", " ")}`)
    } catch (err) {
      console.error("Analysis error:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetScan = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setResults(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

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
                <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg p-4 transition-colors border-muted-foreground/25">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.webp"
                  />

                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Uploaded skin preview"
                        fill
                        className="object-contain rounded-lg"
                        priority
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={resetScan}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">JPG, JPEG, PNG or WEBP (Max 4MB)</p>
                      <Button
                        variant="ghost"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Upload
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button size="lg" onClick={handleAnalyze} disabled={!previewUrl || isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>

              {error && (
                <div className="text-destructive text-sm font-medium p-2 rounded bg-destructive/10">{error}</div>
              )}

              {results && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">
                    {results.prediction === "Unknown_Normal"
                      ? "No specific condition detected"
                      : `Detected: ${results.prediction.replace("_", " ")}`}
                  </h3>

                  <div className="space-y-2">
                    {Object.entries(results.confidence_percentages)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([disease, confidence]) => (
                        <div key={disease} className="flex justify-between items-center">
                          <span className="text-sm">{disease.replace("_", "/")}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-secondary rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${confidence}%` }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{confidence.toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <Button variant="outline" onClick={resetScan} disabled={!previewUrl || isAnalyzing}>
                Reset
              </Button>
            </div>
          </div>

          {results && (
            <div className="w-full max-w-4xl space-y-6">
              <DiseaseDetails disease={results.prediction} />
              {results.prediction !== "Unknown_Normal" && <DoctorFinder disease={results.prediction} />}
            </div>
          )}

          <Disclaimer />
        </div>
      </div>
    </section>
  )
}
