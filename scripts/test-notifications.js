const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function testNotifications() {
  try {
    console.log('🧪 Testing Notification System...\n');

    // 1. Check if we have any existing data
    console.log('📊 Checking existing data...');
    const [organizations, managers, clients, managerNotifications, clientNotifications] = await Promise.all([
      prisma.organization.findMany(),
      prisma.manager.findMany(),
      prisma.client.findMany(),
      prisma.managerNotification.findMany(),
      prisma.clientNotification.findMany(),
    ]);

    console.log(`Organizations: ${organizations.length}`);
    console.log(`Managers: ${managers.length}`);
    console.log(`Clients: ${clients.length}`);
    console.log(`Manager Notifications: ${managerNotifications.length}`);
    console.log(`Client Notifications: ${clientNotifications.length}\n`);

    // 2. Create test data if needed
    let testOrg, testManager, testClient;

    if (organizations.length === 0) {
      console.log('🏢 Creating test organization...');
      testOrg = await prisma.organization.create({
        data: {
          name: 'Test Organization',
          ai_support: true
        }
      });
      console.log(`Created organization: ${testOrg.name} (ID: ${testOrg.id})`);
    } else {
      testOrg = organizations[0];
      console.log(`Using existing organization: ${testOrg.name} (ID: ${testOrg.id})`);
    }

    if (managers.length === 0) {
      console.log('👨‍💼 Creating test manager...');
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
    } else {
      testManager = managers[0];
      console.log(`Using existing manager: ${testManager.name} (ID: ${testManager.id})`);
    }

    if (clients.length === 0) {
      console.log('👤 Creating test client...');
      testClient = await prisma.client.create({
        data: {
          name: 'Test Client',
          email: 'test.client@example.com',
          organization_id: testOrg.id,
          status: 'active'
        }
      });
      console.log(`Created client: ${testClient.name} (ID: ${testClient.id})`);
    } else {
      testClient = clients[0];
      console.log(`Using existing client: ${testClient.name} (ID: ${testClient.id})`);
    }

    // 3. Test creating notifications via API
    console.log('\n🔔 Testing notification creation...');

    // Test manager notification
    console.log('Creating manager notification...');
    const managerNotification = await prisma.managerNotification.create({
      data: {
        managerId: testManager.id,
        message: 'Test notification for manager - New brief available!',
        link: '/admin/briefs/1',
        read: false
      }
    });
    console.log(`✅ Created manager notification: ${managerNotification.message} (ID: ${managerNotification.id})`);

    // Test client notification
    console.log('Creating client notification...');
    const clientNotification = await prisma.clientNotification.create({
      data: {
        clientId: testClient.id,
        message: 'Test notification for client - Your brief was sent successfully!',
        link: '/client/brief-success?id=1',
        read: false
      }
    });
    console.log(`✅ Created client notification: ${clientNotification.message} (ID: ${clientNotification.id})`);

    // 4. Test fetching notifications
    console.log('\n📥 Testing notification fetching...');

    // Test GET /api/notifications?managerId=X
    console.log(`Fetching notifications for manager ID: ${testManager.id}`);
    const managerNotifications = await prisma.managerNotification.findMany({
      where: { managerId: testManager.id },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${managerNotifications.length} notifications for manager`);

    // Test GET /api/notifications?clientId=X
    console.log(`Fetching notifications for client ID: ${testClient.id}`);
    const clientNotifications = await prisma.clientNotification.findMany({
      where: { clientId: testClient.id },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${clientNotifications.length} notifications for client`);

    // 5. Test marking notifications as read
    console.log('\n✅ Testing mark as read...');

    if (managerNotifications.length > 0) {
      const notificationToMark = managerNotifications[0];
      console.log(`Marking manager notification ${notificationToMark.id} as read...`);
      
      const updatedNotification = await prisma.managerNotification.update({
        where: { id: notificationToMark.id },
        data: { read: true }
      });
      console.log(`✅ Marked notification as read: ${updatedNotification.read}`);
    }

    if (clientNotifications.length > 0) {
      const notificationToMark = clientNotifications[0];
      console.log(`Marking client notification ${notificationToMark.id} as read...`);
      
      const updatedNotification = await prisma.clientNotification.update({
        where: { id: notificationToMark.id },
        data: { read: true }
      });
      console.log(`✅ Marked notification as read: ${updatedNotification.read}`);
    }

    // 6. Test unread count
    console.log('\n🔢 Testing unread count...');
    const unreadManagerNotifications = await prisma.managerNotification.count({
      where: { 
        managerId: testManager.id,
        read: false 
      }
    });
    const unreadClientNotifications = await prisma.clientNotification.count({
      where: { 
        clientId: testClient.id,
        read: false 
      }
    });

    console.log(`Unread manager notifications: ${unreadManagerNotifications}`);
    console.log(`Unread client notifications: ${unreadClientNotifications}`);

    // 7. Test brief creation with notifications
    console.log('\n📋 Testing brief creation with notifications...');
    
    const testBrief = await prisma.brief.create({
      data: {
        project_name: 'Test Project',
        project_type: 'General',
        project_description: 'A test project for notification testing',
        client_id: testClient.id,
        organization_id: testOrg.id,
        status: 'Sent',
        progress: 0,
        attachments: [],
        links: []
      }
    });

    console.log(`Created test brief: ${testBrief.project_name} (ID: ${testBrief.id})`);

    // Create notifications for the brief
    const briefManagerNotification = await prisma.managerNotification.create({
      data: {
        managerId: testManager.id,
        message: `A new brief "${testBrief.project_name}" has been sent to you!`,
        link: `/admin/briefs/${testBrief.id}`,
      }
    });

    const briefClientNotification = await prisma.clientNotification.create({
      data: {
        clientId: testClient.id,
        message: `Your brief "${testBrief.project_name}" was sent successfully!`,
        link: `/client/brief-success?id=${testBrief.id}`,
      }
    });

    console.log(`✅ Created brief-related notifications for manager and client`);

    console.log('\n🎉 Notification system test completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Test Organization: ${testOrg.name} (ID: ${testOrg.id})`);
    console.log(`- Test Manager: ${testManager.name} (ID: ${testManager.id})`);
    console.log(`- Test Client: ${testClient.name} (ID: ${testClient.id})`);
    console.log(`- Test Brief: ${testBrief.project_name} (ID: ${testBrief.id})`);
    console.log(`- Total Manager Notifications: ${await prisma.managerNotification.count()}`);
    console.log(`- Total Client Notifications: ${await prisma.clientNotification.count()}`);

    console.log('\n🔗 API Endpoints to test:');
    console.log(`- GET /api/notifications?managerId=${testManager.id}`);
    console.log(`- GET /api/notifications?clientId=${testClient.id}`);
    console.log(`- POST /api/notifications (with managerId/clientId, message, link)`);
    console.log(`- PATCH /api/notifications (with id, type)`);

  } catch (error) {
    console.error('❌ Error testing notifications:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testNotifications(); 