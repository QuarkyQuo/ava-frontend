'use client'
import { useUser } from "@/contexts/userContext";
import { redirect } from "next/navigation";
export default function UserPage({ params }: { params: { id: string } }) {
    const {user,isAuthenticated}=useUser();

    if (!isAuthenticated){ 
        redirect('/');
    }
    console.log(params)
    return (

        <div>
            {params.id?
            <h2 className="text-white">User Id is {params.id}</h2>:
            <h2 className="text-white">User Name is {user?.name}</h2>
            }
        </div>

    )
  }