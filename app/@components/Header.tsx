import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        <Link href="/" className='text-2xl font-bold text-blue-600'>QB</Link>
        <Navbar />

      </div>
      </header>
  )
}

export default Header