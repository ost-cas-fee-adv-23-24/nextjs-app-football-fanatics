import _uniq from 'lodash/uniq';
import { frontendConfig } from '@/config';

class TextTransformer {
  hashTagsRegex = /#[\p{L}\p{M}0-9_]+/gu;
  mentionsRegex = /@\[([^)]+)\]\(([^)]+)\)/g;
  breakLineRegex = /\n/g;
  linkCssClasses = 'text-violet-600 underline';

  replaceAll(text: string): string {
    let result = this.addBreakLines(this.replaceHashtags(text));
    if (frontendConfig.enableMentions) {
      result = this.replaceMentions(result);
    }
    return result;
  }

  getUniqueHashTags(text: string): string[] | null {
    const matches = text.match(this.hashTagsRegex);
    if (!matches) return null;
    return _uniq(matches);
  }

  replaceHashtags(text: string): string {
    return text.replace(
      this.hashTagsRegex,
      (match: string, hashtag: string): string => {
        const searchKeyword = match.replace('#', '').toLowerCase();
        // this is not jsx. it's a simple string
        return `<a class="${this.linkCssClasses}" href="/posts/hashtag/${searchKeyword}" aria-label="see more of this thema here">${match}</a>`;
      },
    );
  }

  replaceMentions(text: string): string {
    return text.replace(
      this.mentionsRegex,
      (
        match: string,
        textInBrackets: string,
        textInParentheses: string,
      ): string => {
        // this is not jsx. it's a simple string
        return `<a class="${this.linkCssClasses}" href="/profiles/${textInParentheses}" aria-label="see more of this user here">@${textInBrackets}</a>`;
      },
    );
  }

  addBreakLines(text: string): string {
    return text.replace(this.breakLineRegex, '<br>');
  }
}

const textTransformer = new TextTransformer();

export default textTransformer;
