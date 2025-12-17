'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DiaryEntry {
  id: string
  type: string
  title: string
  artist: string
  content: string
  year: number
  created_at: string
}

interface DiaryListProps {
  userId: string
}

export default function DiaryList({ userId }: DiaryListProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEntries()
  }, [userId])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)

    if (!error && data) {
      setEntries(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (entries.length === 0) {
    return <p className="text-gray-400">No entries yet. Add your first one!</p>
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block px-2 py-1 text-xs bg-gray-700 rounded uppercase">
                {entry.type}
              </span>
              <h3 className="text-lg font-bold mt-1">{entry.title}</h3>
              <p className="text-gray-400">by {entry.artist}</p>
            </div>
            <span className="text-sm text-gray-500">{entry.year}</span>
          </div>
          <p className="text-gray-300">{entry.content}</p>
        </div>
      ))}
    </div>
  )
}