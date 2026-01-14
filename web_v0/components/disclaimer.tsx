import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
  return (
    <Alert className="max-w-4xl">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Disclaimer</AlertTitle>
      <AlertDescription>
        ⚠️ This is an AI-based model. It currently predicts only 5 specific skin diseases and one "Unknown/Normal"
        category. Always consult a licensed dermatologist for a professional diagnosis.
      </AlertDescription>
    </Alert>
  )
}
