import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTaskRequest } from "../api/tasks";


const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks deberia estar dentro de TaskProvider");
    }

    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {

        try {
            const res = await getTaskRequest()
            setTasks(res.data);

        } catch (error) {
        console.log(error)
        }
    }


    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);


    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
        }}>
            {children}

        </TaskContext.Provider>
    )
}