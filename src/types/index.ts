export interface LoveResult {
  percentage: number
  verdict: string
  emoji: string
  funny_line: string
  cheat_level: number      // 0–100 suspicion/cheat meter
  red_flags: string[]      // 2–3 funny red flag lines
  advice: string           // savage / sweet advice
  vibe: 'soulmate' | 'solid' | 'situationship' | 'suspicious' | 'disaster' | 'redflag'
}
