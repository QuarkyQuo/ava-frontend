import { useSessionContext } from "@/lib/context/AgentContext";
import React, { useEffect, useState } from "react";

interface AgentProps {
    chat_id: string;
    name: string;
    image: string;
    category: string;
    onClick?: () => void;
}

const Agent = ({ chat_id, name, image, category, onClick }: AgentProps) => {
    const { session, setSession } = useSessionContext();
    const style = {
        backgroundColor: image,
    };

    return (
        <div
            className={`flex items-center space-x-2 cursor-pointer -mx-4 hover:bg-gray-800 p-2 rounded-md ${
                session == chat_id ? "bg-gray-800" : "bg-inherit"
            }`}
            onClick={onClick}
        >
            <div className={`w-8 h-8 rounded-full`} style={style}></div>
            <span>{name}</span>
        </div>
    );
};

export default Agent;
