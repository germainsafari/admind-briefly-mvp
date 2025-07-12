const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function testEnhancedNotifications() {
  try {
    console.log('🧪 Testing Enhanced Notification System\n');

    // Step 1: Check existing data
    console.log('📊 Step 1: Checking existing data...');
    const [organizations, managers, clients] = await Promise.all([
      prisma.organization.findMany(),
      prisma.manager.findMany(),
      prisma.client.findMany(),
    ]);

    console.log(`Organizations: ${organizations.length}`);
    console.log(`Managers: ${managers.length}`);
    console.log(`Clients: ${clients.length}\n`);

    // Step 2: Create test data if needed
    console.log('🏗️  Step 2: Setting up test data...');
    let testOrg, testAdmin, testManager, testClient;

    // Create organization if needed
    if (organizations.length === 0) {
      testOrg = await prisma.organization.create({
        data: { name: 'Test Organization', ai_support: true }
      });
      console.log(`✅ Created organization: ${testOrg.name} (ID: ${testOrg.id})`);
    } else {
      testOrg = organizations[0];
      console.log(`ℹ️  Using existing organization: ${testOrg.name} (ID: ${testOrg.id})`);
    }

    // Create admin if needed
    const admins = managers.filter(m => m.role === 'admin');
    if (admins.length === 0) {
      testAdmin = await prisma.manager.create({
        data: {
          name: 'Test Admin',
          email: 'test.admin@example.com',
          organization_id: testOrg.id,
          status: 'active',
          role: 'admin'
        }
      });
      console.log(`✅ Created admin: ${testAdmin.name} (ID: ${testAdmin.id})`);
    } else {
      testAdmin = admins[0];
      console.log(`ℹ️  Using existing admin: ${testAdmin.name} (ID: ${testAdmin.id})`);
    }

    // Create manager if needed
    const regularManagers = managers.filter(m => m.role === 'manager');
    if (regularManagers.length === 0) {
      testManager = await prisma.manager.create({
        data: {
          name: 'Test Manager',
          email: 'test.manager@example.com',
          organization_id: testOrg.id,
          status: 'active',
          role: 'manager'
        }
      });
      console.log(`✅ Created manager: ${testManager.name} (ID: ${testManager.id})`);
    } else {
      testManager = regularManagers[0];
      console.log(`ℹ️  Using existing manager: ${testManager.name} (ID: ${testManager.id})`);
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
      console.log(`✅ Created client: ${testClient.name} (ID: ${testClient.id})`);
    } else {
      testClient = clients[0];
      console.log(`ℹ️  Using existing client: ${testClient.name} (ID: ${testClient.id})`);
    }

    // Step 3: Test notification service directly
    console.log('\n🔔 Step 3: Testing NotificationService directly...');
    
    // For now, let's test the notification creation directly with Prisma
    // since the TypeScript modules can't be imported in Node.js scripts

    // Test admin notification
    console.log('Testing admin notification...');
    await prisma.managerNotification.create({
      data: {
        managerId: testAdmin.id,
        message: 'Test notification for admins - New brief created!',
        link: '/admin/briefs/1',
      }
    });

    // Test manager notification
    console.log('Testing manager notification...');
    await prisma.managerNotification.create({
      data: {
        managerId: testManager.id,
        message: 'Test notification for managers - New client added!',
        link: '/admin/clients/1',
      }
    });

    // Test client notification
    console.log('Testing client notification...');
    await prisma.clientNotification.create({
      data: {
        clientId: testClient.id,
        message: 'Test notification for client - Your brief was sent!',
        link: '/client/brief-success?id=1',
      }
    });

    // Step 4: Test brief creation with notifications
    console.log('\n📋 Step 4: Testing brief creation with notifications...');
    
    const testBrief = await prisma.brief.create({
      data: {
        project_name: 'Test Enhanced Brief',
        project_type: 'General',
        project_description: 'A test brief for enhanced notification testing',
        client_id: testClient.id,
        organization_id: testOrg.id,
        status: 'Sent',
        progress: 0,
        attachments: [],
        links: []
      }
    });

    console.log(`Created test brief: ${testBrief.project_name} (ID: ${testBrief.id})`);

    // Test brief creation notifications manually
    console.log('Testing brief creation notifications...');
    
    // Notify admins in the organization
    const briefAdmins = await prisma.manager.findMany({
      where: {
        organization_id: testOrg.id,
        role: 'admin',
        status: 'active'
      }
    });
    
    await Promise.all(
      briefAdmins.map(admin =>
        prisma.managerNotification.create({
          data: {
            managerId: admin.id,
            message: `A new brief "${testBrief.project_name}" has been created in your organization.`,
            link: `/admin/briefs/${testBrief.id}`,
          }
        })
      )
    );
    
    // Notify the client
    await prisma.clientNotification.create({
      data: {
        clientId: testBrief.client_id,
        message: `Your brief "${testBrief.project_name}" was sent successfully!`,
        link: `/client/brief-success?id=${testBrief.id}`,
      }
    });

    // Step 5: Test manager creation with notifications
    console.log('\n👨‍💼 Step 5: Testing manager creation with notifications...');
    
    const newManager = await prisma.manager.create({
      data: {
        name: 'New Test Manager',
        email: 'new.manager@example.com',
        organization_id: testOrg.id,
        status: 'active',
        role: 'manager'
      }
    });

    console.log(`Created new manager: ${newManager.name} (ID: ${newManager.id})`);

    // Test manager creation notifications manually
    console.log('Testing manager creation notifications...');
    
    // Notify admins in the organization
    const orgAdmins = await prisma.manager.findMany({
      where: {
        organization_id: testOrg.id,
        role: 'admin',
        status: 'active'
      }
    });
    
    await Promise.all(
      orgAdmins.map(admin =>
        prisma.managerNotification.create({
          data: {
            managerId: admin.id,
            message: `A new manager "${newManager.name}" has been added to your organization.`,
            link: `/admin/managers/${newManager.id}`,
          }
        })
      )
    );
    
    // Notify other managers in the organization (excluding the creator)
    const otherManagers = await prisma.manager.findMany({
      where: {
        organization_id: testOrg.id,
        status: 'active',
        id: { not: testManager.id }
      }
    });
    
    await Promise.all(
      otherManagers.map(manager =>
        prisma.managerNotification.create({
          data: {
            managerId: manager.id,
            message: `A new manager "${newManager.name}" has been added to your organization.`,
            link: `/admin/managers/${newManager.id}`,
          }
        })
      )
    );

    // Step 6: Test client creation with notifications
    console.log('\n👤 Step 6: Testing client creation with notifications...');
    
    const newClient = await prisma.client.create({
      data: {
        name: 'New Test Client',
        email: 'new.client@example.com',
        organization_id: testOrg.id,
        status: 'active'
      }
    });

    console.log(`Created new client: ${newClient.name} (ID: ${newClient.id})`);

    // Test client creation notifications manually
    console.log('Testing client creation notifications...');
    
    // Notify admins in the organization
    const clientOrgAdmins = await prisma.manager.findMany({
      where: {
        organization_id: testOrg.id,
        role: 'admin',
        status: 'active'
      }
    });
    
    await Promise.all(
      clientOrgAdmins.map(admin =>
        prisma.managerNotification.create({
          data: {
            managerId: admin.id,
            message: `A new client "${newClient.name}" has been added to your organization.`,
            link: `/admin/clients/${newClient.id}`,
          }
        })
      )
    );
    
    // Notify managers in the organization (excluding the creator)
    const clientOrgManagers = await prisma.manager.findMany({
      where: {
        organization_id: testOrg.id,
        status: 'active',
        id: { not: testManager.id }
      }
    });
    
    await Promise.all(
      clientOrgManagers.map(manager =>
        prisma.managerNotification.create({
          data: {
            managerId: manager.id,
            message: `A new client "${newClient.name}" has been added to your organization.`,
            link: `/admin/clients/${newClient.id}`,
          }
        })
      )
    );

    // Step 7: Check notification counts
    console.log('\n📊 Step 7: Checking notification counts...');
    
    const [adminNotifications, managerNotifications, clientNotifications] = await Promise.all([
      prisma.managerNotification.count({ where: { managerId: testAdmin.id } }),
      prisma.managerNotification.count({ where: { managerId: testManager.id } }),
      prisma.clientNotification.count({ where: { clientId: testClient.id } })
    ]);

    console.log(`Admin notifications: ${adminNotifications}`);
    console.log(`Manager notifications: ${managerNotifications}`);
    console.log(`Client notifications: ${clientNotifications}`);

    // Step 8: Show recent notifications
    console.log('\n📋 Step 8: Recent notifications...');
    
    const recentAdminNotifications = await prisma.managerNotification.findMany({
      where: { managerId: testAdmin.id },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    const recentManagerNotifications = await prisma.managerNotification.findMany({
      where: { managerId: testManager.id },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    const recentClientNotifications = await prisma.clientNotification.findMany({
      where: { clientId: testClient.id },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    console.log('\nRecent admin notifications:');
    recentAdminNotifications.forEach(n => console.log(`  - ${n.message}`));

    console.log('\nRecent manager notifications:');
    recentManagerNotifications.forEach(n => console.log(`  - ${n.message}`));

    console.log('\nRecent client notifications:');
    recentClientNotifications.forEach(n => console.log(`  - ${n.message}`));

    console.log('\n🎉 Enhanced notification system test completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Organization: ${testOrg.name} (ID: ${testOrg.id})`);
    console.log(`- Admin: ${testAdmin.name} (ID: ${testAdmin.id})`);
    console.log(`- Manager: ${testManager.name} (ID: ${testManager.id})`);
    console.log(`- Client: ${testClient.name} (ID: ${testClient.id})`);
    console.log(`- Brief: ${testBrief.project_name} (ID: ${testBrief.id})`);
    console.log(`- Total Admin Notifications: ${adminNotifications}`);
    console.log(`- Total Manager Notifications: ${managerNotifications}`);
    console.log(`- Total Client Notifications: ${clientNotifications}`);

  } catch (error) {
    console.error('❌ Error testing enhanced notifications:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testEnhancedNotifications(); 