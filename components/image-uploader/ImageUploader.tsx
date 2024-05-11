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
import { toast } from 'react-toastify';
import configFrontend from '@/config/configFrontend';
import frontendConfig from '@/config/configFrontend';

interface IProps {
  onCancel: () => void;
  onSuccess: (image: File) => void;
}

const isImageExtensionValid = (file: File) => {
  const isPng = file.name.toLowerCase().includes('.png');
  const isJpg = file.name.toLowerCase().includes('.jpg');
  const isJpeg = file.name.toLowerCase().includes('.jpeg');
  const isWebp = file.name.toLowerCase().includes('.webp');
  return isPng || isJpg || isJpeg || isWebp;
};

const ImageUploader = ({ onCancel, onSuccess }: IProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTooLarge, setIsTooLarge] = useState(false);
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
      if (image.size > configFrontend.maxFileSize) {
        toast.error(
          `File size is too large. Max file size is ${configFrontend.maxFileSize / 1024 / 1024}MB`,
        );
        setIsTooLarge(true);
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageInMemory(evt.target?.result);
      };
      reader.readAsDataURL(image);
    } else {
      setIsTooLarge(false);
      setImageInMemory(null);
    }
  }, [image]);

  return (
    <div>
      {imageInMemory && (
        <ImagePreview
          isTooLarge={isTooLarge}
          imageInMemory={imageInMemory}
          onCancel={() => {
            setImage(null);
          }}
        />
      )}
      {!imageInMemory && (
        <div
          className={`border-2 border-dashed rounded-lg bg-slate-100 px-[16px] py-[50px] ${isDragging ? 'border-violet-800 border-3 animate-pulse' : 'border-slate-200'}`}
          onDrop={(evt) => {
            evt.preventDefault();
            setIsDragging(false);
            if (evt.dataTransfer.items) {
              if (evt.dataTransfer.items.length > 1) {
                toast.warning(
                  'Only one file can be uploaded. the first image will be uploaded.',
                );
              }

              const file = evt.dataTransfer.items[0].getAsFile();
              if (file) {
                if (!isImageExtensionValid(file)) {
                  toast.warning('Only PNG, WEBP or JPEG files are allowed');
                  return;
                } else {
                  setImage(file);
                }
              }
            }
          }}
          onDragOver={(evt) => {
            evt.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(evt) => {
            evt.preventDefault();
            setIsDragging(false);
          }}
        >
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
              JPEG or PNG, Max. {frontendConfig.maxFileSize / 1024 / 1024}MB
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
              if (!isImageExtensionValid(imageFile)) {
                toast.warning('Only PNG, WEBP or JPEG files are allowed');
              } else {
                // @ts-ignore
                setImage(imageFile);
              }
            }
          }}
        />
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <Button
          fitParent={true}
          type={EButtonTypes.PRIMARY}
          icon={EIConTypes.CANCEL}
          label="Cancel"
          name="cancel-upload"
          onCustomClick={onCancel}
        />
        <Button
          disabled={!image || isTooLarge}
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
