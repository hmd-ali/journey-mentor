<script setup lang="ts">
import type { Country, CountryResponse } from '~~/types/country'

const { url } = useFilters()

const { $api } = useNuxtApp()

const {
  data: _countries,
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

const countries = computed(() => _countries.value ?? [])
</script>

<template>
  <div>
    <Filters />
    <div v-if="status === 'pending'" class="flex items-center justify-center py-60">
      <Icon name="svg-spinners:3-dots-move" size="80" />
    </div>
    <div v-else-if="error">error</div>
    <div v-else-if="countries !== undefined && countries.length > 0" class="mt-10">
      <Grid :countries />
    </div>
    <div v-else>No Data.</div>
  </div>
</template>
