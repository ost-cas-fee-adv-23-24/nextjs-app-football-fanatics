'use client';
import React from 'react';
import { toast } from 'react-toastify';
import ImageUpdater from '@/components/image-updater/ImageUpdater';
import useLayout from '@/hooks/useLayout';
import usePosts from '@/hooks/usePosts';
import { EIConTypes } from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  postIdentifier: string;
  serverRendered: boolean;
  creatorIdentifier: string;
}

const ImageUpdaterWrapper = ({
  postIdentifier,
  serverRendered,
  creatorIdentifier,
}: IProps) => {
  const { closeModal, currentTabProfile } = useLayout();
  const { restartFeedAuthorized, restartFeedAuthorizedLikes } = usePosts();
  return (
    <div className="">
      <ImageUpdater
        title="Add a picture"
        icon={EIConTypes.PICTURE}
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
            toast.success('Picture added');
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
    </div>
  );
};

export default ImageUpdaterWrapper;
