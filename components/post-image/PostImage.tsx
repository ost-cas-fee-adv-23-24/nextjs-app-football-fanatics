import React from 'react';
import Image from 'next/image';
import { EIConTypes, Icon } from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  src: string;
  alt: string;
}

const PostImage = ({ src, alt }: IProps) => {
  return (
    <div
      onClick={() => {
        alert('clicked');
      }}
      className="c-mumble-image rounded-2xl relative h-0 overflow-hidden group cursor-pointer"
      style={{ paddingBottom: `${(8 / 17) * 100}%` }} // aspect ratio 17/8
    >
      <div className="group-hover:opacity-70 bg-violet-600 top-0 left-0 right-0 bottom-0 opacity-0 z-30 absolute transition duration-500 flex items-center justify-center">
        <div className="group-hover:w-12 group-hover:h-12 w-2 h-2 text-white transition[width] duration-500 group-hover:opacity-90 opacity-0">
          <Icon type={EIConTypes.FULL_SCREEN} fitParent={true} />{' '}
        </div>
      </div>
      <Image
        className="group-hover:scale-105 transition duration-500"
        src={src}
        alt={alt}
        width={1000}
        height={600}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'block',
          bottom: 0,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default PostImage;
