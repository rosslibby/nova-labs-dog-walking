import { prisma } from '@/utils/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export default async function POST(request: NextApiRequest) {
  const { email, password } = request.body

  try {
    const hash = await bcrypt.hash(password, 0)
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    })

    return NextResponse.json(
      {
        data: user,
      },
      {
        status: 200,
      },
    )
  } catch(err) {
    return NextResponse.json(
      {
        message: 'Service unavailable',
      },
      {
        status: 503,
      },
    )
  }
}
