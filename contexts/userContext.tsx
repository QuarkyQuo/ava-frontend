'use client'

import { getCurrentUser } from "@/lib/services/authService";
import { setAccessToken } from "@/utils/storage";
import { createContext,useState, ReactNode, useContext, useEffect } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    chatsessions: string[];
  }
  
  interface UserContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }
  const UserContext = createContext<UserContextType | undefined>(undefined);
  const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isMounted, setIsMounted] =useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    const login = async (userData?: User) => {
    if(userData){
        await setUser(userData) 
    }else{
        let currentUserData=await getCurrentUser()
        setUser(currentUserData)
                }

    };
  
    const logout = () => {
      setAccessToken(null)
      setUser(null);
    };
    if(!isMounted) return null;  
    return (
      <UserContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

  const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };

  export { UserProvider, useUser };