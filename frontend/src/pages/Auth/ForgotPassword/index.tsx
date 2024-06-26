import forgotPassword from "@/apis/users/forgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async () => {
        try {
            const res = await forgotPassword(email);
            if (res) {
                toast.success('Please check your email for the reset password link');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <p>Please enter your email address to reset your password</p>
            <div>
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default ForgotPassword;
