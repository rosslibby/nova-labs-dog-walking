import { Address, Dog } from '@prisma/client'
import { ReactNode } from 'react'

export type AuthUser = {
  id: string
  email: string
  name?: string
  phone?: string
  avatar?: string
  address?: Address
  dogs: Dog[]
}

export type AuthProviderProps = {
  children: ReactNode
}
