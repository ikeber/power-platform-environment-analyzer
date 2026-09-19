<script setup lang="ts">
import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NTag } from 'naive-ui'

import { environments, solutionComparisons } from '@/mocks/solutionMatrix'
import type { SolutionComparison } from '@/models/solutionMatrix'

const columns: DataTableColumns<SolutionComparison> = [
  {
    title: 'Solution',
    key: 'friendlyName',
    minWidth: 220,
    render(row) {
      return h('div', [
        h('div', { style: 'font-weight: 600' }, row.friendlyName),
        h(
          'div',
          {
            style: 'font-size: 12px; opacity: 0.65; font-family: monospace; margin-top: 4px;',
          },
          row.uniqueName,
        ),
      ])
    },
  },

  ...environments.map((environment) => ({
    title: environment.displayName,
    key: environment.id,
    minWidth: 180,

    render(row: SolutionComparison) {
      const solution = row.environments[environment.id]

      if (!solution) {
        return h(
          NTag,
          {
            type: 'error',
            bordered: false,
          },
          {
            default: () => 'Missing',
          },
        )
      }

      return h('div', [
        h('div', { style: 'font-weight: 600' }, solution.version),

        h(
          NTag,
          {
            type: solution.isManaged ? 'info' : 'warning',
            bordered: false,
            size: 'small',
            style: 'margin-top: 6px;',
          },
          {
            default: () => (solution.isManaged ? 'Managed' : 'Unmanaged'),
          },
        ),
      ])
    },
  })),
]
</script>

<template>
  <main class="solution-matrix-view">
    <header class="page-header">
      <div>
        <h1>Environment & Solution Matrix</h1>
        <p>Compare installed solutions across Dataverse environments.</p>
      </div>
    </header>

    <NDataTable
      :columns="columns"
      :data="solutionComparisons"
      :pagination="false"
      :row-key="(row) => row.uniqueName"
      striped
    />
  </main>
</template>

<style scoped>
.solution-matrix-view {
  padding: 32px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
}

.page-header p {
  margin-top: 6px;
  opacity: 0.7;
}
</style>
