import React, { useState, useEffect } from "react";
import { 
  Wifi, 
  ChevronRight, 
  Radio, 
  Sliders, 
  Briefcase 
} from "lucide-react";
import { ScreenId } from "../types";

export interface IPhoneProFrameProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  username: string;
  children: React.ReactNode;
}

export const IPhoneProFrame: React.FC<IPhoneProFrameProps> = ({
  currentScreen,
  onScreenChange,
  username,
  children
}) => {
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);
  const [titaniumColor, setTitaniumColor] = useState<"desert" | "natural" | "black" | "silver">("desert");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [carrier, setCarrier] = useState("Red Boat 5G");
  const [faceIdStatus, setFaceIdStatus] = useState<"locked" | "scanning" | "unlocked">("unlocked");
  const [isMuted, setIsMuted] = useState(false);
  const [localTime, setLocalTime] = useState("09:41");

  // Sync iOS system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setLocalTime(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Soft scanner effect transition
  useEffect(() => {
    if (faceIdStatus === "scanning") {
      const timer = setTimeout(() => {
        setFaceIdStatus("unlocked");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [faceIdStatus]);

  // Frame styles mapping premium metallic textures
  const frameStyles = {
    desert: {
      border: "border-[#bf9b80]",
      ring: "ring-4 ring-[#705646]/30",
      accent: "#bf9b80",
      glow: "shadow-[0_0_50px_rgba(191,155,128,0.22)]",
      name: "沙漠色钛金属 Desert Gold"
    },
    natural: {
      border: "border-[#a5a19e]",
      ring: "ring-4 ring-[#4f4d4c]/30",
      accent: "#a5a19e",
      glow: "shadow-[0_0_50px_rgba(165,161,158,0.22)]",
      name: "原色钛金属 Natural Silver"
    },
    black: {
      border: "border-[#343538]",
      ring: "ring-4 ring-[#121213]/30",
      accent: "#343538",
      glow: "shadow-[0_0_50px_rgba(52,53,56,0.25)]",
      name: "深空黑色 Space Black"
    },
    silver: {
      border: "border-[#e3e4e6]",
      ring: "ring-4 ring-[#83858a]/30",
      accent: "#e3e4e6",
      glow: "shadow-[0_0_50px_rgba(227,228,230,0.18)]",
      name: "白色钛金属 Satin White"
    }
  };

  const activeFrame = frameStyles[titaniumColor];

  // Dynamic Island active pill banner text
  const getIslandIconAndText = () => {
    if (faceIdStatus === "scanning") {
      return { icon: "🛸", text: "FaceID 识别中..." };
    }
    if (faceIdStatus === "unlocked") {
      return { icon: "🟢", text: "锁屏已开启" };
    }
    switch (currentScreen) {
      case ScreenId.DREAM_WORKSHOP:
        return { icon: "✨", text: "AI 创梦工坊" };
      case ScreenId.IMMERSIVE:
        return { icon: "🎥", text: "身段轨迹校准" };
      case ScreenId.ACADEMY:
        return { icon: "🎙️", text: "学艺声频分析" };
      case ScreenId.COLLECTION:
        return { icon: "📔", text: "折子戏藏谱" };
      case ScreenId.SEARCH:
        return { icon: "🔎", text: "古镜史料检索" };
      case ScreenId.SETTINGS:
        return { icon: "⚙️", text: "系统账册控制" };
      case ScreenId.ERROR_PAGE:
        return { icon: "⚠️", text: "系统容灾测试" };
      default:
        return { icon: "🎵", text: "戏游 · 粤剧梦" };
    }
  };

  const islandVal = getIslandIconAndText();

  // Unified rendering container of the active app + safe margins
  const renderAppContent = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between relative bg-[#1e0f0e] text-on-background overflow-hidden select-none">
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#130706] text-on-background relative flex flex-col justify-start overflow-x-hidden selection:bg-primary-container selection:text-white">
      
      {/* Prime traditional stage decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(211,47,47,0.14)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[#130706] opacity-35 bg-[radial-gradient(#2c1b1a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

      {/* Traditional stage hanging lanterns */}
      <div className="hidden lg:block absolute top-4 left-10 w-8 h-12 bg-gradient-to-b from-[#93000a] to-[#d32f2f] rounded-b-xl shadow-[0_0_15px_#d32f2f] opacity-80 animate-pulse pointer-events-none z-25">
        <div className="w-1.5 h-4 bg-amber-400 mx-auto mt-full rounded-b" />
      </div>
      <div className="hidden lg:block absolute top-4 right-10 w-8 h-12 bg-gradient-to-b from-[#93000a] to-[#d32f2f] rounded-b-xl shadow-[0_0_15px_#d32f2f] opacity-80 animate-pulse pointer-events-none z-25" style={{ animationDelay: "1s" }}>
        <div className="w-1.5 h-4 bg-amber-400 mx-auto mt-full rounded-b" />
      </div>

      {/* Main viewport area */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-4 md:py-8 z-10 flex flex-col justify-center">
        
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6 xl:gap-10">
          
          {/* LEFT COMMAND PANEL */}
          <div className="w-full lg:max-w-[310px] flex flex-col gap-5 shrink-0 text-left order-2 lg:order-1 mt-6 lg:mt-0">
            
            {/* Header branding info */}
            <div className="glass-panel p-5 rounded-3xl border border-primary/10 relative overflow-hidden bg-gradient-to-br from-[#2c1b1a]/45 to-transparent">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#d32f2f]/10 blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-primary-container text-white font-space text-[9px] font-bold tracking-widest leading-none">
                  IPHONE 17 PRO READY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h2 className="font-display text-2xl font-bold text-white mb-1.5 tracking-wide flex items-center gap-2">
                戏游 <span className="text-primary text-[11px] font-space font-medium tracking-normal">OPERA TOUR</span>
              </h2>
              <p className="text-xs text-on-surface-variant/80 font-sans leading-relaxed">
                粤剧传承人 iPhone 17 Pro 专属互动学艺终端。适配圆角全面屏，内置灵动岛交互及声轨迹校准。
              </p>
            </div>

            {/* Customizer Slider Panel */}
            <div className="glass-panel p-5 rounded-3xl border border-primary/10 space-y-4">
              <span className="font-space text-[10px] text-primary font-bold tracking-widest uppercase pl-0.5 flex items-center gap-1.5 border-b border-outline-variant/20 pb-2">
                <Sliders className="w-3.5 h-3.5" /> 硬件调试极客面板
              </span>

              {/* View Mode selection */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
                  真机外壳模态 DISPLAY
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsDeviceFrame(true)}
                    className={`py-1.5 px-3 rounded-xl border text-[11px] font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isDeviceFrame 
                        ? "bg-[#d32f2f] border-primary text-white shadow-md shadow-[#d32f2f]/20" 
                        : "bg-surface-low border-outline-variant/30 text-on-surface-variant/80 hover:text-white"
                    }`}
                  >
                    iPhone 17 Pro
                  </button>
                  <button
                    onClick={() => setIsDeviceFrame(false)}
                    className={`py-1.5 px-3 rounded-xl border text-[11px] font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      !isDeviceFrame 
                        ? "bg-[#d32f2f] border-primary text-white shadow-md shadow-[#d32f2f]/20" 
                        : "bg-surface-low border-outline-variant/30 text-on-surface-variant/80 hover:text-white"
                    }`}
                  >
                    全屏网页版
                  </button>
                </div>
              </div>

              {/* Titanium frame colors */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
                  钛金属精雕外壳 COLORS
                </label>
                <div className="flex gap-2.5 items-center pl-1">
                  {(["desert", "natural", "black", "silver"] as const).map((color) => {
                    const colorHex = {
                      desert: "bg-[#bf9b80] hover:ring-2 hover:ring-[#bf9b80]/40",
                      natural: "bg-[#a5a19e] hover:ring-2 hover:ring-[#a5a19e]/40",
                      black: "bg-[#343538] hover:ring-2 hover:ring-[#343538]/40",
                      silver: "bg-[#e3e4e6] hover:ring-2 hover:ring-[#e3e4e6]/40"
                    }[color];
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setTitaniumColor(color);
                          setIsDeviceFrame(true);
                        }}
                        className={`w-6 h-6 rounded-full ${colorHex} cursor-pointer transition-all ${
                          titaniumColor === color 
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#1e0f0e] scale-110" 
                            : "opacity-80 hover:opacity-100"
                        }`}
                        title={color}
                      />
                    );
                  })}
                </div>
                <p className="text-[9px] text-on-surface-variant/50 font-mono italic">
                  外壳：{activeFrame.name}
                </p>
              </div>

              {/* Hardware simulations buttons */}
              <div className="space-y-2.5 pt-1 border-t border-outline-variant/15">
                <label className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-bold block mb-1">
                  模拟真机硬设 SIMULATIONS
                </label>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBatteryLevel(prev => {
                        if (prev === 100) return 35;
                        if (prev === 35) return 12;
                        return 100;
                      });
                    }}
                    className="flex-grow py-1.5 px-2 bg-[#43302e]/60 hover:bg-[#43302e] border border-outline-variant/20 rounded-lg text-[10px] text-on-surface-variant font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 font-sans"
                  >
                    🔋 电量: {batteryLevel}%
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex-grow py-1.5 px-2 bg-[#43302e]/60 hover:bg-[#43302e] border border-outline-variant/20 rounded-lg text-[10px] text-on-surface-variant font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 font-sans"
                  >
                    {isMuted ? "🔇 静音中" : "🔊 铃声开"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCarrier(prev => {
                        if (prev === "Red Boat 5G") return "中国移动 5G";
                        if (prev === "中国移动 5G") return "星链科技 Space";
                        return "Red Boat 5G";
                      });
                    }}
                    className="w-full py-1.5 px-2 bg-[#43302e]/60 hover:bg-[#43302e] border border-outline-variant/20 rounded-lg text-[10px] text-on-surface-variant font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 font-sans"
                  >
                    🛰️ 运营商: {carrier}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setFaceIdStatus("scanning");
                  }}
                  className="w-full py-1.5 px-2.5 bg-[#d32f2f]/10 hover:bg-[#d32f2f]/20 border border-primary/20 rounded-lg text-[10px] text-primary font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  🔒 面容 FaceID 重启扫描
                </button>
              </div>

            </div>

          </div>

          {/* CENTER PANEL: iPhone 17 Pro phone preview */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            
            {/* Responsively fallback to native normal view on typical real phones / tablets */}
            <div className="block lg:hidden w-full max-w-md mx-auto bg-[#1e0f0e] rounded-3xl overflow-hidden border border-outline-variant/20 shadow-2xl h-[750px] relative">
              {renderAppContent()}
            </div>

            {/* Desktop frame preview */}
            <div className="hidden lg:block relative">
              {isDeviceFrame ? (
                /* ================== iPhone Frame Mockup ================== */
                <div className="relative select-none ease-out duration-300">
                  
                  {/* Outer physical side buttons */}
                  <div className="absolute left-[-13px] top-24 w-[3.5px] h-9 bg-zinc-600 rounded-l cursor-pointer hover:bg-zinc-500 active:brightness-125 z-0" title="Interactive Action Button" />
                  <div className="absolute left-[-13px] top-36 w-[3.5px] h-13 bg-zinc-600 rounded-l cursor-pointer hover:bg-zinc-500 active:brightness-125 z-0" title="Volume Up" />
                  <div className="absolute left-[-13px] top-52 w-[3.5px] h-13 bg-zinc-600 rounded-l cursor-pointer hover:bg-zinc-500 active:brightness-125 z-0" title="Volume Down" />
                  <div className="absolute right-[-13px] top-40 w-[3.5px] h-18 bg-zinc-600 rounded-r cursor-pointer hover:bg-zinc-500 active:brightness-125 z-0" title="Interactive Power Button" />

                  {/* Bezels */}
                  <div className={`relative w-[393px] h-[852px] rounded-[52px] border-[11px] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.92)] overflow-hidden bg-[#1e0f0e] flex flex-col justify-between transform translate-z-0 transition-all duration-500 ease-out ${activeFrame.border} ${activeFrame.ring} ${activeFrame.glow}`}>
                    
                    {/* Status Bar */}
                    <header className="px-6 pt-3 pb-1 flex justify-between items-center bg-[#1e0f0e] text-white/90 text-[11px] font-space font-medium relative z-50 shrink-0 pointer-events-none select-none">
                      <span className="tracking-tight pl-1.5">{localTime}</span>

                      <div className="flex items-center gap-1.5">
                        <span className="scale-[0.8] opacity-75 font-sans font-bold bg-white/10 px-1 py-0.5 rounded uppercase tracking-[0.05em]" style={{fontSize: "7.5px"}}>{carrier}</span>
                        <Wifi className="w-3 h-3 text-white" />
                        <div className="flex items-center gap-0.5 relative">
                          <span className="text-[9px] mr-0.5 scale-90">{batteryLevel}%</span>
                          <div className={`w-5 h-2.5 rounded-sm border border-white/40 p-0.5 flex items-center ${batteryLevel <= 15 ? "border-[#ff5252] text-[#ff5252]" : ""}`}>
                            <div 
                              className={`h-full rounded-2xs ${
                                batteryLevel <= 15 
                                  ? "bg-red-500 animate-pulse" 
                                  : batteryLevel <= 35 
                                    ? "bg-amber-400" 
                                    : "bg-emerald-400"
                              }`} 
                              style={{ width: `${batteryLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </header>

                    {/* DYNAMIC ISLAND */}
                    <div 
                      onClick={() => {
                        if (faceIdStatus === "locked") {
                          setFaceIdStatus("scanning");
                        } else {
                          setFaceIdStatus("locked");
                        }
                      }}
                      className={`absolute top-2 left-1/2 -translate-x-1/2 bg-black text-white hover:bg-zinc-950 transition-all duration-400 ease-out z-55 flex items-center justify-around overflow-hidden select-none cursor-pointer ${
                        faceIdStatus === "scanning" 
                          ? "w-[220px] h-10 rounded-2xl shadow-xl border border-primary/20" 
                          : faceIdStatus === "unlocked"
                            ? "w-[154px] h-8 rounded-full border border-emerald-500/35" 
                            : "w-[125px] h-7 rounded-full shadow-md"
                      }`}
                    >
                      {faceIdStatus === "scanning" ? (
                        <div className="flex items-center justify-center gap-2 animate-fadeIn w-full">
                          <span className="inline-block w-2.5 h-2.5 rounded-full border border-primary border-t-transparent animate-spin shrink-0" />
                          <span className="font-space text-[10px] tracking-wider text-primary font-bold uppercase shrink-0">FaceID Scanning...</span>
                        </div>
                      ) : faceIdStatus === "unlocked" ? (
                        <div className="flex items-center justify-center gap-1.5 animate-scaleUp w-full text-emerald-400">
                          <span className="text-[10px] shrink-0 font-space font-extrabold uppercase">✓ FaceID OK</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-1 w-full gap-1.5 text-white/95">
                          <span className="text-[9px] scale-[0.9] shrink-0">{islandVal.icon}</span>
                          <span className="font-sans text-[8px] tracking-[0.05em] font-bold uppercase truncate max-w-[80px]">{islandVal.text}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                        </div>
                      )}
                    </div>

                    {/* Active internal screen */}
                    <div className="flex-grow w-full relative overflow-hidden rounded-[42px] bg-[#1e0f0e]">
                      {renderAppContent()}
                    </div>

                    {/* Handset Home indicator */}
                    <footer className="absolute bottom-1 w-full flex justify-center pb-2 pt-1 pointer-events-none z-50">
                      <div className="w-32 h-1 bg-white/35 rounded-full" />
                    </footer>

                  </div>
                </div>
              ) : (
                /* ================== Full web dashboard mode ================== */
                <div className="w-[393px] md:w-[680px] lg:w-[710px] glass-panel rounded-3xl border border-primary/10 overflow-hidden relative shadow-2xl bg-[#1e0f0e] flex flex-col">
                  <div className="w-full relative h-[780px] overflow-hidden">
                    {renderAppContent()}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SCREEN CHANGE SHORTCUT GUIDE PANEL */}
          <div className="w-full lg:max-w-[260px] flex flex-col gap-5 shrink-0 text-left order-3 mt-6 lg:mt-0">
            
            <div className="glass-panel p-5 rounded-3xl border border-primary/10 space-y-4">
              <span className="font-space text-[10px] text-primary font-bold tracking-widest uppercase pl-0.5 flex items-center gap-1.5 border-b border-outline-variant/20 pb-2">
                <Briefcase className="w-3.5 h-3.5" /> 戏馆模块极速跳台
              </span>

              <div className="flex flex-col gap-1.5">
                {[
                  { id: ScreenId.SPLASH, label: "赏心大雅 • 起场 (Splash)" },
                  { id: ScreenId.LOGIN, label: "梨园签簿 • 进门 (Login)" },
                  { id: ScreenId.FEED, label: "红船巡演 • 听赏 (Feed)" },
                  { id: ScreenId.DREAM_WORKSHOP, label: "智能编目 • 创梦 (Workshop)" },
                  { id: ScreenId.IMMERSIVE, label: "声腔轨迹 • 入戏 (Immersive)" },
                  { id: ScreenId.ACADEMY, label: "梨学堂考 • 学艺 (Academy)" },
                  { id: ScreenId.COLLECTION, label: "藏笈戏箱 • 我藏 (Collection)" },
                  { id: ScreenId.SEARCH, label: "古镜寻根 • 寻味 (Search)" },
                  { id: ScreenId.SETTINGS, label: "红船簿纪 • 控制 (Settings)" },
                  { id: ScreenId.ERROR_PAGE, label: "模拟离线 • 故障 (Diagnostics)" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onScreenChange(item.id);
                      setFaceIdStatus("scanning");
                    }}
                    className={`w-full text-left py-2 px-3 rounded-xl border text-[11px] font-sans font-bold flex items-center justify-between transition-all cursor-pointer ${
                      currentScreen === item.id
                        ? "bg-[#d32f2f]/20 border-primary/60 text-primary"
                        : "bg-transparent border-transparent hover:bg-white/5 text-on-surface-variant/80 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-65" />
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live broadcast state block */}
            <div className="glass-panel p-5 rounded-3xl border border-[#84d5c5]/20 bg-gradient-to-br from-[#122b27] to-transparent relative overflow-hidden">
              <span className="font-space text-[10px] text-[#84d5c5] font-bold tracking-widest uppercase pl-0.5 flex items-center gap-1.5 border-b border-[#84d5c5]/15 pb-2 mb-3">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#84d5c5]" /> 粤剧红船直播遥控
              </span>

              <div className="space-y-1.5 font-mono text-[9px] leading-relaxed text-on-surface-variant/80">
                <div className="flex justify-between">
                  <span>HMD LINK:</span>
                  <span className="text-[#84d5c5]">CONNECTED (98ms)</span>
                </div>
                <div className="flex justify-between">
                  <span>VOCAL RMS:</span>
                  <span>-18.4 dB</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE USER:</span>
                  <span className="text-white font-bold">{username}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
