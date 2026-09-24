import type { Environment, Solution, SolutionComparison } from '@/models/solutionMatrix'

export const environments: Environment[] = [
  {
    id: 'dev',
    displayName: 'DEV',
    url: 'https://contoso-dev.crm.dynamics.com',
  },
  {
    id: 'test',
    displayName: 'TEST',
    url: 'https://contoso-test.crm.dynamics.com',
  },
  {
    id: 'uat',
    displayName: 'UAT',
    url: 'https://contoso-uat.crm.dynamics.com',
  },
  {
    id: 'prod',
    displayName: 'PROD',
    url: 'https://contoso-prod.crm.dynamics.com',
  },
]

const solutions: Omit<SolutionComparison, 'differences'>[] = [
  {
    uniqueName: 'contoso_core',
    friendlyName: 'Contoso Core',
    environments: {
      dev: {
        solutionId: '11111111-1111-1111-1111-111111111111',
        uniqueName: 'contoso_core',
        friendlyName: 'Contoso Core',
        version: '2.4.0.0',
        isManaged: false,
      },
      test: {
        solutionId: '21111111-1111-1111-1111-111111111111',
        uniqueName: 'contoso_core',
        friendlyName: 'Contoso Core',
        version: '2.4.0.0',
        isManaged: false,
      },
      uat: {
        solutionId: '31111111-1111-1111-1111-111111111111',
        uniqueName: 'contoso_core',
        friendlyName: 'Contoso Core',
        version: '2.4.0.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-1111-1111-1111-111111111111',
        uniqueName: 'contoso_core',
        friendlyName: 'Contoso Core',
        version: '2.4.0.0',
        isManaged: true,
      },
    },
  },

  {
    uniqueName: 'contoso_sales',
    friendlyName: 'Contoso Sales',
    environments: {
      dev: {
        solutionId: '11111111-2222-2222-2222-222222222222',
        uniqueName: 'contoso_sales',
        friendlyName: 'Contoso Sales',
        version: '3.2.0.0',
        isManaged: false,
      },
      test: {
        solutionId: '21111111-2222-2222-2222-222222222222',
        uniqueName: 'contoso_sales',
        friendlyName: 'Contoso Sales',
        version: '3.1.0.0',
        isManaged: false,
      },
      uat: {
        solutionId: '31111111-2222-2222-2222-222222222222',
        uniqueName: 'contoso_sales',
        friendlyName: 'Contoso Sales',
        version: '3.1.0.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-2222-2222-2222-222222222222',
        uniqueName: 'contoso_sales',
        friendlyName: 'Contoso Sales',
        version: '3.1.0.0',
        isManaged: true,
      },
    },
  },

  {
    uniqueName: 'contoso_service',
    friendlyName: 'Contoso Service',
    environments: {
      dev: {
        solutionId: '11111111-3333-3333-3333-333333333333',
        uniqueName: 'contoso_service',
        friendlyName: 'Contoso Service',
        version: '1.5.0.0',
        isManaged: false,
      },
      test: {
        solutionId: '21111111-3333-3333-3333-333333333333',
        uniqueName: 'contoso_service',
        friendlyName: 'Contoso Service',
        version: '1.5.0.0',
        isManaged: true,
      },
      uat: {
        solutionId: '31111111-3333-3333-3333-333333333333',
        uniqueName: 'contoso_service',
        friendlyName: 'Contoso Service',
        version: '1.5.0.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-3333-3333-3333-333333333333',
        uniqueName: 'contoso_service',
        friendlyName: 'Contoso Service',
        version: '1.5.0.0',
        isManaged: true,
      },
    },
  },

  {
    uniqueName: 'contoso_portal',
    friendlyName: 'Contoso Portal',
    environments: {
      dev: {
        solutionId: '11111111-4444-4444-4444-444444444444',
        uniqueName: 'contoso_portal',
        friendlyName: 'Contoso Portal',
        version: '1.8.0.0',
        isManaged: false,
      },
      test: null,
      uat: null,
      prod: null,
    },
  },

  {
    uniqueName: 'contoso_integration',
    friendlyName: 'Contoso Integration',
    environments: {
      dev: null,
      test: {
        solutionId: '21111111-5555-5555-5555-555555555555',
        uniqueName: 'contoso_integration',
        friendlyName: 'Contoso Integration',
        version: '4.0.0.0',
        isManaged: true,
      },
      uat: {
        solutionId: '31111111-5555-5555-5555-555555555555',
        uniqueName: 'contoso_integration',
        friendlyName: 'Contoso Integration',
        version: '4.0.0.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-5555-5555-5555-555555555555',
        uniqueName: 'contoso_integration',
        friendlyName: 'Contoso Integration',
        version: '4.0.0.0',
        isManaged: true,
      },
    },
  },

  {
    uniqueName: 'contoso_reporting',
    friendlyName: 'Contoso Reporting',
    environments: {
      dev: {
        solutionId: '11111111-6666-6666-6666-666666666666',
        uniqueName: 'contoso_reporting',
        friendlyName: 'Contoso Reporting',
        version: '2.1.0.0',
        isManaged: false,
      },
      test: {
        solutionId: '21111111-6666-6666-6666-666666666666',
        uniqueName: 'contoso_reporting',
        friendlyName: 'Contoso Reporting',
        version: '2.0.0.0',
        isManaged: true,
      },
      uat: {
        solutionId: '31111111-6666-6666-6666-666666666666',
        uniqueName: 'contoso_reporting',
        friendlyName: 'Contoso Reporting',
        version: '2.0.0.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-6666-6666-666666666666',
        uniqueName: 'contoso_reporting',
        friendlyName: 'Contoso Reporting',
        version: '1.9.0.0',
        isManaged: true,
      },
    },
  },

  {
    uniqueName: 'contoso_shared',
    friendlyName: 'Contoso Shared Components',
    environments: {
      dev: {
        solutionId: '11111111-7777-7777-7777-777777777777',
        uniqueName: 'contoso_shared',
        friendlyName: 'Contoso Shared Components',
        version: '1.2.3.0',
        isManaged: true,
      },
      test: {
        solutionId: '21111111-7777-7777-7777-777777777777',
        uniqueName: 'contoso_shared',
        friendlyName: 'Contoso Shared Components',
        version: '1.2.3.0',
        isManaged: true,
      },
      uat: {
        solutionId: '31111111-7777-7777-7777-777777777777',
        uniqueName: 'contoso_shared',
        friendlyName: 'Contoso Shared Components',
        version: '1.2.3.0',
        isManaged: true,
      },
      prod: {
        solutionId: '41111111-7777-7777-7777-777777777777',
        uniqueName: 'contoso_shared',
        friendlyName: 'Contoso Shared Components',
        version: '1.2.3.0',
        isManaged: true,
      },
    },
  },
]

// Mock comparison adapter for Stage 1. Production comparison will belong in the API.
export function getSolutionComparisons(environmentIds: readonly string[]): SolutionComparison[] {
  const selectedEnvironments = environments.filter((environment) =>
    environmentIds.includes(environment.id),
  )

  if (selectedEnvironments.length < 2) {
    return []
  }

  return solutions.flatMap((row) => {
    const selectedSolutions = Object.fromEntries(
      selectedEnvironments.map((environment) => [
        environment.id,
        row.environments[environment.id] ?? null,
      ]),
    )
    const presentSolutions = Object.values(selectedSolutions).filter(
      (solution): solution is Solution => solution !== null,
    )

    if (presentSolutions.length === 0) {
      return []
    }

    return [
      {
        uniqueName: row.uniqueName,
        friendlyName: row.friendlyName,
        environments: selectedSolutions,
        differences: {
          missing: presentSolutions.length < selectedEnvironments.length,
          version: new Set(presentSolutions.map((solution) => solution.version)).size > 1,
          managedState: new Set(presentSolutions.map((solution) => solution.isManaged)).size > 1,
        },
      },
    ]
  })
}
