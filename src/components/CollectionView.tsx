import React, { useState } from "react";
import { 
  Award, 
  Smile, 
  BookOpen, 
  Heart, 
  Share2, 
  ChevronRight, 
  Trash2, 
  X, 
  Gamepad, 
  Volume2,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { SavedWork, CustomDreamResponse } from "../types";

const MASK_INFOS = [
  {
    name: "红脸关羽",
    tag: "忠勇耿直 • 净行",
    desc: "以朱砂赤色为主体，构描五虎上将关云长的绝世赤胆与刚正忠心。在粤剧中红毛配金眉，气魄迫人。",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvVr3rQv4epyVofu846-ugfVPSHBtiHwGOaycadCHUU_b1aYcM5W4iM6RuC_q5pDGrxdi0cU0VvM7tlEDZmoyM1Qp_5JTA8xuaE4DkKOcCNFgOE5na7cTbtvO5oKurNcci1KkDT88LImjqa9MH13DFgmmqS3A7eb3g9PBCwJ3Je64XFuQhHcEyhPg5kOd7Hq0fSxKRTBYTPo_NlRXGLH7DfBZP3YbrPIJVSbG5mHE6KDvn80coJVwR1BCQPL57mzrRAsjiRd4Lmg"
  },
  {
    name: "白画赵云",
    tag: "骁勇神武 • 生行",
    desc: "主用铅白银底，细勾柳叶黛眉，勾画常山赵子龙忠烈千古、单骑救主的青年英姿。银铠铁盔首选。",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDcXy1tc1RsGpeDDs0mO78n0VK14V0UmlQoRVvYYpPF0PLkWaNDEIxZPvTYn_PprNMJlYDaeJXkOOe4dF4KZJyzbpjAgtiGKQif4ZvtannrcaI6WhWTgioclMcjb0SGNyy9Wecar4OUucuU0LpsfOTNIXC05KfGrDLlc5TqexncXkWHAOxYrS2qYbBajCb87u5L2bi_C-E2VIfmUj2RNGfnpd3HXlO_gSiJSxRGiqZaBAoYA-SU4ToyjhsHllWbIqA1HapRq9bTA"
  },
  {
    name: "龙王神明",
    tag: "神圣诡谲 • 杂行",
    desc: "饰以靛蓝与孔雀翠绿，绘刻四海龙王神仙驾临时的瑞气祥云。粤剧金鼓齐鸣中，龙王出阵威震全台。",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASjtYDEYlDwPNuaTZMBKRDfatFCXYIl9IszBraXSLX7QOLfkZ5INk3DfwtwXODMYq9kjB68p0C9a9XXZCJXzdhxETWL9Qx1zD7Vv3ApsPiAAHPbsNzA4FoctdE9BrujhiUGXm_-UGPWfXVZK4CpV-VfCcyOMV91Ba0-gOtXf_cp7pQmhCgCp9askzCvLTSZ9ks7s8bj76KXolrk3AZedRP_y9aH3uPanXc7_Fd4vQhFbHa7X2_GI7DBUtPvdVLVVQ_W2JG3RDA4w"
  }
];

interface CollectionViewProps {
  savedWorks: SavedWork[];
  onDeleteWork: (id: string) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ savedWorks, onDeleteWork }) => {
  const [activeTab, setActiveTab] = useState<"facemask" | "customdream">("facemask");
  const [selectedScript, setSelectedScript] = useState<CustomDreamResponse | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Simple mask click reveal dialog state
  const [selectedMask, setSelectedMask] = useState<typeof MASK_INFOS[number] | null>(null);

  const handleTTSVoicePlayback = (script: CustomDreamResponse) => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const utterances: SpeechSynthesisUtterance[] = [];

    script.acts.forEach(act => {
      act.dialogues.forEach(d => {
        const text = `${d.character}念道：${d.text}`;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "zh-HK";
        u.rate = 0.85;
        u.pitch = d.character === "花旦" || d.character === "青衣" ? 1.3 : 0.95;
        utterances.push(u);
      });
    });

    let current = 0;
    const playNext = () => {
      if (current >= utterances.length) {
        setIsPlayingAudio(false);
        return;
      }
      const u = utterances[current];
      u.onend = () => {
        current++;
        playNext();
      };
      u.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(u);
    };
    playNext();
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative select-none">
      
      {/* Decorative floral watermark background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(211,47,47,0.06)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <section className="text-left">
          <p className="text-primary font-space text-[10px] font-bold tracking-[0.25em] pl-[0.1em] uppercase mb-2">个人梨园藏笈箱 • GENERAL COLLECTION</p>
          <h2 className="font-display text-4xl text-white font-semibold flex items-center gap-3">
            我 · 藏
          </h2>
          <div className="h-1 w-24 bg-primary-container mt-4 rounded-full" />
        </section>

        {/* Curator statistics header portfolio */}
        <section className="glass-panel p-6 rounded-3xl border border-outline-variant/30 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden select-none">
          <div className="w-20 h-20 rounded-full bg-[#43302e] border-2 border-primary/30 shrink-0 flex items-center justify-center text-primary shadow-inner">
            <Award className="w-10 h-10 animate-pulse" />
          </div>

          <div className="text-center md:text-left flex-grow">
            <h3 className="font-display text-xl text-white font-semibold mb-1">戏痴个人的梨园藏阁</h3>
            <p className="text-on-surface-variant font-sans text-xs">
              您在此处收纳了在粤剧红船旅居过程里，寻味所得的传世脸谱和个人AI创梦折子戏篇。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 font-mono text-[11px] text-primary/80">
              <span className="flex items-center gap-1.5"><Smile className="w-4 h-4" /> 解放脸谱：3 件</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 创梦戏篇：{savedWorks.length} 折</span>
            </div>
          </div>
        </section>

        {/* Tab switcher buttons */}
        <section className="flex gap-4 border-b border-outline-variant/15 pb-1 justify-center sm:justify-start">
          <button 
            onClick={() => { setActiveTab("facemask"); setSelectedScript(null); }}
            className={`py-3 px-6 font-display text-base font-bold tracking-widest border-b-2 transition-all cursor-pointer bg-transparent outline-none ${activeTab === "facemask" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-white"}`}
          >
            传世脸谱 MASK COLLECTION
          </button>
          
          <button 
            onClick={() => { setActiveTab("customdream"); setSelectedScript(null); }}
            className={`py-3 px-6 font-display text-base font-bold tracking-widest border-b-2 transition-all cursor-pointer bg-transparent outline-none ${activeTab === "customdream" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-white"}`}
          >
            创梦微剧 DREAM SCRIPTS ({savedWorks.length})
          </button>
        </section>

        {/* Tab 1: Traditional face masks panel display */}
        {activeTab === "facemask" && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MASK_INFOS.map((m) => (
              <div 
                key={m.name}
                onClick={() => setSelectedMask(m)}
                className="glass-panel p-3 rounded-2xl border border-outline-variant/15 hover:border-primary/40 transition-all duration-300 group cursor-pointer shadow-lg hover:translate-y-[-2px]"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-md bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10" />
                  <img 
                    alt={m.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
                    src={m.img} 
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 rounded text-[9px] font-bold text-primary tracking-widest uppercase z-20">
                    {m.tag.split(" • ")[1]}
                  </span>
                </div>

                <div className="px-1 flex justify-between items-center">
                  <div>
                    <h5 className="font-display text-lg text-white font-bold mb-0.5">{m.name}</h5>
                    <p className="text-[10px] text-on-surface-variant/70 tracking-tight font-space uppercase">{m.tag.split(" • ")[0]}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Tab 2: Custom created historical scripts panel */}
        {activeTab === "customdream" && (
          <section className="space-y-6">
            {savedWorks.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl text-center border border-outline-variant/15 flex flex-col items-center gap-4">
                <BookOpen className="w-10 h-10 text-on-surface-variant/40" />
                <p className="text-on-surface-variant font-sans text-sm">
                  您的藏箱中暂无定制剧本。可点击首页“创·梦”工坊生成首个人工智能微粤剧存档。
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedWorks.map((work) => (
                  <div 
                    key={work.id}
                    className="glass-panel p-6 rounded-2xl border border-outline-variant/20 shadow-md relative hover:border-primary/30 transition-all group flex flex-col justify-between h-48"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-display text-xl text-primary font-bold">{work.title}</h4>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteWork(work.id); }}
                          className="p-1 hover:bg-error-container/20 text-on-surface-variant/60 hover:text-error rounded transition-all bg-transparent border-none outline-none cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-on-surface-variant text-xs mb-4 line-clamp-2 leading-relaxed opacity-95 pr-2">
                        {work.synopsis}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 text-[10px] text-on-surface-variant/50 font-mono mt-auto relative z-10">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {work.date}</span>
                      
                      <button 
                        onClick={() => setSelectedScript(work.script)}
                        className="px-4 py-1.5 bg-[#43302e] hover:bg-primary-container text-primary hover:text-white rounded font-sans text-[10px] font-bold uppercase tracking-wider pl-4 transition-all hover:scale-105 cursor-pointer border-0 outline-none"
                      >
                        拆阅戏篇
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </div>

      {/* Script Detailed parchment reader Overlay popup modal */}
      {selectedScript && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl my-8 bg-[#ebd9c1] text-[#2c1b1a] rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden flex flex-col justify-between"
               style={{
                 backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')",
                 border: "8.5px solid #5b403d"
               }}
          >
            
            {/* Header toolbar */}
            <div className="flex justify-between items-center pb-4 border-b border-[#5c4033]/20 mb-6 font-mono text-[11px] text-[#5b403d] font-bold">
              <span className="flex items-center gap-1.5 uppercase text-xs font-semibold pl-[0.1em] text-primary-container"><BookOpen className="w-4.5 h-4.5" /> 藏谱戏册</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleTTSVoicePlayback(selectedScript)}
                  className={`px-3.5 py-1.5 rounded-full border text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer ${isPlayingAudio ? "bg-[#d32f2f] text-white border-primary" : "border-[#5c4033]/30 text-[#5c4033] hover:bg-[#5c4033]/5"}`}
                >
                  <Volume2 className="w-3 h-3" /> {isPlayingAudio ? "停顿" : "配音"}
                </button>
                <button 
                  onClick={() => { setSelectedScript(null); window.speechSynthesis.cancel(); setIsPlayingAudio(false); }}
                  className="p-1 hover:bg-[#5c4033]/15 text-[#5b403d] rounded-full transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Script Paper Contents parsed structured representation */}
            <div className="text-center space-y-6 max-h-[480px] overflow-y-auto scrollbar-chinese pr-2 py-1">
              <h3 className="font-display text-3xl font-bold text-[#4a2e1d]">{selectedScript.title}</h3>
              
              <div className="my-5 py-2 border-y border-[#5c4033]/20 max-w-md mx-auto text-[#ba1a20] font-sans font-bold text-base md:text-lg pl-2 tracking-widest">
                【 {selectedScript.poeticCouplet} 】
              </div>

              <p className="font-sans text-xs text-[#5c403d] leading-relaxed italic bg-white/30 p-4 rounded border border-[#5c4033]/10">
                梦境背景：{selectedScript.synopsis}
              </p>

              <div className="space-y-6 text-left max-w-xl mx-auto mt-8">
                {selectedScript.acts.map(act => (
                  <div key={act.actNumber} className="space-y-4">
                    <span className="inline-block px-2 py-0.5 bg-[#5b403d]/10 rounded text-[10px] font-bold text-[#5b403d]">幕 {act.actNumber} • {act.actTitle}</span>
                    
                    <div className="space-y-5">
                      {act.dialogues.map((d, index) => (
                        <div key={index} className="border-l-2 border-[#5c4033]/20 pl-4 py-1.5">
                          <span className="font-sans text-xs font-bold text-[#ba1a20] uppercase">{d.character}</span>
                          {d.stageDirection && (
                            <span className="block font-sans text-[11px] text-[#5c403d]/60 italic font-medium mt-0.5 mb-1">{d.stageDirection}</span>
                          )}
                          <p className="font-display text-base md:text-lg font-bold text-[#4a2e1d] my-1 leading-relaxed tracking-wider">
                            &ldquo; {d.text} &rdquo;
                          </p>
                          {d.translation && (
                            <span className="block font-sans text-xs text-[#5c403d]/70 leading-normal mt-1">释文：{d.translation}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#5c4033]/15 pt-4 text-left font-sans text-xs text-[#5c403d] italic leading-relaxed">
                伴奏配置：{selectedScript.musicRecommendation}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mask Info Detailed Popover popup modal */}
      {selectedMask && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-sm rounded-3xl border border-primary/25 overflow-hidden shadow-2xl relative p-6 text-center space-y-6">
            <header className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <span className="font-space text-[10px] text-primary font-bold tracking-widest uppercase pl-1">传世脸谱详情</span>
              <button 
                onClick={() => setSelectedMask(null)}
                className="p-1 hover:bg-surface-variant rounded-full text-on-surface-variant bg-transparent border-0 outline-none cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </header>

            <div className="aspect-square w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-[#84d5c5]/40 shadow-inner relative">
              <img 
                src={selectedMask.img} 
                className="w-full h-full object-cover" 
                alt="Face mask detailed closeup photography"
              />
            </div>

            <div>
              <h4 className="font-display text-2xl text-white font-bold mb-1">{selectedMask.name}</h4>
              <p className="font-space text-[10px] text-[#84d5c5] font-bold uppercase tracking-widest">{selectedMask.tag}</p>
            </div>

            <p className="font-sans text-sm text-on-surface-variant leading-relaxed opacity-95">
              {selectedMask.desc}
            </p>

            <button
              onClick={() => setSelectedMask(null)}
              className="w-full py-3 bg-[#d32f2f] hover:bg-[#ba1a20] text-white rounded-xl text-xs font-bold uppercase tracking-widest border-0 cursor-pointer transition-colors"
            >
              收卷脸谱
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
