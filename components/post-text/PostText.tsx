import React from 'react';
import Link from 'next/link';
import textTransformer from '@/utils/helpers/posts/textTransformer';

interface IProps {
  text: string;
}

const PostText = ({ text }: IProps) => {
  const renderHashTags = (text: string) => {
    const matches = textTransformer.getUniqueHashTags(text);
    if (!matches) return null;

    return (
      <div className="mt-6 mb-6 gap-2 flex flex-wrap">
        {matches.map((match, index) => {
          const searchKeyword = match.replace('#', '').toLowerCase();
          return (
            <Link
              href={`/posts/hashtag/${searchKeyword}`}
              className="text-violet-600 text-xl leading-[1.40] font-bold"
              key={`${match}-${index}`}
            >
              {match}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="text-slate-600 font-poppins not-italic font-medium text-lg leading-[1.40] break-all">
      {(() => {
        let htmlIntern = '';
        if (text && text.trim().length !== 0) {
          htmlIntern = textTransformer.replaceAll(text);
        }
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: htmlIntern,
            }}
          />
        );
      })()}
      {text && text.trim().length !== 0 && renderHashTags(text)}
    </div>
  );
};

export default PostText;
