import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from '@/utils/db'
import { User } from '@prisma/client'

let userAccount: User | null = null

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => new Promise(resolve => {
  bcrypt.compare(plainPassword, hashedPassword, (err, res) => {
    resolve(res)
  })
})

export const authOptions = {
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        console.log(credentials)
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (user) {
            const res = await confirmPasswordHash(credentials.password, user.password)

            if (res) {
              userAccount = user

              return userAccount
            }

            return null
          }

          return null
        } catch(err) {
          console.error('There was a problem authenticating the user:', err)

          return null
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log(user, account, profile, email, credentials)
      try {
        if (typeof user.id !== typeof undefined) {
          return user
        }

        return false
      } catch(err) {
        console.error('There was a problem signing in:', err)
      }
    },
    async register(email: string, password: string) {
      try {
        await prisma.user.create({
          data: {
            email,
            password,
          }
        })
  
        return true
      } catch(err) {
        console.error('There was a problem signing up:', err)
        return false
      }
    },
    async session({ session, token, user }: any) {
      if (userAccount) {

      } else if (
        typeof token.user !== typeof undefined
          && (typeof session.user === typeof undefined
            || (typeof session.user !== typeof undefined
              && typeof session.user.id === typeof undefined))
      ) {
        session.user = token.user
      } else if (typeof token !== typeof undefined) {
        session.token = token
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (typeof user !== typeof undefined) {
        token.user = user
      }
  
      return token
    }
  }
}

const auth = (req: any, res: any) => NextAuth(req, res, authOptions)

export { auth as GET, auth as POST }
