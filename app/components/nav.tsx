"use client"

import Link from "next/link"

type Item = {
  title: string
  slug: string
}

export function Nav({ menu }: { menu: Item[] }) {
  return (
    <nav>
      <ul className="flex gap-4">
        {menu.map((item) => (
          <li key={item.slug}>
            <Link href={`/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}