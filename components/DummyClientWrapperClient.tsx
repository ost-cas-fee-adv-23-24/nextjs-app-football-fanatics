'use client';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const DummyClientWrapperClient = ({ children }: IProps) => {
  return <div>{children}</div>;
};

export default DummyClientWrapperClient;
