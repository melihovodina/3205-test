import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a short URL with a unique alias', async () => {
    const createUrlDto = {
      originalUrl: 'https://example.com',
      alias: 'uniquealias',
    };

    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send(createUrlDto)
      .expect(201);

    expect(response.body).toHaveProperty('shortUrl', 'uniquealias');
    expect(response.body).toHaveProperty('originalUrl', 'https://example.com');
  });

  it('should redirect to the original URL', async () => {
    const createUrlDto = {
      originalUrl: 'https://example.com',
      alias: 'redirectalias',
    };

    await request(app.getHttpServer())
      .post('/shorten')
      .send(createUrlDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/redirectalias')
      .expect(302);

    expect(response.header.location).toBe('https://example.com');
  });
});