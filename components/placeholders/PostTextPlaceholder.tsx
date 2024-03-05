interface IProps {
  lines?: number;
}

export const PostTextPlaceholder = ({ lines = 3 }: IProps) => {
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
