import React from 'react'
import { AboutUs } from '../home/pages/AboutUs'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export const AppRouter = () => {
  return <>
    
      <BrowserRouter>
     
     <Routes>

      <Route path='/aboutus' element={<AboutUs/>} />
     </Routes>
     
     </BrowserRouter>
    
    
    
    </>;
  
};
