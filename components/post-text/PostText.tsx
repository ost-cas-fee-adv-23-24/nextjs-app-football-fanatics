import React from 'react';
import Link from 'next/link';
import { uniq as _uniq } from 'lodash';

interface IProps {
  text: string;
}

const PostText = ({ text }: IProps) => {
  const regexExp = /#[\p{L}\p{M}0-9_]+/gu;

  const getAndRenderHashTags = (text: string) => {
    const matches = text.match(regexExp);

    if (!matches) return null;
    const uniqMatches = _uniq(matches);
    return (
      <div className="mt-6 mb-6 gap-2 flex flex-wrap">
        {uniqMatches.map((match, index) => {
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

  const replaceHashtags = (text: string) => {
    return text.replace(regexExp, (match: string, hashtag: string): string => {
      const searchKeyword = match.replace('#', '').toLowerCase();
      // this is not jsx. it's a simple string
      return `<a class="text-violet-600" href="/posts/hashtag/${searchKeyword}">${match}</a>`;
    });
  };

  return (
    <div className="text-slate-600 font-poppins not-italic font-medium text-lg leading-[1.40]">
      <div dangerouslySetInnerHTML={{ __html: replaceHashtags(text) }}></div>
      {getAndRenderHashTags(text)}
    </div>
  );
};

export default PostText;
