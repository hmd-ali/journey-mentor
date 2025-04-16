export default defineNuxtPlugin(() => {
  const $api = $fetch.create({
    baseURL: 'https://restcountries.com/v3.1/',
  })

  return {
    provide: {
      api: $api,
    },
  }
})
