import { axiosInstance } from "@/config/axios";
import { Preferences } from "@/types/preferences";

const getPreferences = async (): Promise<Preferences[]> => {
    try {
        const response = await axiosInstance.get(`/preferences`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        
        return response.data.data;
    } catch (error) {
        console.error('Error during getPreferences:', error);
        return [];
    }
}

export default getPreferences;
