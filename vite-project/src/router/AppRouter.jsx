import React from 'react'
import { AboutUs } from '../home/pages/AboutUs'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeTest } from '../components/HomeTest';


export const AppRouter = () => {
  return <>
    
      <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<HomeTest/>} />
      <Route path='/aboutus' element={<AboutUs/>} />
     </Routes>
     
     </BrowserRouter>
    
    
    
    </>;
  
};
