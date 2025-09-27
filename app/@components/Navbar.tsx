import React from 'react'
import Link from "next/link";
const NavLinks = [ { url: "/", title: "Home", }, { url: "/quiz/edit", title: "Create Quiz", }]

const Navbar = () => {
  return (
    <nav className='flex space-x-6'>
      {
        NavLinks.map(link=><Link
          className='hover:text-blue-600 transition'
          href={link.url} key={link.title} >{link.title}</Link>)
      }
    </nav>
  )
}

export default Navbar