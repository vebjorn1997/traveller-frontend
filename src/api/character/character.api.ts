import { apiClient } from '../client'
import {
  characterResponseSchema,
  createCharacterRequestSchema,
  type Character,
  type CreateCharacterRequest,
} from './types'

import { z } from 'zod'

export const characterApi = {
  /**
   * Create a new character
   */
  create: async (data: CreateCharacterRequest): Promise<Character> => {
    // Validate request data before sending
    const validatedData = createCharacterRequestSchema.parse(data)
    
    // Validate response from server
    return apiClient.post<Character>(
      '/api/characters/create',
      validatedData,
      characterResponseSchema // Validate the response
    )
  },

  /**
   * Get all characters
   */
  getAll: async (): Promise<Character[]> => {
    // Validate array of characters in response
    return apiClient.get<Character[]>(
      '/api/characters/get-all',
      z.array(characterResponseSchema) // Validate array response
    )
  },
}