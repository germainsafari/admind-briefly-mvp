import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

console.log({
  AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
  AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
  AZURE_AD_CLIENT_SECRET: !!process.env.AZURE_AD_CLIENT_SECRET,
})

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: 'openid profile offline_access User.Read Mail.Send Mail.Read' } }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
