import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function RegisterPage() {

   const {register, handleSubmit, formState:{errors}} = useForm();
   const {signUp, isAuthenticated, errors: registerErrors} = useAuth();
   const navigate = useNavigate()


   useEffect(() =>{
    if(isAuthenticated) navigate('/');
   }, [isAuthenticated])

   const onSubmit = handleSubmit (async(values) =>{
    signUp(values);
   
   });   

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>

        {
            registerErrors.map((error, i) =>(
                <div className='bg-red-500 p-2 text-white' key={i}>
                    {error}
                </div>
            ))
        }

   <h1 className='text-3xl font-mono flex items-center justify-center mb-7 mt-5'>Registro</h1>
  
         <form onSubmit={onSubmit}>
            
            <input type="text" {...register("username", {required:true, minLength:3})} className='w-full bg-zinc-700 text-white px-4 py-3 rounded-md my-2' placeholder='username'/>

          {errors.username &&(
            <p className='text-red-500'>El nombre de usuario es obligatorio</p>
          )}

            <input type="email" {...register("email", {required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='email'/>
 
            {errors.email &&(
            <p className='text-red-500'>El email es obligatorio</p>
          )}
 
            <input type="password" {...register("password", {required:true, minLength:4})} className='w-full bg-zinc-700 text-white px-4 py-2  rounded-md my-2' placeholder='password'/>
 
            {errors.password &&(
            <p className='text-red-500'>La contraseña es obligatoria</p>
          )}

            <button type="submit" className='bg-indigo-500 px-4 py-1 rounded-sm my-3'>
                Register
            </button>
              
             
            </form>    
            <p className='flex gap-x-2 justify-between mt-2 text-yellow-300'>Ya tienes una cuenta? <Link to="/login" className='text-sky-300'>Ingresa aquí</Link></p>   
    
    </div>
    </div>
  )
}

export default RegisterPage;