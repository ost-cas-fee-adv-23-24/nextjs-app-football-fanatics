import React from 'react';
import Link from 'next/link';
import { uniq as _uniq } from 'lodash';

interface IProps {
  text: string;
}

const PostText = ({ text }: IProps) => {
  const regexExp = /#[\p{L}\p{M}0-9_]+/gu;

  const getHashTags = (text: string): string[] | null => {
    if (!text) return null;
    const matches = text.match(regexExp);
    if (!matches) return null;
    return _uniq(matches);
  };

  const renderHashTags = (text: string) => {
    const matches = getHashTags(text);
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

  const replaceHashtags = (text: string): TrustedHTML | null => {
    if (!text) return null;
    return text.replace(regexExp, (match: string, hashtag: string): string => {
      const searchKeyword = match.replace('#', '').toLowerCase();
      // this is not jsx. it's a simple string
      return `<a class="text-violet-600" href="/posts/hashtag/${searchKeyword}">${match}</a>`;
    });
  };

  return (
    <div className="text-slate-600 font-poppins not-italic font-medium text-lg leading-[1.40]">
      {(() => {
        const html = replaceHashtags(text);
        if (!html) return;
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          ></div>
        );
      })()}

      {text && renderHashTags(text)}
    </div>
  );
};

export default PostText;
