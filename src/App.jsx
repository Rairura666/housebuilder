import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreatePage } from './components/CreatePage.jsx'
import { MainLayout } from './MainLayout.jsx'
import { useState } from 'react'
import { ProfilePage } from './components/ProfilePage.jsx'
import { MainPage } from './components/MainPage.jsx'


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/create" element={<CreatePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
