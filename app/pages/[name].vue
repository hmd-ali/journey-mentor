<script setup lang="ts">
import { useCountryNames } from '~/stores/countryName'
import type { CountryResponse, CountryWithDetails } from '~~/types/country'

const route = useRoute()
const { $api } = useNuxtApp()

const { getNameFromBorder } = useCountryNames()

const {
  data: country,
  status,
  error,
} = await useAsyncData<CountryWithDetails | null, { message: string; status: number }>(
  `country-name/${route.params.name}`,
  async () => {
    const response = await $api<CountryResponse[]>(`name/${route.params.name}`)
    const country = response?.[0]
    if (!country) {
      return null
    }
    return {
      name: country.name.common,
      nativeName: Object.values(country.name.nativeName)[0]?.common ?? country.name.common,
      flag: country.flags.svg,
      flagAlt: country.flags.alt,
      population: country.population,
      region: country.region,
      capital: country.capital?.[0] ?? '-',
      subRegion: country.subregion ?? '-',
      languages: Object.values(country.languages),
      borders: country.borders,
      currencies: Object.values(country.currencies).map((currency) => currency.name),
      topLevelDomain: country.tld,
      ogImage: country.flags.png,
    } satisfies CountryWithDetails
  },
)

const title = computed(() => country.value?.name)
const description = computed(
  () =>
    `Population: ${country.value?.population}, Region: ${country.value?.region}, Capital: ${country.value?.capital}`,
)
const image = computed(() => country.value?.ogImage)

useSeoMeta({
  title: title.value,
  ogTitle: title.value,
  twitterTitle: title.value,
  titleTemplate: 'Country Details | %s',
  description: description.value,
  ogDescription: description.value,
  twitterDescription: description.value,
  ogImage: image.value,
  twitterImage: image.value,
  twitterCard: 'summary_large_image',
  ogUrl: useRuntimeConfig().public.baseURL + route.path,
})
</script>

<template>
  <div class="container mx-auto px-3 pt-10 pb-20 md:px-5 lg:px-7">
    <div>
      <NuxtLink
        to="/"
        class="bg-elements inline-flex cursor-pointer items-center gap-x-2 rounded-md px-4 py-2 shadow-md transition-transform hover:scale-105"
      >
        <Icon name="ph:arrow-left-duotone" class="inline-block size-5" />
        Back
      </NuxtLink>
    </div>
    <div v-if="status === 'pending'" class="flex items-center justify-center py-60">
      <Icon name="svg-spinners:3-dots-move" size="80" />
    </div>
    <div v-else-if="error" class="flex w-full flex-col items-center gap-y-2 py-40 text-lg">
      <p class="text-red-500">
        {{ error?.data?.status }}
      </p>
      <p class="text-red-500">
        {{ error?.toJSON().data?.message }}
      </p>
    </div>
    <div
      v-else-if="country"
      class="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20"
    >
      <NuxtImg
        placeholder
        class="aspect-[4/3] flex-1 object-cover"
        :src="country.flag"
        :alt="country.flagAlt"
        width="400"
        height="300"
      />
      <div class="flex flex-1 flex-col gap-y-8">
        <h1 class="mb-6 text-xl font-extrabold">{{ country.name }}</h1>
        <div class="lg:flex lg:w-max lg:shrink-0 lg:gap-x-20">
          <div class="flex flex-col gap-y-2">
            <LabelValue label="Native Name" :value="country.nativeName" />
            <LabelValue label="Population" :value="formatNumber(country.population)" />
            <LabelValue label="Region" :value="country.region" />
            <LabelValue label="Sub Region" :value="country.subRegion" />
            <LabelValue label="Capital" :value="country.capital" />
          </div>
          <div class="flex flex-col gap-y-2">
            <LabelValue label="Top Level Domain" :value="country.topLevelDomain.join(', ')" />
            <LabelValue label="Currencies" :value="country.currencies.join(', ')" />
            <LabelValue label="Languages" :value="country.languages.join(', ')" />
          </div>
        </div>
        <div>
          <dl class="flex flex-wrap gap-4">
            <dt class="inline-block font-bold">Border Countries:</dt>
            <dt
              v-for="border in country.borders"
              :key="border"
              class="inline-block transition-transform duration-200 hover:scale-105"
            >
              <NuxtLink
                class="bg-elements rounded-md px-4 py-2 shadow-md"
                :to="`/${getNameFromBorder(border)}`"
              >
                {{ getNameFromBorder(border) }}
              </NuxtLink>
            </dt>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
