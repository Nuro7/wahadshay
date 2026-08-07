import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, Volume2, VolumeX } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  desc: string;
  videoSrc: string;
  startTime: number; // simulated starting segment offset
}

const videosData: VideoItem[] = [
  {
    id: "karak-prep",
    title: "Karak Brewing Ritual",
    desc: "A cinematic look into our slow-brewing Karak tea, double-spiced with fresh cardamom.",
    videoSrc: "/home.mp4",
    startTime: 0,
  },
  {
    id: "brioche-bake",
    title: "Artisan Brioche Craft",
    desc: "Capturing the rise and gold bake of our signature butter brioches in the stone oven.",
    videoSrc: "/home.mp4",
    startTime: 10,
  },
  {
    id: "saffron-steep",
    title: "Saffron Steep Ceremony",
    desc: "Watching organic golden saffron filaments dissolve in hot, fine black tea.",
    videoSrc: "/home.mp4",
    startTime: 20,
  },
];

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="video-gallery" className="py-24 md:py-32 bg-plum-dark relative overflow-hidden select-none">
      {/* Background soft glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[450px] h-[450px] bg-plum/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16 md:space-y-20">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto space-y-4">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
            Cinematic Log
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mask-reveal">
            Video Gallery
          </h2>
          <p className="text-grey text-sm md:text-base font-body max-w-md mx-auto leading-relaxed">
            Witness the craftsmanship behind every pour and bake in our high-definition cinematic previews.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videosData.map((item, idx) => (
            <div
              key={item.id}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onClick={() => setActiveVideo(item)}
              className="reveal glass-card glass-card-hover overflow-hidden group relative h-[360px] cursor-pointer flex flex-col justify-between p-6"
            >
              {/* Animated hover top border indicator */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-yellow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center z-20" />

              {/* Video Preview layer */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <video
                  ref={(el) => { videoRefs.current[item.id] = el; }}
                  src={item.videoSrc}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.01]"
                  style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent z-1 pointer-events-none" />
              </div>

              {/* Play Trigger Indicator Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="rounded-full bg-yellow text-plum-dark p-4 border border-transparent shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>

              {/* Top Row: category badge */}
              <div className="flex justify-between items-center z-10 relative">
                <span className="bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-grey flex items-center gap-1.5 backdrop-blur-md">
                  <Film size={10} className="text-yellow" />
                  CINEMA
                </span>
              </div>

              {/* Bottom Row: Video Metadata */}
              <div className="space-y-2 z-10 relative mt-auto">
                <h3 className="font-display text-lg font-black text-white group-hover:text-yellow transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-grey text-xs leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full screen Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#2E1A47]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <video
                src={activeVideo.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Controls Overlay */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                <span className="font-display text-sm font-black text-white tracking-wide uppercase drop-shadow-md">
                  {activeVideo.title}
                </span>
                
                <div className="flex gap-3">
                  {/* Sound Toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  
                  {/* Close Modal */}
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default VideoGallery;
