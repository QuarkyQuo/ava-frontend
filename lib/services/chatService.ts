import { useSessionContext } from "../context/AgentContext";
import { api, handleResponse, handleError, api2 } from "./apiService";
import { getCurrentUser } from "./authService";

export const createSession = async (data) => {
    const chatSession = await api()
        .post("/chat", { userId: data })
        .then(handleResponse)
        .catch(handleError);

    if (chatSession) {
        console.log(chatSession.chatSessionId);
        return chatSession.chatSessionId;
    }

    throw new Error("Failed to create chat session.");
};

export const getSession = async (data) => {
    const res = await api()
        .get(`/chat/${data}`)
        .then(handleResponse)
        .catch(handleError);
    if (res) {
        return res;
    }
};

export const addPrompt = async (data) => {
    const res = await api2()
        .post(`process_prompt`, {
            _id: data.sessionId,
            prompt_details: {
                promptId: data.id,
                prompt: data.text,
            },
        })
        .then(handleResponse)
        .catch(handleError);
    if (res) {
        console.log(res);
        return res.responses[0];
    }
};

export const addResponse = async (data) => {
    await api()
        .post(`/chat/${data.sessionId}/prompt/${data.promptId}/response`, {
            response: data.text,
        })
        .then(handleResponse)
        .catch(handleError);
};
