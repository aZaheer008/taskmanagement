const request = require('supertest');
import app from '../server';

describe('Tasks Creation', () => {

        let token : any;

        const createUserSigninToken = async () => {

            // Use supertest to simulate a request to the signup route
            const userData = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
              };

              const userDataLogin = {
                email: 'testuser@example.com',
                password: 'password123',
              };
          
                // Use supertest to simulate a request to the signup route
            const responseSignup = await request(app).post("/api/users/signup").send(userData);
                 // Use supertest to simulate a request to the signup route
            const response = await request(app).post("/api/users/login").send(userDataLogin);

            token = response.body.token;
        };

        beforeEach(async () => {
            await createUserSigninToken();
        });

    it('Should create a new Task when valid data is provided', async () => {
        const task = {
            "title": "task1",
            "description": "description1",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home1",
            "status":"Pending"
        };
    
        // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    
        // Assertions
        expect(response.status).toBe(201); // Check for a successful status code
        expect(response.body.message).toBe('Task created successfully'); // Check the response message
        expect(response.body.task).toHaveProperty('id'); // Check if the task object has an 'id'
    });

    it('Should return an error when any field is empty', async () => {
        const task = {
            "title": "task1",
            "description": "",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home1",
            "status":"Pending"
        };
    
        // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    
        // Assertions
        expect(response.status).toBe(400); // Check for a successful status code
        expect(response.body.message).toBe('All field necessary to fill'); // Check the response message
    });

    it(`Should return an error when status is not from 'Pending' Or 'Completed'`, async () => {
        const task = {
            "title": "task1",
            "description": "description1",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home1",
            "status":"Pending1"
        };
    
        // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    
        // Assertions
        expect(response.status).toBe(400); // Check for a successful status code
        expect(response.body.message).toBe(`Status Should be 'Pending' Or 'Completed'`); // Check the response message
    });
});

describe('getTaskById ', () => {

    let token : any;

    const createUserSigninToken = async () => {

        // Use supertest to simulate a request to the signup route
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
          };

          const userDataLogin = {
            email: 'testuser@example.com',
            password: 'password123',
          };
      
            // Use supertest to simulate a request to the signup route
        const responseSignup = await request(app).post("/api/users/signup").send(userData);
             // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/users/login").send(userDataLogin);

        token = response.body.token;
    }

    const task = {
        "title": "task1",
        "description": "description1",
        "createdAt": "17-10-2023",
        "dueAt" : "18-10-2023",
        "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
        "category":"Home1",
        "status":"Pending"
    };
    let response : any;

    const createTask = async () => {

        // Use supertest to simulate a request to the signup route
        await createUserSigninToken();
        response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    };

    beforeEach(async () => {
        await createTask();
    });

    it('Should get Task By Id', async () => {
        const fetchResponse = await request(app).get(`/api/task/${response.body.task.id}`).set('x-access-token', token);
        // Assertions
        expect(fetchResponse.status).toBe(200); // Check for a successful status code
        expect(fetchResponse.body.task).toHaveProperty('id'); // Check if the task object has an 'id'
    });

    it('Should get Error when no task found', async () => {
        const fetchResponse = await request(app).get(`/api/task/${response.body.task.id}1`).set('x-access-token', token);
        // Assertions
        expect(fetchResponse.status).toBe(400); // Check for a successful status code
        expect(fetchResponse.body.message).toBe('Task not found');
    });
});

describe('updateTaskById ', () => {

    let token : any;

    const createUserSigninToken = async () => {

        // Use supertest to simulate a request to the signup route
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
          };

          const userDataLogin = {
            email: 'testuser@example.com',
            password: 'password123',
          };
      
            // Use supertest to simulate a request to the signup route
        const responseSignup = await request(app).post("/api/users/signup").send(userData);
             // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/users/login").send(userDataLogin);

        token = response.body.token;
    }    

    const task = {
        "title": "task1",
        "description": "description1",
        "createdAt": "17-10-2023",
        "dueAt" : "18-10-2023",
        "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
        "category":"Home1",
        "status":"Pending"
    };
    let response : any;

    const createTask = async () => {

        await createUserSigninToken();
        // Use supertest to simulate a request to the signup route
        response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    };

    beforeEach(async () => {
        await createTask();
    });

    it('Should Update task by Id', async () => {
        const updatedData = {
            "title": "task2",
            "description": "description1",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home2",
            "status":"Pending"
        };
        const updateResponse = await request(app).put(`/api/task/${response.body.task.id}`).set('x-access-token', token).send(updatedData);
        // Assertions
        expect(updateResponse.status).toBe(201); // Check for a successful status code
        expect(updateResponse.body.message).toBe('Task updated successfully'); // Check for a successful status code
        expect(updateResponse.body.task).toHaveProperty('id');
    });

    it('Should get Error when no task found', async () => {
        const updatedData = {
            "title": "task2",
            "description": "description1",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home2",
            "status":"Pending"
        };
        const updateResponse = await request(app).put(`/api/task/${response.body.task.id}1`).set('x-access-token', token).send(updatedData);
        // Assertions
        expect(updateResponse.status).toBe(400); // Check for a successful status code
        expect(updateResponse.body.message).toBe('Task not found');
    });
});

describe('deleteTaskById ', () => {

    let token : any;

    const createUserSigninToken = async () => {

        // Use supertest to simulate a request to the signup route
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
          };

          const userDataLogin = {
            email: 'testuser@example.com',
            password: 'password123',
          };
      
            // Use supertest to simulate a request to the signup route
        const responseSignup = await request(app).post("/api/users/signup").send(userData);
             // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/users/login").send(userDataLogin);

        token = response.body.token;
    }  
    const task = {
        "title": "task1",
        "description": "description1",
        "createdAt": "17-10-2023",
        "dueAt" : "18-10-2023",
        "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
        "category":"Home1",
        "status":"Pending"
    };
    let response : any;

    const createTask = async () => {
        await createUserSigninToken();
        // Use supertest to simulate a request to the signup route
        response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    };

    beforeEach(async () => {
        await createTask();
    });

    it('Should Delete task by Id', async () => {
        const updatedData = {
            "title": "task2",
            "description": "description1",
            "createdAt": "17-10-2023",
            "dueAt" : "18-10-2023",
            "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
            "category":"Home2",
            "status":"Pending"
        };
        const updateResponse = await request(app).delete(`/api/task/${response.body.task.id}`).set('x-access-token', token);
        // Assertions
        expect(updateResponse.status).toBe(200); // Check for a successful status code
        expect(updateResponse.body.message).toBe('Task deleted successfully'); // Check for a successful status code
    });

    it('Should get Error when no task found', async () => {
        const updateResponse = await request(app).delete(`/api/task/${response.body.task.id}1`).set('x-access-token', token);
        // Assertions
        expect(updateResponse.status).toBe(400); // Check for a successful status code
        expect(updateResponse.body.message).toBe('Task not found');
    });
});

describe('getAllTask ', () => {

    let token : any;

    const createUserSigninToken = async () => {

        // Use supertest to simulate a request to the signup route
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
          };

          const userDataLogin = {
            email: 'testuser@example.com',
            password: 'password123',
          };
      
            // Use supertest to simulate a request to the signup route
        const responseSignup = await request(app).post("/api/users/signup").send(userData);
             // Use supertest to simulate a request to the signup route
        const response = await request(app).post("/api/users/login").send(userDataLogin);

        token = response.body.token;
    }  

    const task = {
        "title": "task1",
        "description": "description1",
        "createdAt": "17-10-2023",
        "dueAt" : "18-10-2023",
        "assignedTo": "a8b9f07f-84c1-490b-970b-122881537466",
        "category":"Home1",
        "status":"Pending"
    };
    let response : any;

    const createTask = async () => {
        await createUserSigninToken();
        // Use supertest to simulate a request to the signup route
        response = await request(app).post("/api/task").set('x-access-token', token).send(task);
    };

    beforeEach(async () => {
        await createTask();
    });

    it('Should get Tasks', async () => {
        const fetchResponse = await request(app).get(`/api/task`).set('x-access-token', token);
        // Assertions
        expect(fetchResponse.status).toBe(200); // Check for a successful status code
    });

    it('Should get Tasks By category', async () => {
        const fetchResponse = await request(app).get(`/api/task/?category=Home1`).set('x-access-token', token);
        // Assertions
        expect(fetchResponse.status).toBe(200); // Check for a successful status code
    });

    it('Should get Tasks By assignedTo', async () => {
        const fetchResponse = await request(app).get(`/api/task/?assignedTo=${response.body.task.assignedTo}`).set('x-access-token', token);
        // Assertions
        expect(fetchResponse.status).toBe(200); // Check for a successful status code
    });
});