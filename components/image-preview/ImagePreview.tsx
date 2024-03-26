import React from 'react';
import {
  ButtonIconRounded,
  EIConTypes,
  EImageLoadingType,
  Image,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

export type TFireReaderResult = string | ArrayBuffer | null | undefined;
interface IProps {
  imageInMemory: TFireReaderResult;
  onCancel: () => void;
}

const ImagePreview = ({ imageInMemory, onCancel }: IProps) => {
  let imageSource: string | null = null;
  try {
    if (imageInMemory) {
      imageSource = imageInMemory.toString();
    }
  } catch (error) {
    // alert message (could not produce preview) or add onErrorPreviewImage
  }

  return (
    <div className="relative">
      <div className="absolute z-20 top-4 right-4">
        <ButtonIconRounded
          icon={EIConTypes.CANCEL}
          label="Clean"
          name="clear-image"
          onCustomClick={() => {
            onCancel();
          }}
        />
      </div>
      <div className="mt-4 mb-4 rounded-lg overflow-hidden border-4 border-dashed border-slate-400">
        {/*add mask to show the same ratio as the image in the post and exactly what is going to be seen on the post*/}
        {imageSource && (
          <Image
            src={imageSource}
            alt="image-preview"
            loadingType={EImageLoadingType.EAGER}
          />
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
