import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-plum text-white hover:bg-plum-dark",
  secondary: "bg-yellow text-plum-dark hover:bg-yellow/90",
  ghost: "text-plum hover:bg-plum/10",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
