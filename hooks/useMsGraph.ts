'use client'

import { useSession, signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react'

export function useMsGraph() {
  const { data: session } = useSession()

  const sendEmail = async (to: string, subject: string, body: string) => {
    const res = await fetch('/api/emails/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body })
    })
    if (!res.ok) throw new Error('Failed to send email')
  }

  const getInbox = async (limit?: number) => {
    const url = limit ? `/api/emails/inbox?limit=${limit}` : '/api/emails/inbox'
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch inbox')
    const data = await res.json()
    return data.messages
  }

  return {
    session,
    signIn: () => nextSignIn('microsoft'),
    signOut: () => nextSignOut(),
    sendEmail,
    getInbox
  }
}
