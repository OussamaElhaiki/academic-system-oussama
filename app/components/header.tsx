"use client"

import { Nav } from "./nav"
import { AuthNav } from "./auth-nav"
import { useBoundStore } from "./providers/store-provider"
import { useEffect } from "react"

export function Header() {
  const setMenu = useBoundStore((s) => s.setMenu)
  const menu = useBoundStore((s) => s.menu)

  useEffect(() => {
    setMenu([
      { title: "Students", slug: "students" },
      { title: "Subjects", slug: "subjects" },
    ])
  }, [setMenu])

  return (
    <header className="border-b p-2 flex justify-between items-center">
      <Nav menu={menu} />
      <AuthNav />
    </header>
  )
}