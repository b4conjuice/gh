import { unstable_noStore as noStore } from 'next/cache'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { SignedIn } from '@clerk/nextjs'

import Main from '@/app/_components/main'
import fetcher from '@/lib/fetcher'
import ToggleFavoritesButton from './_components/toggleFavoritesButton'
import { getFavorites } from '@/server/actions'

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
  const favorites = await getFavorites()
  const repos = data.map(repo => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    homepage: repo.homepage,
  }))
  // .sort((a, b) => {
  //   const aIsFavorite = favorites.includes(a.id)
  //   const bIsFavorite = favorites.includes(b.id)
  //   if (aIsFavorite && !bIsFavorite) return -1
  //   if (!aIsFavorite && bIsFavorite) return 1
  //   return 0
  // })
  const favoriteRepos = favorites
    .map(id => repos.find(repo => repo.id === id))
    .filter(repo => repo !== undefined)
  const otherRepos = repos.filter(repo => !favorites.includes(repo.id))

  return (
    <ul className='divide-y divide-cb-dusty-blue'>
      {[...(favoriteRepos ?? []), ...(otherRepos ?? [])].map(repo => (
        <li key={repo.id} className='flex items-center py-4 first:pt-0'>
          <span className='flex grow gap-3'>
            <a
              className='text-cb-pink hover:text-cb-pink/75'
              href={repo.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {repo.name}
            </a>
            <SignedIn>
              <ToggleFavoritesButton repoId={repo.id} />
            </SignedIn>
          </span>
          {repo.homepage && (
            <a
              className='flex space-x-1 text-cb-pink hover:text-cb-pink/75'
              href={repo.homepage}
              target='_blank'
            >
              <span>{repo.homepage.replace('https://', '')}</span>
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
