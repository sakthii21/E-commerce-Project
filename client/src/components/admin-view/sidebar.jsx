import React, { Fragment } from 'react';
import {
  ShieldUser,
  LayoutDashboard,
  ShoppingBasket,
  CircleCheckBig
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSidebarmenuitems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard size={20} />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket size={20} />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <CircleCheckBig size={20} />
  }
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    setOpen?.(false); // close sheet on mobile
  };

  return (
    <nav className="mt-6 flex flex-col gap-2">
      {adminSidebarmenuitems.map((item) => (
        <div
          key={item.id}
          onClick={() =>{navigate(item.path)
            setOpen ? setOpen(false):null
          }
      }
          className="flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 transition text-gray-800"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

function Adminsidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 lg:hidden bg-white" >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="flex gap-2 mt-5">
                <ShieldUser size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white p-6 shadow-md">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex cursor-pointer items-center gap-2 text-gray-900"
        >
          <ShieldUser size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default Adminsidebar;
