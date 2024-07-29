import { axiosInstance } from "@/config/axios";
import { Preferences } from "@/types/preferences";

const updateDefault = async (defaultId: string): Promise<Preferences | null> => {
    try {
        console.log('updateDefault:', defaultId)
        const response = await axiosInstance.post(`/preferences`, {defaultId});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        
        return response.data.data;
    } catch (error) {
        console.error('Error during updateDefault:', error);
        return null;
    }
}

export default updateDefault;
