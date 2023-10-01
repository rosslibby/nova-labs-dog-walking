import { prisma } from '@/utils/db'
import { Booking } from '@prisma/client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const queryDate = request.nextUrl.searchParams.get('date')
  const date = queryDate ? new Date(queryDate) : new Date()
  const currentDay = (new Date(date.setHours(0))).toISOString()
  const nextDay = (new Date(date.setHours(24))).toISOString()

  const bookings: Booking[] = await prisma.booking.findMany({
    where: {
      date: {
        gte: currentDay,
        lte: nextDay,
      },
    },
    include: {
      user: true,
      dog: true,
    },
  })

  return NextResponse.json(
    {
      bookings,
    },
    {
      status: 200,
    }
  )
}
