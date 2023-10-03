import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

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
