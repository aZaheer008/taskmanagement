import { User, Task } from '../interfaces';

  class InMemoryDataStorage {
    private users: Record<string, User> = {};
    private tasks: Record<string, Task> = {};
  
    // User-related methods
  
    createUser(user: User): User {
      const newUser = { ...user };
      this.users[user.id] = newUser;
      return newUser;
    }
  
    getUserById(userId: string): User {
      return this.users[userId];
    }

    updateUserById(userId: string, user: User): User {
      this.users[userId] = user;
      return this.users[userId];
    }
  
    getUserByEmail(email: string): User | undefined {
      return Object.values(this.users).find((user) => user.email === email);
    }
  
    // Task-related methods
  
    createTask(task: Task): Task {
      // const id = Date.now().toString(); // Generate a simple unique ID
      const newTask = { ...task };
      this.tasks[task.id] = newTask;
      return newTask;
    }
  
    getTaskById(taskId: string): Task | undefined {
      return this.tasks[taskId];
    }

    getTasks(): Task[] | undefined {
      const tasks = [];
      for (const task in this.tasks) {
        tasks.push(this.tasks[task])
      }
      return tasks;
    }

    getTasksGroupByCategory(category : string): Task[]  {
      const tasks = [];

      for (const task in this.tasks) {
        let currentTask = this.tasks[task]; 
        if (category === currentTask.category) {
          tasks.push(this.tasks[task]);
        }
      }
      return tasks;
    }

    getTasksGroupByAssignedTo(assignedTo : string): Task[]  {
      const tasks = [];

      for (const task in this.tasks) {
        let currentTask = this.tasks[task]; 
        if (assignedTo === currentTask.assignedTo) {
          tasks.push(this.tasks[task]);
        }
      }
      return tasks;
    }
  
    // getTasksByUserId(userId: string): Task[] {
    //   return Object.values(this.tasks).filter((task) => task.userId === userId);
    // }
  
    updateTask(taskId: string, updatedTask: Task): Task | undefined {
      if (this.tasks[taskId]) {
        this.tasks[taskId] = { ...this.tasks[taskId], ...updatedTask };
        return this.tasks[taskId];
      }
      return undefined;
    }
  
    deleteTask(taskId: string): boolean {
      if (this.tasks[taskId]) {
        delete this.tasks[taskId];
        return true;
      }
      return false;
    }

    reset(){
      users : {};
      tasks : {};
    }
  }
  
  export default new InMemoryDataStorage();
  