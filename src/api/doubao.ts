import { TranslateResultSchemaJson, type TTranslateResult } from "./model";
import { JpTranslatePrompt, KrTranslatePrompt } from "./prompt";

import { DoubaoModel, LangType } from "@/config";

const createMessagesWithPronounce = (pronounce: string, lang: LangType) => {
  let prompt;

  switch (lang) {
    case LangType.jp:
      prompt = JpTranslatePrompt;
      break;
    case LangType.kr:
      prompt = KrTranslatePrompt;
      break;
    default:
      prompt = JpTranslatePrompt; // 默认使用日语
  }

  return [
    ...prompt,
    {
      role: "user",
      content: [
        {
          type: "text",
          text: pronounce,
        },
      ],
    },
  ];
};

const schema = {
  name: "translate_result",
  schema: TranslateResultSchemaJson,
  strict: true,
};

interface TokenUsage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

interface Message {
  content: string;
  role: "assistant";
}

interface Choice {
  finish_reason: "stop";
  index: number;
  message: Message;
}

interface Response {
  choices: Choice[];
  created: number;
  id: string;
  model: string;
  object: "chat.completion";
  service_tier: string;
  usage: TokenUsage;
}

export const doubaoSchemaTranslate = async ({
  pronounce,
  lang,
  model,
  apiKey,
}: {
  pronounce: string;
  lang: LangType;
  model: DoubaoModel;
  apiKey: string;
}): Promise<TTranslateResult> => {
  const url = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

  const requestBody = {
    model,
    messages: createMessagesWithPronounce(pronounce, lang),
    response_format: {
      type: "json_schema",
      json_schema: schema,
    },
    thinking: {
      type: "disabled",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const res: Response = await response.json();

  // get first choice content

  if (res.choices.length === 0) {
    throw new Error("no choice");
  }

  const content = res.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error(`parse json failed: ${e}\ncontent:${content}`);
  }
};
