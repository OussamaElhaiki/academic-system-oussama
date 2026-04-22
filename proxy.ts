import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/admin/:path*"]
}

export async function proxy(_request: NextRequest) {
  return NextResponse.next()
}
