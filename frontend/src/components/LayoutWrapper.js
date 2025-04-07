import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const LayoutWrapper = () => {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutWrapper;
