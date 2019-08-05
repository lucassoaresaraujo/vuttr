import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import getToken from '../util/token';

import factory from '../factories';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create user', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to validate the creation of a user', async () => {
    const invalidUser = await factory.attrs('InvalidUser');
    const response = await request(app)
      .post('/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
  });

  it('should be able to validate the creation of a repeat user', async () => {
    await factory.create('User', { email: 'lucas.soares.araujo@hotmail.com' });
    const repeatedUser = await factory.attrs('User', {
      email: 'lucas.soares.araujo@hotmail.com',
    });
    const response = await request(app)
      .post('/users')
      .send(repeatedUser);

    expect(response.status).toBe(400);
  });

  it('should be able to update user', async () => {
    const createdUser = await factory.create('User', { password: '123456' });
    const token = await getToken(createdUser);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'lucas.soares.araujo@hotmail.com',
        oldPassword: '123456',
        password: '1234567',
        confirmPassword: '1234567',
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('lucas soares');
  });

  it('should be able to validate user update without valid user', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJpYXQiOjE1NjQ5MDM4NzksImV4cCI6MTU2NTUwODY3OX0.sewT0aHszMzjVplnx9fyD4R9gqg_iGYiVQ8nH6F2fWQ';

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'lucas.soares.araujo@hotmail.com',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to validate password update without confirmPassword', async () => {
    const createdUser = await factory.create('User', { password: '123456' });
    const token = await getToken(createdUser);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'lucas.soares.araujo@hotmail.com',
        oldPassword: '123456',
        password: '1234567',
      });
    expect(response.status).toBe(400);
  });

  it('should be able to validate user update with existing email', async () => {
    const createdUser = await factory.create('User', { password: '123456' });
    await factory.create('User', { email: 'test@test.com' });
    const token = await getToken(createdUser);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'test@test.com',
      });
    expect(response.status).toBe(400);
  });

  it('should be able to validate password update without oldPassword', async () => {
    const createdUser = await factory.create('User', { password: '123456' });
    const token = await getToken(createdUser);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'lucas.soares.araujo@hotmail.com',
        password: '1234567',
        confirmPassword: '1234567',
      });
    expect(response.status).toBe(400);
  });

  it('should be able to validate password update without valid oldPassword', async () => {
    const createdUser = await factory.create('User', { password: '123456' });
    const token = await getToken(createdUser);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'lucas soares',
        email: 'lucas.soares.araujo@hotmail.com',
        oldPassword: '123456234',
        password: '1234567',
        confirmPassword: '1234567',
      });
    expect(response.status).toBe(400);
  });
});
