<script setup lang="ts">
import { REGIONS } from '~/contants/regions'
const { region } = useFilters()

const displayRegion = (value: string | null) =>
  REGIONS.find((r) => r.value === value)?.name ?? 'All'

const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const dropdown = useTemplateRef('dropdown')
onClickOutside(dropdown, () => {
  if (isOpen.value) {
    isOpen.value = false
  }
})
</script>

<template>
  <div ref="dropdown" class="relative">
    <input type="hidden" name="region" :value="region" />
    <button
      class="bg-elements flex w-40 cursor-pointer items-center justify-between gap-x-8 px-4 py-2 shadow-md"
      :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
      @click="toggleDropdown"
    >
      <span>{{ displayRegion(region) }}</span>
      <Icon name="ph:caret-down-bold" size="20" />
    </button>
    <Transition
      enter-from-class="opacity-0 translate-y-2"
      enter-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
      leave-active-class="transition-all duration-200"
    >
      <div v-if="isOpen" class="absolute start-0 top-full z-1 w-full rounded-b-md shadow-md">
        <div class="flex flex-col">
          <label
            v-for="regionItem in REGIONS"
            ref="options"
            :key="regionItem.value"
            class="text-primary/50 bg-elements peer-checked:text-primary flex w-full cursor-pointer items-center justify-between gap-x-8 px-4 py-2 text-left text-lg font-semibold"
            @click="isOpen = false"
          >
            <input
              id="region"
              v-model="region"
              type="radio"
              :value="regionItem.value"
              name="region"
              class="peer hidden"
            />
            {{ regionItem.name }}
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>
