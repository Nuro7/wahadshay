import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-plum cursor-pointer select-none font-body active:scale-[0.98] hover:-translate-y-[3px] transform will-change-transform";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-yellow text-plum-dark shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(94,38,137,0.15)] hover:bg-plum hover:text-white border border-transparent",
    secondary:
      "bg-transparent text-white border border-yellow hover:bg-yellow hover:text-plum-dark",
    ghost:
      "text-white/80 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
