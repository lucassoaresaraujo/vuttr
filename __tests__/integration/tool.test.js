import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';
import getToken from '../util/token';
import createTools from '../util/createTools';

let token;

describe('Tools', () => {
  beforeEach(async () => {
    await truncate();
    token = await getToken();
  });

  it('should be able to create tool', async () => {
    const tool = await factory.attrs('Tool');
    const response = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to validate the creation of a tool', async () => {
    const invalidTool = await factory.attrs('InvalidTool');
    const response = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidTool);

    expect(response.status).toBe(400);
  });

  it('should be able to delete a tool', async () => {
    const tool = await factory.create('Tool');
    const response = await request(app)
      .delete(`/tools/${tool.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should be able to return 404 when deleting a nonexistent tool', async () => {
    const response = await request(app)
      .delete(`/tools/1`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });

  it('should be able to get all tools', async () => {
    await factory.create('Tool');
    await factory.create('Tool');
    const response = await request(app)
      .get(`/tools`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should be able to get filtered tools', async () => {
    const tool1 = await factory.attrs('Tool', { tags: ['node', 'jwt'] });
    const tool2 = await factory.attrs('Tool', { tags: ['sql', 'database'] });
    await createTools([tool1, tool2], token);

    const response = await request(app)
      .get(`/tools?tag=node`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
