import React from 'react'
import { Outlet } from 'react-router'
import Shoppingheader from './header'

function Shoppinglayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <Shoppingheader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
        
</div>
  )
}

export default Shoppinglayout