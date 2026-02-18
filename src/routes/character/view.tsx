import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/character/view')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/character/view"!</div>
}
