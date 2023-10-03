'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AuthUser, AuthProviderProps } from './auth.types'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { User } from '@prisma/client'

const placeholderUserID = 'alpha'

export const authCtx = createContext<AuthUser | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  getSession().then(data => {
    if (data) {
      const user = data.user as User

      setUser(user)
    }
  })

  return (
    <authCtx.Provider value={user}>
      {children}
    </authCtx.Provider>
  )
}
