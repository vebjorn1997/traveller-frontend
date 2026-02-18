import { z } from 'zod'

// Base character schema (matches backend)
export const characterSchema = z.object({
  name: z.string().min(1),
  strength: z.number().min(0),
  dexterity: z.number().min(0),
  endurance: z.number().min(0),
  intellect: z.number().min(0),
  education: z.number().min(0),
  social: z.number().min(0),
})

// Character with optional ID (for responses)
export const characterResponseSchema = characterSchema.extend({
  id: z.string().optional(),
})

// Request schema for creating a character (same as base)
export const createCharacterRequestSchema = characterSchema

// Infer TypeScript types from Zod schemas
export type Character = z.infer<typeof characterResponseSchema>
export type CreateCharacterRequest = z.infer<typeof createCharacterRequestSchema>