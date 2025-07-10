const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001'; // Adjust port if needed

async function testNotificationAPI() {
  console.log('🧪 Testing Notification API Endpoints...\n');

  try {
    // First, let's get some test data from the database
    console.log('📊 Getting test data...');
    
    // Test 1: Create a manager notification
    console.log('1️⃣ Testing POST /api/notifications (manager notification)...');
    const managerNotificationData = {
      managerId: 1, // You'll need to replace with actual manager ID
      message: 'Test manager notification via API',
      link: '/admin/briefs/1'
    };

    const managerResponse = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(managerNotificationData)
    });

    if (managerResponse.ok) {
      const managerNotification = await managerResponse.json();
      console.log(`✅ Created manager notification: ${managerNotification.message} (ID: ${managerNotification.id})`);
    } else {
      const error = await managerResponse.text();
      console.log(`❌ Failed to create manager notification: ${error}`);
    }

    // Test 2: Create a client notification
    console.log('\n2️⃣ Testing POST /api/notifications (client notification)...');
    const clientNotificationData = {
      clientId: 1, // You'll need to replace with actual client ID
      message: 'Test client notification via API',
      link: '/client/brief-success?id=1'
    };

    const clientResponse = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientNotificationData)
    });

    if (clientResponse.ok) {
      const clientNotification = await clientResponse.json();
      console.log(`✅ Created client notification: ${clientNotification.message} (ID: ${clientNotification.id})`);
    } else {
      const error = await clientResponse.text();
      console.log(`❌ Failed to create client notification: ${error}`);
    }

    // Test 3: Get manager notifications
    console.log('\n3️⃣ Testing GET /api/notifications?managerId=1...');
    const getManagerResponse = await fetch(`${BASE_URL}/api/notifications?managerId=1`);
    
    if (getManagerResponse.ok) {
      const managerNotifications = await getManagerResponse.json();
      console.log(`✅ Retrieved ${managerNotifications.length} manager notifications`);
      if (managerNotifications.length > 0) {
        console.log(`   Latest: ${managerNotifications[0].message}`);
      }
    } else {
      const error = await getManagerResponse.text();
      console.log(`❌ Failed to get manager notifications: ${error}`);
    }

    // Test 4: Get client notifications
    console.log('\n4️⃣ Testing GET /api/notifications?clientId=1...');
    const getClientResponse = await fetch(`${BASE_URL}/api/notifications?clientId=1`);
    
    if (getClientResponse.ok) {
      const clientNotifications = await getClientResponse.json();
      console.log(`✅ Retrieved ${clientNotifications.length} client notifications`);
      if (clientNotifications.length > 0) {
        console.log(`   Latest: ${clientNotifications[0].message}`);
      }
    } else {
      const error = await getClientResponse.text();
      console.log(`❌ Failed to get client notifications: ${error}`);
    }

    // Test 5: Mark notification as read (if we have notifications)
    console.log('\n5️⃣ Testing PATCH /api/notifications (mark as read)...');
    
    // Try to mark the first manager notification as read
    const markReadData = {
      id: 1, // You'll need to replace with actual notification ID
      type: 'manager'
    };

    const markReadResponse = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(markReadData)
    });

    if (markReadResponse.ok) {
      const updatedNotification = await markReadResponse.json();
      console.log(`✅ Marked notification as read: ${updatedNotification.read}`);
    } else {
      const error = await markReadResponse.text();
      console.log(`❌ Failed to mark notification as read: ${error}`);
    }

    // Test 6: Test error cases
    console.log('\n6️⃣ Testing error cases...');
    
    // Test missing parameters
    const errorResponse1 = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Missing ID' })
    });
    
    if (!errorResponse1.ok) {
      const error = await errorResponse1.json();
      console.log(`✅ Correctly rejected missing parameters: ${error.error}`);
    }

    // Test invalid notification type
    const errorResponse2 = await fetch(`${BASE_URL}/api/notifications`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 1, type: 'invalid' })
    });
    
    if (!errorResponse2.ok) {
      const error = await errorResponse2.json();
      console.log(`✅ Correctly rejected invalid type: ${error.error}`);
    }

    console.log('\n🎉 API testing completed!');
    console.log('\n📝 Notes:');
    console.log('- You may need to update the managerId and clientId values with actual IDs from your database');
    console.log('- Run the database test script first to create test data');
    console.log('- Make sure your development server is running on the correct port');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Your development server is running');
    console.log('2. The BASE_URL is correct (check the port)');
    console.log('3. You have test data in your database');
  }
}

// Run the test
testNotificationAPI(); 