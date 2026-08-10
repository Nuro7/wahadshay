import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface VideoItem {
  id: string;
  title: string;
  desc: string;
  videoSrc: string;
  startTime: number; // simulated starting segment offset
}

const videoSrcs = [
  { videoSrc: "/home.mp4", startTime: 0 },
  { videoSrc: "/home.mp4", startTime: 10 },
  { videoSrc: "/home.mp4", startTime: 20 },
];

export function VideoGallery() {
  const { t, language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const videosData = useMemo(() => {
    const vids = t('about.videoGallery.videos') as Array<{ title: string, desc: string }>;
    return vids.map((v, i) => ({
      id: `vid-${i}`,
      title: v.title,
      desc: v.desc,
      videoSrc: videoSrcs[i % videoSrcs.length].videoSrc,
      startTime: videoSrcs[i % videoSrcs.length].startTime
    }));
  }, [t]);

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
    <section id="video-gallery" className="py-24 md:py-32 bg-[#12071C] relative overflow-hidden select-none">
      {/* Background soft glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[450px] h-[450px] bg-plum/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16 md:space-y-20">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto space-y-4">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
            {t('about.videoGallery.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mask-reveal">
            <span className="text-shimmer-gold">{t('about.videoGallery.title')}</span>
          </h2>
          <p className="text-grey text-sm md:text-base font-body max-w-md mx-auto leading-relaxed">
            {t('about.videoGallery.subtitle')}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {videosData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onClick={() => setActiveVideo(item)}
              className="group relative h-[400px] cursor-pointer flex flex-col justify-between p-8 rounded-[32px] overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(245,189,32,0.1)] transition-all duration-500 border border-white/10 hover:border-yellow/30 bg-[#1A0E2B]"
            >
              {/* Animated hover top border indicator */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-yellow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center z-20" />

              {/* Video Preview layer */}
              <div className="absolute inset-0 z-0 overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                <motion.video
                  ref={(el) => { videoRefs.current[item.id] = el; }}
                  src={item.videoSrc}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-105"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09030F] via-[#09030F]/40 to-transparent z-1 pointer-events-none" />
              </div>

              {/* Play Trigger Indicator Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-[2px]">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="rounded-full bg-yellow/90 backdrop-blur-md text-plum-dark p-5 border border-white/20 shadow-2xl flex items-center justify-center"
                >
                  <Play size={28} fill="currentColor" />
                </motion.div>
              </div>

              {/* Top Row: category badge */}
              <div className="flex justify-between items-start z-10 relative transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="bg-black/40 border border-white/20 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white/90 flex items-center gap-2 backdrop-blur-md shadow-sm">
                  <Film size={14} className="text-yellow" />
                  CINEMA
                </span>
              </div>

              {/* Bottom Row: Video Metadata */}
              <div className="space-y-3 z-10 relative mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-2xl font-black text-white group-hover:text-yellow transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-body line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
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
