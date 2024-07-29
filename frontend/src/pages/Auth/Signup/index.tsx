import signup from "@/apis/users/signup";
import AuthForm from "@/components/Auth/AuthForm";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import bg from '../../../assets/authbg.jpg'
import mail_sent from '../../../assets/mail_sent.png'
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fname: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be no more than 20 characters long" }),
  lname: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be no more than 20 characters long" }),
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

  const handleSubmit = ({ email, fname, lname, password }: z.infer<typeof signUpSchema>) => {
    signup({ email, fname, lname, password }).then((response) => {
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
  }, [navigate]);

  return (
    <>
      <div className="flex justify-center items-center h-screen" style={
        {
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      }>
        <Card className="w-full max-w-md mx-6 p-8 border-black rounded-[10px]">
          {
            emailSent ? (
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl mt-4 font-bold mb-4">
                  Email Sent
                </div>
                <div className="flex flex-col justify-center items-center border border-foreground rounded-[20px] p-12">
                <div>
                  <img src={mail_sent} alt="Email Sent" className="w-48 h-48" />
                </div>
                <div className="mb-4 text-center">
                  Please check your email to verify your account.
                </div>
                <div className="flex flex-col items-center gap-2 mt-8">
                  <p className="text-sm text-gray-600">Didn't get the email?</p>
                  <Button onClick={() => setEmailSent(false)} className="">Resend Email</Button>
                </div>
                </div>
               
                
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl mt-4 font-bold mb-2">
                  Sign Up
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  Already have an account? <Link to="/login" className="underline text-black">Login</Link>
                </div>
                <div className="w-full">
                  <AuthForm
                    schema={signUpSchema}
                    onSubmit={handleSubmit}
                    fields={[
                      { name: "fname", label: "First Name", placeholder: "First Name" },
                      { name: "lname", label: "Last Name", placeholder: "Last Name" },
                      { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
                      { name: "password", label: "Password", placeholder: "Password", inputType: "password" }
                    ]}
                  />
                </div>
              </div>
            )
          }
        </Card>
      </div>

    </>
  )
}

export default SignUp;