# LoveCheck — An Editorial AI Experience

LoveCheck is a fun, dramatic, and hilariously honest love compatibility judge powered by Anthropic's Claude AI.

## Tech Stack
- **React 18** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for premium, editorial-grade styling
- **Anthropic Claude API** (claude-sonnet-4-20250514)

## Features
- **Dynamic AI Judging**: Personalized love percentages and savage/sweet one-liners.
- **Premium Design**: Editorial noir aesthetic with glassmorphism and smooth gradients.
- **Micro-Animations**: Count-up numbers, animating love meters, and floating hearts.
- **Mobile Responsive**: Works perfectly on devices of all sizes.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory:
   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
This project is configured for easy deployment to **Vercel**. Simply connect your repository and add your `VITE_ANTHROPIC_API_KEY` to the environment variables in the Vercel dashboard.

---
*© 2024 LOVECHECK. AN EDITORIAL EXPERIENCE.*
