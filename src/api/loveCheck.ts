import { LoveResult } from '../types'

export async function checkLove(name1: string, name2: string): Promise<LoveResult> {
  const response = await fetch('/api/love-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name1, name2 }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error || `API error: ${response.status}`)

  return data as LoveResult
}
