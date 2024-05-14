import React from 'react';
import {
  EParagraphSizes,
  ETypographyLevels,
  Heading,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  title: string;
  description: string;
}

const WelcomeTexts = ({ title, description }: IProps) => {
  return (
    <div className="text-violet-600">
      <div className="mb-4">
        <Heading
          level={ETypographyLevels.TWO}
          text={title}
          inheritColor={true}
        />
      </div>
      <div>
        <Paragraph text={description} size={EParagraphSizes.LARGE} />
      </div>
    </div>
  );
};

export default WelcomeTexts;
