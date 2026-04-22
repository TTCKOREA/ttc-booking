import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // /embed 경로에서 iframe 허용
  if (request.nextUrl.pathname.startsWith("/embed") || request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next()
    
    // X-Frame-Options를 ALLOWALL로 설정 (Vercel 기본값 덮어쓰기)
    response.headers.set("X-Frame-Options", "ALLOWALL")
    response.headers.set("Content-Security-Policy", "frame-ancestors *")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
