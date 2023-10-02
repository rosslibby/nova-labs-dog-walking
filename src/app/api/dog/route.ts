import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function POST(request: NextApiRequest) {
  const {
    body: {
      name,
      breed,
      profile_image,
    },
    headers: {
      Authorization,
    },
  } = request
  const token = Authorization?.toString().split('Bearer ').pop()
  const dog = await prisma.dog.create({
    data: {
      name,
      breed,
      avatar: profile_image,
      user: {
        connect: {
          id: token,
        },
      },
    },
  })

  return NextResponse.json(
    dog,
    {
      status: 200,
    },
  )
}
