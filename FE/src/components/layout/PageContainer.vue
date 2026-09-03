<script setup>
defineProps({
  narrow: { type: Boolean, default: false },
})
</script>

<template>
  <div class="container-page py-10" :class="narrow ? 'max-w-[640px]!' : ''">
    <slot />
  </div>
</template>
