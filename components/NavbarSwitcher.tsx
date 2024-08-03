'use client'

import { Navbar } from '@/components/navbar'
import { NavbarHome } from './home/NavBarHome'
import { usePathname } from 'next/navigation'

export const NavbarSwitcher = () => {
  const pathName = usePathname()

  const handleNavbar = () => {
    return <Navbar />
  }

  const handleNavBarHome = () => {
    return <NavbarHome />
  }

  return <>{(pathName !== '/' && handleNavbar()) || handleNavBarHome()}</>
}
