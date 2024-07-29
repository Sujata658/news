import updatePassword from "@/apis/users/updatePassword";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    currentpassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),
    newpassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),
    cpassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),
}).refine(data => data.newpassword === data.cpassword, { message: "Passwords do not match", path: ["cpassword"] });

const EditPassword = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentpassword: '',
            newpassword: '',
            cpassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await updatePassword(values);
            if (!response) throw new Error("An error occurred. Please try again.");
            toast.success("Password updated successfully.");
        } catch (error) {
            toast.error("An error occurred while updating password. Please try again.");
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
                    <FormField
                        control={form.control}
                        name='currentpassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700">Current Password</FormLabel>
                                <Input type='password' placeholder='Current Password' {...field} />
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.currentpassword && (
                        <p className="text-xs text-red-600">{form.formState.errors.currentpassword.message}</p>
                    )}
                    <FormField
                        control={form.control}
                        name='newpassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700">New Password</FormLabel>
                                <Input type='password' placeholder='New Password' {...field} />
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.newpassword && (
                        <p className="text-xs text-red-600">{form.formState.errors.newpassword.message}</p>
                    )}
                    <FormField
                        control={form.control}
                        name='cpassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                                <Input type='password' placeholder='Confirm Password' {...field} />
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.cpassword && (
                        <p className="text-xs text-red-600">{form.formState.errors.cpassword.message}</p>
                    )}
                    {/* Form-level error message */}
                    {form.formState.errors.root && form.formState.errors.root.message && (
                        <p className="text-xs text-red-600">{form.formState.errors.root.message}</p>
                    )}

                    <Button type='submit' className="w-full">Submit</Button>
                </form>
            </Form>
        </>
    );
};

export default EditPassword;
