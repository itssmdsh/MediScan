import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediScan | Advanced Skin Disease Detection",
  description: "Premium AI-powered skin disease detection and analysis",
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-col">
            {children}
            
            {/* Added Sections Container */}
            <div className="container mx-auto px-4 py-12 space-y-20">
              {/* Scan Section will be inserted here by page.tsx */}
              
              {/* Additional Sections */}
              <section id="features" className="py-12">
                {/* Features content will be here */}
              </section>
              
              <section id="book-learn" className="py-12">
                {/* Combined Book Appointment & Learn More sections */}
                <div className="max-w-4xl mx-auto">
                  {/* This will be populated by your interactive tabs component */}
                </div>
              </section>
              
              <section id="testimonials" className="py-12">
                {/* Testimonials content will be here */}
              </section>
            </div>
          </main>
          <Footer />
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              classNames: {
                toast: "font-montserrat",
                title: "font-semibold",
                description: "text-sm",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
