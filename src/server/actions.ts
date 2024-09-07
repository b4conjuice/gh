import { revalidatePath } from 'next/cache'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function getFavorites() {
  const user = auth()

  if (!user.userId) return []

  const fullUser = await clerkClient.users.getUser(user.userId)

  const favorites = (fullUser.privateMetadata.favorites as number[]) ?? []

  return favorites
}

export async function toggleFavorite(repoId: number) {
  const user = auth()

  if (!user.userId) throw new Error('unauthorized')

  const fullUser = await clerkClient.users.getUser(user.userId)

  const favorites = (fullUser.privateMetadata.favorites as number[]) ?? []

  const isFavorite = favorites.find(f => f === repoId)

  const newFavorites = isFavorite
    ? favorites.filter(f => f !== repoId)
    : [...favorites, repoId]

  await clerkClient.users.updateUserMetadata(user.userId, {
    privateMetadata: {
      favorites: newFavorites,
    },
  })

  revalidatePath('/')
}
