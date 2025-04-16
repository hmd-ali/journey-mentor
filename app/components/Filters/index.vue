<script setup lang="ts">
const { search } = useFilters()

const searchLabel = 'Search for a country...'
</script>

<template>
  <div class="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
    <label class="bg-elements relative inline-block w-full max-w-md rounded-md">
      <Icon
        name="ph:magnifying-glass-duotone"
        class="absolute start-4 top-1/2 size-4 -translate-1/2"
      />
      <input
        v-model="search"
        type="text"
        class="peer focus-within:border-b-primary w-full border-b border-b-transparent py-2 ps-8 pe-2 shadow-md outline-none placeholder:opacity-0"
        :placeholder="searchLabel"
      />
      <span
        class="text-primary/30 pointer-events-none absolute start-8 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:start-8 peer-focus:top-0 peer-[:not(:placeholder-shown)]:start-8 peer-[:not(:placeholder-shown)]:top-0"
        >{{ searchLabel }}</span
      >
    </label>

    <div class="flex flex-wrap items-center gap-4">
      <FiltersSortBy />
      <FiltersSortOrder />
      <FiltersRegion />
    </div>
  </div>
</template>
