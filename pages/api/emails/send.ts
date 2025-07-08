import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { sendUserEmail } from '@/lib/msGraphClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const token: any = await getToken({ req, raw: true })
  const accessToken = token?.accessToken || token?.access_token
  if (!accessToken) return res.status(401).json({ error: 'Unauthorized' })

  const { to, subject, body } = req.body
  try {
    await sendUserEmail(accessToken, to, subject, body)
    res.status(200).json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
