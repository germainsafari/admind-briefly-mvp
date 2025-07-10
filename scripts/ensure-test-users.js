const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

const users = [
  {
    email: 'JoannaTrela@sfrgermaingmail.onmicrosoft.com',
    role: 'client',
    name: 'Joanna Trela',
  },
  {
    email: 'ZuzaBojdo@sfrgermaingmail.onmicrosoft.com',
    role: 'manager',
    name: 'Zuza Bojdo',
  },
  {
    email: 'sfrgermain@gmail.com',
    role: 'admin',
    name: 'Germain Safari',
  },
];

async function ensureTestUsers() {
  try {
    // Use or create a test organization
    let org = await prisma.organization.findFirst();
    if (!org) {
      org = await prisma.organization.create({ data: { name: 'Test Org', ai_support: false } });
    }
    console.log(`Using organization: ${org.name} (ID: ${org.id})`);

    for (const user of users) {
      // Ensure User record
      let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            role: user.role,
            organization_id: org.id,
          },
        });
        console.log(`Created User: ${user.email} (${user.role})`);
      } else {
        console.log(`User exists: ${user.email} (${user.role})`);
      }

      // Ensure Manager or Client record if needed
      if (user.role === 'manager') {
        let manager = await prisma.manager.findUnique({ where: { email: user.email } });
        if (!manager) {
          manager = await prisma.manager.create({
            data: {
              name: user.name,
              email: user.email,
              organization_id: org.id,
              status: 'active',
              role: 'manager',
            },
          });
          console.log(`Created Manager: ${user.email}`);
        } else {
          console.log(`Manager exists: ${user.email}`);
        }
      }
      if (user.role === 'client') {
        let client = await prisma.client.findUnique({ where: { email: user.email } });
        if (!client) {
          client = await prisma.client.create({
            data: {
              name: user.name,
              email: user.email,
              organization_id: org.id,
              status: 'active',
            },
          });
          console.log(`Created Client: ${user.email}`);
        } else {
          console.log(`Client exists: ${user.email}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error ensuring test users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

ensureTestUsers(); 