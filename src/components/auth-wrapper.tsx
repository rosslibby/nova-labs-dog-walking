'use client'

import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthWrapper({ children }: {
  children: ReactNode
}) {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const unsecuredRoutes: string[] = ['/login', '/register']

    if (!session.data) {
      if (!unsecuredRoutes.includes(pathname)) {
        router.push('/login')
      }
    } else {
      if (unsecuredRoutes.includes(pathname)) {
        router.push('/')
      }
    }
  }, [pathname, router, session])

  if (
    (session?.status === 'authenticated')
    || (pathname === '/login' || pathname === '/register')
  ) {
    return children
  }
}
