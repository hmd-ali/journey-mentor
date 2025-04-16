<script setup lang="ts">
import type { Country, CountryResponse } from '~~/types/country'

const { url, sortBy, sortOrder } = useFilters()

const { $api } = useNuxtApp()

const {
  data: countries,
  status,
  error,
} = await useAsyncData<Country[]>(
  async () => {
    const response = await $api<CountryResponse[]>(`${url.value}`)

    return response.map(
      (country): Country => ({
        name: country.name.common,
        flag: country.flags.png,
        flagAlt: country.flags.alt,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] ?? '-',
      }),
    )
  },
  {
    watch: [url],
  },
)

const title = 'Country list'
const description = 'List of countries'
const image = '/preview.jpg'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  ogImage: image,
  twitterImage: image,
  ogUrl: useRuntimeConfig().public.baseURL,
  twitterCard: 'summary_large_image',
})

const sortedCountries = computed(() => {
  if (!countries.value) return []
  const sorted = [...countries.value]
  sorted.sort((a, b) => {
    if (sortBy.value === 'name') {
      return sortOrder.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
    if (sortBy.value === 'population') {
      return sortOrder.value === 'asc' ? a.population - b.population : b.population - a.population
    }
    return 0
  })
  return sorted
})
</script>

<template>
  <div>
    <Filters />
    <div v-if="status === 'pending'" class="flex items-center justify-center py-60">
      <Icon name="svg-spinners:3-dots-move" size="80" />
    </div>
    <div v-else-if="error">error</div>
    <div v-else-if="countries !== undefined && countries.length > 0" class="mt-10">
      <Grid :countries="sortedCountries" />
    </div>
    <div v-else>No Data.</div>
  </div>
</template>
