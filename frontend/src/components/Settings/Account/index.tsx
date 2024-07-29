import { useUser } from "@/context/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import updateUser from "@/apis/users/updateUser";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import deleteUser from "@/apis/users/handleDelete";

const formSchema = z.object({
    fname: z.string().min(3, { message: "First name must be at least 3 characters long" }).max(20, { message: "First name must be no more than 20 characters long" }),
    lname: z.string().min(3, { message: "Last name must be at least 3 characters long" }).max(20, { message: "Last name must be no more than 20 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().regex(/[0-9]{10}/, { message: "Phone number must be 10 digits long" })
});

const EditAccount = () => {
    const { user } = useUser();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fname: user?.fname || '',
            lname: user?.lname || '',
            email: user?.email || '',
            phone: user?.phone || ''
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await updateUser(values);
            if (!response) throw new Error("An error occurred. Please try again.")
            toast.success("User updated successfully.")
        } catch (error) {
            toast.error("An error occurred while updating account. Please try again.")
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteUser();
            if (!response) throw new Error("An error occurred. Please try again.")
        } catch (error) {
            toast.error("An error occurred while deleting acoount. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-background w-full ">
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="fname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700">First Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    {...field}
                                    className="mt-1 block w-full px-3 py-2 border  focus:outline-none sm:text-sm"
                                />
                                {form.formState.errors.fname && (
                                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.fname.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-gray-700">Last Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    {...field}
                                    className="mt-1 block w-full px-3 py-2 border shadow-sm focus:outline-none sm:text-sm"
                                />
                                {form.formState.errors.lname && (
                                    <p className="mt-1 text-sm text-red-600">{form.formState.errors.lname.message}</p>
                                )}
                            </FormItem>
                        )}
                    />

                </div>


                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...field}
                                className="mt-1 block w-full px-3 py-2 border focus:outline-none sm:text-sm"
                                disabled
                            />
                            {form.formState.errors.email && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700">Phone</FormLabel>
                            <Input
                                type="number"
                                placeholder="Phone"
                                {...field}
                                className="mt-1 block w-full px-3 py-2 border  focus:outline-none sm:text-sm"
                            />
                            {form.formState.errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.phone.message}</p>
                            )}
                        </FormItem>
                    )}
                />
                <div className="flex  gap-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant='destructive' type="button" className="w-full">
                            Delete Account
                        </Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button type="submit" disabled={!form.formState.isDirty} className="w-full">
                        Submit
                    </Button >


                </div>


            </form>
        </Form>
    );
};

export default EditAccount;
