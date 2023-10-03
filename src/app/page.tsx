'use client'

import Header from '@/components/header'
import { ScheduleList } from '@/components/schedule'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between">
        <ScheduleList />
      </main>
    </>
  )
}
