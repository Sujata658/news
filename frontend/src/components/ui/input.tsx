import * as React from "react";
import { cn } from "@/lib/utils";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password" | "email" | "number";
  leadingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const renderIcon = () => {
      if (type === "password") {
        return (
          <div
            className="absolute right-3 top-3 cursor-pointer "
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoEyeOutline />
 : <FaRegEyeSlash />}
          </div>
        );
      }
      return null;
    };

    return (
      <div className="relative">
        {leadingIcon && <div className="absolute left-3 top-3">{leadingIcon}</div>}
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            leadingIcon ? "pl-10" : "",
            type === "password" ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {renderIcon()}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
