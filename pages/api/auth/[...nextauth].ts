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
        // If user is a client, look up Client record and store clientId
        if (dbUser.role === 'client') {
          let client = await prisma.client.findUnique({ where: { email } });
          if (!client) {
            // Create a Client record if it doesn't exist
            client = await prisma.client.create({
              data: {
                name: dbUser.email?.split('@')[0] || 'Client', // Use email prefix as name
                email: dbUser.email,
                organization_id: dbUser.organization_id,
                status: 'active'
              }
            });
          }
          if (client) {
            token.clientId = client.id;
            console.log(`Set clientId in token: ${client.id} for user: ${email}`);
          } else {
            console.error(`Failed to find or create client for user: ${email}`);
          }
        }
        // If user is a manager, look up Manager record and store managerId
        else if (dbUser.role === 'manager') {
          let manager = await prisma.manager.findUnique({ where: { email } });
          if (manager) {
            token.managerId = manager.id;
            console.log(`Set managerId in token: ${manager.id} for user: ${email}`);
          } else {
            console.error(`Failed to find manager for user: ${email}`);
          }
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Ensure session.user exists
      if (!session.user) {
        session.user = {};
      }
      
      // Add custom fields to session
      session.user.role = token.role;
      session.user.organizationId = token.organizationId;
      session.user.clientId = token.clientId;
      session.user.managerId = token.managerId;
      session.user.email = token.email;

      // Add organization_name for client users
      if (token.role === 'client' && token.organizationId) {
        // Defensive: only fetch if not already present
        if (!session.user.organization_name) {
          const org = await prisma.organization.findUnique({
            where: { id: token.organizationId },
            select: { name: true }
          });
          session.user.organization_name = org?.name || '';
        }
      }

      console.log('Session callback - token:', token);
      console.log('Session callback - session.user:', session.user);
      return session;
    }
  }
};

export default NextAuth(authOptions);
