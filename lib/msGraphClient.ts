import { Client } from '@microsoft/microsoft-graph-client'
import type { Message as GraphMessage } from '@microsoft/microsoft-graph-types'
import 'isomorphic-fetch'

export function getGraphClient(accessToken: string): Client {
  return Client.init({
    authProvider: done => {
      done(null, accessToken)
    }
  })
}

export async function sendUserEmail(accessToken: string, to: string, subject: string, htmlBody: string): Promise<void> {
  const client = getGraphClient(accessToken)
  await client.api('/me/sendMail').post({
    message: {
      subject,
      body: { contentType: 'HTML', content: htmlBody },
      toRecipients: [{ emailAddress: { address: to } }]
    }
  })
}

export async function fetchInbox(accessToken: string, limit = 10): Promise<GraphMessage[]> {
  const client = getGraphClient(accessToken)
  const res = await client
    .api('/me/mailFolders/Inbox/messages')
    .top(limit)
    .orderby('receivedDateTime DESC')
    .get()
  return res.value as GraphMessage[]
}
