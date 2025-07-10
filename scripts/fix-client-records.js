const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function fixClientRecords() {
  try {
    console.log('Checking for client users without corresponding Client records...');
    
    // Find all users with role 'client'
    const clientUsers = await prisma.user.findMany({
      where: { role: 'client' }
    });
    
    console.log(`Found ${clientUsers.length} client users`);
    
    for (const user of clientUsers) {
      console.log(`Checking user: ${user.email} (ID: ${user.id})`);
      
      // Check if a Client record exists for this user
      const existingClient = await prisma.client.findUnique({
        where: { email: user.email }
      });
      
      if (!existingClient) {
        console.log(`Creating Client record for ${user.email}...`);
        
        // Create a new Client record
        const newClient = await prisma.client.create({
          data: {
            name: user.email.split('@')[0] || 'Client',
            email: user.email,
            organization_id: user.organization_id,
            status: 'active'
          }
        });
        
        console.log(`Created Client record with ID: ${newClient.id}`);
      } else {
        console.log(`Client record already exists for ${user.email} (ID: ${existingClient.id})`);
      }
    }
    
    console.log('Client record check completed!');
  } catch (error) {
    console.error('Error fixing client records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixClientRecords(); 