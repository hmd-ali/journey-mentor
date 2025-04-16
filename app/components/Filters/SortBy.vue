<script setup lang="ts">
const sortOptions = [
  { name: 'Name', value: 'name' },
  { name: 'Population', value: 'population' },
] as const

const { sortBy } = useFilters()
</script>

<template>
  <Dropdown
    label="Sort By"
    :options="[...sortOptions]"
    :display-value="(value) => value?.name ?? null"
    :model-value="sortOptions.find((o) => o.value === sortBy) ?? null"
    @update:model-value="sortBy = $event?.value ?? 'population'"
  />
</template>
