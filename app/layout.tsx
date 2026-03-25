import "./globals.css"
import { StoreProvider } from "./components/providers/store-provider"
import { ReactNode } from "react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
<html lang="en">
  <body className="container mx-auto">
    <StoreProvider>
      <Header />
      {children}
      <Footer />
    </StoreProvider>
  </body>
</html>
  )
}