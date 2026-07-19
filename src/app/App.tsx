import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreatePage } from '../pages/CreatePage/ui/CreatePage'
import { MainLayout } from '../widgets/MainLayout.js'
import { useEffect, useState } from 'react'
import { ProfilePage } from '../pages/ProfilePage/ui/ProfilePage'
import { MainPage } from '../pages/MainPage/ui/MainPage'
import {SignInPage} from '../pages/SignInPage/ui/SignInPage'
import {SignUpPage} from '../pages/SignUpPage/ui/SignUpPage'
import { supabase } from '../shared/api/supabase.js'
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
              <CreatePage user={user}/>
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
