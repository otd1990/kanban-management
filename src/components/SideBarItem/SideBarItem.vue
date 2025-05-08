<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

interface ISideBarItemProps {
  boardName: string;
  isActive?: boolean;
}

withDefaults(defineProps<ISideBarItemProps>(), {
  isActive: false,
});

defineEmits<{
  (e: "sidebarItemClicked", boardName: string): void;
}>();
</script>

<template>
  <button
    class="sidebar-item button-reset"
    :class="{ 'sidebar-item--is-active': isActive }"
    @click="$emit('sidebarItemClicked', boardName)"
  >
    <div class="sidebar-item__icon">
      <BaseIcon name="icon-board" />
    </div>
    <div class="sidebar-item__name">
      {{ boardName }}
    </div>
  </button>
</template>

<style lang="scss">
.sidebar-item {
  display: flex;
  align-items: center;
  gap: px_to_rem(16px);
  padding: px_to_rem(16px) px_to_rem(20px);
  cursor: pointer;
  color: var(--text-colour-main);
  background-color: transparent;

  &--is-active {
    background-color: var(--main-purple);
    border-top-right-radius: px_to_rem(24px);
    border-bottom-right-radius: px_to_rem(24px);
    width: 100%;
    color: var(--white);
  }

  &__sidebar-item__icon {
    svg {
      color: currentColor;
    }
  }
}
</style>
