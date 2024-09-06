import { unstable_noStore as noStore } from 'next/cache'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { auth, clerkClient } from '@clerk/nextjs/server'

import Main from '@/app/_components/main'
import fetcher from '@/lib/fetcher'

// api:
// https://docs.github.com/en/rest/repos?apiVersion=2022-11-28

type Repo = {
  id: number
  name: string
  html_url: string
  homepage: string
}

const DEFAULT_USER = 'b4conjuice'

async function RepoList({ username }: { username: string }) {
  const REPO_API = `https://api.github.com/users/${username}/repos?sort=updated`

  const data: Repo[] = await fetcher(REPO_API)
  const repos = data.map(repo => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    homepage: repo.homepage,
  }))
  return (
    <ul className='divide-y divide-cb-dusty-blue'>
      {repos.map(repo => (
        <li key={repo.id} className='flex items-center py-4 first:pt-0'>
          <span className='grow'>
            <a
              className='text-xl text-cb-pink hover:text-cb-pink/75'
              href={repo.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {repo.name}
            </a>
          </span>
          {repo.homepage && (
            <a
              className='flex space-x-1 text-cb-pink hover:text-cb-pink/75'
              href={repo.homepage}
              target='_blank'
            >
              <span>{repo.homepage}</span>
              <ArrowTopRightOnSquareIcon className='h-6 w-6' />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

export default async function Home() {
  noStore()
  const { userId }: { userId: string | null } = auth()
  const user = userId ? await clerkClient.users.getUser(userId) : null
  const username = user?.username ?? DEFAULT_USER
  return (
    <Main className='container mx-auto flex max-w-screen-md flex-col px-4 md:px-0'>
      <div className='flex flex-grow flex-col'>
        <RepoList username={username} />
      </div>
    </Main>
  )
}
