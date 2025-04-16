import { REGIONS } from '~/constants/regions'
import { useCountryNames } from '~/stores/countryName'

export const useFilters = () => {
  const router = useRouter()
  const route = useRoute()

  const { countryNames, getCountryNameBySearching } = useCountryNames()

  const search = useRouteQuery<string>('q', '', {
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

  const sortBy = useRouteQuery<'name' | 'population'>('sort_by', 'population', {
    transform: (value) => (['population', 'name'].includes(value) ? value : 'population'),
  })

  const sortOrder = useRouteQuery<'asc' | 'desc'>('sort_order', 'desc', {
    transform: (value) => (['asc', 'desc'].includes(value) ? value : 'desc'),
  })

  return {
    search,
    region,
    sortBy,
    sortOrder,
    debouncedSearch,
    getCountryNameBySearching,
    countryNames,
    url,
  }
}
