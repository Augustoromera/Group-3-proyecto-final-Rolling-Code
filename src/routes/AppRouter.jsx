import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from '../pages/home/HomeScreen'
import { AdminScreen } from '../pages/admin/AdminScreen'

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/admin" element={<AdminScreen />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
