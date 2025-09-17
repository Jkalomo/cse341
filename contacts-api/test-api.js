const baseUrl = process.argv[2] || 'http://localhost:8080';

console.log(`Testing API at: ${baseUrl}`);

// Test functions
async function testAPI() {
  let createdContactId = null;
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing health check...');
    const health = await fetch(`${baseUrl}/health`);
    console.log('Health:', await health.text());
    
    // Test 2: Get all contacts
    console.log('\n2. Getting all contacts...');
    const allContacts = await fetch(`${baseUrl}/contacts`);
    const contacts = await allContacts.json();
    console.log(`Found ${contacts.length} existing contacts`);
    
    // Test 3: Create new contact
    console.log('\n3. Creating new contact...');
    const newContact = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
      favoriteColor: "blue",
      birthday: "1990-01-01"
    };
    
    const createResponse = await fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    });
    
    const createResult = await createResponse.json();
    console.log('Create result:', createResult);
    createdContactId = createResult.contactId;
    
    // Test 4: Get the created contact
    if (createdContactId) {
      console.log('\n4. Getting created contact...');
      const getContact = await fetch(`${baseUrl}/contacts/${createdContactId}`);
      const contact = await getContact.json();
      console.log('Retrieved contact:', contact);
      
      // Test 5: Update the contact
      console.log('\n5. Updating contact...');
      const updatedContact = {
        ...newContact,
        lastName: "User Updated",
        favoriteColor: "green"
      };
      
      const updateResponse = await fetch(`${baseUrl}/contacts/${createdContactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact)
      });
      
      console.log('Update status:', updateResponse.status);
      
      // Test 6: Delete the contact
      console.log('\n6. Deleting contact...');
      const deleteResponse = await fetch(`${baseUrl}/contacts/${createdContactId}`, {
        method: 'DELETE'
      });
      
      const deleteResult = await deleteResponse.json();
      console.log('Delete result:', deleteResult);
    }
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Polyfill fetch for Node.js
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testAPI();