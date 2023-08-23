// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from '../pages/HomeScreen'
import { ContactScreen } from '../pages/contact/ContactScreen'

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/contact" element={<ContactScreen />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
