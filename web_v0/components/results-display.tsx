import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

  
  const getConfidenceColor = (disease: string, confidence: number) => {
    if (disease === "Unknown_Normal" && confidence > 80) {
      return "bg-green-500"
    } else if (disease !== "Unknown_Normal" && confidence > 80) {
      return "bg-red-500"
    } else if (confidence > 40) {
      return "bg-yellow-500"
    } else {
      return "bg-gray-400"
    }
  }

  const sortedConfidences = Object.entries(normalizedConfidences).sort((a, b) => b[1] - a[1])
  const highestConfidence = sortedConfidences[0]
  const confidenceColor = getConfidenceColor(highestConfidence[0], highestConfidence[1])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {prediction === "Unknown_Normal"
              ? "No specific condition detected"
              : `You may have ${prediction}`}
          </h3>
          <div className={`h-2 w-full rounded-full ${confidenceColor}`}></div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Confidence Levels</h4>
          {sortedConfidences.map(([disease, confidence]) => (
            <div key={disease} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{disease.replace("_", "/")}</span>
                <span>{confidence}%</span>
              </div>
              <Progress
                value={confidence}
                className={`h-2 ${getConfidenceColor(disease, confidence)}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
