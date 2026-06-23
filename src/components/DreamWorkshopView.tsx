import React, { useState } from "react";
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Smile, 
  Image, 
  BookOpen, 
  Save, 
  Volume2, 
  VolumeX,
  X, 
  Loader2,
  Check
} from "lucide-react";
import { CustomDreamResponse, SavedWork } from "../types";

// Standard pre-defined images associated with various costumes and scenes
const COSTUME_IMAGES: { [key: string]: string } = {
  "青衣翠蟒": "https://lh3.googleusercontent.com/aida-public/AB6AXuAhxVCN0Q6RhnzhB3Tkrm7CuBgEPEtI-_TVae7xM1q6Nj_K2DsgtGq7KsqDnxJhy03YhzoRxQ4-k7MCTI-st9-3xJAK-KVgUWB1SIPz_MgVoGDMu7pXFr4Qk1Upe0V8AjaLfnHKgfKnjuTSXHTXX6v5WbHvPhnKcjjW3S_3tRikyEgx2Zc4D0sU0jqtXS9Yqz796Gz-Cg-p_U6wdIblHYlDU3-W414jcLk1Byh1MdQM9S521QaBp-JoxeQAQIyxT5o754Wlm9eEZw",
  "帝女吉服": "https://lh3.googleusercontent.com/aida-public/AB6AXuDyUPjKMG7gXzdWuluYargw7_XHXWnrAbRj25DzdBcwAyEdJjGthHH54nvFo78voywSRdtG7OzPW2UnngxDkpBUDueEf2xXN2eCRLap5Fk-MjcPtp3Tasdhbmc_H9qcx6x2eWkRlSBTG7E4CpDi8XZREYO_bSXG4dTfxWDIMsTelKFBG3N8igcy3z7vDiI7N3921beANBrdIf_Dofw1cyvpxmkjrSDWv-S4r8MbyBg2jeQhLm4EnwXAeh-0vV6oWK5JFJaGP_GtDQ",
  "武生战甲": "https://lh3.googleusercontent.com/aida-public/AB6AXuDNQ8ZioRooW8JYOYtajBJPXK3SVJqFBZ4iuIq4Sdg5kBkL5YyiHg2OfniEcA-Z_TRkPUG9R9lduro_CkNg9dPzJP-vYpMTHTU_FJRTsyXVjxVAn_pvuLnErvM8SdtYoyNT47bYESeiZTDsueLJRMy9LA1ftNVEUT2Img3wyu5dwO5di3NwKaZa5P3TYvciASuwRZi9vUOvacDTIjGQMvjAsTFscuiXFnKGTjlipS1oYaWHdTp9uUovylXBgh7RmgKTbS_fF247w"
};

const SCENE_BACKGROUNDS: { [key: string]: string } = {
  "幽林古阁": "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OT1twyJYi5VgPeyXxgJoY6l4pr9-3upZectBamhMlNcQsmxP1VZSWx-ETRlRknswORiyAfuOyiZIiL1E9X1ai9jlsBAWEtJas6tDSDRpSFm7qfiXCAB0OgoOvpfru0sIudl-ZRKXZIytvT0LOA2rZjrhVxOKqE7hQmMmlLrE6SNn-W5PqGTh1XWAUZFKiYg7E-GT2uKaPdK4eT1-Ykb8DNNcYPUKaiGms0QBAoS6JzToCx5rqYti1JzsBw6vk6TVq0clzJUTBA",
  "西楼秋月": "https://lh3.googleusercontent.com/aida-public/AB6AXuDDprT6wShS2nI9-6fl2BL9x9asY-nMpJjaY_4OfImjhCBlLyyNYmfU-zAXjXxwSgOCZihAtrOpono16jFfQmuCWkpn3NYFSrDF--7YRKWeDHJvkEF0lY-p54xZU7OkUrN8kFxmzWDkKm00VVJwUvZz4KgkMIyYDhM489V7HclK84mJn4Qxt0qLBGiJ1iqbzRDY3-20Qs1oEyExA65i9k18_2-uQIKR13Lxo6STZWMbsvmzoCxjYkXOa4IlOr6dYpXMIDfuqy8f2Q",
  "广府戏台": "https://lh3.googleusercontent.com/aida-public/AB6AXuACtQxMUUDThTJ_0pkvOalFzlPZRkT6egPKcZt1nuCGVayXWkYv5OwfAD2dEsM4mRtQu_QuiPVh-djM18KxdOb5aajozqufFMC-y-e3FpHxd0GNyedZL0eGwnH8_iW9Y5fXVzLKkj7rmwA0Fo-4_PocBBSYDN3DMqO4-d0PryMV_wxZ0WWwGm026jNtVfygB3VRpWDgOrCaC2LKTr7lCJIkR0o2Ei6aVEumbfBG4qRiI96byT3u-g01Ohkl0rNHZ2SQp_UVJa28aQ"
};

interface DreamWorkshopViewProps {
  onSaveWork: (work: SavedWork) => void;
}

export const DreamWorkshopView: React.FC<DreamWorkshopViewProps> = ({ onSaveWork }) => {
  // Choices states
  const [selectedCostume, setSelectedCostume] = useState("青衣翠蟒");
  const [selectedFaceMask, setSelectedFaceMask] = useState("青衣黛眉");
  const [selectedScene, setSelectedScene] = useState("幽林古阁");

  // Custom UI dropdown modals
  const [activeSelector, setActiveDropdown] = useState<"costume" | "facemask" | "scene" | null>(null);

  // AI Loading & Result Script state
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<CustomDreamResponse | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Content databases for options
  const costumes = ["青衣翠蟒", "帝女吉服", "武生战甲"];
  const facemasks = ["青衣黛眉", "红脸关羽", "蓝画天王"];
  const scenes = ["幽林古阁", "西楼秋月", "广府戏台"];

  const handleGenerateScript = async () => {
    setLoading(true);
    setGeneratedScript(null);
    setIsSaved(false);
    setIsPlayingAudio(false);

    try {
      const response = await fetch("/api/generate-opera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          costume: selectedCostume,
          faceMask: selectedFaceMask,
          scene: selectedScene
        }),
      });

      if (!response.ok) {
        throw new Error("API response error");
      }

      const data: CustomDreamResponse = await response.json();
      setGeneratedScript(data);
    } catch (err) {
      console.error(err);
      // Fallback draft in case of failure
      setGeneratedScript({
        title: "碧血凤仙歌",
        synopsis: `在《${selectedScene}》冷洌月光下，戏者身披《${selectedCostume}》，着《${selectedFaceMask}》华贵黛容。心中涌现出无限家国兴亡的情怀，水袖一摆，舞尽千古不平事。`,
        poeticCouplet: "朱砂泪尽思故旧，水袖初扬动京华",
        acts: [
          {
            actNumber: 1,
            actTitle: "思凡入世",
            dialogues: [
              {
                character: "花旦",
                text: "冷雨敲窗，夜深沉，问梨园战鼓，何处是归音？",
                translation: "The cold rain beats against the window tonight. Where are the true echoes of the drums of my homeland?",
                stageDirection: "(手捻兰花指，提步轻迈，眼波含悲)"
              },
              {
                character: "武生",
                text: "战阵未收，精忠在心！纵是狂澜万丈，我亦一肩挑尽！",
                translation: "Our military alignments are still in action, but loyalty stays in my soul. Even against a thousand storms, I will stand firm.",
                stageDirection: "(甩开长袖，抱拳震喝，步伐若苍山岳立)"
              }
            ]
          }
        ],
        musicRecommendation: "胡琴幽咽，随风传出一抹凄然的笛声。断鼓一击，振聋发聩。"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCollection = () => {
    if (!generatedScript) return;
    
    const newSavedWork: SavedWork = {
      id: "work_" + Date.now(),
      title: generatedScript.title,
      date: new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }),
      costume: selectedCostume,
      faceMask: selectedFaceMask,
      scene: selectedScene,
      synopsis: generatedScript.synopsis,
      script: generatedScript,
      likes: Math.floor(Math.random() * 50) + 12,
      shares: Math.floor(Math.random() * 10) + 2
    };

    onSaveWork(newSavedWork);
    setIsSaved(true);
  };

  // Client speech synthesis playback (Yueju role dialogue vocalization)
  const handleTTSVoicePlayback = () => {
    if (!generatedScript) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);

    // Concatenate all dialogue lines into a single synthetic queue
    const utterPromiseQueue: SpeechSynthesisUtterance[] = [];
    
    generatedScript.acts.forEach(act => {
      act.dialogues.forEach(d => {
        const text = `${d.character}念道：${d.text}`;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Prefer Cantonese voice if available
        utterance.lang = "zh-HK";
        utterance.rate = 0.85; // slower classical pacing for dramatic gravity
        utterance.pitch = d.character === "花旦" || d.character === "青衣" ? 1.4 : 0.9;
        
        utterPromiseQueue.push(utterance);
      });
    });

    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= utterPromiseQueue.length) {
        setIsPlayingAudio(false);
        return;
      }

      const currentUtterance = utterPromiseQueue[currentIdx];
      currentUtterance.onend = () => {
        currentIdx++;
        playNext();
      };
      currentUtterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(currentUtterance);
    };

    playNext();
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative flex flex-col items-center">
      {/* Visual Atmosphere Background Overlays */}
      <div className="fixed top-0 left-6 w-12 h-64 red-silk-overlay opacity-30 z-10 blur-[1px] pointer-events-none" />
      <div className="fixed top-0 right-8 w-16 h-80 red-silk-overlay opacity-20 z-10 blur-[2px] pointer-events-none transform -scale-x-100" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(211,47,47,0.06)_0%,transparent_50%)] pointer-events-none" />

      {/* Screen Title */}
      <div className="w-full text-center mb-8 relative z-20">
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-1 tracking-widest font-bold">创 · 梦</h2>
        <p className="font-space text-[10px] text-primary/60 uppercase tracking-[0.3em] font-medium">AI Opera Dream Workshop</p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d32f2f] to-transparent mt-4 mx-auto" />
      </div>

      {/* Main Layout containing Stage and Controls Selector */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        
        {/* LEFT: Immersive Theatrical Stage Frame */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl border border-outline-variant/30 glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-4">
            
            {/* The Stage backdrop image loaded based on Scene choice */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-all duration-700 ease-in-out scale-102"
              style={{ backgroundImage: `url("${SCENE_BACKGROUNDS[selectedScene] || SCENE_BACKGROUNDS["幽林古阁"]}")` }}
            />
            {/* Spotlight and Reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-primary/5 opacity-80 pointer-events-none z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-10" />

            {/* The Character Render depending on costume selection */}
            <div className="relative z-20 w-full h-full rounded-xl overflow-hidden border border-primary/10 shadow-2xl relative">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 select-none group-hover:scale-105" 
                alt="AI Yueju Opera character custom model preview"
                src={COSTUME_IMAGES[selectedCostume] || COSTUME_IMAGES["青衣翠蟒"]} 
              />
              
              {/* Golden Frame corner borders representing Chinese cabinetry */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-primary/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-primary/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary/40 pointer-events-none" />

              {/* Status HUD tag detailing current parameters */}
              <div className="absolute bottom-4 left-4 right-4 py-2 px-3 bg-black/75 backdrop-blur-md rounded border border-outline-variant/40 flex items-center justify-between text-[11px] font-space text-on-surface-variant font-medium uppercase tracking-widest pl-2">
                <span>{selectedCostume} • {selectedFaceMask}</span>
                <span className="text-tertiary">STILL ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Customisation Controls Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-5">
            <h3 className="font-display text-lg text-primary font-bold tracking-wide select-none">
              梨梦工坊构件定制
            </h3>

            {/* Parameter Choice: Costume */}
            <div className="flex flex-col gap-2">
              <span className="font-space text-[10px] text-on-surface-variant font-bold tracking-widest uppercase pl-1">服饰 Custom Costume</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeSelector === "costume" ? null : "costume")}
                  className="w-full py-4 px-4 bg-[#1e0f0e]/50 hover:bg-surface-variant/30 text-on-background border border-outline-variant/30 rounded-xl text-left text-sm flex items-center justify-between cursor-pointer outline-none transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-semibold">
                    <Layers className="w-4 h-4 text-primary" /> {selectedCostume}
                  </span>
                  <span className="text-[10px] uppercase font-space tracking-wider text-primary">更改</span>
                </button>

                {activeSelector === "costume" && (
                  <div className="absolute left-0 right-0 mt-2 bg-[#2c1b1a] border border-outline/30 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-outline-variant/20">
                    {costumes.map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { setSelectedCostume(opt); setActiveDropdown(null); }}
                        className={`p-3 px-4 text-xs font-semibold hover:bg-primary/10 cursor-pointer transition-colors ${selectedCostume === opt ? "bg-primary/5 text-primary" : "text-on-surface-variant"}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Parameter Choice: Face Mask */}
            <div className="flex flex-col gap-2">
              <span className="font-space text-[10px] text-on-surface-variant font-bold tracking-widest uppercase pl-1">脸谱 Face Mask</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeSelector === "facemask" ? null : "facemask")}
                  className="w-full py-4 px-4 bg-[#1e0f0e]/50 hover:bg-surface-variant/30 text-on-background border border-outline-variant/30 rounded-xl text-left text-sm flex items-center justify-between cursor-pointer outline-none transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-semibold">
                    <Smile className="w-4 h-4 text-primary" /> {selectedFaceMask}
                  </span>
                  <span className="text-[10px] uppercase font-space tracking-wider text-primary">更改</span>
                </button>

                {activeSelector === "facemask" && (
                  <div className="absolute left-0 right-0 mt-2 bg-[#2c1b1a] border border-outline/30 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-outline-variant/20">
                    {facemasks.map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { setSelectedFaceMask(opt); setActiveDropdown(null); }}
                        className={`p-3 px-4 text-xs font-semibold hover:bg-primary/10 cursor-pointer transition-colors ${selectedFaceMask === opt ? "bg-primary/5 text-primary" : "text-on-surface-variant"}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Parameter Choice: Scene */}
            <div className="flex flex-col gap-2">
              <span className="font-space text-[10px] text-on-surface-variant font-bold tracking-widest uppercase pl-1">场景 Theatrical Scene</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeSelector === "scene" ? null : "scene")}
                  className="w-full py-4 px-4 bg-[#1e0f0e]/50 hover:bg-surface-variant/30 text-on-background border border-outline-variant/30 rounded-xl text-left text-sm flex items-center justify-between cursor-pointer outline-none transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-semibold">
                    <Image className="w-4 h-4 text-primary" /> {selectedScene}
                  </span>
                  <span className="text-[10px] uppercase font-space tracking-wider text-primary">更改</span>
                </button>

                {activeSelector === "scene" && (
                  <div className="absolute left-0 right-0 mt-2 bg-[#2c1b1a] border border-outline/30 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-outline-variant/20">
                    {scenes.map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { setSelectedScene(opt); setActiveDropdown(null); }}
                        className={`p-3 px-4 text-xs font-semibold hover:bg-primary/10 cursor-pointer transition-colors ${selectedScene === opt ? "bg-primary/5 text-primary" : "text-on-surface-variant"}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Generate Invoke Button */}
            <button
              onClick={handleGenerateScript}
              disabled={loading}
              className="w-full h-15 rounded-xl bg-primary-container text-white opacity-100 hover:brightness-110 active:scale-95 transition-all text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(211,47,47,0.3)] mt-2 cursor-pointer border border-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>红船写手执笔撰写中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 fill-white text-white" />
                  <div className="flex flex-col items-start text-left leading-none">
                    <span className="font-space tracking-[0.2em] font-medium text-xs">生成梦境戏篇</span>
                    <span className="text-[8px] opacity-75 mt-1 tracking-widest pl-[0.1em]">GENERATE MINI-OPERA</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Parsed Script scroll result view */}
      {generatedScript && (
        <section className="w-full max-w-4xl mt-12 bg-amber-50/5 text-[#2c1b1a] rounded-2xl p-6 md:p-12 relative border border-outline/40 shadow-2xl relative group overflow-hidden bg-contain selection:bg-amber-200">
          
          {/* Simulated Ancient Parchment Scroll Paper Texture Background */}
          <div 
            className="absolute inset-0 bg-[#ebd9c1] mix-blend-normal z-0 opacity-100 pointer-events-none" 
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')",
              border: "12px solid #5b403d",
              borderRadius: "16px"
            }}
          />

          <div className="relative z-10 flex flex-col gap-6 p-2 h-full justify-between">
            {/* Header info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#5c4033]/20 pb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary-container" />
                <span className="font-space text-xs tracking-widest uppercase text-[#5b403d] font-bold">梨园微戏剧脚本</span>
              </div>
              <div className="flex gap-3">
                {/* TTS Reader */}
                <button
                  onClick={handleTTSVoicePlayback}
                  className={`px-4 py-1.5 rounded-full border text-[10px] font-bold font-space uppercase flex items-center gap-2 cursor-pointer transition-colors ${isPlayingAudio ? "bg-[#d32f2f] text-white border-primary" : "border-[#5c4033]/30 text-[#5c4033] hover:bg-neutral-500/10"}`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" /> 停止配音
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" /> 朗读配音 (粵/普)
                    </>
                  )}
                </button>

                {/* Save Archive */}
                <button
                  onClick={handleSaveToCollection}
                  disabled={isSaved}
                  className={`px-4 py-1.5 rounded-full border text-[10px] font-bold font-space uppercase flex items-center gap-2 cursor-pointer transition-colors ${isSaved ? "bg-emerald-600 text-white border-emerald-500 cursor-default" : "border-[#5c4033]/30 text-[#5c4033] hover:bg-neutral-500/10"}`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> 已存箱底
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> 藏入箱中
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Play text scripts */}
            <div className="text-center py-6">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-[#4a2e1d]">{generatedScript.title}</h3>
              <p className="font-sans text-[11px] text-[#5b403d]/70 uppercase tracking-[0.3em] font-semibold mt-1">AI Generative Cantonese Micro-Opera</p>
              
              {/* Traditional Symmetric Couplet */}
              <div className="my-6 py-2 border-y border-[#5c4033]/20 max-w-lg mx-auto flex items-center justify-center gap-4 text-[#ba1a20] font-sans font-bold text-base md:text-lg pl-3 tracking-widest">
                【 {generatedScript.poeticCouplet} 】
              </div>

              {/* Synopsis */}
              <p className="font-sans text-xs text-[#5c403d] max-w-2xl mx-auto leading-relaxed italic bg-white/30 p-4 rounded border border-[#5c4033]/10">
                故事背景：{generatedScript.synopsis}
              </p>
            </div>

            {/* Acts & Dialgoues */}
            <div className="space-y-8 my-4 max-w-3xl mx-auto">
              {generatedScript.acts.map(act => (
                <div key={act.actNumber} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5b403d]">
                    <span className="inline-block px-2.5 py-0.5 bg-[#5b403d]/10 rounded font-mono">幕 {act.actNumber}</span>
                    <span className="font-display text-sm font-bold text-[#4a2e1d]">{act.actTitle}</span>
                  </div>

                  <div className="space-y-6">
                    {act.dialogues.map((d, index) => (
                      <div key={index} className="flex flex-col gap-1 text-left border-l-2 border-[#5c4033]/20 pl-4 py-1.5 hover:border-[#ba1a20] transition-colors group">
                        <span className="font-sans text-xs font-bold text-[#ba1a20] uppercase tracking-wider">{d.character}</span>
                        
                        {d.stageDirection && (
                          <span className="font-sans text-[11px] text-[#5c403d]/60 italic font-medium">{d.stageDirection}</span>
                        )}

                        <p className="font-display text-base md:text-lg font-bold text-[#4a2e1d] leading-relaxed tracking-wider my-1">
                          &ldquo; {d.text} &rdquo;
                        </p>

                        {d.translation && (
                          <span className="font-sans text-xs text-[#5c403d]/70 leading-relaxed max-w-2xl">译文：{d.translation}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Instrument Suggestion */}
            <div className="mt-6 border-t border-[#5c4033]/20 pt-4 flex flex-col gap-2">
              <span className="font-space text-[10px] text-[#5b403d]/60 uppercase tracking-widest font-bold">乐理配置伴奏 & Accompaniment</span>
              <p className="font-sans text-xs text-[#5c403d] italic leading-relaxed font-semibold">
                {generatedScript.musicRecommendation}
              </p>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};
