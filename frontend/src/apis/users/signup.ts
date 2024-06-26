import { axiosInstance } from "@/config/axios";
import { SignUpData } from "@/types/users";

const signup = async (signUpData: SignUpData) => {
    try {
        const response = await axiosInstance.post("/auth/signup", signUpData);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        return [];
    }
}

export default signup;