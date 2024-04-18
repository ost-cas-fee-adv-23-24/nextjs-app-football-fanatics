import React from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { IMentionsProps } from '@/components/post-editor/PostEditor';

interface IProps {
  text: string;
  placeholder: string;
  users: IMentionsProps[];
  notifyValueChange: (value: string) => void;
}

const PostEditorText = ({
  text,
  placeholder,
  users,
  notifyValueChange,
}: IProps) => {
  return (
    <div
      className="w-full font-poppins"
      style={{ minHeight: '160px', height: 'auto' }}
    >
      <MentionsInput
        className="c-mentions"
        value={text}
        onChange={(event) => notifyValueChange(event.target.value)}
        singleLine={false}
        placeholder={placeholder}
        a11ySuggestionsListLabel={'Suggested mentions'}
      >
        <Mention
          markup="@[__display__](__id__)"
          className="rounded-lg bg-violet-200"
          data={users}
          trigger="@"
        />
      </MentionsInput>
    </div>
  );
};

export default PostEditorText;
