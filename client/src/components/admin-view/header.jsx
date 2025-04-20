import React from 'react';
import Button from '../ui/Button';
import { Menu, LogOut } from 'lucide-react';

function Adminheader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md border-b">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2"
        variant="ghost"
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="flex-1 flex justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 text-sm font-medium shadow" >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Adminheader;
