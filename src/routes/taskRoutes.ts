import express from 'express';
const auth = require("../middlewares/auth");
import TaskController from '../controllers/taskController';

const taskRouter = express.Router();

// Define routes for user-related actions

// Route for Task creation 
taskRouter.post('/', TaskController.create);

// Route for Retrieve a task by its ID. 
taskRouter.get('/:id', TaskController.getTaskById);

// Route for Update a specific task.
taskRouter.put('/:id', TaskController.updateTaskById);

// Route for Delete a specific task.
taskRouter.delete('/:id', TaskController.deleteTaskById);

// Route for  Retrieve all tasks.
// Route for  Retrieve all tasks assigned to a specific user.
// Route for  Retrieve all tasks under a specific category.
taskRouter.get('/', TaskController.getTasks);


export default taskRouter;
