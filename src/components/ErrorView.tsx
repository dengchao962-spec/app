import React, { useState } from "react";
import { 
  WifiOff, 
  RotateCw, 
  RefreshCw, 
  AlertOctagon, 
  Settings, 
  FlameKindling
} from "lucide-react";

interface ErrorViewProps {
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onRetry }) => {
  const [loading, setLoading] = useState(false);

  const handleRetryLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRetry();
    }, 1800);
  };

  return (
    <div className="w-full h-screen bg-[#1e0f0e] flex flex-col items-center justify-center p-6 text-on-background relative select-none">
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Decorative Traditional Border framing */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#5b403d]/30 pointer-events-none rounded-xl" />
      <div className="absolute top-10 left-10 right-10 bottom-10 border border-dashed border-[#5b403d]/25 pointer-events-none rounded-lg" />

      <main className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        
        {/* Large Swirling Scarlet Water Sleeve overlay art photography hotlinked */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border border-primary/20 bg-cover bg-center mb-10 shadow-3xl flex items-center justify-center group pointer-events-auto">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-102 group-hover:scale-110 filter brightness-90 saturate-[1.2]"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9L1YBvJpTc-ujBNnDD7Hj21HzPnHnlozdGtxcygVyusfFaYKie5_9UHdY9oAKwe0OhK2BxrpCBAW-23OuRlVLc0ickUboGEfMr70Dm0mLkRHRLHpibYzRu_O3CGpaXVUBmcXD25aG1SvB7HhUVeLxyDZQiEhSpXOdtEq8rN0ydMlJBC9Mwb8aSxpLHkex-bl6pIoIaNaj6xzj-Md4fCTnYptvNUcyiRSIljdTs2dZW-oEN-_B9v4p2OH6-mezBobpQWlqaFv2GA")'
            }}
          />
          {/* Circular scanner effect */}
          <div className="absolute inset-0 border border-dashed border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-primary shadow-lg animate-pulse" />
          </div>
        </div>

        {/* Narrative titles */}
        <h3 className="font-display text-2xl text-primary font-bold tracking-widest mb-1 select-none">幕布迎风 · 演艺未启</h3>
        <p className="font-space text-[10px] text-primary/60 tracking-[0.25em] pl-[0.1em] uppercase mb-6">锣鼓骤停 • CHANNELS DETACHED</p>

        {/* Informative log bullet points */}
        <div className="w-full glass-panel p-5 rounded-2xl border border-outline-variant/30 text-left font-sans text-xs space-y-4 mb-10 select-none">
          <p className="text-on-surface-variant font-medium leading-relaxed">
            抱歉，红船演艺司检测到网络气流微恙，数据信号未能完成握手：
          </p>
          <ul className="space-y-2.5 text-on-surface-variant/80 pl-4 list-disc marker:text-[#d32f2f]">
            <li>请检查手机无线区域内网络是否畅通。</li>
            <li>重新检查红船 API 网络端口服务 (Cwd-3000)。</li>
            <li>如果您是游客，可点击下方“重新开场”刷新尝试重载。</li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRetryLoading}
          disabled={loading}
          className="relative px-12 py-4 rounded-full bg-primary-container hover:brightness-110 active:scale-95 transition-all text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(211,47,47,0.3)] border border-primary/20 pointer-events-auto cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>整顿旗鼓...</span>
            </>
          ) : (
            <>
              <RotateCw className="w-4 h-4 text-white" />
              <span>重新开场 / RESTART</span>
            </>
          )}
        </button>

      </main>
    </div>
  );
};
