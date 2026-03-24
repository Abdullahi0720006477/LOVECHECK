import { LoveResult } from '../types'

const SYSTEM_PROMPT = `
You are LoveCheck AI — a fun, dramatic, and hilariously honest 
love compatibility judge.

The user gives you two names. You must:
1. Generate a love compatibility percentage (1–99, never 50/100/0)
2. Write a short dramatic verdict (5–8 words)
3. Pick one fitting emoji
4. Write a funny savage or sweet one-liner using both names

SCORING RULES:
- 85–99%: Deeply in love. Sweet, wholesome, over the top.
- 65–84%: Good match. Playful teasing.
- 45–64%: Situationship energy. Chaotic.
- 25–44%: Red flags. Funny and savage.
- 1–24%: Total disaster. Ultra dramatic.

TONE: Funny, dramatic, entertaining. Like a gossip blogger meets 
fortune teller. Never genuinely cruel. Always use both names.

RESPOND ONLY WITH VALID JSON. NO MARKDOWN. NO EXTRA TEXT:
{
  "percentage": 73,
  "verdict": "Your dramatic verdict here",
  "emoji": "😍",
  "funny_line": "Your funny one-liner using both names here"
}
`

export async function checkLove(name1: string, name2: string): Promise<LoveResult> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error("Anthropic API Key is missing. Please check your environment variables.")
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "dangerously-allow-browser": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: SYSTEM_PROMPT.trim(),
        messages: [
          {
            role: "user",
            content: `${name1} loves ${name2}`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.content?.[0]?.text
    
    if (!content) {
      throw new Error("Empty response from LoveCheck AI")
    }

    return JSON.parse(content) as LoveResult
  } catch (err) {
    throw new Error("Something broke — maybe the love was too powerful 💥")
  }
}
