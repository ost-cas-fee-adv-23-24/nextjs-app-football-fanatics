'use server';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const DummyClientWrapperServer = ({ children }: IProps) => {
  return <div>{children}</div>;
};

export default DummyClientWrapperServer;
