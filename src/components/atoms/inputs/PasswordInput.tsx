import { cn } from "@/libs/utils";
interface IPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<IPasswordInputProps> = ({
  className,
  ...props
}) => {
  const baseStyle =
    "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-charcoal-green-dark placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-moss-stone sm:text-sm/6";
  return (
    <input type="password" className={cn(baseStyle, className)} {...props} />
  );
};

export default PasswordInput;
