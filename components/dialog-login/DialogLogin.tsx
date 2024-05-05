import React, { useId } from 'react';
import {
  Button,
  EIConTypes,
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {
  message: string;
  icon: EIConTypes;
  labelButton: string;
  customClick: () => void;
}

export const DialogLogin = ({
  message,
  icon,
  labelButton,
  customClick,
}: IProps) => {
  return (
    <div className="bg-violet-200 p-4 rounded-lg flex flex-col text-center">
      <div className="mb-4">
        <Paragraph size={EParagraphSizes.MEDIUM} text={message} />
      </div>
      <Button
        name={useId()}
        label={labelButton}
        icon={icon}
        onCustomClick={() => {
          customClick();
        }}
      />
    </div>
  );
};

export default DialogLogin;
