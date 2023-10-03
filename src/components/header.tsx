import { authCtx } from '@/auth'
import Image from 'next/image'
import { useContext } from 'react'

export default function Header() {
  const user = useContext(authCtx)

  return (
    <header className="sticky inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="flex gap-x-3 text-xl leading-7">
          <span className="font-semibold text-gray-900">Book a walk</span>
        </h1>
        {user?.avatar && (
          <Image
            className="h-8 w-8 rounded-full bg-gray-800"
            src={user?.avatar}
            alt="Profile"
            height="60"
            width="60"
          />
        )}
        {!user?.avatar && (
          <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
      </div>
    </header>
  )
}
