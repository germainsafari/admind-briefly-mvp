const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function testNotificationStepByStep() {
  console.log('🔍 Step-by-Step Notification Testing\n');

  try {
    // Step 1: Check database state
    console.log('📊 Step 1: Checking database state...');
    const [organizations, managers, clients, users, managerNotifications, clientNotifications] = await Promise.all([
      prisma.organization.findMany(),
      prisma.manager.findMany(),
      prisma.client.findMany(),
      prisma.user.findMany(),
      prisma.managerNotification.findMany(),
      prisma.clientNotification.findMany(),
    ]);

    console.log(`   Organizations: ${organizations.length}`);
    console.log(`   Managers: ${managers.length}`);
    console.log(`   Clients: ${clients.length}`);
    console.log(`   Users: ${users.length}`);
    console.log(`   Manager Notifications: ${managerNotifications.length}`);
    console.log(`   Client Notifications: ${clientNotifications.length}\n`);

    // Step 2: Create test data if needed
    console.log('🏗️  Step 2: Setting up test data...');
    let testOrg, testManager, testClient, testUser;

    // Create organization if needed
    if (organizations.length === 0) {
      testOrg = await prisma.organization.create({
        data: { name: 'Test Organization', ai_support: true }
      });
      console.log(`   ✅ Created organization: ${testOrg.name} (ID: ${testOrg.id})`);
    } else {
      testOrg = organizations[0];
      console.log(`   ℹ️  Using existing organization: ${testOrg.name} (ID: ${testOrg.id})`);
    }

    // Create manager if needed
    if (managers.length === 0) {
      testManager = await prisma.manager.create({
        data: {
          name: 'Test Manager',
          email: 'test.manager@example.com',
          organization_id: testOrg.id,
          status: 'active',
          role: 'manager'
        }
      });
      console.log(`   ✅ Created manager: ${testManager.name} (ID: ${testManager.id})`);
    } else {
      testManager = managers[0];
      console.log(`   ℹ️  Using existing manager: ${testManager.name} (ID: ${testManager.id})`);
    }

    // Create client if needed
    if (clients.length === 0) {
      testClient = await prisma.client.create({
        data: {
          name: 'Test Client',
          email: 'test.client@example.com',
          organization_id: testOrg.id,
          status: 'active'
        }
      });
      console.log(`   ✅ Created client: ${testClient.name} (ID: ${testClient.id})`);
    } else {
      testClient = clients[0];
      console.log(`   ℹ️  Using existing client: ${testClient.name} (ID: ${testClient.id})`);
    }

    // Create user records if needed
    const managerUser = await prisma.user.findUnique({ where: { email: testManager.email } });
    const clientUser = await prisma.user.findUnique({ where: { email: testClient.email } });

    if (!managerUser) {
      await prisma.user.create({
        data: {
          email: testManager.email,
          role: 'manager',
          organization_id: testOrg.id
        }
      });
      console.log(`   ✅ Created manager user record for: ${testManager.email}`);
    } else {
      console.log(`   ℹ️  Manager user record exists for: ${testManager.email}`);
    }

    if (!clientUser) {
      await prisma.user.create({
        data: {
          email: testClient.email,
          role: 'client',
          organization_id: testOrg.id
        }
      });
      console.log(`   ✅ Created client user record for: ${testClient.email}`);
    } else {
      console.log(`   ℹ️  Client user record exists for: ${testClient.email}`);
    }

    // Step 3: Test notification creation
    console.log('\n🔔 Step 3: Testing notification creation...');
    
    // Create manager notification
    const managerNotification = await prisma.managerNotification.create({
      data: {
        managerId: testManager.id,
        message: 'Test notification for manager - New brief available!',
        link: '/admin/briefs/1',
        read: false
      }
    });
    console.log(`   ✅ Created manager notification: ${managerNotification.message} (ID: ${managerNotification.id})`);

    // Create client notification
    const clientNotification = await prisma.clientNotification.create({
      data: {
        clientId: testClient.id,
        message: 'Test notification for client - Your brief was sent successfully!',
        link: '/client/brief-success?id=1',
        read: false
      }
    });
    console.log(`   ✅ Created client notification: ${clientNotification.message} (ID: ${clientNotification.id})`);

    // Step 4: Test notification retrieval
    console.log('\n📥 Step 4: Testing notification retrieval...');
    
    const managerNotifications = await prisma.managerNotification.findMany({
      where: { managerId: testManager.id },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`   ✅ Found ${managerNotifications.length} notifications for manager ${testManager.id}`);

    const clientNotifications = await prisma.clientNotification.findMany({
      where: { clientId: testClient.id },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`   ✅ Found ${clientNotifications.length} notifications for client ${testClient.id}`);

    // Step 5: Test unread count
    console.log('\n🔢 Step 5: Testing unread count...');
    
    const unreadManagerCount = await prisma.managerNotification.count({
      where: { 
        managerId: testManager.id,
        read: false 
      }
    });
    console.log(`   ✅ Unread manager notifications: ${unreadManagerCount}`);

    const unreadClientCount = await prisma.clientNotification.count({
      where: { 
        clientId: testClient.id,
        read: false 
      }
    });
    console.log(`   ✅ Unread client notifications: ${unreadClientCount}`);

    // Step 6: Test mark as read
    console.log('\n✅ Step 6: Testing mark as read...');
    
    if (managerNotifications.length > 0) {
      const updatedManagerNotification = await prisma.managerNotification.update({
        where: { id: managerNotifications[0].id },
        data: { read: true }
      });
      console.log(`   ✅ Marked manager notification ${updatedManagerNotification.id} as read`);
    }

    if (clientNotifications.length > 0) {
      const updatedClientNotification = await prisma.clientNotification.update({
        where: { id: clientNotifications[0].id },
        data: { read: true }
      });
      console.log(`   ✅ Marked client notification ${updatedClientNotification.id} as read`);
    }

    // Step 7: Final verification
    console.log('\n🎯 Step 7: Final verification...');
    
    const finalUnreadManagerCount = await prisma.managerNotification.count({
      where: { 
        managerId: testManager.id,
        read: false 
      }
    });
    const finalUnreadClientCount = await prisma.clientNotification.count({
      where: { 
        clientId: testClient.id,
        read: false 
      }
    });

    console.log(`   ✅ Final unread manager notifications: ${finalUnreadManagerCount}`);
    console.log(`   ✅ Final unread client notifications: ${finalUnreadClientCount}`);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log(`   - Test Organization: ${testOrg.name} (ID: ${testOrg.id})`);
    console.log(`   - Test Manager: ${testManager.name} (ID: ${testManager.id}, Email: ${testManager.email})`);
    console.log(`   - Test Client: ${testClient.name} (ID: ${testClient.id}, Email: ${testClient.email})`);
    console.log(`   - Total Notifications Created: ${managerNotifications.length + clientNotifications.length}`);

    console.log('\n🔗 Next Steps:');
    console.log('   1. Start your development server: pnpm run dev');
    console.log('   2. Log in as the test manager or client');
    console.log('   3. Check if notifications appear in the header');
    console.log('   4. Test clicking on notifications to mark them as read');

    console.log('\n🔧 Debug Info:');
    console.log(`   - Manager ID for API testing: ${testManager.id}`);
    console.log(`   - Client ID for API testing: ${testClient.id}`);
    console.log(`   - Test URLs:`);
    console.log(`     GET /api/notifications?managerId=${testManager.id}`);
    console.log(`     GET /api/notifications?clientId=${testClient.id}`);

  } catch (error) {
    console.error('❌ Error during testing:', error);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Make sure your database is running');
    console.log('   2. Check your DATABASE_URL environment variable');
    console.log('   3. Run "pnpm prisma generate" if needed');
    console.log('   4. Run "pnpm prisma db push" to sync schema');
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testNotificationStepByStep(); 