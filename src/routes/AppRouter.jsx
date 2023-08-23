import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from '../pages/home/HomeScreen'
import { AdminScreen } from '../pages/admin/AdminScreen'
import { ContactScreen } from '../pages/contact/ContactScreen'

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/admin" element={<AdminScreen />} />
                    <Route path="/contact" element={<ContactScreen />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
