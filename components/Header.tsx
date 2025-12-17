'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function Header() {
  const [user, setUser] = useState<any>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          anyu's jam
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <span>{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
            >
              Login/Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}