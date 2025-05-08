<script setup lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import ColourModeToggle from "@/components/ColourModeToggle/ColourModeToggle.vue";
import BaseIcon from "@/components/BaseIcon/BaseIcon.vue";

const changeColourMode = () => {
  console.log("Colour mode toggled");
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};
</script>

<template>
  <div class="app">
    <div class="app__sidebar">
      <div class="app__sidebar-logo">
        <BaseIcon name="logo-dark" />
      </div>
      <div class="app__sidebar-menu">
        <SideBar />
      </div>
      <div class="app__sidebar-footer">
        <ColourModeToggle @toggleColourMode="changeColourMode" />
      </div>
    </div>
    <main class="app__main">
      <h1>Welcome to the App</h1>
      <p>This is the main content area.</p>
    </main>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;
}

.app__sidebar {
  background-color: var(--background-color);
  padding: 0 0 px_to_rem(24px) 0;
  display: flex;
  flex-direction: column;

  &-logo {
    margin-bottom: px_to_rem(20px);
    padding: px_to_rem(24px);
  }

  &-menu {
    margin-bottom: auto;
  }
}
</style>
