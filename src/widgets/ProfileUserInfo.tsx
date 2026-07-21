import {useEffect, useRef, useState } from "react"
import { profileUserInfoProps } from "../shared/types/types"
import { supabase } from "../shared/api/supabase"
import avatarPlaceholder from "../shared/assets/pfp_placeholder.jpg" 
import { useAuth } from "../shared/auth/useAuth"

export const ProfileUserInfo = ({ profile}:profileUserInfoProps) => {
    
    const {user} = useAuth()
    
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleAvatarChange = () => {
        fileInputRef.current?.click()
    }
    
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(!file || !user) {
            return
        }
        
        const filePath = `${user?.id}/avatar`

        const { error } = await supabase.storage
        .from("Avatars")
        .upload(filePath, file, {upsert: true})
        
        if (error) {
            console.log(error)
            return
        }

        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                avatar_path: filePath,
            })
            .eq("id", user.id)

        if(updateError) {
            console.log(updateError)
            return
        }

        const { data } = supabase.storage
            .from("Avatars")
            .getPublicUrl(filePath)

        setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`)
    }


    useEffect(() => {
        if (!profile?.avatar_path) {
            setAvatarUrl(null)
            return
        }

        const { data } = supabase.storage
            .from("Avatars")
            .getPublicUrl(profile.avatar_path)

        setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`)
    }, [profile?.avatar_path])
    
    return(
        <>
        <div className="profileUserInfo">
            <p>{user?.email}</p>
            <div className="userAvatarPic">
                {
                avatarUrl ?
                    <img src={avatarUrl}></img>
                    : <img src={avatarPlaceholder}></img>
                }
            </div>
        
        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{display:"none"}}>
        </input>

            <button onClick={handleAvatarChange}>Change avatar</button>
        </div>
   
        <button>settings</button>
        </>
    )
}