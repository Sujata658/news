import { axiosInstance } from "@/config/axios";

const deleteUser = async () => {
    try {
        const response = await axiosInstance.delete("/users");
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during deleteUser:', error);
        return [];
    }
}

export default deleteUser;