'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  EButtonTypes,
  EIConTypes,
  EInputFieldGroupType,
  EStateInputFieldGroup,
  ETypographyLevels,
  Heading,
  InputFieldGroup,
} from '@ost-cas-fee-adv-23-24/elbmum-design';
import useUserInfo from '@/hooks/useUserInfo';

export interface INewUserSettings {
  firstName: string;
  lastName: string;
  email: string;
}

interface IProps {
  onClose: () => void;
  onSave: (options: INewUserSettings) => void;
}
const UserSettings = ({ onClose, onSave }: IProps) => {
  const { firstName, lastName } = useUserInfo();
  const [firstNameIntern, setFirstNameIntern] = useState('');
  const [lastNameIntern, setLastNameIntern] = useState('');
  const [emailIntern, setEmailIntern] = useState('');

  useEffect(() => {
    setFirstNameIntern(firstName);
    setLastNameIntern(lastName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // todo: Add Name attribute to the input fields (design system)
  // only after that we could use a form and submit via server actions
  // in figma there is only one group of data, which includes password.
  // ¯\_(ツ)_/¯ makes no sense. we need to split it up.

  return (
    <div className="global-width flex flex-col gap-4">
      <Heading level={ETypographyLevels.FOUR} text="Personal settings" />
      <InputFieldGroup
        notifyValueChange={(newText) => {
          setFirstNameIntern(newText);
        }}
        placeholder="firstName"
        as={EInputFieldGroupType.TEXT}
        state={
          firstNameIntern.trim().length === 0
            ? EStateInputFieldGroup.ERROR
            : EStateInputFieldGroup.SUCCESS
        }
        labelText="Firstname"
        errorMessage="Firstname is required."
        text={firstNameIntern}
      />
      <InputFieldGroup
        notifyValueChange={(newText) => {
          setLastNameIntern(newText);
        }}
        placeholder="Lastname"
        as={EInputFieldGroupType.TEXT}
        state={
          lastNameIntern.trim().length === 0
            ? EStateInputFieldGroup.ERROR
            : EStateInputFieldGroup.SUCCESS
        }
        labelText="Lastname"
        errorMessage="Lastname is required."
        text={lastNameIntern}
      />

      <InputFieldGroup
        notifyValueChange={(newText) => {
          setEmailIntern(newText);
        }}
        placeholder="E-Mail"
        as={EInputFieldGroupType.TEXT}
        state={
          emailIntern.trim().length === 0 || !emailIntern.includes('@')
            ? EStateInputFieldGroup.ERROR
            : EStateInputFieldGroup.SUCCESS
        }
        labelText="E-Mail"
        errorMessage="A valid email is required."
        text={emailIntern}
      />
      <div className="flex gap-4 mt-16">
        <Button
          disabled={
            emailIntern.trim().length === 0 ||
            !emailIntern.includes('@') ||
            firstNameIntern.trim().length === 0 ||
            lastNameIntern.trim().length === 0
          }
          type={EButtonTypes.SECONDARY}
          fitParent={true}
          icon={EIConTypes.CHECKMARK}
          label="Save"
          name="submit-save"
          onCustomClick={() => {
            onSave({
              firstName: firstNameIntern,
              lastName: lastNameIntern,
              email: emailIntern,
            });
          }}
        />
        <Button
          fitParent={true}
          icon={EIConTypes.CANCEL}
          label="Cancel"
          name="submit-cancel"
          onCustomClick={onClose}
        />
      </div>
    </div>
  );
};

export default UserSettings;
