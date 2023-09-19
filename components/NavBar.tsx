import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NavBar = () => {
  return (
    <nav className="flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 bg-black-100 py-7 text-white">
      <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
        <Link href="/">
          <Image src='/payments.png' width={55} height={40} alt='KeyChain logo' className='rounded' />
        </Link>

        {/* <Image 
          src="/hamburger-menu.svg"
          width={30}
          height={30}
          alt="Hamburger menu"
          className="block md:hidden"
        /> */}

        <ul className="flex-center gap-x-3  md:gap-x-10">
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link
              href="/qr"
            >
              Add Funds
            </Link>
          </li>
          <li className="body-text !font-bold text-gradient_pink-orange">
            <Link
              href="/account"
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar