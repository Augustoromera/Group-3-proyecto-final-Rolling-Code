import {useForm} from 'react-hook-form'; 
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

   const {register, handleSubmit, formState:{ errors }} = useForm();
   const {signIn, errors: signInErrors, isAuthenticated} = useAuth();
 
   const navigate = useNavigate();
   
   const onSubmit = handleSubmit((data) =>{
     signIn(data);
   });


   useEffect(() =>{
         if(isAuthenticated) navigate('/');
   },[isAuthenticated])



  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
         <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

         {Array.isArray(signInErrors) ? (
        signInErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center m-5' key={i}>
            {error}
          </div>
        ))
      ) : (
        <div className='bg-red-500 p-2 text-white text-center m-5'>
          {signInErrors}
        </div>
      )}

          <h1 className='text-3xl font-mono flex items-center justify-center mb-7 mt-5'>Login</h1>

           <form onSubmit={onSubmit}>

            <input type="email" {...register("email", {required:true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Email'/>
 
            {errors.email &&(
            <p className='text-red-500'>El email es obligatorio</p>
          )}
 
            <input type="password" {...register("password", {required:true, minLength:4})} className='w-full bg-zinc-700 text-white px-4 py-2  rounded-md my-2' placeholder='Password'/>
 
            {errors.password &&(
            <p className='text-red-500'>La contraseña es obligatoria</p>
          )}

            <button type="submit" className='bg-indigo-500 px-4 py-1 rounded-sm my-3'>
                Login
            </button>
              
             
             </form>

             <p className='flex gap-x-2 justify-between mt-2 text-yellow-300'>No tienes una cuenta para ingresar? <Link to="/register" className='text-sky-300'>Regístrate aquí</Link></p>   
            </div> 
    

    </div>
  )
     };

export default LoginPage;