import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

function decodeJwt(token: string) {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

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
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.id_token) {
        const payload = decodeJwt(account.id_token);
        if (payload.roles) {
          token.role = Array.isArray(payload.roles)
            ? String(payload.roles[0]).toLowerCase()
            : String(payload.roles).toLowerCase();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      (session.user as any).role = token.role;
      return session;
    }
  }
})
