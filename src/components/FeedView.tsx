import React, { useState } from "react";
import { 
  Play, 
  Menu, 
  Search, 
  Heart, 
  MessageSquare, 
  ArrowRight, 
  Bookmark, 
  Clock, 
  Sparkles, 
  Check,
  Calendar,
  X
} from "lucide-react";
import { ScreenId } from "../types";

interface FeedViewProps {
  username: string;
  onNavigate: (screen: ScreenId) => void;
  onPlayClip?: (clipTitle: string, videoUrl: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ username, onNavigate, onPlayClip }) => {
  const [likes, setLikes] = useState({ clip1: 1240, post1: 852 });
  const [hasLiked, setHasLiked] = useState({ clip1: false, post1: false });
  const [reservedEvent, setReservedEvent] = useState(false);
  const [activeClipModal, setActiveClipModal] = useState<string | null>(null);

  const handleLike = (item: "clip1" | "post1") => {
    if (hasLiked[item]) {
      setLikes({ ...likes, [item]: likes[item] - 1 });
      setHasLiked({ ...hasLiked, [item]: false });
    } else {
      setLikes({ ...likes, [item]: likes[item] + 1 });
      setHasLiked({ ...hasLiked, [item]: true });
    }
  };

  const toggleEventReservation = () => {
    setReservedEvent(true);
    setTimeout(() => {
      // Smooth fade-out banner or keep marked
    }, 4000);
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background scrollbar-chinese relative">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-40 px-6 h-16 flex items-center justify-between bg-[#1e0f0e]/85 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_0_15px_rgba(211,47,47,0.15)] transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate(ScreenId.SETTINGS)}
            className="p-2 hover:bg-surface-variant/40 rounded-full transition-colors active:scale-95 text-primary cursor-pointer bg-transparent border-0 outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => onNavigate(ScreenId.SEARCH)}
            className="p-2 hover:bg-surface-variant/40 rounded-full transition-colors active:scale-95 text-primary cursor-pointer bg-transparent border-0 outline-none"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <h1 
            onClick={() => onNavigate(ScreenId.SPLASH)}
            className="font-display text-xl md:text-2xl text-primary tracking-[0.2em] font-semibold uppercase cursor-pointer pl-1 hover:text-white transition-colors"
          >
            戏游
          </h1>
        </div>

        {/* User Account Avatar with direct click to settings/collections */}
        <div 
          onClick={() => onNavigate(ScreenId.SETTINGS)}
          className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 cursor-pointer hover:border-primary active:scale-90 transition-all shadow-[0_0_8px_rgba(255,179,172,0.2)]"
        >
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsrvjxiOcVA_qL-u6bOMUHm6B_N7_LawWQ71cV3GFoeewIhS5KPqDWAyKLRhbYcZIixLL6CaFXus1vIozfQ80SQRQ-mw82MAaFP_rNKBrPdYlNF-DYVgvUl78wqaS6nRuyibVMQEXvoddLpxDvaLpSSZD9dnsPcjRsOl7f5LUZoE859kCnC_dU1IrEdGgjl3l1VcQYiJFeOU1wmbSpy7iAGN6lbEk4_m4-vTSawGJsq5ekCeIzJW7G5LtUDI4lKLIRkv0feCENdA" 
          />
        </div>
      </header>

      {/* Main Feed Container */}
      <main className="pt-16 pb-32">
        {/* Hero Banner: Princess Cheung Ping (帝女花·香夭) */}
        <section className="relative h-[480px] md:h-[540px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Princess Cheung Ping Hero background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyUPjKMG7gXzdWuluYargw7_XHXWnrAbRj25DzdBcwAyEdJjGthHH54nvFo78voywSRdtG7OzPW2UnngxDkpBUDueEf2xXN2eCRLap5Fk-MjcPtp3Tasdhbmc_H9qcx6x2eWkRlSBTG7E4CpDi8XZREYO_bSXG4dTfxWDIMsTelKFBG3N8igcy3z7vDiI7N3921beANBrdIf_Dofw1cyvpxmkjrSDWv-S4r8MbyBg2jeQhLm4EnwXAeh-0vV6oWK5JFJaGP_GtDQ" 
            />
            {/* Dark Mask Shading */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f0e] via-[#1e0f0e]/30 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 pb-16 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-space text-[10px] uppercase font-bold tracking-widest text-white">
                今日大戏
              </span>
              <span className="text-primary-container flex items-center animate-pulse"><Sparkles className="w-3.5 h-3.5" /></span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight select-none mb-3">
              帝女花 · 香夭
            </h2>

            <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg mb-6 leading-relaxed opacity-90 drop-shadow-sm select-none">
              落花满天蔽月光，借一杯附荐凤台上。梨园极致之作，跟随明朝长平公主与驸马周世显步入这曲荡气回肠的凄美绝唱。
            </p>

            {/* CTA Controls */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate(ScreenId.IMMERSIVE)}
                className="px-6 py-3 bg-[#d32f2f] hover:bg-[#ba1a20] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border-0 outline-none shadow-lg"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                入场观看
              </button>
              
              <button 
                onClick={() => alert("《帝女花》已收入您的戏谱个人行笈中！可在「我·藏」查看。")}
                className="px-6 py-3 border border-primary/50 text-primary rounded-lg font-semibold backdrop-blur-md hover:bg-primary/10 transition-all active:scale-95 cursor-pointer bg-transparent outline-none"
              >
                收藏剧目
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Curved Stage Curtain Division Texture */}
        <div 
          className="w-full h-8 bg-gradient-to-b from-transparent to-[#1e0f0e] border-b border-outline-variant/10 z-20 pointer-events-none relative" 
          style={{
            backgroundImage: "linear-gradient(rgba(211,47,47,0.1), transparent)"
          }}
        />

        {/* Timeline Dynamic Feed Section */}
        <div className="max-w-3xl mx-auto px-6 mt-10">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-outline-variant/10">
            <h3 className="font-display text-2xl text-on-background flex items-center gap-3 font-semibold tracking-wide select-none">
              <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
              精选片段
            </h3>
            
            <button 
              onClick={() => onNavigate(ScreenId.SEARCH)}
              className="text-primary font-space text-[10px] tracking-widest pl-1 uppercase hover:underline flex items-center gap-1 bg-transparent border-none outline-none cursor-pointer"
            >
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeline Tracks */}
          <div className="relative border-l border-outline-variant/40 ml-4 space-y-12 pb-16">
            
            {/* Timeline Item 1: Opera Performance Video Clip Card */}
            <div className="relative pl-10 group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[11px] top-6 w-5 h-5 bg-[#1e0f0e] border-[3px] border-primary rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-primary rounded-full scale-100 group-hover:scale-125 transition-transform" />
              </div>

              <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 hover:border-primary/30 transition-all duration-300">
                
                {/* Media Frame wrapper */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
                    alt="再世红梅记 still frame"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhTEbUeDCWc2kLFIPr4VeueCxW2wXXqKnBPqoTN9Zk7vfpUCOZfNIJmW4HG_wLo283crMHG7jlP9JwhCECWaYz08bQlopcrZN84KkyexRzJGuFrDLhH7u32H4CVoxap2I-beDcvh0akTk5D56-9KcYuiurKI6_TOoGDjmOJSHaO7Ta5hzBX-TdEZ01ns1JVx0nwvMQAGt7Ygru4RCfEVbu1UE5t-REkzNgrcHWXU6v9IPCg8-Cjm0WYCxegkpulzA6VjI83jJ06w" 
                  />
                  {/* Play Button Node overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <button 
                      onClick={() => setActiveClipModal("red_plum")}
                      className="w-16 h-16 bg-[#d32f2f]/90 hover:bg-[#d32f2f] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(211,47,47,0.5)] backdrop-blur-sm group-hover:scale-110 active:scale-95 transition-transform border-0 cursor-pointer"
                    >
                      <Play className="w-7 h-7 fill-white text-white ml-1" />
                    </button>
                  </div>

                  {/* Red Floating watermarks overlay */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 opacity-30 select-none pointer-events-none">
                    <img 
                      alt="Peacock feather watermark overlay"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV5Q4ZJMDVjjJPm85poQVRgxFKWX3WgYQulFx9hUk0yB9i5ZUSfZyIyNJQFqCptSltqneyPzCnj8iVZJVKGCb8c6uXtAXihY3gFd4jKFes6CmDKMwkLNUQcPoBb-XS9nRC92GOSYZakr7fXgCzH48odAWzDVuPBxk76wgYC0f728QMbnv3fCye_poA3iwwITB3ciaKRy7_HxhP3RIlnCIyBCUDag8J1zoFPab6YHA-dRtnlLE7Xq6TmdBVdXhCV9GLuE_BOeeNmg" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Performance Title & descriptions */}
                <div className="p-6 bg-surface-low/60">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="font-display text-xl text-primary font-bold">《再世红梅记》折子戏</h4>
                    <span className="text-on-surface-variant font-space text-[10px] tracking-widest text-[#84d5c5] uppercase font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 12:45 PM
                    </span>
                  </div>

                  <p className="text-on-surface-variant text-sm leading-relaxed mb-5 opacity-85 select-none">
                    名剧《再世红梅记》之折子精华。林派传人身段翩若惊鸿，水袖微扬，唱腔行云流水。跟随这折华美的身段美学重温古韵。
                  </p>

                  <div className="flex gap-6 items-center">
                    <button 
                      onClick={() => handleLike("clip1")}
                      className={`flex items-center gap-1.5 text-xs bg-transparent border-0 outline-none cursor-pointer duration-300 ${hasLiked.clip1 ? "text-[#ffd700]" : "text-on-surface-variant hover:text-primary"}`}
                    >
                      <Heart className={`w-4 h-4 ${hasLiked.clip1 ? "fill-[#ffd700] text-[#ffd700]" : ""}`} /> 
                      {likes.clip1.toLocaleString()}
                    </button>

                    <button 
                      onClick={() => alert("粤剧大评点功能正在研发中，您可在个人收藏「我·藏」查看历史演艺！")}
                      className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary bg-transparent border-0 outline-none cursor-pointer duration-300"
                    >
                      <MessageSquare className="w-4 h-4" /> 
                      85 条评论
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Item 2: User Generated "Opera Dream" Card */}
            <div className="relative pl-10 group">
              <div className="absolute -left-[11px] top-6 w-5 h-5 bg-[#1e0f0e] border-[3px] border-tertiary rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-tertiary rounded-full scale-100 group-hover:scale-125 transition-transform" />
              </div>

              <div className="glow-border-gold rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
                {/* Header Profile element */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border border-tertiary/40 overflow-hidden shadow-inner">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="User mini avatar streetwear"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGtt-DkFeY-WQWel5N3Jn-oXBBqDWer_QnjTDmNH9qRhmZpO3TNML_QFlScj6Hwb25vlCUs5kKTrXTLBD7iF-gywUiZuiqr0anQLz-TEiP43CPJXNs27CCIePbN2ocBO4s0OqfUHfOCjJa-Grv5BUjEQm5Anlkaje8NZ4DjYB9S5SKN-KHRKuiCITWwIDsFWKLhuncGbAghl26PxWDJUTZ1huYgGBMz7j7e-6PEvwvZ_ryDJ5okQnENlTx6wWlGqLeAd9jDUfeCw" 
                    />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-on-background">戏影随行</h4>
                    <p className="text-tertiary font-space text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">#戏游梦境 SERIES</p>
                  </div>
                </div>

                {/* Poetic description with borders */}
                <p className="italic text-on-surface text-sm border-l-2 border-tertiary/40 pl-4 py-1 leading-relaxed opacity-95 mb-6 select-none bg-tertiary-container/5 rounded-r">
                  &ldquo;置身在高耸入云的现代玻璃幕墙间，我极目远眺，耳畔却仿佛拂过一缕粤讴胡琴的独白。那斑驳的霓虹里，忽然有古旧的水袖一闪而过……&rdquo;
                </p>

                {/* Two side-by-side Cantonese Art Photography images hotlinked */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group overflow-hidden rounded-lg aspect-square">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt="Guangzhou neon mirror"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBboyrFQWWgzAX1JTWmaqr_iCX2weMGf1ANSoBCSI3ne10FrYxYrcUgMmuaBIdQcEg0Ugl5nmdmJh4pLCBo1dgcWrjUEfsf3COSmV0uYAVH6yM1iFExXT1H73UipPNTsaKMil-fispuUjWTfUm-FfzFjm0bRqKMrOl7QWehNWkTco4GmHh2fRo9onJNoVDmFXwKLL8Xo96g2rn65BJetQoxL6i5ZDMMLHG6LYVtY9kE3rH-7Mz85l-6Dtb2VxZvS4CZI1GUek6EBQ" 
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-[#1e0f0e]/10 transition-colors" />
                  </div>

                  <div className="relative group overflow-hidden rounded-lg aspect-square">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt="Futuristic cyber robotic opera mask"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWHp5OUoECCkfUpJfaMjv4UbRVTeGbEniNoxPsljxcxHvyBRourJHNExB6hZIckFabLmyjp9C48sDRt7pkWCzKBrRCv-EXgKaATTT_jSeem6IyZxuv_7bfwjLqaUytFujRnJEdOcogczWZFx64Hl5L1OQstCV8QSRaXbje06iWWXAbvM7GdZcbqXQhSUhRmg_181UVsymhFi4OobeA7Pyhv-4oTyuLQ2mJ5kDaaoFJe-igkKePqL_sGjBUiUtoG8o62E5YkFewew" 
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-[#1e0f0e]/10 transition-colors" />
                  </div>
                </div>

                {/* Floating floral graphic stamp */}
                <div className="absolute top-4 right-4 w-12 h-12 opacity-10 pointer-events-none select-none">
                  <img 
                    alt="Floral overlay" 
                    className="w-full h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmQ2AllO-_pD9VWXIi_bdwOhu4lbqy0zXAYyPYKuAcuCAq1TebRqvtE813qty3Htvn1t-k7QH83qFRtbXv6I6XEvUSTplxcpNdVuTWyvxXXJ9emTwlolrEMEFtlTRXFZs7Qw6aR75B9w4uc8oRf0kBwA20LyY36ktGozmOPjOFfDWKddDByooDe2kgJ3TMfPhdgdoPaYdYFyybGn5hG26eHLxNJXJtEh_2SKetXd0WcsZ7etwunZEbKxilONhZ5qBHg6OT92geww"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Item 3: Upcoming Workshop Event Card */}
            <div className="relative pl-10 group">
              <div className="absolute -left-[11px] top-6 w-5 h-5 bg-[#1e0f0e] border-[3px] border-outline-variant rounded-full z-20" />

              <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-primary/4 transition-colors">
                {/* Poster graphic hotlinked */}
                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shrink-0 shadow-md">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Yueju workshop poster graphic calligraphy fan"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbUhEUsjMxNsC38X2-R_pvF3lQd2XY5tI9QzTaA9PtnLbkf6g0F6MjnXewCyJBYUItIRe3kDD694eXwHUOePK_LWaha1vMpOE0A6AYmmbiNdcukaHDjFoLBBK03WFlOaQRvGwsXIYy27rhQ0Xp4x44yiZR4nJhwTwtv_nhTrHsMOs97xnvbQKpXSOcgfdFwedywog4n5OIZwUUB9M5YwKqWJajiPs8uw9oBaiCOHFAY2vLtiDZb3-0RGXqmQt-GwfgA_NqGdhT0w" 
                  />
                </div>

                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 mb-2 text-primary font-space text-[10px] uppercase font-bold tracking-widest pl-[0.1em]">
                    <Calendar className="w-3 h-3" /> Upcoming | 明日 19:30 席
                  </div>

                  <h4 className="font-display text-2xl text-white font-bold leading-tight mb-2">身段工作坊：水袖的奥秘</h4>
                  
                  <p className="text-on-surface-variant font-sans text-sm mb-6 leading-relaxed opacity-85 select-none">
                    名宿旦角大师现场连线指导。领略岭南传统戏曲中最为绚烂的“甩袖、抖袖、抛袖”身段，在舞动的白纱中感悟力量与柔美的微妙平衡。
                  </p>

                  <button 
                    onClick={toggleEventReservation}
                    disabled={reservedEvent}
                    className={`w-full md:w-fit px-8 py-3.5 rounded-full border transition-all duration-300 font-semibold text-xs tracking-wider uppercase cursor-pointer ${
                      reservedEvent 
                      ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 cursor-default" 
                      : "bg-[#43302e] border-primary/40 text-primary hover:bg-primary/20 active:scale-95"
                    }`}
                  >
                    {reservedEvent ? "✓ 已预约坐席" : "预约席位"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Clip Modal Mock for Playback */}
      {activeClipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-surface-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl">
            <header className="p-4 flex items-center justify-between border-b border-outline-variant/20">
              <h3 className="font-display text-lg text-primary font-bold">《再世红梅记》折子戏 • 赏析</h3>
              <button 
                onClick={() => setActiveClipModal(null)}
                className="p-1 hover:bg-surface-variant rounded-full text-on-surface-variant hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </header>
            <div className="aspect-video w-full bg-black relative">
              {/* Img serving as simulated playback with a loading stream */}
              <div 
                className="w-full h-full bg-cover bg-center absolute inset-0"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhTEbUeDCWc2kLFIPr4VeueCxW2wXXqKnBPqoTN9Zk7vfpUCOZfNIJmW4HG_wLo283crMHG7jlP9JwhCECWaYz08bQlopcrZN84KkyexRzJGuFrDLhH7u32H4CVoxap2I-beDcvh0akTk5D56-9KcYuiurKI6_TOoGDjmOJSHaO7Ta5hzBX-TdEZ01ns1JVx0nwvMQAGt7Ygru4RCfEVbu1UE5t-REkzNgrcHWXU6v9IPCg8-Cjm0WYCxegkpulzA6VjI83jJ06w")'
                }}
              />
              <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center gap-4 text-center p-6 bg-black/60">
                <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="font-space text-xs tracking-widest text-[#84d5c5] uppercase">加载高保真数字化剧目流 ...</span>
              </div>
            </div>
            <div className="p-5 text-sm text-on-surface-variant flex items-center justify-between bg-surface">
              <span>演奏乐师：广府笛琴馆</span>
              <button 
                onClick={() => setActiveClipModal(null)}
                className="text-xs text-primary underline bg-transparent border-0 outline-none cursor-pointer"
              >
                退出播放
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
