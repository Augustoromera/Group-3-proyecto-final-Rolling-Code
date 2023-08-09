import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';


function TaskFormPage() {

    const { register, handleSubmit } = useForm();
    const { createTask } = useTasks();

    const onSubmit = handleSubmit((data) => {
        createTask(data);
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

            <form>

                <input type="text" placeholder="title" {...register("title")} autoFocus className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2' />
                <textarea rows="3" placeholder="descripcion" {...register("description")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2'></textarea>
                <button className='m-2'>Guardar</button>

            </form>

        </div>
    )
}

export default TaskFormPage