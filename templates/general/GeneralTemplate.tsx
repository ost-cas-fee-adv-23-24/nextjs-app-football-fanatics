import React from 'react';
import Header from '@/components/header/Header';
import WelcomeTexts from '@/components/welcome-texts/WelcomeTexts';

interface IProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const GeneralTemplate = ({ children, title, description }: IProps) => {
  return (
    <div className="general-template w-full">
      <div className="general-template__violet-bar bg-violet-600 py-3 px-8">
        <div className="general-template__frame max-w-4xl mr-auto ml-auto">
          <Header />
        </div>
      </div>
      <div className="general-template__content-wrapper mr-auto ml-auto bg-slate-100 pt-8">
        <div className="general-template__frame max-w-4xl mr-auto ml-auto py-8">
          <WelcomeTexts title={title} description={description} />
        </div>
        <div className="content-bottom max-w-4xl mr-auto ml-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
