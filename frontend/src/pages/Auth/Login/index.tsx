import login from "@/apis/users/login";
import AuthForm from "@/components/Auth/AuthForm"
import { useUser } from "@/context/userContext";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { z } from "zod";

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
      <div className="h-screen p-4 flex text-start">
        <div className="flex-1 flex flex-col justify-center items-center mx-8">
          <div className="text-4xl mt-4 font-bold mb-4">
            Welcome Back
          </div>
          <div className="mb-4">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-secondary">
              Sign Up
            </Link>
          </div>
          <div className="w-full">
            <AuthForm
              schema={loginSchema}
              onSubmit={handleSubmit}
              fields={[
                { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
                { name: "password", label: "Password", placeholder: "Password", inputType: "password" },
              ]}
            />
            <div>
              <Link to="/forgot-password" className="text-secondary">Forgot Password?</Link>
            </div>
            {error && <div className="text-destructive-foreground mt-2">{error}</div>}
          </div>
        </div>
      </div>

    </>
  )
}
export default Login