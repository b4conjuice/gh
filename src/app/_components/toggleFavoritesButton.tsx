import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

import { getFavorites, toggleFavorite } from '@/server/actions'

export default async function ToggleFavoritesButton({
  repoId,
}: {
  repoId: number
}) {
  const favorites = await getFavorites()
  const isFavorite = favorites.includes(repoId)
  return (
    <form
      action={async () => {
        'use server'
        await toggleFavorite(repoId)
      }}
      className='flex items-center'
    >
      <button type='submit' className='group'>
        <SolidHeartIcon
          className={classNames(
            'h-6 w-6 text-cb-pink',
            isFavorite ? 'group-hover:hidden' : 'hidden group-hover:block'
          )}
        />
        <OutlineHeartIcon
          className={classNames(
            'h-6 w-6 text-cb-pink',
            isFavorite ? 'hidden group-hover:block' : 'group-hover:hidden'
          )}
        />
      </button>
    </form>
  )
}
