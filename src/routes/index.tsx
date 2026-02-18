import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='mx-10 my-6'>
      <div className='grid grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Create Character -- form</CardTitle>
          <CardDescription>Create a new character</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button className='w-full' asChild>
            <Link to='/character/create'>Create Character</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>View Characters -- table</CardTitle>
          <CardDescription>View all characters</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button className='w-full' asChild>
            <Link to='/character/view'>View Characters</Link>
          </Button>
        </CardFooter>
        </Card>
      </div>
    </div>
  )
}
