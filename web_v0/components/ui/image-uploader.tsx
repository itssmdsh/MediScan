"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, ImageIcon, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    setDragError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      validateAndUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragError(null)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      validateAndUpload(file)
    }
  }

  const validateAndUpload = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setDragError("Please upload a valid image file (JPG, JPEG, or PNG)")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setDragError("Image size must be less than 10MB")
      return
    }

    onImageUpload(file)
  }

  return (
    <div className="space-y-6">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : dragError
              ? "border-destructive/50"
              : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center space-y-4 p-6 text-center"
        >
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            {isDragging ? (
              <FileImage className="h-10 w-10 text-primary" />
            ) : (
              <ImageIcon className="h-10 w-10 text-primary" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Upload your skin image</h3>
            <p className="text-sm text-muted-foreground max-w-md">Drag and drop your image here, or click to browse</p>
          </div>

          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
            <Upload className="mr-2 h-4 w-4" />
            Select Image
          </Button>

          {dragError && <p className="text-sm text-destructive mt-2">{dragError}</p>}

          <p className="text-xs text-muted-foreground mt-4">Supported formats: JPG, JPEG, PNG (Max 10MB)</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center">
          <img
            src="/placeholder.svg?height=150&width=150"
            alt="Example skin condition"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center">
          <img
            src="/placeholder.svg?height=150&width=150"
            alt="Example skin condition"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center">
          <img
            src="/placeholder.svg?height=150&width=150"
            alt="Example skin condition"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
