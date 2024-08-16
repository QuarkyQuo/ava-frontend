import { api, handleResponse, handleError } from "./apiService";
import { setAccessToken } from "@/utils/storage";
export const signIn = async (data) => {
    await api()
        .post("/auth/login", data)
        .then((res) => {
            handleResponse(res);
            setAccessToken(res.data.token);
        })
        .catch(handleError);
};

export const signUp = async (data) => {
    await api()
        .post("/auth/register", data)
        .then((res) => {
            handleResponse(res);
            setAccessToken(res.data.token);
        })
        .catch(handleError);
};

export const getCurrentUser = async () =>
    await api().get("/user").then(handleResponse).catch(handleError);
