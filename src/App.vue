<script setup lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import ColourModeToggle from "@/components/ColourModeToggle/ColourModeToggle.vue";
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import { computed, ref } from "vue";

const currentTheme = ref<string>("light");
const showSideBar = ref<boolean>(true);

const logoName = computed(() => {
  return currentTheme.value === "dark" ? "logo-light" : "logo-dark";
});

const changeColourMode = () => {
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  currentTheme.value = newTheme;
};
</script>

<template>
  <div class="app">
    <!-- <Transition name="slide" mode="out-in"> -->
    <div class="app__sidebar" :class="{ 'app__sidebar--hidden': !showSideBar }">
      <div class="app__sidebar-logo">
        <BaseIcon :name="logoName" />
      </div>
      <div class="app__sidebar-menu">
        <SideBar />
      </div>
      <div class="app__sidebar-footer">
        <ColourModeToggle @toggleColourMode="changeColourMode" />
        <div class="app__sidebar-toggle">
          <button
            class="app__sidebar-toggle-btn button-reset"
            aria-label="Hide Sidebar"
            @click="showSideBar = !showSideBar"
          >
            <BaseIcon name="icon-hide-sidebar" />
            <span>Hide Sidebar</span>
          </button>
        </div>
      </div>
    </div>
    <!-- </Transition> -->
    <Transition name="fade" mode="out-in">
      <div v-if="!showSideBar" class="app__show-sidebar">
        <button
          class="app__sidebar-show-sidebar-btn button-reset"
          aria-label="Show Sidebar"
          @click="showSideBar = !showSideBar"
        >
          <BaseIcon name="icon-show-sidebar" />
          <span class="sr-only">Show Sidebar</span>
        </button>
      </div>
    </Transition>

    <main class="app__main" :class="{ 'app__main--collapsed': !showSideBar }">
      <h1>Welcome to the App</h1>
      <p>This is the main content area.</p>
    </main>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;

  &__main {
    flex: 1;
    padding: px_to_rem(24px);
    transition: transform 0.3s ease-out;

    // Default state (sidebar visible)
    transform: translateX(0);

    // Collapsed state (sidebar hidden)
    &--collapsed {
      transform: translateX(-300px); // Matches the sidebar width
    }
  }
}

.app__sidebar {
  width: 300px; // Sidebar width
  background-color: var(--background-color);
  padding: 0 0 px_to_rem(24px) 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  &--hidden {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none; // Prevent interaction when hidden
  }

  &-logo {
    margin-bottom: px_to_rem(20px);
    padding: px_to_rem(24px);
  }

  &-menu {
    margin-bottom: auto;
  }

  &-toggle {
    width: 75%;
    margin: px_to_rem(16px) auto 0 auto;
  }

  &-toggle-btn {
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: px_to_rem(8px);
    color: var(--text-colour-main);
  }

  &-show-sidebar-btn {
    height: px_to_rem(48px);
    width: px_to_rem(56px);
    background-color: var(--main-purple);
    border-top-right-radius: px_to_rem(24px);
    border-bottom-right-radius: px_to_rem(24px);
    position: absolute;
    left: 0;
    bottom: px_to_rem(24px);
    z-index: 1;
  }
}

// Side bar transitions
// .slide-enter-active {
//   transition: all 0.3s ease-out;
//   transition-delay: 0.35s;
// }

// .slide-leave-active {
//   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-enter-from,
// .slide-leave-to {
//   transform: translateX(-100%);
// }

// Toggle button transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-active {
  transition-delay: 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
