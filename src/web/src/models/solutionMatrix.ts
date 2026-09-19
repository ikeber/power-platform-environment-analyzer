export interface Environment {
  id: string
  displayName: string
  url: string
}

export interface Solution {
  solutionId: string
  uniqueName: string
  friendlyName: string
  version: string
  isManaged: boolean
}

export interface SolutionDifferences {
  missing: boolean
  version: boolean
  managedState: boolean
}

export interface SolutionComparison {
  uniqueName: string
  friendlyName: string
  environments: Record<string, Solution | null>
  differences: SolutionDifferences
}
