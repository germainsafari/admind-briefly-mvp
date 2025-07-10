const fetch = require('node-fetch');

async function testSearch() {
  const baseUrl = 'http://localhost:3001';
  
  console.log('Testing Search API...\n');
  
  // Test search for organizations
  try {
    console.log('1. Testing organization search...');
    const orgResponse = await fetch(`${baseUrl}/api/search?q=test&type=organizations`);
    const orgData = await orgResponse.json();
    console.log('Organizations found:', orgData.results?.length || 0);
    console.log('Sample result:', orgData.results?.[0] || 'None');
  } catch (error) {
    console.log('Error searching organizations:', error.message);
  }
  
  // Test search for managers
  try {
    console.log('\n2. Testing manager search...');
    const managerResponse = await fetch(`${baseUrl}/api/search?q=test&type=managers`);
    const managerData = await managerResponse.json();
    console.log('Managers found:', managerData.results?.length || 0);
    console.log('Sample result:', managerData.results?.[0] || 'None');
  } catch (error) {
    console.log('Error searching managers:', error.message);
  }
  
  // Test search for clients
  try {
    console.log('\n3. Testing client search...');
    const clientResponse = await fetch(`${baseUrl}/api/search?q=test&type=clients`);
    const clientData = await clientResponse.json();
    console.log('Clients found:', clientData.results?.length || 0);
    console.log('Sample result:', clientData.results?.[0] || 'None');
  } catch (error) {
    console.log('Error searching clients:', error.message);
  }
  
  // Test search for briefs
  try {
    console.log('\n4. Testing brief search...');
    const briefResponse = await fetch(`${baseUrl}/api/search?q=test&type=briefs`);
    const briefData = await briefResponse.json();
    console.log('Briefs found:', briefData.results?.length || 0);
    console.log('Sample result:', briefData.results?.[0] || 'None');
  } catch (error) {
    console.log('Error searching briefs:', error.message);
  }
  
  // Test search for all
  try {
    console.log('\n5. Testing general search...');
    const allResponse = await fetch(`${baseUrl}/api/search?q=test&type=all`);
    const allData = await allResponse.json();
    console.log('Total results found:', allData.results?.length || 0);
    console.log('Results by type:', allData.results?.reduce((acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1;
      return acc;
    }, {}) || {});
  } catch (error) {
    console.log('Error in general search:', error.message);
  }
  
  console.log('\nSearch API test completed!');
}

testSearch().catch(console.error); 