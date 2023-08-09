import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";


export function TaskPage() {

    const {getTasks, tasks} = useTasks();

    useEffect(()=>{
       getTasks()
    },[]);


     if(tasks.length === 0) return (<h1>no hay tasks</h1>);
    
  return  <div>
   {
    tasks.map(task =>(
      <div key={task._id}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
    ))
   }
  
  </div>
  
}

export default TaskPage;