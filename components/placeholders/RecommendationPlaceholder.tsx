export const RecommendationPlaceholder = () => {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col items-center w-full relative animate-pulse">
      <div className="bg-slate-200 rounded-full border-slate-100 border-[6px] w-[96px] h-[96px] animate-pulse">
        <div className="relative block animate-pulse"></div>
      </div>
      <div className="bg-slate-200 w-full h-4 animate-pulse mt-4"></div>
      <div className="bg-slate-200 w-full h-4 animate-pulse mt-4"></div>
      <div className="mt-4 rounded px-8 flex items-center justify-center py-3  bg-slate-200 text-white w-full animate-pulse">
        <span className="mr-2 h-4"></span>
      </div>
    </div>
  );
};
