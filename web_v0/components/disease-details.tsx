import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DiseaseDetailsProps {
  disease: string
}

export function DiseaseDetails({ disease }: DiseaseDetailsProps) {
  // Return nothing if the prediction is Unknown_Normal
  if (disease === "Unknown_Normal") {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Healthy Skin</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Your skin appears to be healthy or the condition is not one of the specific diseases this system is trained
            to detect. Continue to practice good skin care habits and consult a dermatologist if you have any concerns.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Disease information
  const diseaseInfo: Record<string, { description: string; causes: string; symptoms: string; prevention: string }> = {
    Acne: {
      description:
        "Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells, leading to whiteheads, blackheads, or pimples.",
      causes:
        "Acne occurs when the pores of your skin become blocked with oil, dead skin, or bacteria. Each pore is connected to a sebaceous gland, which produces an oily substance called sebum. When these glands produce too much oil, the pore can become blocked, accumulating dirt, bacteria, and dead skin cells.",
      symptoms:
        "Whiteheads, blackheads, pimples, cystic lesions, papules, pustules, and nodules. Acne commonly appears on the face, forehead, chest, upper back, and shoulders.",
      prevention:
        "Wash your face twice daily with a mild cleanser, avoid touching your face, use oil-free products, avoid excessive sun exposure, and maintain a healthy diet. Over-the-counter treatments containing benzoyl peroxide or salicylic acid can help manage mild acne.",
    },
    Eczema: {
      description:
        "Eczema (atopic dermatitis) is a condition that makes your skin red and itchy. It's common in children but can occur at any age.",
      causes:
        "Eczema is related to a gene variation that affects the skin's ability to provide protection from bacteria, irritants, and allergens. It's commonly found in families with a history of allergies or asthma.",
      symptoms:
        "Dry, sensitive skin, intense itching, red or inflamed skin, recurring rash, scaly patches, oozing or crusting, and areas of swelling.",
      prevention:
        "Moisturize your skin at least twice a day, identify and avoid triggers, take shorter baths or showers with warm (not hot) water, use gentle soaps, and pat dry your skin gently after bathing.",
    },
    Psoriasis: {
      description:
        "Psoriasis is a skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk and scalp.",
      causes:
        "Psoriasis is thought to be an immune system problem that causes the skin to regenerate at faster than normal rates. Triggers include infections, stress, and cold weather.",
      symptoms:
        "Red patches of skin covered with thick, silvery scales, small scaling spots, dry, cracked skin that may bleed, itching, burning or soreness, thickened or ridged nails, and swollen and stiff joints.",
      prevention:
        "Keep your skin moisturized, avoid psoriasis triggers like stress, alcohol, and smoking, take daily baths with mild soaps, and use medicated creams or ointments as prescribed by your doctor.",
    },
    Warts: {
      description:
        "Warts are small growths on the skin caused by a viral infection, specifically the human papillomavirus (HPV).",
      causes:
        "Warts are caused by the human papillomavirus (HPV). The virus can be spread by direct contact with a wart or by touching something that touched a wart.",
      symptoms:
        "Small, rough growth on the skin, often with a pattern of tiny black dots (clotted blood vessels), most commonly on hands, fingers, and around nails, but can appear anywhere on the body.",
      prevention:
        "Avoid direct contact with warts, don't pick at warts, keep hands dry and clean, avoid biting nails, and wear protective footwear in public showers and pool areas.",
    },
    SkinCancer: {
      description:
        "Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun but can also occur in areas not ordinarily exposed to sunlight.",
      causes:
        "Skin cancer is primarily caused by ultraviolet (UV) radiation from the sun or tanning beds. Risk factors include fair skin, history of sunburns, excessive sun exposure, and family history.",
      symptoms:
        "Unusual moles, sores, lumps, blemishes, markings, or changes in the way an area of the skin looks or feels. The ABCDE rule can help identify melanoma: Asymmetry, Border irregularity, Color changes, Diameter larger than 6mm, and Evolving size, shape, or color.",
      prevention:
        "Use sunscreen with at least SPF 30, wear protective clothing, avoid tanning beds, seek shade during peak sun hours (10 a.m. to 4 p.m.), and regularly check your skin for any changes.",
    },
  }

  const info = diseaseInfo[disease] || {
    description: "Information not available.",
    causes: "Information not available.",
    symptoms: "Information not available.",
    prevention: "Information not available.",
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{disease} Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="causes">Causes</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <p>{info.description}</p>
          </TabsContent>
          <TabsContent value="causes" className="p-4">
            <p>{info.causes}</p>
          </TabsContent>
          <TabsContent value="symptoms" className="p-4">
            <p>{info.symptoms}</p>
          </TabsContent>
          <TabsContent value="prevention" className="p-4">
            <p>{info.prevention}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
