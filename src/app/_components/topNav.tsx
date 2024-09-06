'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import Username from './username'
import { Title } from '@/components/ui'

export default function TopNav() {
  const pathname = usePathname()
  return (
    <div className='container mx-auto mb-4 flex w-full max-w-screen-md items-center px-4 pt-4 md:px-0'>
      {pathname === '/' ? (
        <Title>gh</Title>
      ) : (
        <Link href='/' className='hover:text-cb-pink'>
          <Title>podz</Title>
        </Link>
      )}
      <div className='flex flex-grow justify-end'>
        <SignedOut>
          <SignInButton>
            <ArrowRightStartOnRectangleIcon className='h-6 w-6 hover:cursor-pointer' />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className='flex space-x-2 text-cb-white'>
            <Username />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}
