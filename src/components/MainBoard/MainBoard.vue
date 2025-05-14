<template>
  <div class="main-board">
    <h3 class="main-board__heading">
      The board is empty. Create new column to get started
    </h3>
    <button class="btn btn--primary button-reset">
      <BaseIcon name="icon-add-task" />
      <span class="main-board__btn-text">+ Add New Task</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import type { Board } from "@/interfaces";

interface IMainBoard {
  boards: Board[];
}

withDefaults(defineProps<IMainBoard>(), {
  boards: () => [],
});
</script>
<style lang="scss">
.main-board {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: px_to_rem(24px);

  &__heading {
    color: var(--text-colour-main);
    margin-bottom: px_to_rem(24px);
    font-size: px_to_rem(16px);
  }
}
</style>
