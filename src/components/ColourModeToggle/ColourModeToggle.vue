<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

defineEmits<{
  (e: "toggleColourMode"): void;
}>();
</script>

<template>
  <div class="colour-mode-toggle">
    <div class="colour-mode-toggle__icon-light">
      <BaseIcon name="icon-light-theme" />
    </div>
    <div classs="colour-mode-toggle__icon-toggle">
      <label for="toggle" class="colour-mode-toggle__switch">
        <input
          type="checkbox"
          id="toggle"
          class="colour-mode-toggle__switch-checkbox"
          @change="$emit('toggleColourMode')"
        />
        <span class="colour-mode-toggle__slider"></span>
      </label>
    </div>
    <div class="colour-mode-toggle__icon-dark">
      <BaseIcon name="icon-dark-theme" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.colour-mode-toggle {
  background-color: var(--background-color-lighter);
  margin: 0 auto;
  width: 75%;
  min-height: px_to_rem(48px);
  border-radius: px_to_rem(6px);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: px_to_rem(16px);

  &__switch {
    position: relative;
    display: inline-block;
    width: px_to_rem(40px);
    height: px_to_rem(20px);
  }

  &__switch-checkbox {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .colour-mode-toggle__slider {
      background-color: var(--main-purple);
    }

    &:checked + .colour-mode-toggle__slider:before {
      -webkit-transform: translateX(22px);
      -ms-transform: translateX(22px);
      transform: translateX(22px);
    }
  }

  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    border-radius: px_to_rem(34px);

    &:before {
      position: absolute;
      content: "";
      height: px_to_rem(12px);
      width: px_to_rem(12px);
      left: px_to_rem(4px);
      bottom: px_to_rem(4px);
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
}
</style>
