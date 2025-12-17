'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DiaryEntryFormProps {
  userId: string
}

export default function DiaryEntryForm({ userId }: DiaryEntryFormProps) {
  const [type, setType] = useState<'song' | 'album' | 'ep'>('song')
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [content, setContent] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('diary_entries')
        .insert([
          {
            user_id: userId,
            type,
            title,
            artist,
            content,
            year,
          },
        ])

      if (error) throw error

      setMessage('Entry added successfully!')
      setTitle('')
      setArtist('')
      setContent('')
      
      // Refresh the page after 1 second
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex gap-2">
        {(['song', 'album', 'ep'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-3 py-1 rounded capitalize ${type === t ? 'bg-white text-black' : 'bg-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded"
        required
      />

      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded"
        required
      />

      <textarea
        placeholder="Your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded min-h-[100px]"
        required
      />

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full p-2 bg-gray-700 rounded"
      >
        {[2026, 2025, 2024, 2023].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-white text-black rounded disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add to Diary'}
      </button>

      {message && (
        <p className="text-center p-2 bg-gray-700 rounded">{message}</p>
      )}
    </form>
  )
}