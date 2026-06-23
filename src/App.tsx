import React, { useState } from "react";
import { 
  Sparkles, 
  Map, 
  BookOpen, 
  Compass, 
  Bookmark, 
  Info, 
  Award, 
  Heart,
  Volume2,
  Calendar,
  Layers,
  School,
  Smile,
  LogOut,
  AppWindow,
  Search,
  Settings,
  AlertOctagon
} from "lucide-react";
import { ScreenId, SavedWork } from "./types";

// Import custom views
import { SplashView } from "./components/SplashView";
import { LoginView } from "./components/LoginView";
import { FeedView } from "./components/FeedView";
import { DreamWorkshopView } from "./components/DreamWorkshopView";
import { AcademyView } from "./components/AcademyView";
import { SettingsView } from "./components/SettingsView";
import { ErrorView } from "./components/ErrorView";
import { SearchView } from "./components/SearchView";
import { ImmersiveView } from "./components/ImmersiveView";
import { CollectionView } from "./components/CollectionView";
import { IPhoneProFrame } from "./components/IPhoneProFrame";

// Beautiful default saved play to populate the portfolio archives pre-generation
const DEFAULT_SAVED_WORKS: SavedWork[] = [
  {
    id: "work_prelude_1",
    title: "朱砂盟 • 香火惊魂",
    date: "2026年6月12日",
    costume: "青衣翠蟒",
    faceMask: "青衣黛眉",
    scene: "幽林古阁",
    synopsis: "讲述在幽深古阁暮色烟霭中，青衣戏者手捻檀香，在闪烁烛火前为离散的故人祈颂，却偶听堂外金钹雷动、风雨大作...",
    script: {
      title: "朱砂盟 • 香火惊魂",
      synopsis: "在幽深古阁暮色烟霭中，青衣戏者手捻檀香，在闪烁烛火前为离散的故人祈颂，却偶听堂外金钹雷动、风雨大作...",
      poeticCouplet: "朱砂墨染平生愿，水袖微舒动鬼神",
      acts: [
        {
          actNumber: 1,
          actTitle: "凭栏祈颂",
          dialogues: [
            {
              character: "青衣",
              text: "残烛袅烟，望故里，杜鹃啼血。问红船客散，几度秋风？",
              translation: "The candle flickers and dims as I look towards my far-off homeland. Why does the cuckoo sing with blood? How many times has the wind of autumn blown after our red boats dispersed?",
              stageDirection: "(提步移身，轻抚木案，拂袖长叹)"
            },
            {
              character: "画外音",
              text: "风刮林木起，夜半月惊鸿。谁人弄弦，琴瑟幽微？",
              translation: "The wind rustles the forests and startles the crescent moon. Who plays the strings of the lute in this silent night?",
              stageDirection: "(锣鼓骤停，忽起阴风)"
            }
          ]
        }
      ],
      musicRecommendation: "洞箫独奏，空灵孤绝。随后急促的板鼓声声渐起，惊醒一帘幽梦。"
    },
    likes: 84,
    shares: 12
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(ScreenId.SPLASH);
  const [username, setUsername] = useState("戏痴");
  const [savedWorks, setSavedWorks] = useState<SavedWork[]>(DEFAULT_SAVED_WORKS);

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setCurrentScreen(ScreenId.FEED);
  };

  const handleLogout = () => {
    setUsername("戏痴");
    setCurrentScreen(ScreenId.SPLASH);
  };

  const handleSaveWork = (newWork: SavedWork) => {
    setSavedWorks([newWork, ...savedWorks]);
  };

  const handleDeleteWork = (id: string) => {
    setSavedWorks(savedWorks.filter(work => work.id !== id));
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case ScreenId.SPLASH:
        return <SplashView onEnter={() => setCurrentScreen(ScreenId.LOGIN)} />;
      case ScreenId.LOGIN:
        return (
          <LoginView 
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setCurrentScreen(ScreenId.SPLASH)} 
          />
        );
      case ScreenId.FEED:
        return (
          <FeedView 
            username={username}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );
      case ScreenId.DREAM_WORKSHOP:
        return <DreamWorkshopView onSaveWork={handleSaveWork} />;
      case ScreenId.ACADEMY:
        return <AcademyView onLearnModule={(id) => console.log("Module learning:", id)} />;
      case ScreenId.SETTINGS:
        return (
          <SettingsView 
            username={username}
            onLogout={handleLogout}
          />
        );
      case ScreenId.SEARCH:
        return <SearchView />;
      case ScreenId.IMMERSIVE:
        return <ImmersiveView />;
      case ScreenId.COLLECTION:
        return (
          <CollectionView 
            savedWorks={savedWorks}
            onDeleteWork={handleDeleteWork}
          />
        );
      case ScreenId.ERROR_PAGE:
        return <ErrorView onRetry={() => setCurrentScreen(ScreenId.FEED)} />;
      default:
        return <FeedView username={username} onNavigate={(screen) => setCurrentScreen(screen)} />;
    }
  };

  // Condition to check if deep utility views like Splash or Login are shown (no persistent nav bar)
  const isAmbientStage = currentScreen === ScreenId.SPLASH || currentScreen === ScreenId.LOGIN;

  return (
    <IPhoneProFrame
      currentScreen={currentScreen}
      onScreenChange={(screen) => setCurrentScreen(screen)}
      username={username}
    >
      <div className="w-full h-full flex flex-col justify-between relative bg-[#1e0f0e] text-on-background z-10 overflow-hidden">
        
        {/* Prime content viewport - Scrollable inside frame */}
        <div className="flex-grow w-full overflow-y-auto no-scrollbar relative pb-32">
          {renderActiveScreen()}
        </div>

        {/* Persistent Bottom Curatorial Navigation Bar (Cinnabar Silk Dock) */}
        {!isAmbientStage && (
          <nav className="absolute bottom-0 left-0 w-full z-40 bg-[#1e0f0e]/92 backdrop-blur-xl border-t border-outline-variant/20 py-2.5 px-6 shadow-[0_-5px_25px_rgba(211,47,47,0.15)] flex justify-around items-center transition-all animate-fadeIn">
            
            {/* Active Navigation items */}
            <div className="flex w-full max-w-lg items-center justify-between mx-auto relative px-2 sm:px-8">
              
              {/* Tab 1: 赏 (Feed) */}
              <button
                onClick={() => setCurrentScreen(ScreenId.FEED)}
                className={`flex flex-col items-center gap-1 bg-transparent border-0 outline-none cursor-pointer duration-300 ${
                  currentScreen === ScreenId.FEED ? "text-primary scale-105" : "text-on-surface-variant/60 hover:text-primary"
                }`}
              >
                <Compass className={`w-5.5 h-5.5 ${currentScreen === ScreenId.FEED ? "stroke-[2.5px]" : ""}`} />
                <span className="font-sans text-[10px] font-bold tracking-[0.1em]">赏 · 戏</span>
              </button>

              {/* Tab 2: 梦 (AI Workshop) */}
              <button
                onClick={() => setCurrentScreen(ScreenId.DREAM_WORKSHOP)}
                className={`flex flex-col items-center gap-1 bg-transparent border-0 outline-none cursor-pointer duration-300 ${
                  currentScreen === ScreenId.DREAM_WORKSHOP ? "text-primary scale-105" : "text-on-surface-variant/60 hover:text-primary"
                }`}
              >
                <Sparkles className={`w-5.5 h-5.5 ${currentScreen === ScreenId.DREAM_WORKSHOP ? "fill-primary text-primary stroke-[1.5px]" : ""}`} />
                <span className="font-sans text-[10px] font-bold tracking-[0.1em]">创 · 梦</span>
              </button>

              {/* Center Special FAB: 入 · 戏 (Immersive AR / VR) */}
              <div className="relative -translate-y-4">
                {/* Outer soft breathing glow rings */}
                <div className="absolute inset-0 bg-[#d32f2f] rounded-full blur-[14px] opacity-25 animate-ping pointer-events-none" />
                <button
                  onClick={() => setCurrentScreen(ScreenId.IMMERSIVE)}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all relative z-10 cursor-pointer shadow-lg active:scale-95 duration-500 hover:rotate-45 ${
                    currentScreen === ScreenId.IMMERSIVE 
                    ? "bg-[#d32f2f] border-white text-white rotate-45 shadow-[0_0_20px_#d32f2f]" 
                    : "bg-surface-low border-primary/35 text-primary hover:bg-[#d32f2f]/10 shadow-md"
                  }`}
                >
                  <Award className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] font-sans text-[10px] font-extrabold text-primary tracking-widest pl-[0.15em] whitespace-nowrap">
                  入 · 戏
                </span>
              </div>

              {/* Tab 3: 艺 (Training Academy) */}
              <button
                onClick={() => setCurrentScreen(ScreenId.ACADEMY)}
                className={`flex flex-col items-center gap-1 bg-transparent border-0 outline-none cursor-pointer duration-300 ${
                  currentScreen === ScreenId.ACADEMY ? "text-primary scale-105" : "text-on-surface-variant/60 hover:text-primary"
                }`}
              >
                <School className={`w-5.5 h-5.5 ${currentScreen === ScreenId.ACADEMY ? "stroke-[2.5px]" : ""}`} />
                <span className="font-sans text-[10px] font-bold tracking-[0.1em]">学 · 艺</span>
              </button>

              {/* Tab 4: 藏 (Portfolio Library) */}
              <button
                onClick={() => setCurrentScreen(ScreenId.COLLECTION)}
                className={`flex flex-col items-center gap-1 bg-transparent border-0 outline-none cursor-pointer duration-300 ${
                  currentScreen === ScreenId.COLLECTION ? "text-primary scale-105" : "text-on-surface-variant/60 hover:text-primary"
                }`}
              >
                <Bookmark className={`w-5.5 h-5.5 ${currentScreen === ScreenId.COLLECTION ? "fill-primary text-primary stroke-[1.5px]" : ""}`} />
                <span className="font-sans text-[10px] font-bold tracking-[0.1em]">我 · 藏</span>
              </button>

            </div>
          </nav>
        )}

        {/* Little Floating trigger to simulate error logs to complete validation boundaries */}
        {!isAmbientStage && currentScreen !== ScreenId.ERROR_PAGE && (
          <button
            onClick={() => setCurrentScreen(ScreenId.ERROR_PAGE)}
            className="absolute bottom-22 right-4 z-40 p-2 rounded-full backdrop-blur-md bg-[#1e0f0e]/30 border border-outline-variant/20 hover:bg-error-container/20 text-on-surface-variant/40 hover:text-error transition-all scale-90 opacity-40 hover:opacity-100 hover:scale-100 cursor-pointer outline-none select-none"
            title="Simulate Network Error"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
          </button>
        )}

      </div>
    </IPhoneProFrame>
  );
}
