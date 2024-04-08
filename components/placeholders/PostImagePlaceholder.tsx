export const PostImagePlaceholder = ({ text }: { text?: string }) => {
  return (
    <div className="mumble-image bg-slate-200 rounded-2xl relative h-0 overflow-hidden group cursor-pointer animate-pulse">
      {text ? (
        <div
          className="absolute text-slate-600 font-poppins not-italic font-medium text-lg"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};
