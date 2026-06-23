import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// 1. API: Generate Opera Script (AI 创梦)
app.post("/api/generate-opera", async (req, res) => {
  try {
    const { costume, faceMask, scene } = req.body;

    if (!costume || !faceMask || !scene) {
      return res.status(400).json({ error: "Missing choices for costume, face mask, or scene." });
    }

    const prompt = `Write a dramatic, highly poetic Cantonese/Yueju Opera (粤剧) miniature script scene.
Current user choices:
- Costume: ${costume}
- Face Mask / Role style: ${faceMask}
- Setting / Scene: ${scene}

Include classical Cantonese poetic couplets, dramatic monologues (唱词/念白) in classical phrasing with phonetic rhythm, stage directions (e.g. waving water sleeves, striking Gongs/Drums), and clear Mandarin/English translations. Return JSON matching the requested schema.`;

    const systemInstruction = `You are "Master Lingyun", an elite Cantonese Opera (Yueju 粤剧) master and creative digital artist within the "New Lingnan Aesthetics" movement.
You craft theatrical micro-acts that balance rich historical tradition with futuristic, immersive sensory descriptions.
You must always output a valid JSON response strictly conforming to the requested schema. Ensure the classical dialogues use genuine poetic meters (like 4-character, 5-character, or 7-character Cantonese phrases, or Munban 慢板 / Siban 诗板 lyric rhythms).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Elegant theatrical title of this custom mini-opera act. e.g. '凤舞朱砂' or '碧血战魂'.",
            },
            synopsis: {
              type: Type.STRING,
              description: "A rich narrative synopsis putting the character in the scene, expressing their inner psychology.",
            },
            poeticCouplet: {
              type: Type.STRING,
              description: "A symmetric, classical 7-character couplet setting the thematic tone of the act.",
            },
            acts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  actNumber: { type: Type.INTEGER },
                  actTitle: { type: Type.STRING },
                  dialogues: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        character: { type: Type.STRING, description: "Name of the role or stage narrator." },
                        text: { type: Type.STRING, description: "The classical spoken or sung lines (唱词/念白) in Cantonese/Chinese." },
                        translation: { type: Type.STRING, description: "Elegant translation or plain-text explanation of the rich subtext." },
                        stageDirection: { type: Type.STRING, description: "Stage physical performance guidance, e.g. (挥舞水袖，兰花指点) or (锣鼓齐鸣，掩面悲泣)." },
                      },
                      required: ["character", "text"],
                    },
                  },
                },
                required: ["actNumber", "actTitle", "dialogues"],
              },
            },
            musicRecommendation: {
              type: Type.STRING,
              description: "Recommended traditional accompaniment instruments and mood (e.g. '胡琴独奏，板鼓脆击，带出一抹怆然、悲壮的气氛').",
            },
          },
          required: ["title", "synopsis", "poeticCouplet", "acts", "musicRecommendation"],
        },
      },
    });

    const scriptJson = JSON.parse(response.text || "{}");
    return res.json(scriptJson);
  } catch (error: any) {
    console.error("Error generating opera script:", error);
    return res.status(500).json({ error: error.message || "Failed to generate custom script." });
  }
});

// 2. API: Search Opera Lore (寻·味)
app.post("/api/search-opera", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Missing search query." });
    }

    const prompt = `Search details, historical context, or dramatic significance of the following Cantonese/Chinese Opera topic: "${query}".
Provide a beautiful, highly informative, structured response with brief summaries of the play or concept, cultural background of its "New Lingnan Aesthetics" representation, and relevant fun trivia/facts for theater gardeners. Return as structured JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING, description: "Main factual summary of the historic play, custom make-up, or master technique." },
            culturalImportance: { type: Type.STRING, description: "How this topic connects to Cantonese heritage and Lingnan art." },
            roleClassifications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Traditional roles (Sheng 生, Dan 旦, Jing 净, Chou 丑) or aesthetic elements involved.",
            },
            trivia: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Fascinating backstage details, costume design rules, or performance vocabulary (e.g. water sleeve movement rules).",
            },
          },
          required: ["title", "summary", "culturalImportance", "trivia"],
        },
      },
    });

    const searchResult = JSON.parse(response.text || "{}");
    return res.json(searchResult);
  } catch (error: any) {
    console.error("Error searching opera lore:", error);
    return res.status(500).json({ error: error.message || "Search failed." });
  }
});

// 3. Mount Dev Vite Server or Serve Production Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[戏游 server] Operating smoothly on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
