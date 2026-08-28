import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-plum cursor-pointer select-none active:scale-[0.98] hover:-translate-y-[2px] transform will-change-transform font-semibold whitespace-nowrap";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-5 py-2.5 typo-button-sm",
    md: "px-7 py-3.5 typo-button",
    lg: "px-8 py-4 typo-button",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-yellow text-plum-dark shadow-[0_4px_12px_rgba(245,189,32,0.2)] hover:shadow-[0_8px_20px_rgba(94,38,137,0.2)] hover:bg-plum hover:text-white border border-transparent",
    secondary:
      "bg-transparent text-white border border-yellow hover:bg-yellow hover:text-plum-dark",
    ghost:
      "text-white/80 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
