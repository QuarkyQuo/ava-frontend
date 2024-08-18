"use client";

import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Sidebar from "./chat/Sidebar";
import { Prompt } from "@/lib/interfaces";
import { sessionContext } from "@/lib/context/AgentContext";
import Bubble from "./chat/Bubble";
import { addPrompt, addResponse, getSession } from "@/lib/services/chatService";
import PulsatingDots from "./chat/PulsatingDots";

const ChatInterface: React.FC = () => {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [session, setSession] = useState<String | null>(null);
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);

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

            setPrompts((prevPrompts) =>
                prevPrompts.map((prompt) =>
                    prompt.promptId === newPrompt.promptId
                        ? {
                              ...prompt,
                              responses: [...prompt.responses, ""],
                          }
                        : prompt
                )
            );

            setTimeout(() => {
                setPrompts((prevPrompts) =>
                    prevPrompts.map((prompt) =>
                        prompt.promptId === newPrompt.promptId
                            ? {
                                  ...prompt,
                                  responses: [
                                      ...prompt.responses.slice(0, -1),
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
                setLoading(false);
            }, 10000);
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#242227] text-white">
            <sessionContext.Provider value={{ session, setSession }}>
                <Sidebar />
                {session ? (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="flex-1 flex p-4 overflow-y-auto justify-center custom-scrollbar w-full">
                            <div className="space-y-4 w-4/5">
                                {prompts.map((message, index) => (
                                    <div key={index}>
                                        <Bubble
                                            text={message.prompt}
                                            isUser={true}
                                            isloading={false}
                                        />
                                        {message.responses.map(
                                            (response, idx) => (
                                                <Bubble
                                                    key={`${index}-${idx}`}
                                                    text={response}
                                                    isUser={false}
                                                    isloading={response === ""}
                                                />
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 w-4/5 flex justify-center">
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
                                        !loading &&
                                        e.key === "Enter" &&
                                        handleSendMessage()
                                    }
                                />
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        loading
                                            ? "bg-gray-600 cursor-not-allowed"
                                            : "bg-[#9747FF] cursor-pointer"
                                    }`}
                                    onClick={() =>
                                        !loading && handleSendMessage()
                                    }
                                >
                                    <Send className="text-black w-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <PulsatingDots />
                )}
            </sessionContext.Provider>
        </div>
    );
};

export default ChatInterface;
