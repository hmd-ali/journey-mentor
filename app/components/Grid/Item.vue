<script setup lang="ts">
import type { Country } from '~~/types/country'

const props = defineProps<{
  country: Country
}>()
</script>

<template>
  <NuxtLink
    :to="`/${country.name}`"
    class="bg-elements grid-item flex flex-col overflow-hidden rounded-md shadow-md [.hover]:scale-105"
  >
    <NuxtImg
      loading="lazy"
      placeholder
      :src="country.flag"
      :alt="country.flagAlt"
      class="aspect-[4/3] max-h-60 w-full"
    />
    <div class="flex flex-col px-4 pt-3 pb-6">
      <h2 class="line-clamp-2 text-2xl font-bold">{{ country.name }}</h2>
      <div class="mt-4 flex flex-col gap-y-2 text-lg">
        <p class="font-thin">
          <strong class="font-semibold">Population:</strong> {{ country.population }}
        </p>
        <p class="font-thin"><strong class="font-semibold">Region:</strong> {{ country.region }}</p>
        <p class="font-thin">
          <strong class="font-semibold">Capital:</strong> {{ country.capital }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
.vue-recycle-scroller__item-view.hover .grid-item {
  transform: scale(1.05);
  transition: transform 0.2s;
}
</style>
