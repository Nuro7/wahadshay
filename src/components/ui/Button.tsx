import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

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
    "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-plum cursor-pointer select-none font-body";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-yellow text-plum-dark shadow-[0_4px_20px_rgba(245,189,32,0.3)] hover:shadow-[0_4px_30px_rgba(245,189,32,0.6)] hover:bg-[#ffca2b] border border-transparent",
    secondary:
      "bg-transparent text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(94,38,137,0.3)]",
    ghost:
      "text-white/80 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
export default Button;
