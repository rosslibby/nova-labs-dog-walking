import { getSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
  const session = getSession()
}
