import { axiosInstance } from "@/config/axios";

const forgotPassword = async (email:string) => {
    try {
        const response = await axiosInstance.post("/auth/login", {email});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during forgotPassword:', error);
        return undefined;
    }
}

export default forgotPassword;