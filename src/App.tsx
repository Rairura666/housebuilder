import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreatePage } from './components/CreatePage.js'
import { MainLayout } from './MainLayout.js'
import { useEffect, useState } from 'react'
import { ProfilePage } from './components/ProfilePage.js'
import { MainPage } from './components/MainPage.js'
import {SignInPage} from './components/SignInPage.js'
import {SignUpPage} from './components/SignUpPage.js'
import { supabase } from '../utils/supabase.js'
import type { User } from "@supabase/supabase-js"

function App() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
    });

    return () => subscription.unsubscribe();
}, []);

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout user={user}/>}>
          <Route index element={<MainPage />} />

          <Route path="/create" element={
              user ?
              <CreatePage/>
              : <SignInPage />
          } />
          
          <Route path="/profile" element={
              user ?
              <ProfilePage user={user}/>
              : <SignInPage />
            } />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
