import login from "@/apis/users/login";
import AuthForm from "@/components/Auth/AuthForm"
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/userContext";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { z } from "zod";

import bg from '../../../assets/authbg.jpg';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i),
});

const Login = () => {
  const { setUser } = useUser();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);

    try {
      const response = await login(values);

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      } else if (response.status === 400) {
        setError('Invalid Email or Password');
      } else if (response.status === 404) {
        setError("Email not found")
      }

    } catch (error: any) {
      toast.error(`${(error as AxiosError<{ message: string }>).response?.data?.message}. Please try again.`)

    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/');
    }
  }, [navigate])


  return (
    <>
     <div className="flex justify-center items-center h-screen p-4" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Card className="w-full max-w-md mx-6 p-8 border-black rounded-[10px]">
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl mt-4 font-bold mb-2">
            Welcome Back
          </div>
          <div className="text-gray-600 text-sm mb-4">
            Don't have an account? <Link to="/signup" className="underline text-black">Sign Up</Link>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full my-8 border py-6 border-foreground/50 rounded-[5px]">

            <AuthForm
              schema={loginSchema}
              onSubmit={handleSubmit}
              fields={[
                { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
                { name: "password", label: "Password", placeholder: "Password", inputType: "password" },
              ]}
            />
            </div>
            <div className="mt-2 flex ">
              <Link to="/forgot-password" className="underline text-xs  text-black">Forgot Password?</Link>
            </div>
            {error && <div className="text-destructive-foreground mt-2">{error}</div>}
          </div>
        </div>
      </Card>
    </div>

    </>
  )
}
export default Login