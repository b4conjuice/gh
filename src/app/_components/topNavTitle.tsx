'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Title } from '@/components/ui'

export default function TopNavTitle() {
  const pathname = usePathname()
  if (pathname === '/') {
    return <Title>gh</Title>
  }
  return (
    <Link href='/' className='hover:text-cb-pink'>
      <Title>gh</Title>
    </Link>
  )
}
