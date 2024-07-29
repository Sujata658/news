import { axiosInstance } from "@/config/axios";

const deleteConfig = async (configId: string) => {
    try {
        const response = await axiosInstance.delete(`/config/${configId}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during deleteConfig:', error);
        return [];
    }
}

export default deleteConfig;
