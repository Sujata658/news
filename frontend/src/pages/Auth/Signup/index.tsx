import signup from "@/apis/users/signup";
import AuthForm from "@/components/Auth/AuthForm";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be no more than 20 characters long" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((value) => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
      .refine((value) => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
      .refine((value) => /\d/.test(value), { message: "Password must contain at least one number" })
      .refine((value) => /[@$!%*?&]/.test(value), { message: "Password must contain at least one special character (@$!%*?&)" }),
  });

const SignUp = () => {
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = ({email,  username, password}: z.infer<typeof signUpSchema>) => {
        signup({ email, name: username, password }).then((response) => {
          if (response.status === 200) {
            setEmailSent(true);
          }
        }).catch((error) => {
          toast.error(error.response.data.message);
        });
      };

      useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          navigate('/');
        }
      }, [navigate])

  return (
    <>
        <div>
            <div>
                Sign Up Title
            </div>
            <div>
            {
        emailSent ? (
          <div className="flex-1 flex flex-col justify-center items-center mx-8">
            {/* <img src={mail} alt="mail" className="w-32 m-8" /> */}
            <div className="text-4xl mt-4 font-bold mb-4">
              Email Sent
            </div>
            <div className="text-gray-600 mb-4">
              Please check your email to verify your account.
            </div>
            <div>
              <p>Didn't get the email?</p>
              <button className="text-primary-500" onClick={() => setEmailSent(false)}>Resend</button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center mx-8">
            <div className="text-4xl mt-4 font-bold mb-4">
              Come Join Us
            </div>
            <div className="text-gray-600 mb-4">
              Already have an account? <Link to="/signup" className="underline text-black">Login</Link>
            </div>
            <div className="w-full">
              <AuthForm
                schema={signUpSchema}
                onSubmit={handleSubmit}
                fields={[
                  { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
                  { name: "username", label: "Username", placeholder: "Username" },
                  { name: "password", label: "Password", placeholder: "Password", inputType: "password" }
                ]}
              />
            </div>
          </div>
        )
      }
            </div>
        </div>
    
    </>
  )
}

export default SignUp