import { axiosInstance } from "@/config/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

const verifyOTP = async (OTP: string, email: string) => {
  try {
    const response = await axiosInstance.post(`/users/verify/${OTP}/${email}`);
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error('Failed to verify OTP. Please try again.');
      return null;
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred. Please try again later.');
    }
    return null;
  }
}

export default verifyOTP;
