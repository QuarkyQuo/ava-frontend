import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface SessionContextType {			
  session: String | null;		
  setSession: Dispatch<SetStateAction<String | null>>;
}

export const sessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSessionContext() {
  const context = useContext(sessionContext);

  if (context === undefined) {
    throw new Error("Error with context");
  }
  return context;
}