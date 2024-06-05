import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(201);

    expect(response.body.status).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

  it('/users/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        username: 'admin3',
        password: 'admin3',
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
  });
});
