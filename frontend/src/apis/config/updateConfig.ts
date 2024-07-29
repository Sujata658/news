import { axiosInstance } from "@/config/axios";
const updateConfig = async (configId: string) => {
    try {
        const response = await axiosInstance.patch(`/config/${configId}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during updateConfig:', error);
        return [];
    }
}

export default updateConfig;
