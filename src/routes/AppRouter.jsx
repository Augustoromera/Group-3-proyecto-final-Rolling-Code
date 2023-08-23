import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from '../pages/HomeScreen'
import { AdminScreen } from '../pages/admin/AdminScreen'
import { ContactScreen } from '../pages/ContactScreen'
import { AboutUs } from '../pages/AboutUs'

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/admin" element={<AdminScreen />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path='/aboutus' element={<AboutUs />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
