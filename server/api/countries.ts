import type { CountryResponse } from '~~/types/country'

export default defineCachedEventHandler(
  async () => {
    const allCountries = await $fetch<CountryResponse[]>(
      'https://restcountries.com/v3.1/all?fields=name,cca3',
    )

    return allCountries.map((country) => ({
      name: country.name.common,
      cca3: country.cca3,
    }))
  },
  {
    maxAge: 60 * 60 * 24, // 1 day,
  },
)
