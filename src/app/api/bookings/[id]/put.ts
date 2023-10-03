import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PUT(request: NextApiRequest) {
  const { id } = await getServerSession(authOptions)
  const router = useRouter()
  const bookingId = router.query.id
  const {
    body: {
      cancelled,
      dogID,
    },
  } = request

  const booking = await prisma.booking.update({
    where: {
      id: bookingId!.toString(),
      userID: id,
    },
    data: {
      cancelled,
      dog: {
        connect: {
          id: dogID,
        },
      },
    },
  })

  return NextResponse.json(
    {
      data: booking,
    },
    {
      status: 200,
    },
  )
}
