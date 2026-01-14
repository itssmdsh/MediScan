import { type NextRequest, NextResponse } from "next/server"

export const maxDuration = 30
export const dynamic = "force-dynamic" // Bypass caching

// Fallback mock data for when the API is unavailable
const MOCK_RESPONSE = {
  prediction: "Eczema",
  confidence_percentages: {
    Acne: 0.05,
    Eczema: 0.85,
    Psoriasis: 0.04,
    Warts: 0.02,
    SkinCancer: 0.01,
    Unknown_Normal: 0.03,
  },
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    // 2. Validate file exists
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // 3. Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Only JPEG, PNG, or WEBP images are supported" }, { status: 400 })
    }

    // 4. Validate file size (4MB max - Vercel limit)
    const maxSize = 4 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Image must be smaller than 4MB" }, { status: 400 })
    }

    // 5. Create new FormData for external API
    const apiFormData = new FormData()
    apiFormData.append("file", file)

    // 6. Forward to Render API with timeout protection
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000) // 25s timeout

    try {
      console.log("Attempting to fetch from external API...")
      const response = await fetch("https://skin-disease-api-j0l8.onrender.com/predict/", {
        method: "POST",
        body: apiFormData,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      // 7. Handle API response
      if (!response.ok) {
        console.error(`API responded with status: ${response.status}`)
        let errorDetails = "API request failed"
        try {
          const errorData = await response.json()
          errorDetails = errorData.detail || JSON.stringify(errorData)
        } catch (e) {
          console.error("Error parsing error response:", e)
        }

        throw new Error(`API Error: ${errorDetails}`)
      }

      // 8. Return successful response
      const result = await response.json()

      // Validate response structure
      if (!result.prediction || !result.confidence_percentages) {
        throw new Error("Invalid response format from prediction API")
      }

      return NextResponse.json(result)
    } catch (fetchError: any) {
      console.error("Fetch error:", fetchError.message)

      // If in development or testing environment, return mock data
      if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
        console.log("Using mock data as fallback")
        return NextResponse.json(MOCK_RESPONSE)
      }

      throw fetchError // Re-throw to be caught by outer try-catch
    }
  } catch (error: any) {
    // 9. Handle specific timeout error
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Prediction timed out (25s limit)" }, { status: 504 })
    }

    // 10. Handle other errors
    console.error("Server error:", error)
    return NextResponse.json(
      {
        error: "Server error: fetch failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
