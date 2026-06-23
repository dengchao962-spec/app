import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Check, Chrome } from "lucide-react";

interface LoginViewProps {
  onLoginSuccess: (username: string) => void;
  onBack: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / 60;
      const ry = (e.clientY - window.innerHeight / 2) / 60;
      setMousePos({ x: rx, y: ry });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = account.trim() ? account.trim() : "戏痴 · 寻梅";
    onLoginSuccess(displayName);
  };

  const handleGuestAccess = () => {
    onLoginSuccess("梨园散客");
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-6 overflow-hidden bg-background text-on-background select-none">
      {/* Cinematic Parallax Background - High Detail Cantonese Attire Close-Up */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu209qzJrLFU9PHPEqxbHUQTVwLFRpaLjg9MFCNU9d5s2tNQ0VTjXWgd7OCjYFC8-dCCq490mIh7sxKQ6LDqX-Lh7_hArKmbnttByu7aky22lXPoz9dBf2OXPz2HPMAsGkHtRgvSFNZs9ddhBLHaUvv6coBXfcnxug6dIjXWlJZt8mSdMGc5reH4riCe4iR55PXWd3psClgHAQB9bG8t969X9WW70_oKTcwShzdePiL846zQkfKvKPZKFH8VMJL4XP4EoYAsKoUw")',
          transform: `scale(1.15) translate(${mousePos.x}px, ${mousePos.y}px)`,
          filter: "brightness(0.35)",
        }}
      />

      <main className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Login Card */}
        <div className="w-full glass-panel jade-begonia-pattern p-8 md:p-12 rounded-[24px] relative overflow-hidden backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Top Corner Decor Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-15 pointer-events-none flex items-center justify-center translate-x-4 -translate-y-4">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>

          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl text-primary font-bold tracking-wider mb-2">戏 游</h1>
            <p className="font-sans text-[11px] text-primary/60 tracking-[0.3em] uppercase pl-[0.3em]">Opera Journey</p>
            <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
          </header>

          {/* Login Form */}
          <form className="space-y-8" onSubmit={handleLoginSubmit}>
            <div className="space-y-6">
              {/* Account Input */}
              <div className="relative group">
                <label className="block font-space text-[10px] text-on-surface-variant font-medium tracking-widest mb-1 uppercase">
                  手机号或邮箱 / ACCOUNT
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    onFocus={() => setIsFocused("account")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="输入账号"
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-lg py-3 text-on-background transition-colors placeholder:text-on-surface-variant/30 outline-none"
                    style={{
                      borderBottom: isFocused === "account" ? "1px solid #ffb3ac" : "1px solid rgba(171, 137, 133, 0.3)"
                    }}
                  />
                  {/* Blinking Ink Cursor bar */}
                  {isFocused === "account" && (
                    <div className="absolute right-0 bottom-2.5 w-[2px] h-6 bg-primary animate-pulse" />
                  )}
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out"
                  style={{ width: isFocused === "account" ? "100%" : "0%" }}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block font-space text-[10px] text-on-surface-variant font-medium tracking-widest mb-1 uppercase">
                  密 码 / PASSWORD
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused("password")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-lg py-3 text-on-background transition-colors placeholder:text-on-surface-variant/30 tracking-widest outline-none"
                    style={{
                      borderBottom: isFocused === "password" ? "1px solid #ffb3ac" : "1px solid rgba(171, 137, 133, 0.3)"
                    }}
                  />
                  {/* Blinking Ink Cursor bar */}
                  {isFocused === "password" && (
                    <div className="absolute right-0 bottom-2.5 w-[2px] h-6 bg-primary animate-pulse" />
                  )}
                </div>
                <div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out"
                  style={{ width: isFocused === "password" ? "100%" : "0%" }}
                />
              </div>
            </div>

            {/* Remember Me / Forgot Pass */}
            <div className="flex items-center justify-between font-sans text-xs text-on-surface-variant/80">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border border-outline-variant flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: rememberMe ? "#d32f2f" : "transparent",
                    borderColor: rememberMe ? "#ffb3ac" : "rgba(171, 137, 133, 0.4)"
                  }}
                >
                  {rememberMe && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                </div>
                <span className="group-hover:text-primary transition-colors">记住我</span>
              </label>

              <button 
                type="button"
                className="text-primary hover:underline underline-offset-4 bg-transparent border-0 outline-none cursor-pointer"
                onClick={() => alert("梨园大门常掩，密码重置请联系管理司。")}
              >
                忘记密码？
              </button>
            </div>

            {/* Submit Action */}
            <button 
              type="submit"
              className="w-full h-14 bg-primary-container text-on-primary-container font-semibold rounded-xl flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_10px_25px_rgba(211,47,47,0.3)] hover:shadow-[0_12px_35px_rgba(211,47,47,0.55)] cursor-pointer text-white border border-primary/20 transition-all duration-300 active:scale-95"
            >
              <span className="relative z-10 font-space tracking-widest text-sm uppercase pl-1">开启旅程 · 登录</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-10 text-center">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-grow h-[1px] bg-outline-variant/30" />
              <span className="font-space text-[9px] text-on-surface-variant font-medium tracking-[0.2em] uppercase">社交账号登录</span>
              <div className="flex-grow h-[1px] bg-outline-variant/30" />
            </div>

            {/* Social Logos Hotlinked */}
            <div className="flex justify-center space-x-5 mb-8">
              {/* WeChat */}
              <button 
                type="button" 
                onClick={handleGuestAccess}
                className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-variant hover:border-primary/50 transition-all group scale-100 hover:scale-110 cursor-pointer bg-white/5"
              >
                <img 
                  alt="WeChat" 
                  className="w-5 h-5 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_i37VGB6c09-zYc7POZawMZF6_zHZ2aG46tyOG6jQdDkmL3Q_HjACfCG6bRRMQfRVXTvQaYO51rujoRGzG1fkgyw51n-EXKwBUlGfHYOoOFHaOIyR3vLJg91rAgETgvO65_R3BrMRX6GvnzEFLzR8WPi7VPhhs4b-I_nPUEk4ejqTAkyVhR5vKePsDTdVK9Qj84uvPi-obn8cBeFmwjDH2k31laU7T5enrHPjX59zOLZt48mmxizo5FLSwgxCthihvpH9AiJTCw" 
                />
              </button>

              {/* Weibo */}
              <button 
                type="button" 
                onClick={handleGuestAccess}
                className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-variant hover:border-primary/50 transition-all group scale-100 hover:scale-110 cursor-pointer bg-white/5"
              >
                <img 
                  alt="Weibo" 
                  className="w-5 h-5 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA20tPTlpjw3mChWpOeOOcEjzIN9vIJID22eqPLOl2OAO8lDebAtT5ZVwkLlStBWy0TWj_8hQ4rGjyw6oCVoZmatzeoypQD0OAzXausxy053K_fTx7JqDuccldTeU36q30pdhssJ3BR3nPYvfw1LDWy-snBmbfaUwzNqbRDD08-2_Mgw2g0uHUR-Po27pIhOlbB3s5sY3GIXmW1DZkDEML1NpmzVVSI5SIeQ-YYx1UGagNgHc4SUHQB8DXWgMyDxLzgAkG_yyVJUA" 
                />
              </button>

              {/* Apple */}
              <button 
                type="button" 
                onClick={handleGuestAccess}
                className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-variant hover:border-primary/50 transition-all group scale-100 hover:scale-110 cursor-pointer bg-white/5"
              >
                <img 
                  alt="Apple" 
                  className="w-5 h-5 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7RpHcefoCWIxdOp9WeZEFtmU_IXt5trRvjIpDPnaD_TZ6bxsNilpU_s4TEdEfHvfGQv-hdGANm9WGydN4daN0dHYoXvbqniiGi9fOvqqAKRigaQiMivgQNM9pwmuaSiBijeDnIYZrcKthcvw4OLob_3M15UbrlWr0LqBWrMi6Aw7959VkqbDdfJ31SKdWAS02d7SaTle-yOhh-1O_GkN0eXao9vyaTMa79VeKbzqlx5mj8wrP1gHStyaydkaPc8jWylcHQ04jpg" 
                />
              </button>
            </div>

            {/* Guest Click Entrance */}
            <button 
              type="button"
              onClick={handleGuestAccess}
              className="text-on-surface-variant hover:text-primary font-space text-[10px] uppercase font-bold tracking-[0.25em] pl-[0.25em] bg-transparent border-0 outline-none cursor-pointer transition-colors"
            >
              游客访问 / GUEST VISIT
            </button>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Flowing Ribbon */}
      <div className="fixed bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-container via-primary to-tertiary-container opacity-40 blur-sm pointer-events-none" />
    </div>
  );
};
