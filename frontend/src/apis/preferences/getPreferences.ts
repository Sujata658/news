import { axiosInstance } from "@/config/axios";
import { Preferences } from "@/types/preferences";

const getPreferences = async (): Promise<Preferences | null> => {
    try {
        const response = await axiosInstance.get(`/preferences`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        if(Array.isArray(response.data.data) && response.data.data.length === 0){
            return null;
        }else{
            return response.data.data;
        }
    } catch (error) {
        console.error('Error during getPreferences:', error);
        return null;
    }
}

export default getPreferences;
