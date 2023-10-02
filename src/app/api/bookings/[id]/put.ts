import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/router'

export async function PUT(request: NextApiRequest) {
  const router = useRouter()
  const bookingId = router.query.id
  const {
    body: {
      cancelled,
      dogID,
    },
    headers: {
      Authorization,
    },
  } = request
  const token = Authorization?.toString().split('Bearer ').pop()

  const booking = await prisma.booking.update({
    where: {
      id: bookingId!.toString(),
      userID: token,
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
