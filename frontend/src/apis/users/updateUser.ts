import { axiosInstance } from "@/config/axios";
import { UpdateUserData } from "@/types/users";

const updateUser = async (updateUser: UpdateUserData) => {
    try {
        const response = await axiosInstance.patch("/users", updateUser);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during updateUser:', error);
        return [];
    }
}

export default updateUser;