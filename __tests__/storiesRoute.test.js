const supertest = require('supertest');
const server = require('../index');
const db = require('../database/dbConfig');

beforeEach(async () => {
  // re-run the seeds and start with a fresh database for each test
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  // closes the database connection so the jest command doesn't stall
  await db.destroy();
});

test('get all stories', async () => {
  const getAllStories = await supertest(server)
    .get('/stories')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(200);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.length).toBe(6);
  expect(getAllStories.body[2].storyTitle).toBe('Romero');
});

test('get story by  story id', async () => {
  const getAllStories = await supertest(server)
    .get('/stories/5')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(200);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.story).toBeDefined();
  expect(getAllStories.body.storyTitle).toBeNull();
});

test('get story by username', async () => {
  const getAllStories = await supertest(server)
    .get('/stories/username/myacob2')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(200);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.length).toBe(2);
  expect(getAllStories.body[0].storyTitle).toBe(`it was a long night`);
});

test('get story by user id', async () => {
  const getAllStories = await supertest(server)
    .get('/stories/userid/4')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(200);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.length).toBe(1);
  expect(getAllStories.body[0].storyTitle).toBeNull();
  expect(getAllStories.body[0].username).toBe('bmarten3');
});

test('add story', async () => {
  const getAllStories = await supertest(server)
    .post('/stories/add')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    )
    .send({
      user_id: 4,
      storyAdded: '07/29/2020',
      storyTitle: 'run away',
      story: 'I ran so far away',
    });

  expect(getAllStories.statusCode).toBe(201);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.length).toBe(0);
});

test('update story', async () => {
  const getAllStories = await supertest(server)
    .put('/stories/update/3')
    .send({
      storyTitle: 'ran away',
      story: 'I runned so far away',
    })
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(202);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.length).toBeUndefined();
});

test('delete story', async () => {
  const getAllStories = await supertest(server)
    .delete('/stories/delete/3')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getAllStories.statusCode).toBe(202);
  expect(getAllStories.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getAllStories.body.message).toBe('Story is gone');
});

test('get all users', async () => {
  const getallusers = await supertest(server)
    .get('/users')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getallusers.statusCode).toBe(200);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getallusers.body.length).toBe(5);
  expect(getallusers.body[2].username).toBe('myacob2');
});
test('get user by id', async () => {
  const getallusers = await supertest(server)
    .get('/users/1')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getallusers.statusCode).toBe(200);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getallusers.body.username).toBe('gthreadgall0');
});

test('register user', async () => {
  const getallusers = await supertest(server).post('/users/register').send({
    username: 'rocky',
    password: 'test123',
  });

  expect(getallusers.statusCode).toBe(201);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getallusers.body.username).toBe('rocky');
  expect(getallusers.body.password).toBeDefined();
});

test('login user', async () => {
  const getallusers = await supertest(server).post('/users/login').send({
    username: 'bmarten3',
    password: 'test123',
  });

  expect(getallusers.statusCode).toBe(200);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  
  expect(getallusers.body.message).toBe('Welcome bmarten3!');
  expect(getallusers.body.userInfo.username).toBe('bmarten3');
  expect(getallusers.body.token).toBeDefined();
});

test('update user', async () => {
  const getallusers = await supertest(server)
    .put('/users/update/1')
    .send({
      username: 'draco',
      password: 'test123',
    })
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getallusers.statusCode).toBe(201);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getallusers.body.username).toBe('draco');
});

test('delete user', async () => {
  const getallusers = await supertest(server)
    .delete('/users/delete/1')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6ImJtYXJ0ZW4zIiwiaWF0IjoxNTk2MDY2MjQzLCJleHAiOjE1OTYxNTI2NDN9.ueSkffECO4TD8S_V_loBhhMxsYdIlmAoU1-4urIvD-s'
    );
  expect(getallusers.statusCode).toBe(204);
  expect(getallusers.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(getallusers.body).toBeUndefined();
});
