'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  ETypographyLevels,
  Heading,
  Icon,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

import ButtonImageUpload from '@/components/button/ButtonImageUpload';
import ImagePreview from '@/components/image-preview/ImagePreview';

interface IProps {
  onCancel: () => void;
  onSuccess: (image: File) => void;
}

const ImageUploader = ({ onCancel, onSuccess }: IProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageInMemory, setImageInMemory] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  useEffect(() => {
    return () => {
      setImage(null);
      setImageInMemory(null);
    };
  }, []);

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

  return (
    <div>
      {imageInMemory && (
        <ImagePreview
          imageInMemory={imageInMemory}
          onCancel={() => {
            setImage(null);
          }}
        />
      )}
      {!imageInMemory && (
        <div className="border-2 border-dashed rounded-lg bg-slate-100 px-[16px] py-[50px]">
          <div className="w-16 h-16 mx-auto">
            <Icon type={EIConTypes.UPLOAD} fitParent={true} />
          </div>
          <div className="text-center color-slate-500">
            <Heading
              text="Drag File to upload"
              level={ETypographyLevels.THREE}
              inheritColor={true}
            />
            <p className="color-slate-400 text-lg leading-5 mt-2">
              JPEG or PNG, Max. 50Mb
            </p>
          </div>
        </div>
      )}

      <div className="mb-12 mt-6">
        <ButtonImageUpload
          onError={() => {}}
          onSuccess={(imageFile) => {
            if (imageFile) {
              // @ts-ignore
              setImage(imageFile);
            }
          }}
        />
      </div>
      <div className="flex gap-4">
        <Button
          fitParent={true}
          type={EButtonTypes.PRIMARY}
          icon={EIConTypes.CANCEL}
          label="Cancel"
          name="cancel-upload"
          onCustomClick={onCancel}
        />
        <Button
          disabled={!image}
          fitParent={true}
          type={EButtonTypes.SECONDARY}
          icon={EIConTypes.CHECKMARK}
          label="Save"
          name="save-upload"
          onCustomClick={() => {
            if (image) {
              onSuccess(image);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
