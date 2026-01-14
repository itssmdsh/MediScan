"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Award, Zap, Microscope, Lock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Microscope className="h-10 w-10 text-primary" />,
      title: "Advanced AI Detection",
      description:
        "Our AI model is trained on thousands of dermatological images to accurately identify skin conditions.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Instant Results",
      description: "Get analysis results in seconds, not days. No waiting for appointments or lab results.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Medical-Grade Accuracy",
      description: "Our detection system achieves over 90% accuracy for the supported skin conditions.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Privacy Focused",
      description: "Your images and data are encrypted and never shared with third parties without consent.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Easy to Use",
      description: "Simple interface designed for everyone. Just upload a photo and get results instantly.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Expert Verified",
      description: "Our AI model is developed in collaboration with board-certified dermatologists.",
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Advanced Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Cutting-edge technology for accurate skin condition analysis
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full glass-card border-0 shadow-lg">
                <CardHeader>
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
