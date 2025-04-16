import { REGIONS } from '~/contants/regions'
import { useCountryNames } from '~/stores/countryName'

export const useFilters = () => {
  const router = useRouter()
  const route = useRoute()

  const { countryNames, getCountryNameBySearching } = useCountryNames()

  const search = useRouteQuery('q', '', {
    router,
    route,
  })
  const debouncedSearch = useDebounce(search, 500)

  const region = useRouteQuery('region', '', {
    transform: (value) => REGIONS.find((region) => region.value === value)?.value ?? '',
  })

  const url = computed(() => {
    if (region.value === '') {
      return debouncedSearch.value
        ? `name/${getCountryNameBySearching(debouncedSearch.value)}`
        : 'all'
    } else {
      return `region/${region.value}`
    }
  })

  return {
    search,
    region,
    debouncedSearch,
    getCountryNameBySearching,
    countryNames,
    url,
  }
}
