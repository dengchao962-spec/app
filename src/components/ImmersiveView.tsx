import React, { useState, useEffect } from "react";
import { 
  Scan, 
  Tv, 
  Cpu, 
  Sliders, 
  HelpCircle, 
  ChevronRight, 
  Mic, 
  X,
  Volume2,
  Bookmark,
  Share2,
  Check
} from "lucide-react";

export const ImmersiveView: React.FC = () => {
  const [activeMood, setActiveMood] = useState<"醉酒" | "梦幻" | "惊变">("醉酒");
  const [trackerActive, setTrackerActive] = useState(true);
  const [savedPerformance, setSavedPerformance] = useState(false);
  const [poseMatchScore, setPoseMatchScore] = useState(88);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Floating mouse tracking for ribbon mouse movement interactive trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / 30;
      const ry = (e.clientY - window.innerHeight / 2) / 30;
      setMouseOffset({ x: rx, y: ry });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Soft posture score ticker
  useEffect(() => {
    if (!trackerActive) return;
    const interval = setInterval(() => {
      setPoseMatchScore((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(82, Math.min(prev + delta, 95));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [trackerActive]);

  // Specific visual styling associated with atmospheric moods
  const moodOverlays: { [key in "醉酒" | "梦幻" | "惊变"]: { filter: string, shadow: string, label: string } } = {
    "醉酒": {
      filter: "hue-rotate(340deg) saturate(1.4) brightness(0.85)",
      shadow: "inset 0 0 80px rgba(211, 47, 47, 0.4)",
      label: "贵妃霓虹醉酒 • ROSE GLOW"
    },
    "梦幻": {
      filter: "hue-rotate(200deg) saturate(0.8) brightness(0.95)",
      shadow: "inset 0 0 80px rgba(132, 213, 197, 0.35)",
      label: "惊梦游园仙游 • JADE MOONLIGHT"
    },
    "惊变": {
      filter: "hue-rotate(350deg) saturate(1.8) brightness(0.7)",
      shadow: "inset 0 0 100px rgba(147, 0, 16, 0.6)",
      label: "帝女香夭绝唱 • CINNABAR STORM"
    }
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative flex flex-col items-center overflow-hidden select-none">
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#1e0f0e]" />
      </div>

      <div className="w-full max-w-4xl space-y-10 relative z-10">
        {/* Header Title */}
        <section className="text-left">
          <p className="text-primary font-space text-[10px] font-bold tracking-[0.25em] pl-[0.1em] uppercase mb-2">交互式虚拟首演录屏 • IMMERSIVE SYSTEM</p>
          <h2 className="font-display text-4xl text-white font-semibold flex items-center gap-3">
            入 · 戏
          </h2>
          <div className="h-1 w-24 bg-primary-container mt-4 rounded-full" />
        </section>

        {/* Narrative */}
        <section className="text-sm text-on-surface-variant max-w-2xl leading-relaxed opacity-85 select-none">
          利用本园搭载的数字化体感对齐引擎（3.5-Engine），您可将实时肢体动作和唱腔频率与传统粤剧宗师的身段库对齐，在身临其境的水墨背景中开启跨时空合演。
        </section>

        {/* Dynamic Immersive VR Viewport */}
        <div className="w-full relative aspect-video bg-black rounded-3xl overflow-hidden border border-outline-variant/30 shadow-[0_24px_60px_rgba(0,0,0,0.6)] group">
          
          {/* Main Backdrop of sunset courtyard, reacting to active filters and mouse hover parallax */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9OT1twyJYi5VgPeyXxgJoY6l4pr9-3upZectBamhMlNcQsmxP1VZSWx-ETRlRknswORiyAfuOyiZIiL1E9X1ai9jlsBAWEtJas6tDSDRpSFm7qfiXCAB0OgoOvpfru0sIudl-ZRKXZIytvT0LOA2rZjrhVxOKqE7hQmMmlLrE6SNn-W5PqGTh1XWAUZFKiYg7E-GT2uKaPdK4eT1-Ykb8DNNcYPUKaiGms0QBAoS6JzToCx5rqYti1JzsBw6vk6TVq0clzJUTBA")',
              filter: moodOverlays[activeMood].filter,
              transform: `scale(1.06) translate(${mouseOffset.x}px, ${mouseOffset.y}px)`
            }}
          />

          {/* Glowing Atmospheric shadow bezel overlay */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-all duration-700" 
            style={{ boxShadow: moodOverlays[activeMood].shadow }}
          />

          {/* Live body pose tracker skeleton projection diagram overlay */}
          {trackerActive && (
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none animate-fadeIn select-none">
              {/* Connected skeleton coordinate lines representation */}
              <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="#ffb3ac" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="50%" y1="35%" x2="35%" y2="40%" stroke="#ffb3ac" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <line x1="35%" y1="40%" x2="28%" y2="28%" stroke="#84d5c5" strokeWidth="2" strokeLinecap="round" opacity="0.9" /> {/* Wrists/Orchid finger curve */}
              <line x1="50%" y1="35%" x2="65%" y2="45%" stroke="#ffb3ac" strokeWidth="2" opacity="0.8" />
              <line x1="65%" y1="45%" x2="72%" y2="60%" stroke="#ffb3ac" strokeWidth="2" opacity="0.75" />
              <line x1="50%" y1="50%" x2="40%" y2="72%" stroke="#5b403d" strokeWidth="2" opacity="0.5" />
              <line x1="50%" y1="50%" x2="60%" y2="75%" stroke="#5b403d" strokeWidth="2" opacity="0.5" />

              {/* Skeleton Keypoint Nodes (circles mapping head, wrists, ankles) */}
              <circle cx="50%" cy="20%" r="9" fill="#2c1b1a" stroke="#ffb3ac" strokeWidth="3" /> {/* Head */}
              <circle cx="50%" cy="35%" r="6" fill="#1e0f0e" stroke="#ffb3ac" strokeWidth="2" /> {/* Shoulder neck */}
              <circle cx="35%" cy="40%" r="6" fill="#d32f2f" stroke="#ffb3ac" strokeWidth="2" /> {/* Left Elbow */}
              <circle cx="28%" cy="28%" r="8" fill="#ebd9c1" stroke="#84d5c5" strokeWidth="3" className="animate-pulse" /> {/* Headset wrist/orchid gesture node */}
              <circle cx="65%" cy="45%" r="6" fill="#1e0f0e" stroke="#ffb3ac" strokeWidth="2" /> {/* Right Elbow */}
              <circle cx="72%" cy="60%" r="6" fill="#d32f2f" stroke="#ffb3ac" strokeWidth="2" /> {/* Right Wrist */}
              <circle cx="40%" cy="72%" r="5" fill="#5b403d" stroke="#5b403d" strokeWidth="1" />
              <circle cx="60%" cy="75%" r="5" fill="#5b403d" stroke="#5b403d" strokeWidth="1" />
            </svg>
          )}

          {/* Tracking Metrics Live Head-Up Display HUD Overlay */}
          <div className="absolute top-5 left-5 z-30 font-space text-[10px] tracking-widest uppercase text-white space-y-2 pointer-events-none">
            <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 flex items-center gap-2">
              <Scan className="w-4 h-4 text-[#84d5c5]" /> Pose Match: <span className="font-bold text-primary">{poseMatchScore}%</span>
            </div>
            <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#84d5c5]" /> Vocal Frequency: <span className="font-bold text-white">E4 高音 (345Hz)</span>
            </div>
          </div>

          <div className="absolute top-5 right-5 z-30 pointer-events-auto flex items-center gap-2">
            <button 
              onClick={() => setTrackerActive(!trackerActive)}
              className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded border border-white/10 text-[9px] font-space tracking-widest uppercase text-white cursor-pointer active:scale-95 duration-200 outline-none"
            >
              {trackerActive ? "✕ 停用追踪" : "✓ 启用追踪"}
            </button>
          </div>

          {/* Bottom Banner Details */}
          <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-none">
            <div className="font-space text-[10px] text-white tracking-widest font-semibold uppercase bg-[#d32f2f]/85 backdrop-blur-sm px-4 py-2 rounded">
              {moodOverlays[activeMood].label}
            </div>
            
            <div className="pointer-events-auto flex gap-3">
              <button 
                onClick={() => setSavedPerformance(!savedPerformance)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border cursor-pointer active:scale-90 duration-200 ${savedPerformance ? "bg-emerald-500 border-emerald-400 text-white" : "bg-black/60 border-white/10 text-white"}`}
              >
                {savedPerformance ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Mood select changer dial */}
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-4">
          <span className="font-space text-[10px] text-[#84d5c5] font-bold tracking-widest uppercase pl-1">
            舞台艺术滤镜及情境变幻
          </span>

          <div className="grid grid-cols-3 gap-4">
            {(["醉酒", "梦幻", "惊变"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMood(m)}
                className={`py-3.5 rounded-xl border font-sans text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeMood === m 
                  ? "bg-[#d32f2f] border-primary text-white shadow-lg shadow-[#d32f2f]/30 ring-1 ring-primary/40 scale-102" 
                  : "bg-surface-low border-outline-variant/30 text-on-surface-variant hover:text-white"
                }`}
              >
                {m === "醉酒" ? "醉酒霓梦" : m === "梦幻" ? "游园惊梦" : "临崩惊变"}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Coordinate info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 font-mono text-[10px] text-on-surface-variant/70 leading-relaxed bg-[#1e0f0e]/50 p-4 rounded-xl border border-outline-variant/10">
          <div>
            <span className="block text-primary/70 mb-0.5">VIRTUAL COORDINATE MESH (3D)</span>
            <p>HMD_OFFSET: X={mouseOffset.x.toFixed(2)}, Y={mouseOffset.y.toFixed(2)}, Z=-0.45. Skeletal vector density: 16-Nodes fully locked.</p>
          </div>
          <div>
            <span className="block text-[#84d5c5]/70 mb-0.5">SPEECH SPECTROGRAM</span>
            <p>RMS_VOL: -18.2 dB. Tone: Classic Cantonese Ping-Hou modal tracking. Autocalibration: ACTIVE.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
