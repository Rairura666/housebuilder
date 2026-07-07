import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreatePage } from './components/CreatePage.js'
import { MainLayout } from './MainLayout.jsx'
import { useState } from 'react'
import { ProfilePage } from './components/ProfilePage.js'
import { MainPage } from './components/MainPage.js'
import {SignInPage} from './components/SignInPage.js'
import {SignUpPage} from './components/SignUpPage.js'
// import { supabase } from 'utils/supabase'
import strict from 'node:assert/strict'

function App() {

  const [userId, setUserId] = useState(undefined)


  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/create" element={<CreatePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
