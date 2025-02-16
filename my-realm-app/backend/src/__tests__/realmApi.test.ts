import request from 'supertest';
import app from '../app';
import { Realm, realms } from '../models/realm';

describe('Realm API Integration Tests', () => {
  beforeEach(() => {
    // Clear the in-memory realms array before each test
    realms.length = 0;
  });

  it('should create realms, add a vassal, transfer the vassal, and fetch realms', async () => {
    // Step 1: Create the first realm
    const realm1Data = { id: '1', x: 10, y: 20, monarch: 'King Arthur' };
    const createRealm1Response = await request(app).post('/api/realms').send(realm1Data);
    expect(createRealm1Response.status).toBe(201);
    expect(createRealm1Response.body).toMatchObject(realm1Data);

    // Step 2: Add a vassal to the first realm
    const vassalData = { id: 'v1', name: 'Sir Lancelot' };
    const addVassalResponse = await request(app)
      .post('/api/realms/1/vassals')
      .send(vassalData);
    expect(addVassalResponse.status).toBe(201);
    expect(addVassalResponse.body).toMatchObject(vassalData);

    // Step 3: Create the second realm
    const realm2Data = { id: '2', x: 30, y: 40, monarch: 'Queen Guinevere' };
    const createRealm2Response = await request(app).post('/api/realms').send(realm2Data);
    expect(createRealm2Response.status).toBe(201);
    expect(createRealm2Response.body).toMatchObject(realm2Data);

    // Step 4: Transfer the vassal from the first realm to the second realm
    const transferData = { fromRealmId: '1', toRealmId: '2', vassalId: 'v1' };
    const transferVassalResponse = await request(app).post('/api/realms/transfer').send(transferData);
    expect(transferVassalResponse.status).toBe(200);
    expect(transferVassalResponse.body).toMatchObject({ message: 'Vassal transferred successfully' });

    // Step 5: Fetch all realms and verify the final state
    const fetchRealmsResponse = await request(app).get('/api/realms');
    expect(fetchRealmsResponse.status).toBe(200);
    expect(fetchRealmsResponse.body).toHaveLength(2);

    const [realm1, realm2] = fetchRealmsResponse.body;

    // Verify the first realm
    expect(realm1.id).toBe('1');
    expect(realm1.monarch).toBe('King Arthur');
    expect(realm1.vassals).toHaveLength(0); // No vassals

    // Verify the second realm
    expect(realm2.id).toBe('2');
    expect(realm2.monarch).toBe('Queen Guinevere');
    expect(realm2.vassals).toHaveLength(1); // One vassal
    expect(realm2.vassals[0]).toMatchObject(vassalData);
  });
});