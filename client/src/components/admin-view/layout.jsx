
import React, { useState } from 'react';
import Adminsidebar from './sidebar';
import Adminheader from './header';
import { Outlet } from 'react-router-dom';

function Adminlayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminsidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-col flex-1">
        <Adminheader setOpen={setOpenSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Adminlayout;
