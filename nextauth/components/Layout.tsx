import React from 'react';
import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}
import Head from '../components/Head'
//
const Layout = ({ children } : MyComponentProps) => {
  return (
    <div>
      <Head />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
