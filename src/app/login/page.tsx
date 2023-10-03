'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [completed, setCompleted] = useState<boolean>(false)
  const [formData, setFormData] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })
  const updateData = (e: ChangeEvent<HTMLInputElement>) => setFormData(prevState => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
  const handleSubmit = useCallback(async () => {
    console.log(formData)
    signIn('credentials', {
      ...formData,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((result: any) => {
        console.log(result)
        if (!result.error) {
          router.push(result.url)
          setCompleted(true)
        }
      })
    // const response = await (await fetch(`/api/user/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // }))
  }, [formData, router, setCompleted])

  useEffect(() => {
    if (completed) {
      router.push('/')
    }
  }, [completed, router])
  return (
    <div className="h-screen bg-gray-50 ">
      <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:max-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
        </div>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={updateData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={updateData}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
              </div>
              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
