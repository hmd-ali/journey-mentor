<script setup lang="ts">
import type { Country } from '~~/types/country'
import { breakpointsTailwind } from '@vueuse/core'

const scroller = useTemplateRef<{ $el: Element }>('scroller')
const { active } = useBreakpoints(breakpointsTailwind)

defineProps<{
  countries: Country[]
}>()

const width = useState(() => 0)

const styles = computed(() => {
  switch (currentBreakpoint.value) {
    case '':
      return {
        gridItems: 1,
        itemSize: 500,
      }
    case 'sm':
    case 'md':
      return {
        gridItems: 2,
        itemSize: 450,
      }
    case 'lg':
      return {
        gridItems: 3,
        itemSize: 500,
      }
    case 'xl':
      return {
        gridItems: 4,
        itemSize: 450,
      }
    case '2xl':
    default:
      return {
        gridItems: 5,
        itemSize: 450,
      }
  }
})

useEventListener('resize', () => {
  if (scroller.value) {
    console.log('elementWidth', scroller.value.$el.getBoundingClientRect().width)
    width.value = scroller.value.$el.getBoundingClientRect().width / styles.value.gridItems
  }
})

onMounted(() => {
  if (scroller.value) {
    width.value = scroller.value.$el.getBoundingClientRect().width / styles.value.gridItems
  }
})

const currentBreakpoint = active()
</script>

<template>
  <RecycleScroller
    ref="scroller"
    class="container mx-auto"
    :items="countries"
    :item-size="styles.itemSize"
    :item-secondary-size="width"
    :grid-items="styles.gridItems"
    key-field="name"
    page-mode
    list-class="w-full h-0"
    item-class="w-full flex"
  >
    <template #default="{ item, index }: { item: Country; index: number }">
      <div :key="`${item.name}-${index}`" class="grow p-2">
        <GridItem :key="`${item.name}-${index}`" class="h-full" :country="item" />
      </div>
    </template>
  </RecycleScroller>
</template>
