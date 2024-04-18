interface IProps {
  text?: string;
  pulse?: boolean;
}

export const PostImagePlaceholder = ({ text, pulse = true }: IProps) => {
  return (
    <div
      className={`mumble-image bg-slate-200 rounded-2xl relative h-0 overflow-hidden group border-1 border-slate-400 ${pulse ? 'animate-pulse' : ''}`}
    >
      {text ? (
        <div
          className="absolute w-full p-2 text-center text-slate-600 font-poppins not-italic font-medium text-xs lg:text-md"
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
