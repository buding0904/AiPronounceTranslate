export enum LangType {
  jp = "jp",
  kr = "kr",
}

export const langList = Object.values(LangType);

export const langMap = {
  [LangType.jp]: "日语",
  [LangType.kr]: "韩语",
};

export enum ModelType {
  doubao = "豆包",
}

export const modelTypeList = Object.values(ModelType);

export const doubaoModels = [
  "doubao-seed-1-6-250615",
  "doubao-seed-1-6-flash-250615",
  "doubao-seed-1-6-thinking-250615",
  "doubao-1-5-thinking-pro-250415",
  "doubao-1-5-thinking-vision-pro-250428",
  "deepseek-r1-250528",
] as const;

export type DoubaoModel = (typeof doubaoModels)[number];
export type Model = DoubaoModel;
