'use client';
import React from 'react';
import Image from 'next/image';
import { EIConTypes, Icon } from '@ost-cas-fee-adv-23-24/elbmum-design';
import useModal from '@/hooks/useModal';
import { EModalActions } from '@/stores/Modal.context';

interface IProps {
  src: string;
  alt: string;
}

const PostImage = ({ src, alt }: IProps) => {
  const { dispatchModal } = useModal();
  return (
    <div
      onClick={() => {
        dispatchModal({
          type: EModalActions.SET_CONTENT,
          payload: {
            title: alt,
            fullWidth: true,
            content: (
              // TODO image render full with height. Image Next property FILL sets it to position absolute ¯\_(ツ)_/¯
              // how to avoid it?
              <div className="w-full" style={{ paddingBottom: `100%` }}>
                <Image
                  className="object-cover object-center relative mx-auto"
                  src={src}
                  alt={alt}
                  width={1500}
                  height={600}
                />
              </div>
            ),
          },
        });
      }}
      className="c-mumble-image rounded-2xl relative h-0 overflow-hidden group cursor-pointer pb-[calc((8/17)*100%)]"
    >
      <div className="group-hover:opacity-70 group-hover:z-30 bg-violet-600 top-0 left-0 right-0 bottom-0 opacity-0 absolute transition duration-500 flex items-center justify-center">
        <div className="group-hover:w-12 group-hover:h-12 w-2 h-2 text-white transition[width] duration-500 group-hover:opacity-90 opacity-0">
          <Icon type={EIConTypes.FULL_SCREEN} fitParent={true} />{' '}
        </div>
      </div>
      <Image
        className="group-hover:scale-100 scale-105 transition duration-500 top-0 left-0 right-0 bottom-0 block absolute object-cover object-center h-[100%] w-[100%]"
        src={src}
        alt={alt}
        width={1000}
        height={600}
      />
    </div>
  );
};

export default PostImage;
