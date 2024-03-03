import { File } from 'buffer';
import { EIConTypes, Icon } from '@ost-cas-fee-adv-23-24/elbmum-design';
import React from 'react';

interface IProps {
  onSuccess: (image: File) => void;
  onError: (error: Error) => void;
}

const ButtonImageUpload = ({ onSuccess, onError }: IProps) => {
  return (
    <div className="relative">
      <input
        placeholder=""
        spellCheck="false"
        accept="image/*"
        type="file"
        className="absolute bottom-0 right-0 left-0 top-0 z-20 opacity-0 cursor-pointer"
        onChange={(event: any) => {
          try {
            const imageFile: File | null = event.currentTarget.files[0];
            if (imageFile) {
              if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(imageFile as File);
              }
            } else {
              throw new Error('No image selected/found');
            }
          } catch (error) {
            if (onError && typeof onError === 'function') {
              onError(error as Error);
            }
          }
        }}
      />
      <div className="relative z-10">
        <button className="font-poppins text-base not-italic font-semibold leading-4 rounded px-8 flex items-center justify-center w-full py-4 bg-slate-300 slate-500">
          ...or select a File
          <span className="inline-block h-4 w-4 leading-none ml-4">
            <Icon type={EIConTypes.UPLOAD} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ButtonImageUpload;
