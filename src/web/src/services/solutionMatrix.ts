import type { Environment, SolutionComparison } from '@/models/solutionMatrix'

async function requestJson<T>(url: string, options: RequestInit, errorMessage: string): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json() as Promise<T>
}

export function getEnvironments(signal?: AbortSignal): Promise<Environment[]> {
  return requestJson('/api/environments', { signal }, 'Unable to load environments. Please try again.')
}

export function getSolutionComparisons(
  environmentIds: readonly string[],
  signal?: AbortSignal,
): Promise<SolutionComparison[]> {
  return requestJson(
    '/api/comparisons/solutions',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ environmentIds }),
      signal,
    },
    'Unable to load the comparison. Please try again.',
  )
}
