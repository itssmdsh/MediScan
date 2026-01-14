"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Shield, Clock, Award } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                AI-Powered Healthcare
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Advanced <span className="gradient-text">Skin Disease</span> Detection
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload a photo and get instant AI analysis of skin conditions with medical-grade accuracy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base"
                onClick={() => {
                  document.getElementById("scan-section")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Try It Now
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Private & Secure</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Instant Results</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">High Accuracy</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto lg:mx-0 max-w-md"
          >
            <div className="aspect-square overflow-hidden rounded-2xl glass-card shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Skin analysis visualization"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>

            {/* Floating Elements (kept but without analysis text) */}
            <div className="absolute -right-12 -top-12 h-24 w-24 rounded-xl glass-card p-4 shadow-lg">
              <div className="h-full w-full rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="h-10 w-10 text-success" />
              </div>
            </div>
            <div className="absolute -left-8 -bottom-8 h-32 w-56 rounded-xl glass-card p-4 shadow-lg">
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-primary/20"></div>
                <div className="h-2 w-1/2 rounded-full bg-primary/20"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
