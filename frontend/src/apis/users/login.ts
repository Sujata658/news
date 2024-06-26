import { axiosInstance } from "@/config/axios";
import { LoginData } from "@/types/users";

const login = async (loginData: LoginData) => {
    try {
        const response = await axiosInstance.post("/auth/login", loginData);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        return [];
    }
}

export default login;