import React, { useState, useEffect } from "react";
import { 
  School, 
  Mic, 
  Tv, 
  Accessibility, 
  Swords, 
  ChevronRight, 
  TrendingUp, 
  Camera, 
  Scan, 
  AlertCircle, 
  Activity,
  CheckCircle,
  X 
} from "lucide-react";

interface AcademyViewProps {
  onLearnModule: (moduleName: string) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ onLearnModule }) => {
  const [activeModule, setActiveModule] = useState("念");
  const [showTrainingScanner, setShowTrainingScanner] = useState(false);
  const [alignmentScore, setAlignmentScore] = useState(55);
  const [pitchHz, setPitchHz] = useState(325);
  const [calibrationStep, setCalibrationStep] = useState(0);

  // Floating Gongche notations offset states for subtle parallax
  const [gongcheOffsets, setGongcheOffsets] = useState([
    { char: "合", top: "15%", left: "12%", delay: 0 },
    { char: "四", top: "25%", right: "8%", delay: 1.5 },
    { char: "一", top: "72%", left: "15%", delay: 3 },
    { char: "上", top: "45%", right: "12%", delay: 4.5 },
  ]);

  // Handle alignment progress tickler simulation
  useEffect(() => {
    if (!showTrainingScanner) return;
    const interval = setInterval(() => {
      setAlignmentScore((prev) => {
        const next = prev + Math.floor(Math.random() * 9) - 4;
        return Math.max(76, Math.min(next, 94));
      });
      setPitchHz((p) => {
        const next = p + Math.floor(Math.random() * 15) - 7;
        return Math.max(290, Math.min(next, 380));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [showTrainingScanner]);

  const trainingModules = [
    {
      id: "唱",
      title: "唱",
      sub: "声腔精研",
      time: "4:20 课时",
      icon: <Mic className="w-5 h-5 text-primary" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASQQl_ZzvwYCHN2ODPA4mOyCRFE1a-_HVLJX8xnN18RLlgPzrph8dv2bhGRFH4fcLTKouS2dSyInSOBDRzGpMnc12wCvzlNRcMfxG3VmIC7_Zy24TxfBOM4YUZwWoW77C75rKOXppRS2eUq-KaGW19ytFURrua7VGSeBc5ODmmi3fU_pKT-iU2JhxxnlefxBZQ-SbM2blVSB9BY8sPn9XP4lGpJgk4c91LZqQmR564uyY3QA4EOfvVWpUGC6r_CxldDMu_lqj92A"
    },
    {
      id: "念",
      title: "念",
      sub: "念白入门",
      time: "正在研习",
      icon: <Tv className="w-5 h-5 text-primary" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSo4_1QjWjd1ZyXlI5NodSDbRwoGSTTm56wka4q4eCIWHEK1ShgmJZ6ti54sizoap-TeDdcY_p8M56itzqXAbyy-Jf4t0TUpkneUTGrev5HBFK-Nob7dgNRzXiz9bqSAlbs_evvmrjWJDLhul1A-HQMaKncn_hWVWoUhy7LpUdKSJMDavIyR77k-7OqeE4-0AO-RzjRPoGDVr-T8jssXasZehWubBeyxiyusZGUsJEzU-Zo811JipX-Y7EzEXOpGxdWUjwxDDHDg"
    },
    {
      id: "做",
      title: "做",
      sub: "身段表演",
      time: "动作交互",
      icon: <Accessibility className="w-5 h-5 text-primary" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9txhvUPh410Zr2l32nyp2xj9fIoZvnS2HTqU0nxc9CKibCJf1gSEbeoruZSCJrcZO5G5kYW7ba-oL4k5znQYiSLydqGBzuRKZh3T0y-xG2q9HXr5RX0Ej4mhXcH6txb9y-OjsPv6EhBHE24HSIuBUMXCJ1PB4UcGk7uw9BPkYoExJuoY8vU0CGkcE7Ve0LzbKcOUq7yLeUpAXkhqEr1rFVxjsGctt288NySwKdk6K2POFHad8zee9_nJRpQ6SsVt-99rigM7iUg"
    },
    {
      id: "打",
      title: "打",
      sub: "武打翻腾",
      time: "精通翻腾",
      icon: <Swords className="w-5 h-5 text-primary" />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6uLo6ZdIq6h3Y_PzdIXh9vK-wifn0pDuAPWPdsC_g2CFXJxzlRyRVzfuvpMVLZ-Udv3GN1F9NsMC-Ulvf_d_k5wRaMMv5QEjQQICFr7moLcmgh0sNsEDBdPk48-Kzu_00G8zN0ezACK54OkFoan8YPY70Qex7Js6pHQF09vToQLEVDMRpC-I0HNrHCP-JETDMn3n24E6c6Efd1n1RJFeDumcEjb_VBAVUbM-j_AgXh-RNxmVPNWpGPl-YH66qF3ISuhDgQ0oP1g"
    }
  ];

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative overflow-hidden select-none">
      {/* Background Ornaments / Floating Gongche notation glyphs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 yu-haitang-pattern opacity-10" />
        
        {gongcheOffsets.map((g, idx) => (
          <span 
            key={idx}
            className="absolute font-display text-4xl text-primary/10 tracking-widest leading-none font-bold align-middle select-none transition-transform duration-1000 uppercase"
            style={{
              top: g.top,
              left: g.left,
              right: g.right,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${g.delay}s`
            }}
          >
            {g.char}
          </span>
        ))}
      </div>

      {/* Primary Container */}
      <main className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Headline */}
        <section className="text-left animate-fadeIn">
          <p className="text-primary font-space text-[11px] font-bold tracking-[0.25em] pl-[0.1em] uppercase mb-2">虚拟粤剧学院 • RED BOAT VIRTUAL CADEMY</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight">学 · 艺</h2>
          <div className="h-1 w-24 bg-primary-container mt-4 rounded-full" />
        </section>

        {/* Narrative Framework */}
        <section className="relative bg-gradient-to-br from-primary-container/10 via-[#2c1b1a]/40 to-[#1e0f0e] p-6 rounded-2xl border border-outline-variant/30 sleeve-gradient-border">
          <div className="flex items-center gap-3 mb-4">
            <School className="w-5 h-5 text-primary" />
            <span className="font-sans text-sm font-semibold text-primary tracking-wide">红船传承四门课</span>
          </div>
          <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-6 opacity-85 select-none">
            粤剧讲求“唱、念、做、打”四大基本功。在此，我们借助深度体感和人工智能标校，为您提供梨园级别的专业训练指南，重塑粤剧身段的数字化回响。
          </p>

          {/* Scrolling horizontal modules grid list */}
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x no-scrollbar">
            {trainingModules.map((m) => (
              <div 
                key={m.id}
                onClick={() => { setActiveModule(m.id); onLearnModule(m.id); }}
                className={`min-w-[280px] snap-center glass-panel rounded-2xl overflow-hidden p-4 group cursor-pointer transition-all duration-300 border-2 ${
                  activeModule === m.id 
                  ? "border-primary/50 shadow-[0_0_20px_rgba(211,47,47,0.35)] translate-y-[-2px] bg-primary-container/5" 
                  : "border-outline-variant/20 hover:border-primary/30"
                }`}
              >
                {/* Visual Image container banner wrapper */}
                <div className="relative h-40 mb-4 rounded-xl overflow-hidden shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10" />
                  <img 
                    alt={m.sub} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={m.img} 
                  />
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-space text-white uppercase tracking-widest font-semibold">{m.time}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-primary mb-1 select-none pr-1">{m.title}</h3>
                    <p className="text-on-surface-variant font-sans text-xs italic font-medium">{m.sub}</p>
                  </div>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                    activeModule === m.id ? "bg-primary-container text-white shadow-lg" : "bg-surface-variant/30 text-primary border border-primary/20"
                  }`}>
                    {m.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Training Alignment Progress panel */}
        <section className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden border border-outline-variant/30 shadow-xl select-none">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-sans text-base font-semibold text-white">当前研习进度：念白入门</h4>
              <span className="text-primary font-bold font-mono text-base">65%</span>
            </div>

            {/* Custom bar matching progress */}
            <div className="h-2 w-full bg-surface-low rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-gradient-to-r from-primary-container via-primary to-transparent rounded-full shadow-[0_0_10px_#d32f2f] transition-all duration-1000 ease-out" 
                style={{ width: "65%" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#1e0f0e]/50 rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-all select-none">
                <p className="text-on-surface-variant font-space text-[10px] tracking-widest uppercase mb-1">文化累积修为 / CULTURAL XP</p>
                <p className="font-display text-2xl md:text-3xl text-primary font-bold tracking-wide">1,240</p>
              </div>

              <div className="p-4 bg-[#1e0f0e]/50 rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-all select-none">
                <p className="text-on-surface-variant font-space text-[10px] tracking-widest uppercase mb-1">精通造诣等级 / GRADE LEVEL</p>
                <p className="font-display text-2xl md:text-3xl text-primary font-bold tracking-wide">等级 03</p>
              </div>
            </div>

            {/* Main scanner trigger */}
            <button
              onClick={() => { setShowTrainingScanner(true); setCalibrationStep(0); }}
              className="mt-8 w-full py-5 bg-primary-container text-white font-semibold tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(211,47,47,0.35)] hover:shadow-[0_12px_40px_rgba(211,47,47,0.55)] cursor-pointer active:scale-[0.98] transition-all group overflow-hidden border border-primary/20"
            >
              <Camera className="w-5 h-5 text-white" />
              <span className="font-space text-sm font-medium tracking-[0.2em] pl-[0.1em]">开启人机体感训练</span>
            </button>
          </div>
        </section>
      </main>

      {/* Immersive Body & Audio pitch detection overlay calibration */}
      {showTrainingScanner && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 animate-fadeIn">
          
          <div className="w-full max-w-md aspect-[3/4] border-2 border-primary/40 rounded-3xl relative overflow-hidden bg-[#1e0f0e] shadow-2xl flex flex-col items-center justify-between p-6">
            
            {/* Background Camera view simulated mockup */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center brightness-40 opacity-70"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9OT1twyJYi5VgPeyXxgJoY6l4pr9-3upZectBamhMlNcQsmxP1VZSWx-ETRlRknswORiyAfuOyiZIiL1E9X1ai9jlsBAWEtJas6tDSDRpSFm7qfiXCAB0OgoOvpfru0sIudl-ZRKXZIytvT0LOA2rZjrhVxOKqE7hQmMmlLrE6SNn-W5PqGTh1XWAUZFKiYg7E-GT2uKaPdK4eT1-Ykb8DNNcYPUKaiGms0QBAoS6JzToCx5rqYti1JzsBw6vk6TVq0clzJUTBA")' }}
            />
            
            {/* UI overlay scanlines indicator */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_8px_#ffb3ac] animate-[scan_3s_linear_infinite]" />
            <div className="absolute inset-6 border border-dashed border-primary/30 rounded-2xl pointer-events-none" />

            <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
              <span className="bg-primary/20 backdrop-blur-md px-3 py-1 border border-primary/30 text-[10px] text-primary font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-primary animate-pulse" /> MIC & POSTURE CALIBRATION
              </span>
              <button 
                onClick={() => setShowTrainingScanner(false)}
                className="p-1 hover:bg-surface-variant hover:text-white text-on-surface-variant/70 rounded-full transition-colors bg-transparent border-0 cursor-pointer pointer-events-auto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Live alignment tracker stats center display */}
            <div className="relative z-10 w-full flex flex-col items-center gap-4 text-center my-auto pointer-events-none">
              
              {calibrationStep === 0 && (
                <div className="flex flex-col items-center gap-4 animate-scaleUp">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center relative overflow-hidden animate-pulse">
                    <Scan className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-primary font-bold">人工智能骨骼对齐中</h3>
                  <p className="font-sans text-xs text-on-surface-variant/80 max-w-xs leading-relaxed">
                    请将面部与全身置于框线中。兰花指姿态模型正在自动抓取、校正坐标轴。
                  </p>
                  
                  {/* Calibrate step handle slider click */}
                  <button 
                    onClick={() => setCalibrationStep(1)}
                    className="mt-4 px-6 py-2 border border-primary text-primary hover:bg-primary/10 hover:text-white rounded-full text-xs font-semibold tracking-wider cursor-pointer pointer-events-auto bg-transparent"
                  >
                    开始声乐校正
                  </button>
                </div>
              )}

              {calibrationStep === 1 && (
                <div className="flex flex-col items-center gap-4 animate-scaleUp w-full px-2">
                  <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-xs">
                    <div className="w-2.5 bg-primary/80 rounded-t-sm h-12" />
                    <div className="w-2.5 bg-primary/80 rounded-t-sm h-6" />
                    <div className="w-2.5 bg-primary/80 rounded-t-sm h-14 animate-pulse" />
                    <div className="w-2.5 bg-primary/80 rounded-t-sm h-10" />
                    <div className="w-2.5 bg-[#84d5c5] rounded-t-sm h-16 animate-bounce" />
                    <div className="w-2.5 bg-[#84d5c5] rounded-t-sm h-8" />
                  </div>

                  <h3 className="font-display text-xl text-primary font-bold">唱腔声腔频率检测</h3>
                  <p className="font-sans text-xs text-on-surface-variant/80 max-w-xs leading-relaxed">
                    请发“啊”长音检试音色：
                  </p>

                  <div className="flex justify-between items-center gap-8 bg-black/60 p-3 rounded-lg border border-outline-variant/30 w-full mt-2 font-mono text-xs">
                    <div className="text-left">
                      <span className="block text-primary/70">PITCH POCKET</span>
                      <span className="font-bold text-white text-sm">E4 高音</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[#84d5c5]/70">FREQUENCY</span>
                      <span className="font-bold text-white text-sm">{pitchHz} Hz</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCalibrationStep(2)}
                    className="mt-4 px-6 py-2 border border-primary text-primary hover:bg-primary/10 hover:text-white rounded-full text-xs font-semibold tracking-wider cursor-pointer pointer-events-auto bg-transparent border-none bg-primary-container text-white border border-primary/20 shadow-md"
                  >
                    开始匹配标校
                  </button>
                </div>
              )}

              {calibrationStep === 2 && (
                <div className="flex flex-col items-center gap-4 animate-scaleUp text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl text-emerald-400 font-bold">手势极速匹配成功</h3>
                  
                  <div className="space-y-1">
                    <p className="font-sans text-xs font-semibold text-white">身段重合契合度：{alignmentScore}%</p>
                    <p className="font-sans text-[11px] text-emerald-400 font-bold uppercase tracking-widest pl-1">【 兰花手势完美对齐 】</p>
                  </div>

                  <button 
                    onClick={() => setShowTrainingScanner(false)}
                    className="mt-4 px-8 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 rounded-full text-xs font-bold tracking-widest cursor-pointer pointer-events-auto transition-colors bg-transparent"
                  >
                    存入演艺心得并退出
                  </button>
                </div>
              )}

            </div>

            {/* Bottom hud notice info */}
            <div className="relative z-10 w-full flex items-center justify-center gap-2 border-t border-outline-variant/20 pt-4 pointer-events-none text-on-surface-variant/40 text-[9px] font-space tracking-widest uppercase">
              <AlertCircle className="w-3.5 h-3.5" /> CALIBRATION COMPLETE OR PENDING
            </div>

          </div>

          <button
            onClick={() => setShowTrainingScanner(false)}
            className="mt-8 px-10 py-3 bg-transparent border border-[#d32f2f] text-primary hover:bg-[#d32f2f]/10 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer transition-colors"
          >
            退出训练
          </button>
        </div>
      )}
    </div>
  );
};
