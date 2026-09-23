<script setup lang="ts">
import { computed, h, ref } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NInput, NSwitch, NTag } from 'naive-ui'

import { environments, solutionComparisons } from '@/mocks/solutionMatrix'
import type { SolutionComparison } from '@/models/solutionMatrix'

const search = ref('')
const differencesOnly = ref(true)

const filteredSolutions = computed(() => {
  const searchText = search.value.trim().toLowerCase()

  return solutionComparisons.filter((row) => {
    const hasDifference =
      row.differences.missing || row.differences.version || row.differences.managedState

    if (differencesOnly.value && !hasDifference) {
      return false
    }

    if (
      searchText &&
      !row.friendlyName.toLowerCase().includes(searchText) &&
      !row.uniqueName.toLowerCase().includes(searchText)
    ) {
      return false
    }

    return true
  })
})

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
    <div class="toolbar">
      <NInput v-model:value="search" placeholder="Search solutions..." clearable />

      <label class="differences-toggle">
        <NSwitch v-model:value="differencesOnly" />
        <span>Differences only</span>
      </label>
    </div>
    <NDataTable
      :columns="columns"
      :data="filteredSolutions"
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
