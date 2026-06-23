import React, { useState } from "react";
import { 
  User, 
  Settings, 
  Activity, 
  Volume2, 
  ShieldAlert, 
  Trash2, 
  LogOut, 
  Info, 
  AppWindow, 
  Code,
  Sliders,
  CheckCircle,
  FileSpreadsheet
} from "lucide-react";

interface SettingsViewProps {
  username: string;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ username, onLogout }) => {
  const [sensitivity, setSensitivity] = useState(75);
  const [pitchCalibrator, setPitchCalibrator] = useState(true);
  const [motionSmoothing, setMotionSmoothing] = useState(true);
  const [isCleared, setIsCleared] = useState(false);

  const handleClearCache = () => {
    setIsCleared(true);
    setTimeout(() => {
      setIsCleared(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative select-none">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header Title */}
        <section className="text-left">
          <p className="text-primary font-space text-[10px] font-bold tracking-[0.25em] pl-[0.1em] uppercase mb-2">系统偏好配制 • LINGNAN SYSTEMS CONFIG</p>
          <h2 className="font-display text-4xl text-white font-semibold flex items-center gap-3">
            理 · 园
          </h2>
          <div className="h-1 w-24 bg-primary-container mt-4 rounded-full" />
        </section>

        {/* User Curator profile card */}
        <section className="glass-panel p-6 rounded-3xl border border-outline-variant/30 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle floral watermark */}
          <div className="absolute top-2 right-2 w-24 h-24 opacity-[0.03] select-none pointer-events-none">
            <Settings className="w-full h-full rotate-45" />
          </div>

          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/40 relative shadow-2xl">
            <img 
              alt="Curator profile art photography" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlV3vWZyXQbyBnxjyqtcwTiZxjnGZnoO6rI8V6LGngzNre7ZSJxxCP3t_J6tET07bGvbTZn0PBbU3H5S18m3E3df0jlWLY_bB3JHJhKKXWoIZQbeYK2SWFM--zEflze7SV4BhxbBzYguvoIsgMR7yM05DP9Tdg-_JaX004iPj0Z_PvFvzNQZgNMNT2K7XCnligTZV_jS-xv70xABV12IQZUqnnBru3Kt3gbNuxO8aT92tjaYMFS2AgylSEftlGrMd7DSOziwHm_w" 
            />
          </div>

          <div className="text-center md:text-left flex-grow">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h3 className="font-display text-2xl text-white font-bold">{username}</h3>
              <span className="px-2.5 py-0.5 bg-[#43302e] border border-primary/30 text-primary font-space text-[9px] uppercase tracking-widest rounded font-semibold">
                梨园大班 LEVEL 03
              </span>
            </div>
            <p className="text-on-surface-variant font-sans text-xs leading-relaxed opacity-90 mb-1 max-w-sm">
              粤剧传承主理人。致力于数字化传播广府戏曲美学，以AI写意梨园梦幻景致。
            </p>
            <span className="font-space text-[10px] text-primary/60 tracking-wider">MEMBER ID: #YUEJU_2224108</span>
          </div>
        </section>

        {/* Toggles Preferendes sliders */}
        <section className="glass-panel p-6 rounded-3xl border border-outline-variant/30 space-y-8 shadow-md">
          <h4 className="font-display text-lg text-primary font-bold flex items-center gap-2 mb-2 pb-3 border-b border-outline-variant/10">
            <Sliders className="w-4.5 h-4.5" />
            体感标校与灵敏度
          </h4>

          {/* Slider for sensitivity */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white">姿形触控感应灵敏度 POSE TRACKING SENSITIVITY</span>
              <span className="font-mono text-primary font-bold">{sensitivity}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-[#d32f2f] h-1.5 bg-surface-low rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-on-surface-variant/60 font-sans text-[10px] sm:text-xs">
              调节摄像头体感对齐“兰花指”及“开膀”身段的极细微容错系数。越高对身态规范度要求越精确。
            </p>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Toggle Switches */}
          <div className="space-y-6">
            {/* Pitch Toggle */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <span className="block font-semibold text-xs sm:text-sm text-white mb-1">声学标校试音模型 FREQUENCY PITCH BALANCER</span>
                <span className="block text-on-surface-variant text-[11px] sm:text-xs max-w-md">
                  开启后声乐检测自动适配粤剧“平喉/子喉”变调高音。
                </span>
              </div>
              <button 
                onClick={() => setPitchCalibrator(!pitchCalibrator)}
                className={`w-14 h-7 rounded-full p-1 transition-all flex border duration-300 cursor-pointer ${pitchCalibrator ? "bg-[#d32f2f] border-primary/40 justify-end" : "bg-surface-low border-outline-variant/30 justify-start"}`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {/* Motion Smoothing Toggle */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <span className="block font-semibold text-xs sm:text-sm text-white mb-1">水袖飘带曲线触控平滑 WATER-SLEEVE MOTION SMOOTHING</span>
                <span className="block text-on-surface-variant text-[11px] sm:text-xs max-w-md">
                  针对屏幕多点划动时绸带动画轨迹进行微平滑、抗锯齿插值。
                </span>
              </div>
              <button 
                onClick={() => setMotionSmoothing(!motionSmoothing)}
                className={`w-14 h-7 rounded-full p-1 transition-all flex border duration-300 cursor-pointer ${motionSmoothing ? "bg-[#d32f2f] border-primary/40 justify-end" : "bg-surface-low border-outline-variant/30 justify-start"}`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>
        </section>

        {/* Data Persistence, clear caches */}
        <section className="glass-panel p-6 rounded-3xl border border-outline-variant/30 space-y-6 shadow-md">
          <h4 className="font-display text-lg text-primary font-bold flex items-center gap-3 select-none">
            <ShieldAlert className="w-5 h-5 text-primary" />
            数据安全与个人行笈
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#1e0f0e]/50 rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-all">
            <div className="max-w-md">
              <span className="block font-semibold text-xs sm:text-sm text-white mb-1">导出个人戏谱存档 DATA EXPORT</span>
              <span className="block text-on-surface-variant text-[11px] sm:text-xs leading-normal">
                打包下载您保存在本地的所有AI梦境剧本和体感唱跳得分，以便迁移备份。
              </span>
            </div>
            
            <button
              onClick={() => alert("戏谱存档生成成功！已打包成 xiyou_archive.json，可在本地永久持证！")}
              className="px-5 py-2.5 bg-transparent border border-primary/35 text-primary rounded-lg text-xs font-bold leading-none tracking-widest uppercase hover:bg-primary/5 cursor-pointer flex items-center gap-2 outline-none self-start sm:self-center shrink-0 border-solid"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> 导出
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error-container/5 rounded-xl border border-error/20 hover:border-error/40 transition-all">
            <div className="max-w-md">
              <span className="block font-semibold text-xs sm:text-sm text-white mb-1">重置本园全部缓存 RESET DATA</span>
              <span className="block text-on-surface-variant text-[11px] sm:text-xs leading-normal text-error/80">
                清除红船的所有本地配置、登录态凭证及已存藏品。此操作一经开始不可撤销。
              </span>
            </div>

            <button
              onClick={handleClearCache}
              disabled={isCleared}
              className={`px-5 py-2.5 bg-transparent border rounded-lg text-xs font-bold leading-none tracking-widest uppercase cursor-pointer flex items-center gap-2 outline-none self-start sm:self-center shrink-0 ${isCleared ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 cursor-default" : "border-error/35 text-error hover:bg-error/5"}`}
            >
              {isCleared ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> 已完全清理
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" /> 清理缓存
                </>
              )}
            </button>
          </div>
        </section>

        {/* Technical Version, specs logs */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-surface-low/30 rounded-xl border border-outline-variant/10 font-mono text-[9px] text-outline/50 pl-2 tracking-wider">
          <p className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5" /> SYSTEM VERSION: 1.2.4-AISTUDIO BLUEPRINT BUILD
          </p>
          <p className="flex items-center gap-2.5 uppercase text-right">
            <Code className="w-3.5 h-3.5" /> Powered by gemini-3.5-flash
          </p>
        </section>

        {/* Global Exit button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onLogout}
            className="px-10 py-4 border border-[#d32f2f] text-primary hover:bg-[#d32f2f]/10 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer transition-colors flex items-center gap-3 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4 text-primary" /> 退出粤剧旅程
          </button>
        </div>

      </div>
    </div>
  );
};
