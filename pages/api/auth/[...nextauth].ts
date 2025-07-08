import NextAuth from "next-auth"
import MicrosoftProvider from "next-auth/providers/microsoft"

const handler = NextAuth({
  providers: [
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID,
      authorization: { params: { scope: 'openid profile offline_access User.Read Mail.Send Mail.Read' } }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
