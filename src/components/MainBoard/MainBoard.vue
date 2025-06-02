<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import type { Board, Task } from "@/interfaces";

interface IMainBoard {
  selectedBoard: Board | undefined;
}

withDefaults(defineProps<IMainBoard>(), {
  selectedBoard: undefined,
});

defineEmits<{
  (e: "taskClicked", task: Task): void;
}>();

const subTaskCompleteCount = (task: {
  subtasks: { isCompleted: boolean }[];
}) => {
  return task.subtasks.filter((subtask) => subtask.isCompleted).length;
};
</script>

<template>
  <div class="main-board" :class="{ 'main-board--empty': !selectedBoard }">
    <div
      v-if="!selectedBoard || !Object.keys(selectedBoard).length"
      class="main-board__empty-state"
    >
      <h3 class="main-board__heading">
        The board is empty. Create new column to get started
      </h3>
      <button class="btn btn--primary button-reset">
        <BaseIcon name="icon-add-task" />
        <span class="main-board__btn-text">+ Add New Task</span>
      </button>
    </div>
    <div v-else>
      <div class="main-board__columns">
        <section
          v-for="board in selectedBoard.columns"
          class="main-board__column"
        >
          <h4 class="main-board__column-name">
            {{ board.name }}
          </h4>
          <button
            v-for="task in board.tasks"
            class="main-board__task button button-reset"
            @click="$emit('taskClicked', task)"
          >
            <h5 class="main-board__task-title">{{ task.title }}</h5>
            <p class="main-board__task-sub-tasks-count">
              {{ subTaskCompleteCount(task) }} of
              {{ task.subtasks.length }} subtasks
            </p>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-board {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: px_to_rem(24px);

  &--empty {
    justify-content: center;
    align-items: center;
  }

  &__heading {
    color: var(--text-colour-main);
    margin-bottom: px_to_rem(24px);
    font-size: px_to_rem(16px);
  }

  &__columns {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    gap: px_to_rem(16px);
  }

  &__column-name {
    text-align: left;
    font-weight: normal;
    color: var(--text-colour-main);
    margin-bottom: px_to_rem(24px);
  }

  &__task {
    min-width: px_to_rem(200px);
    min-height: px_to_rem(88px);

    padding: px_to_rem(16px);
    border-radius: px_to_rem(8px);

    background-color: var(--background-color);

    text-align: left;

    & + & {
      margin-top: px_to_rem(16px);
    }
  }

  &__task-title {
    color: var(--text-dark);
  }

  &__task-sub-tasks-count {
    color: var(--text-colour-main);
    font-size: px_to_rem(12px);
    font-weight: normal;
  }
}
</style>
