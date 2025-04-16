<script setup lang="ts">
import { REGIONS } from '~/constants/regions'
const { region } = useFilters()
</script>

<template>
  <Dropdown
    :model-value="REGIONS.find((r) => r.value === region) ?? { name: 'All', value: '' }"
    label="Region"
    :options="REGIONS"
    :display-value="(value) => value?.name ?? 'All'"
    @update:model-value="region = $event?.value ?? ''"
  />
</template>
