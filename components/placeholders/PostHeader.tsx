export const PostHeaderPlaceholder = () => {
  return (
    <div className="relative">
      <div className="absolute left-[-85px]">
        <div className="w-[64px] h-[64px] rounded-full bg-slate-200 border-slate-400 animate-pulse"></div>
      </div>
      <div className="gap-4">
        <div className="bg-slate-200 w-56 h-4 mb-4 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="bg-slate-200 w-16 h-4 animate-pulse"></div>
          <div className="bg-slate-200 w-16 h-4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
