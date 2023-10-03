import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token)
    },
  }
)

export const config = {
  matcher: ['/((?!auth).*)(.+)'],
}
