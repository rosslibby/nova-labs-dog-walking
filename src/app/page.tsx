'use client'

import { ScheduleList } from '@/components/schedule'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="flex gap-x-3 text-xl leading-7">
            <span className="font-semibold text-gray-900">Book a walk</span>
          </h1>
          <Image
            className="h-8 w-8 rounded-full bg-gray-800"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            height="60"
            width="60"
          />
        </div>
      </header>
      <main className="flex flex-col items-center justify-between">
        <ScheduleList />
      </main>
    </>
  )
}
