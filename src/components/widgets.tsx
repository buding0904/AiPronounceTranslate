import { TPronounceSpan } from "@/api/model";

interface PronounceTextProps {
  spans: TPronounceSpan[];
}

export const PronounceText = ({ spans }: PronounceTextProps) => {
  return (
    <span>
      {spans.map((span, spanIndex) => (
        <ruby key={spanIndex} className="mr-1">
          {span.span}
          <rt className="text-sm text-gray-500 dark:text-gray-400 mb-1 select-none">
            {span.pronounce}
          </rt>
        </ruby>
      ))}
    </span>
  );
};
