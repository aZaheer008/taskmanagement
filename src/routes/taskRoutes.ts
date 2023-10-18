import express from 'express';
const auth = require("../middlewares/auth");
import TaskController from '../controllers/taskController';

const taskRouter = express.Router();

// Define routes for Task-related actions

// Route for Task creation 
// Route for  Retrieve all tasks.
// Route for  Retrieve all tasks assigned to a specific user.
// Route for  Retrieve all tasks under a specific category.
taskRouter
    .post('/', auth,TaskController.create)
    .get('/', auth, TaskController.getTasks);

// Route for Retrieve a task by its ID. 
// Route for Update a specific task.
// Route for Delete a specific task.
taskRouter
    .get('/:id', auth, TaskController.getTaskById)
    .put('/:id', auth, TaskController.updateTaskById)
    .delete('/:id',  auth,TaskController.deleteTaskById);


export default taskRouter;