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
  serverRendered?: boolean;
  onSuccess: (newImage: string) => void;
  onError: (message: string) => void;
  onCanceled: () => void;
}

const ImageUpdater = ({
  postIdentifier,
  serverRendered,
  onCanceled,
  onError,
  onSuccess,
}: IProps) => {
  const { dispatchLayout, closeModal } = useLayout();

  return (
    <div
      onClick={() => {
        dispatchLayout({
          type: ELayoutActions.SET_OVERLAY_CONTENT,
          payload: {
            overlayTitle: 'Update Image',
            overlayContent: (
              <ImageUploader
                onCancel={() => {
                  onCanceled();
                }}
                onSuccess={async (image) => {
                  const formData = new FormData();
                  formData.append(
                    'media',
                    // @ts-ignore
                    image,
                  );

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
      <div
        className="absolute h-10 w-10 bg-slate-200 z-30 cursor-pointer"
        style={{
          top: -10,
          left: -28,
          borderTop: '0 solid transparent',
          borderRight: '50px solid transparent',
          borderBottom: '50 solid transparent',
          borderLeft: '50px solid transparent',
          transform: 'rotate(315deg)',
        }}
      />
      <div
        className="absolute w-5 h-5 text-violet-600 top-2 left-2 cursor-pointer"
        style={{ zIndex: 100 }}
      >
        <Icon type={EIConTypes.EDIT} fitParent={true} />
      </div>
    </div>
  );
};

export default ImageUpdater;
