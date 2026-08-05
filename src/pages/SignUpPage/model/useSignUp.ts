import { useState } from "react"
import { supabase } from "../../../shared/api/supabase"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const handleSignUpSubmit = async () => {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        })

        if (error) {
            console.error(error.message)
            return
        }

        setPassword("")
        navigate("/create")
    }

    return { email, setEmail, password, setPassword, username, setUsername, handleSignUpSubmit }
}



