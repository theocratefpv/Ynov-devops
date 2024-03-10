const request = require('supertest');
const app = require('../../app');

describe('get users endpoint', () => {
    it('should return collection of users', async () => {
        const resp = await request(app).get('/users');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
        expect(resp.body.data).toHaveLength(2);
    });

    it('should fail when user not found', async () => {
        const resp = await request(app).get('/users/10');
        expect(resp.statusCode).toEqual(404);
        expect(resp.body).not.toBeNull();
        expect(resp.body).not.toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body.success).toBeFalsy();
    });
});

describe('post users endpoint', () => {
    it('should add user successfully', async () => {
        const resp = await request(app).post('/users').send({
            username: 'test',
            fullName: 'My USER'
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.success).toBeTruthy();
        expect(resp.body.id).toEqual(3);
    });

    it('should fail when property to add book is missing', async () => {
        const resp = await request(app).post('/users').send({
            username: 'test'
        });
        expect(resp.statusCode).toEqual(400);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body.success).toBeFalsy();
    });
});