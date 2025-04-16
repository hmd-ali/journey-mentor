// ['Africa', 'America', 'Oceania', 'Europe', 'Asia', 'All']

export const REGIONS = [
  { name: 'Africa', value: 'africa' },
  { name: 'Asia', value: 'asia' },
  { name: 'Europe', value: 'europe' },
  { name: 'Oceania', value: 'oceania' },
  { name: 'America', value: 'americas' },
  { name: 'All', value: '' },
]

export type Region = (typeof REGIONS)[number]
