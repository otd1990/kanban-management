<script setup lang="ts">
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";
import SideBarItem from "@/components/SideBarItem/SideBarItem.vue";
import data from "../../../data.json";
import { ref } from "vue";

const boardTypes = data.boards.length;
const activeBoardName = ref<string | null>(null);

const handleSidebarItemClick = (boardName: string) => {
  activeBoardName.value = boardName;
};

const createNewBoard = () => {
  console.log("Create new board clicked");
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__menu">
      <span class="sidebar__menu-count">All Boards ({{ boardTypes }})</span>
      <div class="sidebar__menu-boards">
        <SideBarItem
          v-for="(board, index) in data.boards"
          :key="index"
          :boardName="board.name"
          :isActive="activeBoardName === board.name"
          @sidebarItemClicked="handleSidebarItemClick"
        />
        <div class="sidebar__create-board-wrapper">
          <BaseIcon name="icon-board" />
          <button
            class="sidebar__create-board-btn button-reset"
            @click="createNewBoard"
          >
            <BaseIcon name="icon-add-task-mobile" />
            <span>Add New Board</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: px_to_rem(300px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);

  &__menu {
    margin-bottom: auto;
  }

  &__menu-count {
    color: var(--text-colour-main);
    font-size: $font-size-xs;
    display: block;
    text-align: center;
    margin-bottom: px_to_rem(16px);
  }

  &__menu-boards {
    padding-right: px_to_rem(24px);
  }

  &__create-board-wrapper {
    padding: px_to_rem(16px) px_to_rem(20px);
    color: var(--main-purple);
    display: flex;
    align-items: center;
    gap: px_to_rem(14px);
  }

  &__create-board-btn {
    color: var(--main-purple);
    display: flex;
    gap: px_to_rem(6px);
    align-items: baseline;
    background: transparent;
  }
}
</style>
