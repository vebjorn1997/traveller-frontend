import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import type { Character } from '@/api/character/types'
import { characterApi } from '@/api/character/character.api'

export const Route = createFileRoute('/character/view/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams() // "id" comes from $id in the path
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    characterApi.getById(id).then((data) => {
      setCharacter(data)
    })
  }, [id])

return (
  <div>
    hello character view $id
    <h1>{character?.name}</h1>
    <p>{character?.strength}</p>
    <p>{character?.dexterity}</p>
    <p>{character?.endurance}</p>
    <p>{character?.intellect}</p>
    <p>{character?.education}</p>
    <p>{character?.social}</p>
  </div>
)
}
