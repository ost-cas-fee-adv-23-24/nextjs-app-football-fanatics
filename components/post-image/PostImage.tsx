'use client';
import React from 'react';
import { EIConTypes, Icon } from '@ost-cas-fee-adv-23-24/elbmum-design';
import ImageNext from 'next/image';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';
import useLayout from '@/hooks/useLayout';
import {
  ELayoutActions,
  EOverlayKind,
} from '@/providers/layout/utils/enums/layout.enum';
import useUserInfo from '@/hooks/useUserInfo';
import ImageUpdater from '@/components/image-updater/ImageUpdater';
import { toast } from 'react-toastify';
import usePosts from '@/hooks/usePosts';
import ImageRemover from '@/components/image-remover/ImageRemover';

interface IProps {
  src: string;
  alt: string;
  creatorIdentifier?: string;
  postIdentifier?: string;
  serverRendered?: boolean;
}

const PostImage = ({
  src,
  alt,
  creatorIdentifier,
  postIdentifier,
  serverRendered = false,
}: IProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const imageTransition = 'transition-opacity duration-200';

  const { dispatchLayout, closeModal, currentTabProfile } = useLayout();
  const { restartFeedAuthorized, restartFeedAuthorizedLikes } = usePosts();
  const { identifier } = useUserInfo();
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div
        className={`${loaded ? '-z-10 opacity-0' : 'z-10 opacity-100'} absolute top-0 left-0 right-0 bottom-0 mumble-image ${imageTransition}`}
      >
        <PostImagePlaceholder text="loading..." pulse={true} />
      </div>

      {creatorIdentifier === identifier && postIdentifier && (
        <>
          <ImageRemover
            postIdentifier={postIdentifier}
            title="Remove image"
            onSuccess={(message) => {
              if (serverRendered) {
                window.location.reload();
              } else {
                if (currentTabProfile === 0 && creatorIdentifier) {
                  restartFeedAuthorized(creatorIdentifier, [creatorIdentifier]);
                } else if (currentTabProfile === 1 && creatorIdentifier) {
                  restartFeedAuthorizedLikes(creatorIdentifier);
                }
                toast.success(message);
                closeModal();
              }
            }}
            onError={(message) => {
              toast.error(message);
              closeModal();
            }}
            onCanceled={closeModal}
          />
          <ImageUpdater
            addingPicture={false} //editing
            title="Update image"
            postIdentifier={postIdentifier}
            onSuccess={(newImage: string) => {
              closeModal();
              if (serverRendered) {
                window.location.reload();
              } else {
                if (currentTabProfile === 0 && creatorIdentifier) {
                  restartFeedAuthorized(creatorIdentifier, [creatorIdentifier]);
                } else if (currentTabProfile === 1 && creatorIdentifier) {
                  restartFeedAuthorizedLikes(creatorIdentifier);
                }
                toast.success('Image updated');
              }
            }}
            onError={(message) => {
              closeModal();
              toast.error(message);
            }}
            onCanceled={() => {
              closeModal();
            }}
          />
        </>
      )}
      <div
        className={`group ${loaded ? 'opacity-100' : 'opacity-0'} rounded-2xl relative h-0 overflow-hidden cursor-pointer mumble-image ${imageTransition}`}
        onClick={(evt) => {
          evt.currentTarget.blur();
          dispatchLayout({
            type: ELayoutActions.SET_OVERLAY_CONTENT,
            payload: {
              overlayTitle: alt || 'Image no alt defined',
              overlayKind: EOverlayKind.REGULAR,
              overlayContent: (
                <div className="global-width mx-auto">
                  {/*aspect 17:8 (mumble image)*/}
                  <ImageNext src={src} alt={alt} width={1280} height={602.35} />
                </div>
              ),
            },
          });
        }}
      >
        <div className="group-hover:opacity-70 group-hover:z-10 bg-violet-600 top-0 left-0 right-0 bottom-0 opacity-0 absolute transition duration-500 flex items-center justify-center">
          <div className="group-hover:w-12 group-hover:h-12 w-2 h-2 text-white transition[width] duration-500 group-hover:opacity-90 opacity-0">
            <Icon type={EIConTypes.FULL_SCREEN} fitParent={true} />{' '}
          </div>
        </div>

        <ImageNext
          onLoad={() => {
            setLoaded(true);
          }}
          className="group-hover:scale-100 scale-105 transition duration-500 top-0 left-0 right-0 bottom-0 block absolute object-cover object-center h-[100%] w-[100%]"
          src={src}
          alt={alt || 'Image no alt defined'}
          // aspect 17:8 (mumble image)
          width={1280}
          height={602.35}
        />
      </div>
    </div>
  );
};

export default PostImage;
