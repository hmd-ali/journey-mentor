# Journey Mentor Challenge

## Live Demo

The live demo can be accessed [here](https://journey-mentor-challenge.netlify.app/)

## The stack

- Vue3/Nuxt
- Tailwindcss

## Project Structure

```├── README.md
├── app
│   ├── app.vue // The App entry point, renders the layout and the pages
│   ├── assets // Contains the assets like images or css files.
│   ├── components
│   ├── composables
│   ├── constants
│   ├── layouts // Contain the layouts used on the site, uses `<slot />` to render the pages
│   ├── pages // The different pages available for navigation
│   ├── plugins // Code in here runs on app startup
│   ├── stores // global stores to manage state
│   ├── tests
│   └── utils // reusable functions
├── eslint.config.mjs
├── netlify.toml
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   └── robots.txt
├── server
│   ├── api
│   └── tsconfig.json
├── structure.md
├── tsconfig.json
├── types
│   ├── country.ts
│   └── vue-virtual-scroller.d.ts
└── vitest.config.ts
```

## Server Folder

I'm using the server folder to create a single endpoint that gets all the countries from the api, saved their name in order to implement the fuzzy sort ("Bonus: Searching using the keywords Grmany or Grmny should also work"). I've also saved the `cca3` field which is returned when querying a country, which is used in the `borders` field. This way I can link the `cca3` field with the country's `name`. This endpoint is cached for 1 day.

## Home page

When the visits this page they will see all the available countries, sorted by default by `population`. They can filter the view by using the text input to search by `name` or using the filter buttons to filter by `region` and/or change the sorting fields and `sorting order`. The search input is `debounced`.

All of the filters are linked with the `query params`, which shows in the url if the value is `different` than the filters' respective `default` values

I'm using `vue-virtual-scroller` to render the list of countries dynamically without cluttering the `DOM`, meaning that the elements are present in the DOM when they're in the viewport.

For the `theme switcher`, I'm saving the current theme in a `cookie` in order to preserve it on `page reload`. When toggling the theme, a `class` is set to the document element (`html` element) representing the current theme, and I'm using that class alongside `css variables` to handle the color changes.

## Details page

The details page expects a `name` param (`/:name`). It retrieves the relevant country's data using the endpoint `/name/{name}`

In the details pages, there's the country's info alongside it's border countries, which are `NuxtLink`s to those respective countries. As mentioned above, I'm getting the country name based on the border string (cca3).

## Fonts and Icons

I'm using the [NuxtFonts](https://fonts.nuxt.com/) module for using the fonts (it's really cool you should check it out!). It basically is the best solution for font optimization/caching and are automatically downloaded locally for production.

For the Icons I went with [NuxtIcon](https://github.com/nuxt/icon) module, which is built on top on [Iconify](https://iconify.design/), an open source library containing A LOT of icon [collections](https://icon-sets.iconify.design/) including stuff like `FontAwesome` or `Google Material Icons`
It's extremely easy to use and the icons are highly customizable (size,color). I went the [Phosphor](https://icon-sets.iconify.design/ph/?keyword=ph) collection.

## Plugins folder

### api.ts

Here is the code for a custom `$fetch` wrapper, exposed to the app as `$api`, which I'm using in this project to change the `baseUrl` to be `'https://restcountries.com/v3.1/'`. In turn, I'm using `$api` in the `useApi` composable, Tho I'm not using that composable in the codebase.

### initCountries.ts

Here I'm fetching the country array using the endpoint from the `/server` folder to pre-populate the state in the global store. This way it will be available on app start.

### virtualScroller.ts

Installs the virtual scroller library as plugin in the nuxt app.

## Constants folder

I'm using it to store the different regions available (based on the dropdown menu from the design), since those weren't available to get from the API
