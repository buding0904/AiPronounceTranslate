import z from "zod";

const PronounceSpanSchema = z.object({
  span: z.string(),
  pronounce: z.string(),
});

const TranslateItemSchema = z.object({
  matched: z.array(
    z.object({
      spans: z.array(PronounceSpanSchema),
      sentences: z.array(
        z.object({
          translation: z.string(),
          spans: z.array(PronounceSpanSchema),
        }),
      ),
      translation: z.string(),
    }),
  ),
});

const TranslateResultSchema = z.array(TranslateItemSchema);

export type TTranslateResult = z.infer<typeof TranslateResultSchema>;
export type TPronounceSpan = z.infer<typeof PronounceSpanSchema>;

export const TranslateResultSchemaJson = z.toJSONSchema(TranslateResultSchema);
