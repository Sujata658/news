import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import verifyOTP from "@/apis/users/verifyOTP";
import resendOTP from "@/apis/users/resendOTP";

type OTPProps = {
  otp: string;
  email: string;
};

const OTP: React.FC = () => {
  const { otp: paramOtp, email } = useParams<OTPProps>();
  const [currotp, setCurrotp] = useState(paramOtp); 
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/');
    }
  }, [navigate])

  useEffect(() => {
    setCurrotp(paramOtp);
  }, [paramOtp]);

  const otpArray = currotp ? currotp.split('') : [];

  const handleClick = async () => {
    try {
      if (otpArray.length !== 6) {
        toast.error('Please enter a valid OTP.');
        return;
      }
      if (currotp && email) { 
        const res = await verifyOTP(currotp, email);
        if (res) {
          setIsVerified(true);
        }
      } else {
        toast.error('Failed to verify OTP. Please try again.');
      }
    } catch {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      if(email){
        const res = await resendOTP(email);
        if (res) {
          toast.success('OTP has been resent successfully.');
        }
      }else{
        toast.error('Failed to resend OTP. Please try again.');
      }
    } catch {
      toast.error('Failed to resend OTP. Please try again.');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-12 rounded-lg max-w-[400px] shadow-lg bg-background">
        {isVerified ? (
          <div className="text-center">
            <img src="/path-to-thank-you-image.svg" alt="Thank You" className="w-32 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-600">Thank You!</h2>
            <p className="mt-4 text-lg text-gray-700">Your email has been verified.</p>
            <p className="text-lg text-gray-700">You can now <span className="font-bold text-black">login</span> to proceed.</p>
            <Button className="w-full mt-4" onClick={() => navigate('/login')}>Login</Button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl text-center font-bold">Enter OTP</h2>
            <p className="m-4 text-center">Please enter the 6-digit OTP sent to your email.</p>

            {(
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  {otpArray.slice(0, 3).map((value, index) => (
                    <InputOTPSlot key={index} index={index} defaultValue={value} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {otpArray.slice(3, 6).map((value, index) => (
                    <InputOTPSlot key={index + 3} index={index + 3} defaultValue={value} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}

            <Button className="w-full mt-4" onClick={handleClick}>Verify OTP</Button>
            
            <div>
              <p className="mt-4 text-center">Didn't receive the OTP?</p>
              <Button className="w-full mt-4" onClick={handleResend}>Resend OTP</Button>
            </div>
           
          </>
        )}
      </div>
    </div>
  );
};

export default OTP;
