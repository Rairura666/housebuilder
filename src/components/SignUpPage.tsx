import { useState } from 'react'
import { supabase } from '../../utils/supabase'

export const SignUpPage = () => {
        
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignUpSubmit = async() => {

        const{data, error} = await supabase.auth.signUp({
            email,
            password, 
        })

        if(error){
            console.error(error.message)
            return
        }

        console.log("Signed up")
        setPassword("")
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
    onClick={handleSignUpSubmit}
    >sign up</button>
    </>)
}