import { axiosInstance } from "@/config/axios";
import { Config } from "@/types/preferences";

const createConfig = async (config: Config): Promise<Config | null> => {
    try {
        const response = await axiosInstance.post(`/config`, {config});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log('createConfig:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during createConfig:', error);
        return null;
    }
}

export default createConfig;
