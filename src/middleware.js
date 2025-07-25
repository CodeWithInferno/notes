import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'

// Middleware runs on the Edge runtime
// It CANNOT use Prisma or any Node.js-specific APIs directly

export async function middleware(request) {
  const session = await getSession(request)
  const user = session?.user

  const { pathname } = request.nextUrl

  // If the user is not logged in, let them proceed.
  // The individual pages will handle redirecting to the login page if necessary.
  if (!user) {
    return NextResponse.next()
  }

  // Fetch the user's role from our internal API.
  // We must use an absolute URL for fetching within middleware.
  const roleResponse = await fetch(new URL('/api/auth/get-role', request.url), {
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  })

  if (!roleResponse.ok) {
    // If the role check fails, maybe redirect to an error page or dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const { role } = await roleResponse.json()

  // If role is null, it means the user is new. Let them proceed to the dashboard
  // where the init-user API will create their DB entry.
  if (!role) {
    return NextResponse.next()
  }

  // Rule 1: Admin routes are only for Admins
  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Rule 2: Explore page is forbidden for Students
  if (pathname.startsWith('/explore') && role === 'STUDENT') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If no rules match, the user is authorized
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/explore/:path*'],
}
