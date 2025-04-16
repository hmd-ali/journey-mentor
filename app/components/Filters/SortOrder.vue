<script setup lang="ts">
const sortOrderOptions = [
  { name: 'Ascending', value: 'asc' },
  { name: 'Descending', value: 'desc' },
] as const

const { sortOrder } = useFilters()
</script>

<template>
  <Dropdown
    label="Sort By"
    :options="[...sortOrderOptions]"
    :display-value="(value) => value?.name ?? null"
    :model-value="sortOrderOptions.find((o) => o.value === sortOrder) ?? null"
    @update:model-value="sortOrder = $event?.value ?? 'asc'"
  />
</template>
