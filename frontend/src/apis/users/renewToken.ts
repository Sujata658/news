import { axiosInstance } from "@/config/axios";

interface AccessToken {
    accessToken: string;
}

const renewToken = async (refreshToken: string): Promise<AccessToken | undefined> => {
    try {
        const response = await axiosInstance.post("/auth/renewAccessToken", {token: refreshToken});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        return undefined;
    }
}

export default renewToken;