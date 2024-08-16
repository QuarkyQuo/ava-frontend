"use client";

import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Sidebar from "./chat/Sidebar";
import { Prompt } from "@/lib/interfaces";
import { sessionContext } from "@/lib/context/AgentContext";
import Bubble from "./chat/Bubble";
import { addPrompt, addResponse, getSession } from "@/lib/services/chatService";

const ChatInterface: React.FC = () => {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [session, setSession] = useState<String | null>(null);
    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        async function fetchData() {
            if (session) {
                try {
                    const data = await getSession(session);
                    setPrompts(data.prompts);
                    console.log(data);
                } catch (error) {
                    console.error("Error fetching chats:", error);
                }
            }
        }
        fetchData();
    }, [session]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newPrompt: Prompt = {
            promptId: prompts.length + 1,
            prompt: inputMessage,
            responses: [],
        };

        try {
            await addPrompt({
                sessionId: session,
                id: newPrompt.promptId,
                text: newPrompt.prompt,
            });

            setPrompts((prevPrompts) => [...prevPrompts, newPrompt]);
            setInputMessage("");

            setTimeout(() => {
                setPrompts((prevPrompts) =>
                    prevPrompts.map((prompt) =>
                        prompt.promptId === newPrompt.promptId
                            ? {
                                  ...prompt,
                                  responses: [
                                      ...prompt.responses,
                                      "AI Generated",
                                  ],
                              }
                            : prompt
                    )
                );

                addResponse({
                    sessionId: session,
                    promptId: newPrompt.promptId,
                    text: "AI Generated",
                }).catch((error) => {
                    console.error(
                        "Error sending AI generated response:",
                        error
                    );
                });
            }, 2000);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex h-screen bg-[#242227] text-white">
            <sessionContext.Provider value={{ session, setSession }}>
                <Sidebar />
                {session ? (
                    <div className="flex-1 flex justify-center">
                        <div className="w-4/5 flex flex-col">
                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="space-y-4">
                                    {prompts.map((message, index) => (
                                        <div key={index}>
                                            <Bubble
                                                text={message.prompt}
                                                isUser={true}
                                            />
                                            {message.responses.map(
                                                (response, idx) => (
                                                    <Bubble
                                                        key={`${index}-${idx}`}
                                                        text={response}
                                                        isUser={false}
                                                    />
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 flex justify-center">
                                <div className="flex items-center bg-black rounded-full pl-4 py-1 pr-1 w-3/5">
                                    <input
                                        type="text"
                                        placeholder="🧠What's in your mind..."
                                        className="flex-1 bg-transparent outline-none"
                                        value={inputMessage}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setInputMessage(e.target.value)}
                                        onKeyPress={(
                                            e: React.KeyboardEvent<HTMLInputElement>
                                        ) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                    />
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#9747FF]">
                                        <Send
                                            className="text-black cursor-pointer w-4"
                                            onClick={handleSendMessage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Please select a chat</div>
                )}
            </sessionContext.Provider>
        </div>
    );
};

export default ChatInterface;
