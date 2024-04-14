'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  EButtonKinds,
  EButtonTypes,
  EIConTypes,
  Textarea,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import { PostEditorHeader } from '@/components/post-editor-header/PostEditorHeader';
import { MentionsInput, Mention } from 'react-mentions';
import { createPostReply } from '@/actions/createPostReply';
import { createPost } from '@/actions/createPost';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import ImageUploader from '@/components/image-uploader/ImageUploader';
import ImagePreview, {
  TFireReaderResult,
} from '@/components/image-preview/ImagePreview';
import { getRecommendationsData } from '@/utils/helpers/recommendations/getRecommendationsData';
import useUserInfo from '@/hooks/useUserInfo';
import { IMumbleUser } from '@/utils/interfaces/mumbleUsers.interface';

interface IProps {
  identifier?: string;
  isFeedPage: boolean;
  title?: string;
  subTitle?: string;
}

const cssTextArea =
  'c-textarea w-full h-40 p-4 text-xl not-italic font-medium leading-[1.35] font-poppins text-slate-900 placeholder:text-slate-500 rounded-lg outline-transparent border-solid border border-slate-200 bg-slate-100 hover:border-2 hover:border-slate-300 focus:outline focus:outline-2 focus:outline-violet-600';

export const PostEditor = ({
  identifier,
  isFeedPage = false,
  title,
  subTitle,
}: IProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageInMemory, setImageInMemory] = useState<TFireReaderResult>(null);
  const { dispatchModal, closeModal } = useModal();
  const placeholder = identifier
    ? 'What is your opinion about this post Doc?'
    : 'Say it louder for the people in the back!';

  const { identifier: loggedInUserIdentifier } = useUserInfo();
  const [users, setUsers] = useState<IMumbleUser[]>([]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageInMemory(evt.target?.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImageInMemory(null);
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      if (loggedInUserIdentifier) {
        const { users: usersFetched } = await getRecommendationsData(
          loggedInUserIdentifier,
        );
        setUsers(usersFetched);
      }
    })();
  }, [loggedInUserIdentifier]);

  useEffect(() => {
    return () => {
      setImage(null);
      setImageInMemory(null);
    };
  }, []);

  return (
    <>
      <form
        action={async (formData) => {
          if (image) {
            formData.append('media', image);
          }
          try {
            if (identifier) {
              await createPostReply(formData, identifier);
            } else {
              await createPost(formData);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setText('');
            setImage(null);
          }
        }}
      >
        <div
          className={`bg-white py-8  relative rounded-2xl mb-6 ${isFeedPage ? 'px-12' : ''}`}
        >
          <div className="mb-4">
            <PostEditorHeader
              avatarFloating={isFeedPage}
              title={title}
              subTitle={subTitle}
            />
          </div>
          <MentionsInput
            value={text}
            onChange={(event) => setText(event.target.value)}
            className={clsx(
              'c-textarea w-full h-40',
              'text-xl not-italic font-medium leading-[1.35] font-poppins text-slate-900',
              'placeholder:text-slate-500',
              'rounded-lg outline-2 outline-transparent border-solid border-2 border-slate-200 bg-slate-100',
              'hover:border-2 hover:border-slate-300',
              'focus:outline focus:outline-2 focus:outline-violet-600',
            )}
            placeholder={placeholder}
            a11ySuggestionsListLabel={'Suggested mentions'}
          >
            <Mention
              className="bg-violet-200 rounded-lg"
              data={() => {
                return users.map((user) => {
                  return {
                    id: user.id,
                    display: `@${user.username}`,
                  };
                });
              }}
              trigger="@"
            />
          </MentionsInput>
          {imageInMemory && (
            <ImagePreview
              imageInMemory={imageInMemory}
              onCancel={() => {
                setImage(null);
              }}
            />
          )}
          <div className="flex gap-4 mt-4">
            <Button
              name="picture-upload-trigger"
              fitParent={true}
              icon={EIConTypes.UPLOAD}
              label="Picture Upload"
              onCustomClick={() => {
                dispatchModal({
                  type: EModalActions.SET_CONTENT,
                  payload: {
                    content: (
                      <ImageUploader
                        onCancel={() => {
                          setImage(null);
                          closeModal();
                        }}
                        onSuccess={(image) => {
                          setImage(image);
                          closeModal();
                        }}
                      />
                    ),
                    title: 'Modal Title super duper',
                  },
                });
              }}
            />
            <Button
              name="post-submit"
              disabled={text.trim().length === 0}
              fitParent={true}
              icon={EIConTypes.SEND}
              label="Send"
              type={EButtonTypes.SECONDARY}
              htmlType={EButtonKinds.SUBMIT}
            />
          </div>
        </div>
      </form>
    </>
  );
};
