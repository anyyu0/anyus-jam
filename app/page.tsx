'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="mt-2">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">anyu's jam</h1>
        <p className="text-gray-400 mb-6">Share your music diary with others</p>
        <p className="text-lg">Please <a href="/login" className="text-white underline">login or register</a> to start sharing your music!</p>
      </div>
    )
  }

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to anyu's jam!</h1>
      <p className="text-gray-400 mb-6">You are logged in as {user.email}</p>
      <p className="text-lg">Diary feature coming soon!</p>
    </div>
  )
}