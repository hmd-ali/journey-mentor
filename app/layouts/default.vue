<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div
    class="bg-background text-primary font-nunito_sans min-h-screen transition-colors duration-100 ease-in"
  >
    <header class="bg-elements">
      <div class="container mx-auto px-3 py-4 md:px-5 lg:px-7">
        <div class="flex items-center justify-between">
          <NuxtLink class="text-lg font-extrabold lg:text-2xl" to="/">Where in the world?</NuxtLink>
          <button
            data-test="theme-switch"
            class="flex cursor-pointer items-center gap-x-2"
            @click="toggleTheme"
          >
            <template v-if="theme === 'dark'">
              <Icon name="ph:moon-duotone" class="text-2xl" />
              <span class="text-sm">Dark Mode</span>
            </template>
            <template v-else>
              <Icon name="ph:sun-duotone" class="text-2xl" />
              <span class="text-sm">Light Mode</span>
            </template>
          </button>
        </div>
      </div>
    </header>
    <NuxtLoadingIndicator
      color="var(--color-primary)"
      class="fixed inset-0 z-50"
      :height="4"
      :opacity="0.5"
      :duration="500"
    />
    <div class="container mx-auto px-3 py-10 md:px-5 lg:px-7">
      <slot />
    </div>
  </div>
</template>
