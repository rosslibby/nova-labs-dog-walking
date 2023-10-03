import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function POST(request: NextApiRequest) {
  const { id } = await getServerSession(authOptions)
  const {
    body: {
      name,
      breed,
      profile_image,
    },
  } = request
  const dog = await prisma.dog.create({
    data: {
      name,
      breed,
      avatar: profile_image,
      user: {
        connect: { id },
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
