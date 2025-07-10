import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import { prisma } from "@/lib/prisma";

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

export const authOptions = {
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
    async jwt({ token, account, profile }: { token: any; account?: any; profile?: any }) {
      // On first sign-in, look up user in DB and attach role/orgId
      if (account && account.id_token) {
        const payload = decodeJwt(account.id_token);
        const email = payload.preferred_username || payload.email || payload.upn;
        if (!email) throw new Error('No email found in Azure AD token');
        // Look up user in User table
        const dbUser = await prisma.user.findUnique({ where: { email } });
        if (!dbUser) throw new Error('User not found in system. Please contact your admin.');
        token.role = dbUser.role;
        token.organizationId = dbUser.organization_id;
        token.email = dbUser.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (!session.user) session.user = {};
      (session.user as any).role = token.role;
      (session.user as any).organizationId = token.organizationId;
      (session.user as any).email = token.email;
      return session;
    }
  }
};

export default NextAuth(authOptions);
