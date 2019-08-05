import request from 'supertest';
import app from '../../src/app';

export default async (tools = [], token) => {
  const promises = tools.map(tool => {
    return request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);
  });

  await Promise.all(promises);
};
