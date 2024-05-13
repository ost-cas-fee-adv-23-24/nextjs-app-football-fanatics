'use client';
import React from 'react';
import { EIConTypes, Icon } from '@ost-cas-fee-adv-23-24/elbmum-design';
import useLayout from '@/hooks/useLayout';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import ImageUploader from '@/components/image-uploader/ImageUploader';
import { updatePostImage } from '@/actions/updatePost';
import { EResponseMumbleStatus } from '@/utils/enums/general.enum';

interface IProps {
  postIdentifier: string;
  onSuccess: (newImage: string) => void;
  onError: (message: string) => void;
  onCanceled: () => void;
  icon?: EIConTypes;
  title: string;
}

const ImageUpdater = ({
  postIdentifier,
  onCanceled,
  onError,
  onSuccess,
  title,
  icon = EIConTypes.EDIT,
}: IProps) => {
  const { dispatchLayout, closeModal } = useLayout();

  return (
    <div
      title={title}
      onClick={() => {
        dispatchLayout({
          type: ELayoutActions.SET_OVERLAY_CONTENT,
          payload: {
            overlayTitle: title,
            overlayContent: (
              <ImageUploader
                onCancel={() => {
                  onCanceled();
                }}
                onSuccess={async (image) => {
                  const formData = new FormData();
                  formData.append('media', image);
                  const newImageData = await updatePostImage({
                    formData,
                    identifier: postIdentifier,
                  });

                  if (newImageData.status === EResponseMumbleStatus.ERROR) {
                    onError(newImageData.message as string);
                  } else if (
                    newImageData.status === EResponseMumbleStatus.SUCCESS
                  ) {
                    onSuccess(newImageData.data as string);
                  }
                }}
              />
            ),
          },
        });
      }}
    >
      <div className="absolute h-10 w-10 bg-slate-200 z-10 cursor-pointer top-[-15px] left-[-33px] border-transparent border-t-[0] border-b-[50px] border-x-[50px] rotate-[315deg]" />
      <div
        className="absolute w-5 h-5 text-violet-600 top-2 left-2 cursor-pointer"
        style={{ zIndex: 50 }}
      >
        <Icon type={icon} fitParent={true} />
      </div>
    </div>
  );
};

export default ImageUpdater;
