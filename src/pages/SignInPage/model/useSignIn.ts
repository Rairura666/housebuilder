import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../shared/api/supabase"

export const useSignIn = () => {

    const [isSignInFailed, setisSignInFailed] = useState<boolean>(false)
   
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
            setisSignInFailed(true)
            console.error(error.message)
            return
        }

        setisSignInFailed(false)
        navigate("/profile")
    }

    return {email, setEmail, password, setPassword, handleSignInSubmit, isSignInFailed}
}