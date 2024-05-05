'use client';
import React from 'react';
import { TagCloud } from 'react-tagcloud';
import useBreakpoints from '@/hooks/useBreakpoints';

interface IProps {
  query: string;
}

const Cloud = ({ query }: IProps) => {
  const { isBpMDDown } = useBreakpoints();
  return (
    <div className="overflow-hidden">
      <TagCloud
        shuffle={true}
        minSize={20}
        maxSize={isBpMDDown ? 50 : 100}
        tags={[
          { value: `#${query}`, count: 35 },
          { value: `#${query}`, count: 30 },
          { value: `#${query}`, count: 40 },
          { value: `#${query}`, count: 50 },
          { value: `#${query}`, count: 60 },
          { value: `#${query}`, count: 70 },
        ]}
      />
    </div>
  );
};

export default Cloud;
