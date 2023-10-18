import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import InMemoryDataStorage from '../database';
import { Task } from '../interfaces';

function isEmptyField(task:Task) {

  if (!task.title || !task.description || !task.createdAt || !task.dueAt || !task.assignedTo || !task.category || !task.status ){
    return false;
  }
  return true;
};

function isStatusCorrect(task:Task) {
  if (['Pending','Completed'].indexOf(task.status) == -1 ) {
    return false;
  }
  return true;
}

class TaskController {
  // Signup function
  public create(req: Request, res: Response): void {

    if (!isEmptyField(req.body)) {
      res.status(400).json({ message: 'All field necessary to fill' });
      return;
    }

    if (!isStatusCorrect(req.body)) {
      res.status(400).json({ message: `Status Should be 'Pending' Or 'Completed'` });
      return;
    }

    const { title, description,createdAt,dueAt,assignedTo,category,status } = req.body;

    const taskId = uuidv4();

    // Create a new task
    const newTask = InMemoryDataStorage.createTask({
      id:taskId,
      title, 
      description,
      createdAt,
      dueAt,
      assignedTo,
      category,
      status
    });


    // Return a success message or the newly created Task
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  }

  public getTaskById(req: Request, res: Response): void {

    const task = InMemoryDataStorage.getTaskById(req.params.id);

    if (!task) {
      res.status(400).json({ message: 'Task not found' });
      return;
    }
    // Return a success message 
    res.status(200).json({ task});
  }

  public updateTaskById(req: Request, res: Response): void {

    const taskfound = InMemoryDataStorage.getTaskById(req.params.id);

    if (!taskfound) {
      res.status(400).json({ message: 'Task not found' });
      return;
    }

    const task = InMemoryDataStorage.updateTask(req.params.id,req.body);
    // Return a success message 
    res.status(201).json({ message: 'Task updated successfully', task: task  });
  }

  public deleteTaskById(req: Request, res: Response): void {

    const taskfound = InMemoryDataStorage.getTaskById(req.params.id);

    if (!taskfound) {
      res.status(400).json({ message: 'Task not found' });
      return;
    }

    InMemoryDataStorage.deleteTask(req.params.id);

    // Return a success message 
    res.status(200).json({ message: 'Task deleted successfully' });
  }

  public getTasks(req: Request, res: Response): void {

    let tasks;

    const category : string = req.query.category as string;
    const assignedTo  : string = req.query.assignedTo  as string;

    if (category) {

      tasks = InMemoryDataStorage.getTasksGroupByCategory(category);

    } else if (assignedTo) {

      tasks = InMemoryDataStorage.getTasksGroupByAssignedTo(assignedTo);
    } else {
      tasks = InMemoryDataStorage.getTasks();
    }
    // Return a success message
    res.status(200).json( tasks );
  }

}

export default new TaskController();
