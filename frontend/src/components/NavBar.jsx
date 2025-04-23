import React from 'react'
import { useState } from 'react';
import { NavBarMovile } from './NavBarMovile';
import { NavBarPc } from './NavBarPc';

export const NavBar = ({user, setuser}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className='bg-gray-900 text-white flex justify-between border-b border-amber-50 fixed w-full top-0 h-[80px] z-40 '>
        <NavBarPc isOpen={ isOpen } setIsOpen={ setIsOpen} nameuser={user} setuser={setuser} />
      </nav>

      <NavBarMovile isOpen={ isOpen } setIsOpen={ setIsOpen } nameuser={user} setuser={setuser} />
      
    </>
  )
}




