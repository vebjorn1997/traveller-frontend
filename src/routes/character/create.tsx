import { useAppForm } from '@/hooks/form'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { characterApi } from '@/api/character/character.api'

import { z } from 'zod'

export const Route = createFileRoute('/character/create')({
  component: RouteComponent,
})

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  str: z.number().min(0, 'Strength score is required'),
  dex: z.number().min(0, 'Dexterity score is required'),
  end: z.number().min(0, 'Endurance score is required'),
  int: z.number().min(0, 'Intelligence score is required'),
  edu: z.number().min(0, 'Education score is required'),
  soc: z.number().min(0, 'Social score is required'),
})

function RouteComponent() {
  const router = useRouter()
  const form = useAppForm({
    defaultValues: {
      name: '',
      str: 7,
      dex: 7,
      end: 7,
      int: 7,
      edu: 7,
      soc: 7,
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        const characterData = {
          name: value.name,
          strength: value.str,
          dexterity: value.dex,
          endurance: value.end,
          intellect: value.int,
          education: value.edu,
          social: value.soc,
        }
        
        await characterApi.create(characterData)
        
        // router.navigate({ to: '/character/view' })
      } catch (error) {
        console.error('Failed to create character:', error)
        alert('Failed to create character. Please try again.')
      }
    }
  })

  return (
    <div className='mx-10 my-6'>
      <h1>Create Character</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.AppField name="name">
          {(field) => <field.TextField label="Name" />}
        </form.AppField>
        <form.AppField name="str">
          {(field) => <field.ColorSlider label={`Strength ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppField name="dex">
          {(field) => <field.ColorSlider label={`Dexterity ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppField name="end">
          {(field) => <field.ColorSlider label={`Endurance ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppField name="int">
          {(field) => <field.ColorSlider label={`Intelligence ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppField name="edu">
          {(field) => <field.ColorSlider label={`Education ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppField name="soc">
          {(field) => <field.ColorSlider label={`Social ${field.state.value}`} max={18} />}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton label="Create Character" />
        </form.AppForm>
      </form>
    </div>
  )
}
