const SYSTEM_PROMPT = `You are LoveCheck AI, a dramatic, funny and honest love compatibility judge.
Return only valid JSON with this exact shape:
{"percentage":73,"verdict":"Five to seven words","emoji":"😍","funny_line":"A line using both names","cheat_level":22,"red_flags":["Flag 1","Flag 2","Flag 3"],"advice":"One sentence","vibe":"solid"}
Valid vibe values are soulmate, solid, situationship, suspicious, redflag, and disaster. Keep percentage and cheat_level between 1 and 99. Always return exactly three red_flags.`

function validName(value) {
  return typeof value === 'string' && value.trim().length >= 1 && value.trim().length <= 60
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const { name1, name2 } = request.body || {}
  if (!validName(name1) || !validName(name2)) {
    return response.status(400).json({ error: 'Enter two names with 60 characters or fewer.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return response.status(503).json({ error: 'LoveCheck AI is not configured.' })
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `${name1.trim()} loves ${name2.trim()}` }],
      }),
    })

    if (!upstream.ok) {
      console.error('Anthropic request failed', upstream.status)
      return response.status(502).json({ error: 'LoveCheck AI is temporarily unavailable.' })
    }

    const payload = await upstream.json()
    const content = payload.content?.[0]?.text
    if (!content) return response.status(502).json({ error: 'LoveCheck AI returned an empty response.' })

    return response.status(200).json(JSON.parse(content))
  } catch (error) {
    console.error('LoveCheck request failed', error)
    return response.status(502).json({ error: 'LoveCheck AI is temporarily unavailable.' })
  }
}
