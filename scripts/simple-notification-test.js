const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function simpleTest() {
  try {
    console.log('🧪 Simple Notification Test\n');

    // Check existing data
    const [organizations, managers, clients] = await Promise.all([
      prisma.organization.findMany(),
      prisma.manager.findMany(),
      prisma.client.findMany(),
    ]);

    console.log(`Organizations: ${organizations.length}`);
    console.log(`Managers: ${managers.length}`);
    console.log(`Clients: ${clients.length}`);

    // Create test data if needed
    let testOrg = organizations[0];
    if (!testOrg) {
      testOrg = await prisma.organization.create({
        data: { name: 'Test Organization', ai_support: true }
      });
      console.log(`Created organization: ${testOrg.name} (ID: ${testOrg.id})`);
    }

    let testManager = managers[0];
    if (!testManager) {
      testManager = await prisma.manager.create({
        data: {
          name: 'Test Manager',
          email: 'test.manager@example.com',
          organization_id: testOrg.id,
          status: 'active',
          role: 'manager'
        }
      });
      console.log(`Created manager: ${testManager.name} (ID: ${testManager.id})`);
    }

    let testClient = clients[0];
    if (!testClient) {
      testClient = await prisma.client.create({
        data: {
          name: 'Test Client',
          email: 'test.client@example.com',
          organization_id: testOrg.id,
          status: 'active'
        }
      });
      console.log(`Created client: ${testClient.name} (ID: ${testClient.id})`);
    }

    // Create test notifications
    const managerNotification = await prisma.managerNotification.create({
      data: {
        managerId: testManager.id,
        message: 'Test notification for manager',
        link: '/admin/briefs/1',
        read: false
      }
    });

    const clientNotification = await prisma.clientNotification.create({
      data: {
        clientId: testClient.id,
        message: 'Test notification for client',
        link: '/client/brief-success?id=1',
        read: false
      }
    });

    console.log(`Created manager notification: ${managerNotification.id}`);
    console.log(`Created client notification: ${clientNotification.id}`);

    // Test retrieval
    const managerNotifications = await prisma.managerNotification.findMany({
      where: { managerId: testManager.id }
    });

    const clientNotifications = await prisma.clientNotification.findMany({
      where: { clientId: testClient.id }
    });

    console.log(`Manager notifications: ${managerNotifications.length}`);
    console.log(`Client notifications: ${clientNotifications.length}`);

    console.log('\n✅ Test completed successfully!');
    console.log(`\nTest data created:`);
    console.log(`- Organization: ${testOrg.name} (ID: ${testOrg.id})`);
    console.log(`- Manager: ${testManager.name} (ID: ${testManager.id})`);
    console.log(`- Client: ${testClient.name} (ID: ${testClient.id})`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

simpleTest(); 