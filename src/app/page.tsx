'use client'

import Header from '@/components/header'
import { ScheduleList } from '@/components/schedule'

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
