import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex-1 w-full bg-plum-dark text-text-primary relative overflow-clip font-body selection:bg-yellow selection:text-plum-dark flex flex-col">

      {/* Ambient Orbs Wrapper to contain overflow and prevent scrollWidth expansion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Cinematic Ambient Orbs (Floating & Animated) */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-plum opacity-[0.04] blur-[150px]" 
          style={{ animation: "orb-float-1 25s ease-in-out infinite" }}
        />
        <div 
          className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-plum-dark opacity-[0.03] blur-[160px]" 
          style={{ animation: "orb-float-2 30s ease-in-out infinite" }}
        />
        <div 
          className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-plum opacity-[0.03] blur-[120px]" 
        />
        {/* Subtle Yellow Ambient Accent Glow */}
        <div
          className="absolute top-[40%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-yellow opacity-[0.012] blur-[150px] animate-glow"
        />
      </div>

      {/* 2. Very Subtle Brand Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(43,37,32,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,37,32,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      {/* 3. Radial Vignette for Cinematic Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(43,37,32,0.02)_95%)] pointer-events-none z-0" />

      {/* Main Content Wrap */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
export default Layout;
