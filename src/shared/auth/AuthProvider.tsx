import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "../api/supabase"
import { AuthContext } from "./AuthContext"

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {

        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();

    }, [])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};