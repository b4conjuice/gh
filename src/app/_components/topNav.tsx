import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid'
import { auth, clerkClient } from '@clerk/nextjs/server'

import TopNavTitle from './topNavTitle'

export default async function TopNav() {
  const { userId }: { userId: string | null } = auth()
  const user = userId ? await clerkClient.users.getUser(userId) : null
  const username = user?.username
  return (
    <div className='container mx-auto mb-4 flex w-full max-w-screen-md items-center px-4 pt-4 md:px-0'>
      <TopNavTitle />
      <div className='flex flex-grow justify-end'>
        <SignedOut>
          <SignInButton>
            <ArrowRightStartOnRectangleIcon className='h-6 w-6 hover:cursor-pointer' />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className='flex space-x-2 text-cb-white'>
            {username && <span>{username}</span>}
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  )
}
