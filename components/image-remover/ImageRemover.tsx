'use client';
import React from 'react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  Icon,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useLayout from '@/hooks/useLayout';
import { ELayoutActions } from '@/providers/layout/utils/enums/layout.enum';
import { removePostImage } from '@/actions/updatePost';

interface IProps {
  postIdentifier: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onCanceled: () => void;
  title: string;
}

const ImageRemover = ({
  postIdentifier,
  title,
  onCanceled,
  onError,
  onSuccess,
}: IProps) => {
  const { dispatchLayout, closeModal } = useLayout();

  return (
    <div
      className="absolute h-10 w-10 bg-red-500 z-10 cursor-pointer border-transparent border-t-[0] border-b-[50px] border-x-[50px] top-[-20px] right-[-40px] rotate-[40deg]"
      title={title}
      onClick={() => {
        dispatchLayout({
          type: ELayoutActions.SET_OVERLAY_CONTENT,
          payload: {
            overlayTitle: title,
            overlayContent: (
              <div className="flex justify-between gap-4">
                <Button
                  fitParent={true}
                  icon={EIConTypes.CANCEL}
                  label="Cancel"
                  name="image-remove-cancel"
                  type={EButtonTypes.PRIMARY}
                  onCustomClick={onCanceled}
                />
                <Button
                  fitParent={true}
                  type={EButtonTypes.SECONDARY}
                  icon={EIConTypes.CHECKMARK}
                  label="Remove"
                  name="image-remove"
                  onCustomClick={async () => {
                    await removePostImage(postIdentifier);
                    try {
                      onSuccess('image removed successfully');
                    } catch (error) {
                      onError((error as Error).message);
                    }
                  }}
                />
              </div>
            ),
          },
        });
      }}
    >
      <div className="absolute h-10 w-10">
        <div
          className="relative w-4 h-4 text-white cursor-pointer top-7 right-2 rotate-[0deg]"
          style={{ zIndex: 50 }}
        >
          <Icon type={EIConTypes.BIN} fitParent={true} />
        </div>
      </div>
    </div>
  );
};

export default ImageRemover;
