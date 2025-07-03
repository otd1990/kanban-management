<script setup lang="ts">
interface ISubTaskItemProps {
  isComplete: boolean;
  taskTitle: string;
}

withDefaults(defineProps<ISubTaskItemProps>(), {
  isComplete: false,
  taskTitle: "",
});
</script>

<template>
  <li class="sub-task-item">
    <label class="sub-task-item__label">
      <input
        class="sub-task-item__checkbox"
        type="checkbox"
        :checked="isComplete"
      />
      <span class="sub-task-item__hidden-checkbox"></span>

      <span class="sub-task-item__label-text">{{ taskTitle }}</span>
    </label>
  </li>
</template>

<style lang="scss">
.sub-task-item {
  background-color: var(--background-color-lighter);
  padding: 1rem;
  border-radius: px_to_rem(6px);
  & + & {
    margin-top: px_to_rem(10px);
  }

  &__hidden-checkbox {
    border: 1px solid #e7eaee;
    height: px_to_rem(15px);
    width: px_to_rem(15px);
    background-color: white;
    display: block;
    border-radius: px_to_rem(2px);
  }

  &__checkbox {
    &:checked ~ .sub-task-item__hidden-checkbox {
      background-color: red;
    }
  }
}
</style>
