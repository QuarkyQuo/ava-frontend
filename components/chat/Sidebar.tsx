import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
    MessageCircle,
    Brain,
    Users,
    Moon,
    Activity,
    HelpCircle,
    ShoppingBag,
    EllipsisVertical,
    Settings,
} from "lucide-react";
import Agent from "./Agent";
import Dropdown from "./Dropdown";
import AddModal from "./AddModal";
import { useSessionContext } from "@/lib/context/AgentContext";
import { getCurrentUser } from "@/lib/services/authService";
import { createSession } from "@/lib/services/chatService";
import {
    getRandomCategory,
    getRandomHexColor,
    getRandomName,
} from "@/lib/chatFunctions";
import Link from "next/link";

interface Agent {
    chatSessionId: string;
    name: string;
    image: string;
    category: string;
}

const Sidebar = () => {
    const [chats, setChats] = useState<string[]>([]);
    const [agent, setAgent] = useState<Agent>();
    const [user, setUser] = useState<string>("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { session, setSession } = useSessionContext();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCurrentUser();
                setChats(data.chatSessions);
                setUser(data._id);
                console.log(data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleAddNewAgent = () => {
        setModalOpen(true);
        setDropdownVisible(false);
    };

    const handleAddAgent = async (
        name: string,
        image: string,
        category: string
    ) => {
        try {
            const chatSessionId = await createSession(user);
            console.log(chatSessionId);
            if (chatSessionId) {
                const newAgent = { chatSessionId, name, image, category };
                setChats([...chats, chatSessionId]);
                setAgent(newAgent);
                alert("Agent added successfully!");
            }
        } catch (error) {
            console.error("Error adding agent:", error);
            alert("An error occurred while adding the agent.");
        }
    };

    return (
        <div className="relative w-64 bg-black p-4 flex flex-col justify-between rounded-r-xl">
            <div>
                <div className="mb-2">
                    <div className="flex flex-row justify-between mb-4 items-center">
                        <Image
                            src="/ava-darkBG-logo.png"
                            width={30}
                            height={30}
                            alt="Ava Logo"
                        />
                        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#212121]">
                            <Settings width={15} height={15} />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-[#191919] rounded-full p-2"
                    />
                </div>
                <div className="mb-8 relative">
                    <div className="flex flex-row justify-between items-center mb-2 py-4 -mx-4 px-4 border-y border-solid border-[#161616]">
                        <h2 className="text-sm font-semibold text-[#6A6969]">Chats</h2>
                        <div className="relative" ref={dropdownRef}>
                            <EllipsisVertical
                                color="#6A6969"
                                onClick={() =>
                                    setDropdownVisible(!dropdownVisible)
                                }
                                className="cursor-pointer"
                            />
                            {dropdownVisible && (
                                <Dropdown
                                    onAddNewAgent={handleAddNewAgent}
                                    closeDropdown={() =>
                                        setDropdownVisible(false)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        {chats.length === 0 ? (
                            <AddModal
                                isOpen={true}
                                initial={true}
                                onClose={() => setModalOpen(false)}
                                onAddAgent={handleAddAgent}
                            />
                        ) : (
                            chats.map((chat) => {
                                const matchedAgent =
                                    agent && agent.chatSessionId === chat
                                        ? agent
                                        : {
                                              name: getRandomName(),
                                              image: getRandomHexColor(),
                                              category: getRandomCategory(),
                                          };
                                return (
                                    <Agent
                                        key={chat}
                                        chat_id={chat}
                                        {...matchedAgent}
                                        onClick={() => {
                                            setSession(chat);
                                            console.log(session);
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row justify-between items-center mb-2 py-4 -mx-4 px-4 border-y border-solid border-[#161616]">
                    <p className="text-[#6A6969] text-sm font-semibold">Other Apps</p>
                    <EllipsisVertical
                        color="#6A6969"
                        className="cursor-pointer"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Link href="/future" className="flex flex-col items-center">
                        <Brain className="mb-1" />
                        <span className="text-xs">Mindfulness</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <Users className="mb-1" />
                        <span className="text-xs">Community</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <MessageCircle className="mb-1" />
                        <span className="text-xs">Therapy</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <Moon className="mb-1" />
                        <span className="text-xs">Bedtime</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <Activity className="mb-1" />
                        <span className="text-xs">My Health</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <HelpCircle className="mb-1" />
                        <span className="text-xs">Support</span>
                    </Link>
                    <Link href="/future" className="flex flex-col items-center">
                        <ShoppingBag className="mb-1" />
                        <span className="text-xs">Marketplace</span>
                    </Link>
                </div>
            </div>
            <AddModal
                isOpen={modalOpen}
                initial={false}
                onClose={() => setModalOpen(false)}
                onAddAgent={handleAddAgent}
            />
        </div>
    );
};

export default Sidebar;
