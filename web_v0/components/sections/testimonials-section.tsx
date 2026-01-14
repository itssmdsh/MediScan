"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "MediScan helped me identify my skin condition when I couldn't get a dermatologist appointment for weeks. The analysis was spot on!",
      author: "Sarah Johnson",
      role: "Patient",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      quote:
        "As a dermatologist, I'm impressed with the accuracy of MediScan. It's a valuable tool for preliminary screening before patients come in.",
      author: "Dr. Michael Chen",
      role: "Dermatologist",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      quote:
        "The instant results and detailed information about my condition helped me understand what steps to take next. Highly recommend!",
      author: "James Wilson",
      role: "Patient",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 4,
    },
  ]

  return (
    <section id="testimonials" className="py-20 sm:py-32 relative bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Trusted by patients and healthcare professionals
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full glass-card border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
