import { axiosInstance } from "@/config/axios";
import { PreferencesProps } from "@/types/preferences";

const createPreferences = async (preferences: PreferencesProps) => {
    try {
        const response = await axiosInstance.post(`/preferences/`, preferences);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during createPreferences:', error);
        return [];
    }
}

export default createPreferences;
