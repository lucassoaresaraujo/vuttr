import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

import invalidToken from '../util/invalidToken';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to generate jwt token', async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123456' });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to validate the generate of a jwt token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'notemail', password: '123' });

    expect(response.status).toBe(400);
  });

  it('should be able to validate the generation of a nonexistent user token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'nonexistenteuser@hotmail.com', password: '123456' });

    expect(response.status).toBe(404);
  });

  it("should be able to validate a user's password", async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '1234567' });

    expect(response.status).toBe(401);
  });

  it('should be able to validate a jwt token', async () => {
    const response = await request(app)
      .get(`/tools`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .send();

    expect(response.status).toBe(401);
  });

  it('should be able to validate a jwt token not provided', async () => {
    const response = await request(app)
      .get(`/tools`)
      .send();

    expect(response.status).toBe(401);
  });
});
