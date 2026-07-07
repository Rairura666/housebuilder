import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { useNavigate } from "react-router-dom"

export const SignInPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignInSubmit = async() => {
        const{data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password, 
        })

        if(error) {
            setPassword("")
            console.error(error.message)
            return
        }

        console.log("Signed in!")
        
        navigate("/profile")
    }


    return (<>
    <input
    type='email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="email"
    />

    <input
    placeholder="password"
    value={password}
     onChange={(e) => setPassword(e.target.value)}
    />

    <button
    onClick={handleSignInSubmit}
    >sign in</button>
    </>)
}