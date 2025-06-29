<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Task } from "@/interfaces";
import BaseIcon from "../BaseIcon/BaseIcon.vue";

interface ITaskModal {
  task: Task | null;
}

const props = withDefaults(defineProps<ITaskModal>(), {
  task: null,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const showActions = ref(false);

const toggleActions = () => (showActions.value = !showActions.value);

const handleClose = () => {
  emit("close");
  showActions.value = false;
};

const subTaskCompleteCount = computed(() => {
  return (
    props.task?.subtasks.filter((subtask) => subtask.isCompleted).length || 0
  );
});
</script>

<template>
  <div class="task-modal">
    <div class="task-modal__inner">
      <div class="task-modal__header">
        <h5 class="task-modal__title">{{ task?.title }}</h5>
        <button
          @click="toggleActions"
          class="task-modal__close-btn button-reset"
        >
          <BaseIcon name="icon-vertical-ellipsis" />
        </button>
        <div v-if="showActions" class="task-modal__actions">
          <button class="task-modal__action-btn button-reset">
            Edit Task --- {{ showActions }}
          </button>
          <button
            class="task-modal__action-btn task-modal__action-btn--delete button-reset"
          >
            Delete Task
          </button>
          <button
            @click="handleClose"
            class="task-modal__action-btn task-modal__action-btn--close button-reset"
          >
            Close Modal
          </button>
        </div>
      </div>
      <div class="task-modal__body">
        <p v-if="task?.description.length" class="task-modal__description">
          {{ task?.description }}
        </p>
        <p class="task-modal__subtask-count">
          Subtaks ({{ subTaskCompleteCount }} of {{ task?.subtasks.length }})
        </p>
        <div class="task-modal__subtasks">
          <ul class="task-modal__subtask-list">
            <li
              v-for="(subtask, index) in task?.subtasks"
              :key="index"
              class="task-modal__subtask-list-item"
            >
              <input type="checkbox" :checked="subtask.isCompleted" />
              <span>{{ subtask.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.task-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;

  &__inner {
    background-color: var(--background-color);
    border-radius: 8px;
    padding: px_to_rem(24px);
    width: 90%;
    max-width: 480px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: px_to_rem(16px);
    position: relative;
  }

  &__actions {
    position: absolute;
    right: -225px;
    top: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    background-color: white;
    padding: px_to_rem(8px);
    max-width: px_to_rem(192px);
    width: 100%;
    border-radius: px_to_rem(8px);
  }

  &__action-btn {
    background-color: transparent;
    text-align: left;
    color: var(--text-colour-main);

    & + & {
      margin-top: px_to_rem(8px);
    }
  }

  &__action-btn--delete {
    color: var(--red);
  }

  &__action-btn--close {
    color: var(--text-dark);
  }

  &__title {
    font-size: px_to_rem(20px);
    color: var(--text-dark);
  }

  &__subtask-count,
  &__description {
    color: var(--text-colour-main);
    margin-bottom: px_to_rem(8px);
  }

  &__description {
    font-size: px_to_rem(14px);
  }

  &__subtask-count {
    font-size: px_to_rem(12px);
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>
