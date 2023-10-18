interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: string,
    dueAt : string,
    assignedTo: string,
    category:string,
    status:'Pending' | 'Completed'
  }
  
export default Task;
  