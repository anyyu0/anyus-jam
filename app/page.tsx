'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import DiaryEntryForm from '@/components/DiaryEntryForm'
import DiaryList from '@/components/DiaryList'
import TopPicksSection from '@/components/TopPicksSection'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
      <p className="text-gray-400 mb-8">Share what you've been listening to</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Add Diary Entry</h2>
          <DiaryEntryForm userId={user.id} />
          
          <h2 className="text-xl font-bold mb-4 mt-8">Your Recent Entries</h2>
          <DiaryList userId={user.id} />
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Your Top Picks</h2>
          <TopPicksSection userId={user.id} />
        </div>
      </div>
    </div>
  )
}