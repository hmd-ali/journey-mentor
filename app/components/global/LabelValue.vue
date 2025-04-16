<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <dl class="flex items-center gap-x-2">
    <dt class="font-bold">{{ label }}:</dt>
    <dd>{{ value }}</dd>
  </dl>
</template>
