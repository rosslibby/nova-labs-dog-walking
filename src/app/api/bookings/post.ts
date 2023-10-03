import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: NextApiRequest) {
  const { id } = await getServerSession(authOptions)

  try {
    const {
      body: {
        date,
        dogID,
      },
      headers: {
        Authorization,
      },
    } = request

    // Check for conflicting booking
    const conflict = !!await prisma.booking.findFirst({
      where: {
        date,
        cancelled: false,
      },
    })

    if (conflict) {
      throw {
        code: 409,
        message: 'This time has already been booked.',
      }
    }

    const booking = await prisma.booking.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
        date,
        dog: {
          connect: {
            id: dogID,
          }
        }
      }
    })

    return NextResponse.json(
      {
        data: booking,
      },
      {
        status: 200,
      },
    )
  } catch(err: any) {
    return NextResponse.json(
      {
        error: err.code,
        message: err.message,
      },
      {
        status: 400,
      }
    )
  }
}
