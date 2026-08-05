import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-plum text-white relative overflow-hidden font-body selection:bg-yellow selection:text-plum-dark">
      {/* Premium Ambient Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8b3fd4] rounded-full blur-[180px] opacity-25 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#4c167d] rounded-full blur-[200px] opacity-30 pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-15%] w-[40%] h-[40%] bg-[#aa3bff] rounded-full blur-[150px] opacity-15 pointer-events-none z-0" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.3))] pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
export default Layout;
