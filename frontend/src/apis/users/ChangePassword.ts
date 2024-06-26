import { axiosInstance } from "@/config/axios";

const changePassword = async (password: string, token: string) => {
    try {
        const response = await axiosInstance.post("/users/login", {password, token});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during forgotPassword:', error);
        return undefined;
    }
}

export default changePassword;