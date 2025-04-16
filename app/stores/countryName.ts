import fuzzysort from 'fuzzysort'

export const useCountryNames = () => {
  const countryNames = useState<
    Array<{
      name: string
      cca3: string
    }>
  >('countryNames', () => [])

  const getCountryNameBySearching = (q: string) => {
    const results = fuzzysort.go(q, countryNames.value, { key: 'name' })
    return results?.[0]?.target || null
  }

  const getNameFromBorder = (cca3: string) =>
    countryNames.value.find((country) => country.cca3.toLowerCase() === cca3.toLowerCase())?.name

  return {
    countryNames,
    getCountryNameBySearching,
    getNameFromBorder,
  }
}
