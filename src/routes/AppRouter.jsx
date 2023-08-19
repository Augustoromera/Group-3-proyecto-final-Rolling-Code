// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from '../home/pages/HomeScreen'
import { AdminScreen } from '../admin/pages/AdminScreen'

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
