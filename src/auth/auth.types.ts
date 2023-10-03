import { Address, Dog, User } from '@prisma/client'
import { ReactNode } from 'react'

export interface AuthUser extends User {
  dogs?: Dog[]
}

export type AuthProviderProps = {
  children: ReactNode
}
