import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"

export function Disclaimer() {
  return (
    <Alert className="bg-background/80 backdrop-blur-sm border border-amber-200/30 dark:border-amber-800/30">
      <AlertTriangle className="h-5 w-5 text-amber-500" />
      <AlertTitle className="text-amber-700 dark:text-amber-400 font-medium">Medical Disclaimer</AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground">
        <p className="mb-2">
          ⚠️ This is an AI-based model. It currently predicts only 5 specific skin diseases and one "Unknown/Normal"
          category. Always consult a licensed dermatologist for a professional diagnosis.
        </p>
        <p>
          <Link href="#" className="text-primary inline-flex items-center hover:underline">
            Learn more about our technology
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </p>
      </AlertDescription>
    </Alert>
  )
}
