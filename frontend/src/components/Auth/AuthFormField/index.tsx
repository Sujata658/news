import { Control,  FieldPath } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AuthFormFieldProps<T extends ZodTypeAny> {
  name: FieldPath<z.infer<T>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: "text" | "password" | "email" | "number";
  formControl: Control<z.infer<T>>;
}

const AuthFormField = <T extends ZodTypeAny>({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}: AuthFormFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs ">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              className="w-full h-[40px] px-2 border-2 border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthFormField;