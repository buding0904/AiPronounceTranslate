import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { useContext, useState } from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default";
import { doubaoSchemaTranslate } from "@/api";
import { TTranslateResult } from "@/api/model";
import { PronounceText } from "@/components/widgets";
import appCtx from "@/context/app";
import { AppSetting } from "@/components/setting-modal";
import { langList, langMap, LangType } from "@/config";

export default function IndexPage() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState<TTranslateResult>([]);
  const { setting } = useContext(appCtx);
  const [lang, setLang] = useState(LangType.jp);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setResult([]);

    try {
      const result = await doubaoSchemaTranslate({
        pronounce: searchInput,
        lang,
        model: setting.model,
        apiKey: setting.apiKey,
      });

      setResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <AppSetting />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Form
          action="javascript:void(0)"
          className="w-full max-w-3xl"
          onSubmit={search}
        >
          <RadioGroup
            label="选择需要翻译的语言"
            orientation="horizontal"
            value={lang}
            onValueChange={(lang) => setLang(lang as LangType)}
          >
            {langList.map((value) => (
              <Radio key={value} value={value}>
                {langMap[value]}
              </Radio>
            ))}
          </RadioGroup>

          <Input
            aria-label="Search"
            className="w-full"
            maxLength={100}
            placeholder="输入拼音来进行翻译, eg: a ni ga do"
            spellCheck="false"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </Form>

        <div className="w-full max-w-3xl mt-8">
          {loading && <Spinner className="w-full h-10 rounded-md" size="lg" />}

          {result.map((item, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="space-y-6">
                {item.matched.map((matchedItem, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <PronounceText spans={matchedItem.spans} />

                    {/* 翻译 */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {matchedItem.translation}
                    </p>

                    {/* 例句 */}
                    {matchedItem.sentences.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                        <div className="space-y-4">
                          {matchedItem.sentences.map((item, index) => (
                            <div key={index}>
                              <PronounceText spans={item.spans} />
                              {`（${item.translation}）`}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
