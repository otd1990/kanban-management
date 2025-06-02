<script setup lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import ColourModeToggle from "@/components/ColourModeToggle/ColourModeToggle.vue";
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import BoardNav from "@/components/BoardNav/BoardNav.vue";
import MainBoard from "./components/MainBoard/MainBoard.vue";
import TaskModal from "@/components/TaskModal/TaskModal.vue";
// Data
import data from "../data.json";
// Vue
import { computed, ref } from "vue";
import type { Task } from "./interfaces";

const currentTheme = ref<string>("light");
const showSideBar = ref<boolean>(true);
const selectedTask = ref<Task | null>(null);
const showTaskModal = ref<boolean>(false);

const logoName = computed(() => {
  return currentTheme.value === "dark" ? "logo-light" : "logo-dark";
});

const changeColourMode = () => {
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  currentTheme.value = newTheme;
};

const selectedBoard = ref();

const updateSelectedBoard = (boardName: string) => {
  selectedBoard.value = data.boards.find((board) => board.name === boardName);
};

const showTask = (task: Task) => {
  console.log("Task clicked:", task);
  selectedTask.value = task;
  showTaskModal.value = true;
};
</script>

<template>
  <div class="app">
    <div class="app__sidebar" :class="{ 'app__sidebar--hidden': !showSideBar }">
      <div class="app__sidebar-logo">
        <BaseIcon :name="logoName" />
      </div>
      <div class="app__sidebar-menu">
        <SideBar
          :boards="data.boards"
          :boards-count="data.boards.length"
          @sidebar-item-clicked="updateSelectedBoard"
        />
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
      <h1>Show task modal {{ showTaskModal }}</h1>
      <BoardNav
        :board-name="
          selectedBoard && selectedBoard.name
            ? selectedBoard.name
            : 'Add a new board'
        "
        :disable-add-task="true"
      />
      <MainBoard :selected-board="selectedBoard" @task-clicked="showTask" />
    </main>
    <Teleport to="body">
      <TaskModal
        v-if="showTaskModal"
        @close="showTaskModal = false"
        :task="selectedTask"
      />
    </Teleport>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;

  &__main {
    flex: 1;
    // padding: px_to_rem(24px);
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
