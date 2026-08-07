import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-plum-dark text-white relative overflow-hidden font-body selection:bg-yellow selection:text-plum-dark">

      {/* 1. Cinematic Ambient Orbs (Floating & Animated) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-plum opacity-20 blur-[150px] pointer-events-none z-0" 
        style={{
          animation: "orb-float-1 25s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#2e1a47] opacity-15 blur-[160px] pointer-events-none z-0" 
        style={{
          animation: "orb-float-2 30s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-[#5e2689] opacity-15 blur-[120px] pointer-events-none z-0" 
      />
      {/* Subtle Yellow Ambient Accent Glow */}
      <div
        className="absolute top-[40%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-yellow opacity-[0.03] blur-[150px] pointer-events-none z-0 animate-glow"
      />

      {/* 2. Very Subtle Brand Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      {/* 3. Radial Vignette for Cinematic Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(22,23,29,0.5)_90%)] pointer-events-none z-0" />

      {/* Main Content Wrap */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
export default Layout;
