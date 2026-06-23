import React, { useState } from "react";
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  HelpCircle, 
  Loader2, 
  X,
  BookOpen,
  Info
} from "lucide-react";

interface SearchResult {
  title: string;
  summary: string;
  culturalImportance: string;
  roleClassifications?: string[];
  trivia: string[];
}

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const classicPlays = [
    {
      title: "霸王别姬",
      subTitle: "悲歌慷慨 • 霸王别姬",
      tag: "生净重头戏",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB50ufHD1jZYP__JoZzXm49J_alakBHItlMY4sINPD71cCNMkrsisHwD6Gc2ZBcJBGozGn3yI8KT_oBn0htwLk8TiyHgx8u4CvgEX4CevTnxjqHTflTVxGiZXIz_INoTwXE4Z7FyP6KPbpP2xa9Pfl_iX-Mpvl-0vj11rk5qKQfr1_F1C4uAA5sfok4xeVOu5xboZoctHpNVvjEPmp-0vJ0fCevvlWJam6woL9BNXD8k85c1fzUnCm1VjZXH3ZTruEU6ZupwemkVQ"
    },
    {
      title: "牡丹亭",
      subTitle: "惊梦游园 • 牡丹亭",
      tag: "闺门旦代表作",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkgN9ofjJzJlAyezcEkty0FXdJ_bTcPqG30upFTvqOAwBVbKMvB54o40dWyCp91KS0J4jykKMr14ncuJAeZadqkxPhJNru4r4-9hszg2CNXf8TviacvV1gC444GCXr5KgVNUCuxHIK0rwtWsbpoCR-cfWvwRLBtyx61v7xxFMy5LHjRsTcGMYd-pxqdRl8MNskfgen1yCLXRiZVGNtNBGswRma-591dlGid81CgQmYEVNQ7GgHmpuYJuMWyLKvcyUXSnEf77VI3w"
    },
    {
      title: "白蛇传",
      subTitle: "水漫金山 • 白蛇传",
      tag: "武旦生绝技",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkMTYkyS2fRvkDi-XV3VV6scjgMqfp8NjUKqhD0tRs4oAkXD3-0vGrwCtdeM966lwEcldEuCvthgr1G_7V5_Sa6lJgPpRrkfyYwhVVwjIONjNaVM0Cy8pqy8q8nOqX__Fh8ysGY4D0R5FwMKMcJYkXc0TyZk70708Qo3XzbsF6EwNECD68jqMLMbU5YEN0nnYI2w9sFPfc1hvNclu9Aqi3iHfNngp6ivkWDFFKiP-oQtL5EkbnSmiQ_VNaoQ3Xw2UvYTyi0IwcNw"
    }
  ];

  const handleSearch = async (searchKeyword: string) => {
    if (!searchKeyword.trim()) return;
    setLoading(true);
    setResult(null);
    setQuery(searchKeyword);

    try {
      const response = await fetch("/api/search-opera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchKeyword }),
      });

      if (!response.ok) throw new Error("Search failure");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback matching search for offline demo
      setResult({
        title: searchKeyword,
        summary: `《${searchKeyword}》是粤港澳大湾区广受推崇的经典粤剧目。其曲调委婉多姿，唱腔包含木鱼、二黄、梆子等多种悠扬特色，体现明清文人细腻委婉的审美风格。`,
        culturalImportance: "此剧目构成了岭南戏剧遗产的瑰宝，至今依然在海外华埠红船遗迹中传唱不衰，是连接粤语文化的艺术纽带。",
        roleClassifications: ["小生", "闺门旦", "花旦"],
        trivia: [
          "戏装上特有的粤绣（广绣）银线比普通彩绣在舞台灯光下更闪亮耀眼。",
          "其身段的水袖打点规则严格，甩袖弧度常能暗合胡琴管弦音乐的抑扬顿挫。"
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#1e0f0e] min-h-screen text-on-background py-20 pb-32 px-6 relative select-none">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Title */}
        <section className="text-left">
          <p className="text-primary font-space text-[10px] font-bold tracking-[0.25em] pl-[0.1em] uppercase mb-2">戏史寻根古镜 • TRADITIONAL ARCHIVE</p>
          <h2 className="font-display text-4xl text-white font-semibold">寻 · 味</h2>
          <div className="h-1 w-24 bg-primary-container mt-4 rounded-full" />
        </section>

        {/* Search Input Widget */}
        <section className="glass-panel p-6 rounded-2xl border border-outline-variant/30 flex items-center relative overflow-hidden group shadow-lg">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-primary">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="搜索经典剧目、脸谱色彩或身段词汇..."
            className="w-full pl-12 pr-28 py-4.5 bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary text-base text-on-background outline-none transition-all placeholder:text-on-surface-variant/40"
          />

          <button
            onClick={() => handleSearch(query)}
            disabled={loading}
            className="absolute right-6 px-6 py-3 rounded-full bg-[#d32f2f] hover:bg-[#ba1a20] text-sm text-white font-semibold tracking-wider transition-all cursor-pointer border-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "检索"}
          </button>
        </section>

        {/* Dynamic Gemini API grounded search result reveal */}
        {result && (
          <section className="glass-panel p-6 md:p-10 rounded-3xl border border-primary/20 shadow-2xl relative overflow-hidden animate-scaleUp">
            
            {/* Corner decorator emblem */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none flex items-center justify-center translate-x-4 -translate-y-4 text-primary">
              <Compass className="w-16 h-16" />
            </div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/20">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-display text-2xl text-primary font-bold">{result.title} · 史料纪要</h3>
            </div>

            {/* Summarized text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-space text-[10px] text-tertiary font-bold tracking-widest uppercase pl-[0.15em] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-ping inline-block" /> 剧目总论 SUMMARY
                </span>
                <p className="text-on-background font-sans text-sm md:text-base leading-relaxed opacity-95">
                  {result.summary}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-space text-[10px] text-primary/80 font-bold tracking-widest uppercase pl-[0.15em]">岭南精神与艺术价值 HERITAGE IMPORTANCE</span>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed opacity-90">
                  {result.culturalImportance}
                </p>
              </div>

              {/* Categorization chips */}
              {result.roleClassifications && (
                <div className="space-y-3 pt-2">
                  <span className="font-space text-[10px] text-on-surface-variant font-bold tracking-widest uppercase pl-[0.15em]">行当分类 ROLE CLASSIFICATIONS</span>
                  <div className="flex flex-wrap gap-2">
                    {result.roleClassifications.map((r, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-surface-variant/40 border border-[#ab8985]/30 text-primary font-sans text-xs rounded-full font-medium"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trivia list facts */}
              <div className="space-y-3 pt-2">
                <span className="font-space text-[10px] text-[#84d5c5]/80 font-bold tracking-widest uppercase pl-[0.15em] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> 梨学杂识 / BACKSTAGE TRIVIA
                </span>
                <ul className="space-y-2.5 pl-4 list-disc text-sm text-on-surface-variant">
                  {result.trivia.map((t, index) => (
                    <li key={index} className="leading-relaxed opacity-90 marker:text-[#84d5c5]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="mt-8 text-xs text-on-surface-variant/60 hover:text-primary flex items-center gap-1.5 bg-transparent border-0 outline-none cursor-pointer hover:underline transition-all"
            >
              <X className="w-3.5 h-3.5" /> 清除检索报告
            </button>
          </section>
        )}

        {/* Trending Searches Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="font-sans text-sm font-semibold text-white tracking-widest uppercase">热点索句 / SUGGESTED TOPICS</h4>
          </div>

          <div className="flex flex-wrap gap-3">
            {["帝女花香夭唱腔", "再世红梅记折子戏", "水袖的抛袖技术", "净行红脸旦关羽"].map(t => (
              <button
                key={t}
                onClick={() => handleSearch(t)}
                className="px-4 py-2.5 bg-surface-low rounded-xl border border-outline-variant/25 text-xs text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all cursor-pointer outline-none"
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Grid displays of three classic plays */}
        <section className="space-y-6">
          <h4 className="font-display text-lg text-[#84d5c5] font-bold tracking-wider">
            古典梨园经典画库
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {classicPlays.map(p => (
              <div 
                key={p.title}
                onClick={() => handleSearch(p.title)}
                className="glass-panel rounded-2xl overflow-hidden p-3 group cursor-pointer border border-outline-variant/10 hover:border-[#84d5c5]/40 transition-all duration-300 relative"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10" />
                  <img 
                    alt={p.subTitle} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={p.img} 
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 rounded text-[9px] font-bold text-[#84d5c5] tracking-widest uppercase z-20">
                    {p.tag}
                  </span>
                </div>

                <div className="px-1 flex items-center justify-between">
                  <div>
                    <h5 className="font-display text-base text-white font-bold mb-0.5">{p.title}</h5>
                    <p className="text-[10px] text-on-surface-variant/70 tracking-tight">{p.subTitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
