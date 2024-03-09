import { unstable_noStore as noStore } from 'next/cache'

import Main from '@/app/_components/main'
import fetcher from '@/lib/fetcher'
import { LinkIcon } from '@heroicons/react/24/solid'

// api:
// https://docs.github.com/en/rest/repos?apiVersion=2022-11-28

const USER = 'b4conjuice'
const REPO_API = `https://api.github.com/users/${USER}/repos?sort=updated`

type Repo = {
  id: number
  name: string
  html_url: string
  homepage: string
}

export default async function Home() {
  noStore()
  const data: Repo[] = await fetcher(REPO_API)
  const repos = data.map(repo => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    homepage: repo.homepage,
  }))
  return (
    <Main className='flex flex-col px-4'>
      <div className='flex flex-grow flex-col'>
        <h1 className='text-center text-2xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10'>
          gh
        </h1>
        <ul className='divide-y divide-cb-dusty-blue'>
          {repos.map(repo => (
            <li key={repo.id} className='flex items-center py-4 first:pt-0'>
              <a
                className='grow text-xl text-cb-pink hover:text-cb-pink/75'
                href={repo.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repo.name}
              </a>
              <a
                className='text-cb-pink hover:text-cb-pink/75'
                href={repo.homepage}
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkIcon className='h-6 w-6' />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  )
}
