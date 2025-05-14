<template>
  <div class="board-nav">
    <h2 class="board-nav__title">
      <span class="board-nav__title-text">{{ boardName }}</span>
    </h2>
    <div class="board-nav__actions">
      <button
        class="board-nav__actions-btn button-reset btn btn--primary"
        :disabled="disableAddTask"
      >
        <BaseIcon name="icon-add-task" />
        <span class="board-nav__actions-text">+ Add New Task</span>
      </button>
      <button class="board-nav__actions-btn button-reset">
        <BaseIcon name="icon-vertical-ellipsis" />
        <span class="board-nav__actions-text sr-only">See more options</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

interface IBoardNavProps {
  boardName?: string;
  disableAddTask?: boolean;
}
withDefaults(defineProps<IBoardNavProps>(), {
  boardName: "Platform Launch",
  disableAddTask: false,
});
</script>
<style lang="scss">
.board-nav {
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: px_to_rem(24px);
  border: 1px solid var(--background-color-lighter);

  &__actions {
    display: flex;
    gap: 1rem;
  }
  § &__actions-text {
    font-size: px_to_rem(12px);
  }

  &__actions-btn {
    display: flex;
    align-items: center;
  }
}
</style>
