'use client';
import React from 'react';
import {
  EIConTypes,
  EImageLoadingType,
  Icon,
  Image,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';
import ImageNext from 'next/image';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';

interface IProps {
  src: string;
  alt: string;
}

const PostImage = ({ src, alt }: IProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const imageProportions = 'pb-[calc((8/17)*100%)]';
  const imageTransition = 'transition-all ease-in delay-500 duration-500';

  const { dispatchModal } = useModal();
  return (
    <div className="relative">
      <div
        className={`${loaded ? '-z-10 opacity-0' : 'z-10 opacity-100'} absolute top-0 left-0 right-0 bottom-0 ${imageProportions} ${imageTransition}`}
      >
        <PostImagePlaceholder />
      </div>
      <div
        className={`group ${loaded ? 'opacity-100' : 'opacity-0'} rounded-2xl relative h-0 overflow-hidden cursor-pointer ${imageProportions} ${imageTransition}`}
        onClick={() => {
          dispatchModal({
            type: EModalActions.SET_CONTENT,
            payload: {
              title: alt,
              fullWidth: true,
              content: (
                <div className="w-full">
                  <Image
                    src={src}
                    alt={alt}
                    loadingType={EImageLoadingType.EAGER}
                  />
                </div>
              ),
            },
          });
        }}
      >
        <div className="group-hover:opacity-70 group-hover:z-30 bg-violet-600 top-0 left-0 right-0 bottom-0 opacity-0 absolute transition duration-500 flex items-center justify-center">
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
          alt={alt}
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
};

export default PostImage;
