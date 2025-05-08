<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icons = import.meta.glob("/src/assets/images/*.svg", {
  eager: true,
});

const icon = computed(() => {
  return icons[`/src/assets/images/${props.name}.svg`]?.default;
});
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
