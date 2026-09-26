<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NInput, NSwitch, NTag } from 'naive-ui'

import { getEnvironments, getSolutionComparisons } from '@/services/solutionMatrix'
import type { Environment, SolutionComparison } from '@/models/solutionMatrix'

const search = ref('')
const differencesOnly = ref(true)
const environments = ref<Environment[]>([])
const selectedEnvironmentIds = ref<string[]>([])
const solutionComparisons = ref<SolutionComparison[]>([])
const loadingEnvironments = ref(true)
const loadingComparison = ref(false)
const environmentError = ref('')
const comparisonError = ref('')
let environmentRequest: AbortController | undefined
let comparisonRequest: AbortController | undefined

const selectedEnvironments = computed(() =>
  environments.value.filter((environment) => selectedEnvironmentIds.value.includes(environment.id)),
)
const canCompare = computed(() => selectedEnvironments.value.length >= 2)

async function loadEnvironments() {
  environmentRequest?.abort()
  const request = new AbortController()
  environmentRequest = request
  loadingEnvironments.value = true
  environmentError.value = ''

  try {
    const result = await getEnvironments(request.signal)
    if (request.signal.aborted) return
    environments.value = result
    selectedEnvironmentIds.value = result.slice(0, 2).map((environment) => environment.id)
  } catch {
    if (!request.signal.aborted) {
      environmentError.value = 'Unable to load environments. Please try again.'
    }
  } finally {
    if (!request.signal.aborted) loadingEnvironments.value = false
  }
}

async function loadComparison() {
  comparisonRequest?.abort()
  solutionComparisons.value = []
  comparisonError.value = ''
  loadingComparison.value = false
  if (!canCompare.value) return

  const request = new AbortController()
  comparisonRequest = request
  loadingComparison.value = true

  try {
    const result = await getSolutionComparisons([...selectedEnvironmentIds.value], request.signal)
    if (!request.signal.aborted) solutionComparisons.value = result
  } catch {
    if (!request.signal.aborted) {
      comparisonError.value = 'Unable to load the comparison. Please try again.'
    }
  } finally {
    if (!request.signal.aborted) loadingComparison.value = false
  }
}

watch(selectedEnvironmentIds, loadComparison)
onMounted(loadEnvironments)
onBeforeUnmount(() => {
  environmentRequest?.abort()
  comparisonRequest?.abort()
})

const filteredSolutions = computed(() => {
  const searchText = search.value.trim().toLowerCase()

  return solutionComparisons.value.filter((row) => {
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

const columns = computed<DataTableColumns<SolutionComparison>>(() => [
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

  ...selectedEnvironments.value.map((environment) => ({
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
])
</script>

<template>
  <main class="solution-matrix-view">
    <header class="page-header">
      <div>
        <h1>Environment & Solution Matrix</h1>
        <p>Compare installed solutions across Dataverse environments.</p>
        <p>Showing sample data.</p>
      </div>
    </header>
    <p v-if="loadingEnvironments" role="status">Loading environments...</p>
    <div v-else-if="environmentError" role="alert">
      <p>{{ environmentError }}</p>
      <button type="button" @click="loadEnvironments">Retry loading environments</button>
    </div>
    <fieldset
      v-if="!loadingEnvironments && !environmentError"
      class="environment-selection"
      aria-describedby="environment-selection-help"
    >
      <legend>Environments</legend>
      <div class="environment-options">
        <label v-for="environment in environments" :key="environment.id">
          <input v-model="selectedEnvironmentIds" type="checkbox" :value="environment.id" />
          {{ environment.displayName }}
        </label>
      </div>
      <p id="environment-selection-help">Select two or more environments to compare.</p>
    </fieldset>
    <div v-if="!loadingEnvironments && !environmentError" class="toolbar">
      <NInput
        v-model:value="search"
        placeholder="Search solutions..."
        :disabled="!canCompare"
        clearable
      />

      <label class="differences-toggle">
        <NSwitch v-model:value="differencesOnly" :disabled="!canCompare" />
        <span>Differences only</span>
      </label>
    </div>
    <p v-if="!loadingEnvironments && !environmentError && !canCompare" role="status">
      {{ environments.length < 2 ? 'At least two environments must be available to compare.' : 'Choose at least two environments to view the comparison.' }}
    </p>
    <p v-else-if="loadingComparison" role="status">Loading comparison...</p>
    <div v-else-if="comparisonError" role="alert">
      <p>{{ comparisonError }}</p>
      <button type="button" @click="loadComparison">Retry comparison</button>
    </div>
    <NDataTable
      v-else-if="canCompare && !loadingEnvironments && !environmentError"
      :columns="columns"
      :data="filteredSolutions"
      :pagination="false"
      :row-key="(row) => row.uniqueName"
      :scroll-x="220 + selectedEnvironments.length * 180"
      striped
    >
      <template #empty>No solutions match the current selection and filters.</template>
    </NDataTable>
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

.environment-selection {
  margin: 0 0 24px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.environment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.environment-options label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.environment-selection p {
  margin: 12px 0 0;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.toolbar > .n-input {
  flex: 1 1 220px;
}

.differences-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
