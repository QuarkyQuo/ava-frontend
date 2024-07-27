"use client"
import { getCurrentUser } from "@/lib/services/authService";
import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export const InitialModal=()=>{
    const [user,setUser]=useState(null);
    const [isMounted, setIsMounted] =useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    useEffect(()=>{
        getCurrentUser().then(res=>setUser(res))
    },[]);
    const router = useRouter();

    if(user){
        router.push(`/user/${user._id}`)
        console.log(user);
    }
    if(!isMounted) return null;    
    return (
        <>
            <h2>Welcome to the User Page!</h2>
            <p>Please wait while we load your profile...</p>
        </>
    )
}