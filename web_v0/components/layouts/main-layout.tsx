import type React from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
