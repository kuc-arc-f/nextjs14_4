import React from 'react';
import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}
//import Head from '../components/Head'
import LibLayout from '../lib/LibLayout';
LibLayout.startProc();
//
const Layout = ({ children } : MyComponentProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
