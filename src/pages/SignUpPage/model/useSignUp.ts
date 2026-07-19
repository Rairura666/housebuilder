import { useState } from "react"
import { supabase } from "../../../shared/api/supabase"

export const useSignup = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignUpSubmit = async () => {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            console.error(error.message)
            return
        }

        console.log("Signed up")
        setPassword("")
    }

    return { email, setEmail, password, setPassword, handleSignUpSubmit }
}



