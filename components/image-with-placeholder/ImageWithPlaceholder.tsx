'use client';
import React from 'react';
import { PostImagePlaceholder } from '@/components/placeholders/PostImagePlaceholder';
import Image from 'next/image';

interface IProps {
  src: string;
  alt: string;
}

const ImageWithPlaceholder = ({ src, alt }: IProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const imageTransition = 'transition-all ease-in delay-300 duration-300';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ maskImage: 'radial-gradient(white, black)' }}
    >
      <div
        className={`mumble-image ${loaded ? '-z-10 opacity-0' : 'z-10 opacity-100'} absolute top-0 left-0 right-0 bottom-0 ${imageTransition}`}
      >
        <PostImagePlaceholder />
      </div>
      <div
        className={`${loaded ? 'opacity-100' : 'opacity-0'} h-0 mumble-image`}
      >
        <Image
          suppressHydrationWarning
          onLoad={() => {
            setLoaded(true);
          }}
          src={src}
          alt={alt}
          fill
        />
      </div>
    </div>
  );
};

export default ImageWithPlaceholder;
