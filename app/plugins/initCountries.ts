import { useCountryNames } from '~/stores/countryName'

export default defineNuxtPlugin(async () => {
  const { countryNames } = useCountryNames()

  await useAsyncData(async () => {
    countryNames.value = await $fetch('/api/countries')
    return true
  })
})
