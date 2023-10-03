import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith('/api/')) {
          return token !== null
        }

        return !!token
      }
    },
  },
)

export const config = {
  matcher: ['/api/:function/:function'],
}
