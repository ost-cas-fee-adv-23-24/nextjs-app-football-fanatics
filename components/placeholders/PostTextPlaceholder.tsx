import { PostHeaderPlaceholder } from '@/components/placeholders/PostHeader';

export const PostTextPlaceholder = ({ lines }: { lines: number }) => {
  const linesArray = new Array(lines).fill(0);
  return (
    <>
      {linesArray.map((_, index) => {
        return (
          <div
            className="bg-slate-200 w-full h-4 animate-pulse mt-4"
            key={index}
          ></div>
        );
      })}
    </>
  );
};
