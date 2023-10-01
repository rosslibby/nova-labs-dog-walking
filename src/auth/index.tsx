'use client'

import { createContext, useContext, useState } from 'react'
import { Auth, AuthProviderProps } from './auth.types'

const placeholderUserID = 'alpha'

export const authCtx = createContext<Auth>({
  sessionToken: '',
  refreshToken: '',
  userID: placeholderUserID,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [properties, setProperties] = useState<Auth>(useContext(authCtx))

  return (
    <authCtx.Provider value={properties}>
      {children}
    </authCtx.Provider>
  )
}
