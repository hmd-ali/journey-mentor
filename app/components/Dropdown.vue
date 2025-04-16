<script setup lang="ts" generic="T extends { name: string; value: string }">
defineProps<{
  label: string
  options: T[]
  displayValue: (value: T | null) => string | null
}>()

const value = defineModel<T | null>({
  required: true,
})

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
    <button
      class="bg-elements flex min-w-48 cursor-pointer items-center justify-between gap-x-8 px-4 py-2 text-sm shadow-md"
      :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
      :aria-controls="`${label}-dropdown-list`"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <span>{{ label }}: {{ displayValue(modelValue) }}</span>
      <Icon name="ph:caret-down-bold" size="20" />
    </button>
    <Transition
      enter-from-class="opacity-0 translate-y-2"
      enter-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
      leave-active-class="transition-all duration-200"
    >
      <div
        v-if="isOpen"
        :id="`${label}-dropdown-list`"
        role="listbox"
        class="absolute start-0 top-full z-1 w-full rounded-b-md shadow-md"
      >
        <div class="flex flex-col">
          <label
            v-for="option in options"
            :id="`${label}-dropdown-option-${option.value}`"
            ref="options"
            :key="option.value"
            :aria-selected="option.value === value?.value"
            role="option"
            class="text-primary/50 bg-elements peer-checked:text-primary hover:text-primary/100 has-checked:text-primary/80 flex w-full cursor-pointer items-center justify-between gap-x-8 px-4 py-2 text-left text-lg font-semibold"
            @click="isOpen = false"
          >
            <input v-model="value" type="radio" :value="option" name="region" class="peer hidden" />
            {{ displayValue(option) }}
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>
