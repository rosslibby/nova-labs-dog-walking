import { ReactNode } from 'react'

export type Auth = {
  sessionToken: string
  refreshToken: string
  userID: string
}

export type AuthProviderProps = {
  children: ReactNode
}
