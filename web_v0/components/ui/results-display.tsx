"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

interface ResultsDisplayProps {
  results: {
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
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { prediction, confidence_percentages } = results

  // Sort confidence percentages in descending order
  const sortedConfidences = Object.entries(confidence_percentages).sort((a, b) => b[1] - a[1])

  // Get the highest confidence
  const highestConfidence = sortedConfidences[0]
  const confidenceValue = highestConfidence[1]

  // Determine severity level
  const getSeverityInfo = () => {
    const formattedPrediction = prediction.replace("_", " ")

    if (prediction === "Unknown_Normal" && confidenceValue > 80) {
      return {
        icon: <CheckCircle2 className="h-6 w-6 text-success" />,
        color: "bg-success",
        textColor: "text-success",
        label: "Healthy",
        description: "No specific condition detected",
      }
    } else if (prediction === "SkinCancer" && confidenceValue > 40) {
      return {
        icon: <AlertCircle className="h-6 w-6 text-destructive" />,
        color: "bg-destructive",
        textColor: "text-destructive",
        label: "High Concern",
        description: "Consult a dermatologist immediately",
      }
    } else if (confidenceValue > 80) {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-warning" />,
        color: "bg-warning",
        textColor: "text-warning",
        label: "Detected",
        description: `${formattedPrediction} detected with high confidence`,
      }
    } else if (confidenceValue > 40) {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-warning" />,
        color: "bg-warning",
        textColor: "text-warning",
        label: "Possible",
        description: `Possible ${formattedPrediction} detected`,
      }
    } else {
      return {
        icon: <AlertCircle className="h-6 w-6 text-muted-foreground" />,
        color: "bg-muted",
        textColor: "text-muted-foreground",
        label: "Uncertain",
        description: "Low confidence in detection",
      }
    }
  }

  const severityInfo = getSeverityInfo()

  // Get color for confidence bar
  const getConfidenceColor = (disease: string, confidence: number) => {
    if (disease === "Unknown_Normal" && confidence > 80) {
      return "bg-success"
    } else if (disease !== "Unknown_Normal" && confidence > 80) {
      return "bg-destructive"
    } else if (confidence > 40) {
      return "bg-warning"
    } else {
      return "bg-muted-foreground/40"
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          {severityInfo.icon}
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium capitalize">
              {prediction === "Unknown_Normal"
                ? "No specific condition detected"
                : prediction.toLowerCase().replace("_", " ")}
            </h3>
            <span className={`text-sm font-bold ${severityInfo.textColor} px-2 py-1 rounded-full bg-background`}>
              {severityInfo.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{severityInfo.description}</p>
          <div className={`h-2 w-full rounded-full mt-2 ${severityInfo.color}`}></div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center">
            Confidence Levels
            <span className="ml-2 text-xs text-muted-foreground">(Sorted by confidence)</span>
          </h4>

          <div className="space-y-3">
            {sortedConfidences.map(([disease, confidence], index) => (
              <motion.div
                key={disease}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="font-medium capitalize">{disease.toLowerCase().replace("_", " ")}</span>
                  <span className="font-bold">{confidence.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`h-full rounded-full ${getConfidenceColor(disease, confidence)}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
