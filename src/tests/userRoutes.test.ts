const request = require('supertest');
import app from '../server';


describe('Signup Function', () => {
  it('should create a new user when valid data is provided', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    // Use supertest to simulate a request to the signup route
    const response = await request(app).post("/api/users/signup").send(userData);

    // Assertions
    expect(response.status).toBe(201); // Check for a successful status code
    expect(response.body.message).toBe('User registered successfully'); // Check the response message
    expect(response.body.user).toHaveProperty('id'); // Check if the user object has an 'id'
    expect(response.body.user.username).toBe('testuser'); // Check the username in the response
    expect(response.body.user.email).toBe('testuser@example.com'); // Check the email in the response
    // You can add more specific assertions as needed
  });

  it('should return an error when invalid Email is provided', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuserexample.com',
      password: 'password123',
    };

      // Use supertest to simulate a request to the signup route
      const response = await request(app).post("/api/users/signup").send(userData);

      // Assertions for the error response
      expect(response.status).toBe(400); // Check for a successful status code
      expect(response.body.message).toBe('Email is inValid'); // Check the response message

  });

  it('should return an error when already Registered Email is provided', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

      // Use supertest to simulate a request to the signup route
      const response = await request(app).post("/api/users/signup").send(userData);

      // Assertions for the error response
      expect(response.status).toBe(400); // Check for a successful status code
      expect(response.body.message).toBe('Email already in use'); // Check the response message

  });
});
