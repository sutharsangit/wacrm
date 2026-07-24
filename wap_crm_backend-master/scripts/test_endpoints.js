/**
 * Integration Test Script for WACRM Backend API Endpoints
 * 
 * Runs health checks, registration, authentication, and CRUD operations 
 * directly against the running API server.
 */

const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('🚀 Starting Backend API Endpoints Integration Test...');
  console.log('----------------------------------------------------');

  try {
    // 1. Health Check
    console.log('📋 Testing Endpoint: GET /health');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    if (healthRes.status === 200 && healthData.success) {
      console.log('✅ GET /health: PASSED\n');
    } else {
      throw new Error(`GET /health failed with status ${healthRes.status}`);
    }

    // 2. Auth: Register a new business organization
    console.log('📋 Testing Endpoint: POST /api/v1/auth/register');
    const uniqueEmail = `test_owner_${Math.random().toString(36).substring(7)}@whatsappcrm.com`;
    const registerBody = {
      companyName: 'Test Apex Properties Ltd',
      industry: 'Real Estate',
      firstName: 'Alice',
      lastName: 'Smith',
      email: uniqueEmail,
      password: 'securepassword123'
    };

    const registerRes = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerBody)
    });
    const registerData = await registerRes.json();

    if (registerRes.status === 201 && registerData.success) {
      console.log('✅ POST /api/v1/auth/register: PASSED');
      console.log(`👤 Registered Owner Email: ${uniqueEmail}\n`);
    } else {
      console.error('Response Data:', registerData);
      throw new Error(`POST /api/v1/auth/register failed with status ${registerRes.status}`);
    }

    // 3. Auth: Login
    console.log('📋 Testing Endpoint: POST /api/v1/auth/login');
    const loginBody = {
      email: uniqueEmail,
      password: 'securepassword123'
    };

    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginBody)
    });
    const loginData = await loginRes.json();

    let accessToken = '';
    if (loginRes.status === 200 && loginData.success) {
      accessToken = loginData.data.tokens.accessToken;
      console.log('✅ POST /api/v1/auth/login: PASSED');
      console.log('🔑 JWT Access Token retrieved successfully.\n');
    } else {
      console.error('Response Data:', loginData);
      throw new Error(`POST /api/v1/auth/login failed with status ${loginRes.status}`);
    }

    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 4. Users: Get organization users list
    console.log('📋 Testing Endpoint: GET /api/v1/users');
    const usersRes = await fetch(`${BASE_URL}/api/v1/users`, {
      method: 'GET',
      headers: authHeaders
    });
    const usersData = await usersRes.json();

    if (usersRes.status === 200 && usersData.success) {
      console.log('✅ GET /api/v1/users: PASSED');
      console.log(`👥 Total users in organization: ${usersData.data.length}\n`);
    } else {
      console.error('Response Data:', usersData);
      throw new Error(`GET /api/v1/users failed with status ${usersRes.status}`);
    }

    // 5. Organizations: Get settings
    console.log('📋 Testing Endpoint: GET /api/v1/organizations');
    const orgRes = await fetch(`${BASE_URL}/api/v1/organizations`, {
      method: 'GET',
      headers: authHeaders
    });
    const orgData = await orgRes.json();

    if (orgRes.status === 200 && orgData.success) {
      console.log('✅ GET /api/v1/organizations: PASSED');
      console.log(`🏢 Organization details: ${orgData.data.name} (Timezone: ${orgData.data.timezone})\n`);
    } else {
      console.error('Response Data:', orgData);
      throw new Error(`GET /api/v1/organizations failed with status ${orgRes.status}`);
    }

    // 6. Leads: Create a new lead
    console.log('📋 Testing Endpoint: POST /api/v1/leads');
    const leadBody = {
      name: 'John Doe',
      phone: '+15550199',
      email: 'johndoe@example.com',
      company: 'Doe Inc',
      leadSource: 'Meta Ads',
      campaign: 'Summer Promo 2026',
      priority: 'High'
    };

    const leadCreateRes = await fetch(`${BASE_URL}/api/v1/leads`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(leadBody)
    });
    const leadCreateData = await leadCreateRes.json();

    let createdLeadId = '';
    if (leadCreateRes.status === 201 && leadCreateData.success) {
      createdLeadId = leadCreateData.data.id;
      console.log('✅ POST /api/v1/leads: PASSED');
      console.log(`📞 Created Lead ID: ${createdLeadId}\n`);
    } else {
      console.error('Response Data:', leadCreateData);
      throw new Error(`POST /api/v1/leads failed with status ${leadCreateRes.status}`);
    }

    // 7. Leads: List all leads
    console.log('📋 Testing Endpoint: GET /api/v1/leads');
    const leadsListRes = await fetch(`${BASE_URL}/api/v1/leads`, {
      method: 'GET',
      headers: authHeaders
    });
    const leadsListData = await leadsListRes.json();

    if (leadsListRes.status === 200 && leadsListData.success) {
      console.log('✅ GET /api/v1/leads: PASSED');
      console.log(`📊 Number of leads found: ${leadsListData.data.data.length}\n`);
    } else {
      console.error('Response Data:', leadsListData);
      throw new Error(`GET /api/v1/leads failed with status ${leadsListRes.status}`);
    }

    // 8. CRM: Add note to lead
    console.log('📋 Testing Endpoint: POST /api/v1/crm/notes');
    const noteBody = {
      leadId: createdLeadId,
      content: 'Followed up via call. Highly interested in enterprise package.'
    };

    const noteRes = await fetch(`${BASE_URL}/api/v1/crm/notes`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(noteBody)
    });
    const noteData = await noteRes.json();

    if (noteRes.status === 201 && noteData.success) {
      console.log('✅ POST /api/v1/crm/notes: PASSED');
      console.log('📝 Added internal note to CRM Timeline.\n');
    } else {
      console.error('Response Data:', noteData);
      throw new Error(`POST /api/v1/crm/notes failed with status ${noteRes.status}`);
    }

    // 9. Analytics: Get dashboard KPI metrics
    console.log('📋 Testing Endpoint: GET /api/v1/analytics/dashboard');
    const analyticsRes = await fetch(`${BASE_URL}/api/v1/analytics/dashboard`, {
      method: 'GET',
      headers: authHeaders
    });
    const analyticsData = await analyticsRes.json();

    if (analyticsRes.status === 200 && analyticsData.success) {
      console.log('✅ GET /api/v1/analytics/dashboard: PASSED');
      console.log('📊 Successfully fetched CRM dashboard KPI data.\n');
    } else {
      console.error('Response Data:', analyticsData);
      throw new Error(`GET /api/v1/analytics/dashboard failed with status ${analyticsRes.status}`);
    }

    console.log('----------------------------------------------------');
    console.log('🎉 ALL BACKEND API ENDPOINT INTEGRATION TESTS PASSED!');
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('\n❌ INTEGRATION TEST FAILED:');
    console.error(error.message);
    process.exit(1);
  }
}

runTests();
