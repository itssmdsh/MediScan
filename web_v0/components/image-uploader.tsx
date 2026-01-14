"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void
  previewUrl: string | null
}

export function ImageUploader({ onImageUpload, previewUrl }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
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

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      validateAndUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      validateAndUpload(file)
    }
  }

  const validateAndUpload = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, JPEG, or PNG)")
      return
    }
    onImageUpload(file)
  }

  const handleClearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onImageUpload(null)
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg p-4 transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      } ${previewUrl ? "bg-muted" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="relative w-full h-full">
          <Image src={previewUrl || "/images/placeholder.svg"} alt="Preview" fill className="object-contain rounded-lg" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <Upload className="w-10 h-10 text-muted-foreground mb-2" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">JPG, JPEG or PNG (Max 10MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
          />
          <Button
            variant="ghost"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
        </>
      )}
    </div>
  )
}
