"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How accurate is MediScan's skin disease detection?",
      answer:
        "MediScan achieves over 90% accuracy for the six supported conditions (Acne, Eczema, Psoriasis, Warts, Skin Cancer, and Normal/Unknown skin). However, it should not replace professional medical diagnosis.",
    },
    {
      question: "Is my data and images kept private?",
      answer:
        "Yes, we take privacy seriously. Your images are encrypted during transmission and processing. We do not share your data with third parties without explicit consent, and images are not stored longer than necessary for analysis.",
    },
    {
      question: "What skin conditions can MediScan detect?",
      answer:
        "Currently, MediScan can detect five specific skin conditions: Acne, Eczema, Psoriasis, Warts, and Skin Cancer. It can also identify when skin appears normal or has a condition outside these five categories.",
    },
    {
      question: "How should I take photos for the best results?",
      answer:
        "For optimal results, take clear, well-lit photos of the affected area. Ensure the image is in focus, with good lighting, and shows the entire condition. Avoid using filters or editing the image.",
    },
    {
      question: "What should I do after receiving my results?",
      answer:
        "If MediScan detects a potential skin condition, we recommend consulting with a dermatologist for proper diagnosis and treatment. The app provides information about the condition and options to find specialists near you.",
    },
  ]

  return (
    <section id="faq" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Everything you need to know about MediScan
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
