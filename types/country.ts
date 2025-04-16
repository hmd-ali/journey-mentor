export type Country = {
  name: string
  flag: string
  flagAlt: string
  population: number
  capital: string
  region: string
}

export type CountryResponse = {
  name: {
    common: string
    nativeName: Record<string, { common: string }>
  }
  capital: string[]
  region: string
  population: number
  flags: {
    alt: string
    png: string
    svg: string
  }
  tld: string[]
  currencies: Record<string, { name: string }>
  subregion?: string
  languages: Record<string, string>
  borders: string[]
  cca3: string
}

export type CountryWithDetails = Country & {
  nativeName: string
  subRegion: string
  topLevelDomain: string[]
  currencies: string[]
  languages: string[]
  borders: string[]
}
