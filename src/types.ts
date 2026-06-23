export enum ScreenId {
  SPLASH = "splash",
  LOGIN = "login",
  FEED = "feed",
  DREAM_WORKSHOP = "dream_workshop",
  ACADEMY = "academy",
  SETTINGS = "settings",
  SEARCH = "search",
  IMMERSIVE = "immersive",
  COLLECTION = "collection",
  ERROR_PAGE = "error_page"
}

export interface OperaCharacter {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

export interface Dialogue {
  character: string;
  text: string;
  translation?: string;
  stageDirection?: string;
}

export interface CustomDreamResponse {
  title: string;
  synopsis: string;
  poeticCouplet: string;
  acts: {
    actNumber: number;
    actTitle: string;
    dialogues: Dialogue[];
  }[];
  musicRecommendation: string;
}

export interface SavedWork {
  id: string;
  title: string;
  date: string;
  costume: string;
  faceMask: string;
  scene: string;
  synopsis: string;
  script: CustomDreamResponse;
  likes: number;
  shares: number;
}
