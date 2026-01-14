import Link from "next/link"
import { Stethoscope } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Stethoscope className="h-5 w-5 text-primary" />
          <span>MediScan</span>
        </Link>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} MediScan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
