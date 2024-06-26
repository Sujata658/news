import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import changePassword from '@/apis/users/ChangePassword';
import { useParams } from 'react-router-dom';

const schema = z.object({
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
  confirmPassword: z.string()
    .min(8, { message: 'Confirm Password must be at least 8 characters long' })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

// Define the type for the form data
type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { token } = useParams();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { password } = data;
    try {
        if(!token) throw new Error('Something went wrong');
        const response = await changePassword(password, token);
        if (response) {
            toast.success('Password changed successfully');
        }
    } catch (error) {
        toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
