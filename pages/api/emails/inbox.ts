import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { fetchInbox } from '@/lib/msGraphClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const token: any = await getToken({ req, raw: true })
  const accessToken = token?.accessToken || token?.access_token
  if (!accessToken) return res.status(401).json({ error: 'Unauthorized' })

  const limit = req.query.limit ? Number(req.query.limit) : undefined
  try {
    const messages = await fetchInbox(accessToken, limit)
    res.status(200).json({ messages })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
