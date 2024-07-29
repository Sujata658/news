import { axiosInstance } from "@/config/axios";
import { EditPasswordData } from "@/types/users";

const updatePassword = async (editPasswordData: EditPasswordData) => {
    try {
        const response = await axiosInstance.patch("/users/updatePassword", editPasswordData);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during editPassword:', error);
        return undefined;
    }
}

export default updatePassword;