'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setMessage('Login successful! Redirecting...')
        window.location.href = '/'
      } else {
        // Register
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `https://spotjam.vercel.app/`,
          },
        })
        if (error) throw error
        setMessage('Check your email for confirmation!')
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 rounded ${isLogin ? 'bg-white text-black' : 'bg-gray-700'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 rounded ${!isLogin ? 'bg-white text-black' : 'bg-gray-700'}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-white text-black rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {message && (
        <p className="mt-4 p-2 bg-gray-700 rounded text-center">{message}</p>
      )}
    </div>
  )
}