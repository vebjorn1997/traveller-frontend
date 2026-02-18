import { z } from 'zod'

// Base API client with error handling and configuration
const API_BASE_URL = 'http://localhost:3001'

interface ApiError {
  message: string
  status?: number
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    schema?: z.ZodSchema<T> // Add optional schema for validation
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error: ApiError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        }
        throw error
      }

      const data = await response.json()
      
      // Validate response if schema provided
      if (schema) {
        return schema.parse(data)
      }
      
      return data as T
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw {
          message: `Validation error: ${error.issues.map((e: any) => e.message).join(', ')}`,
        } as ApiError
      }
      if (error instanceof Error) {
        throw { message: error.message } as ApiError
      }
      throw error
    }
  }

  async get<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, schema)
  }

  async post<T>(endpoint: string, data: unknown, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      schema
    )
  }

  async put<T>(endpoint: string, data: unknown, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      schema
    )
  }

  async delete<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, schema)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)