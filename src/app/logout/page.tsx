'use client'

import { signOut } from 'next-auth/react'
import { useMemo } from 'react'

export default function Logout() {
  useMemo(() => {
    signOut({
      callbackUrl: '/'
    })
  }, [])

  return null
}
