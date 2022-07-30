<template>
  <div class="bloobloom-header">
    <div class="bloobloom-header-btns">
      <div
        v-if="!showMenu"
        class="bloobloom-header-button menu-button"
        @mouseover="showMenu = true"
        @mouseleave="showMenu = false"
        @click="showMenu = true"
      >
        <span>MENU</span>
      </div>
      <div
        v-if="showMenu"
        class="bloobloom-header-button menu-button"
        @click="showMenu = false"
      >
        <Stroke />
      </div>
    </div>
    <div class="bloobloom-header-logo">
      <bloobloom-logo />
    </div>
    <div class="bloobloom-header-btns">
      <div class="bloobloom-header-button menu-button-right">
        <span>BAG (0)</span>
      </div>
    </div>
  </div>
  <the-menu
    v-show="showMenu"
    @mouseover="showMenu = true"
    @mouseleave="showMenu = false"
    @update-collection="updateCollectionName"
  />
</template>

<script>
import BloobloomLogo from "../../icons/BloobloomLogo.vue";
import Stroke from "../../icons/Stroke.vue";
import TheMenu from "./TheMenu.vue";

export default {
  components: {
    "bloobloom-logo": BloobloomLogo,
    TheMenu,
    Stroke,
  },
  data() {
    return {
      showMenu: false,
    };
  },

  watch: {
    showMenu() {
      this.showMenu
        ? (document.documentElement.style.overflow = "hidden")
        : (document.documentElement.style.overflow = "auto");
    },
  },
};
</script>

<style scoped>
.bloobloom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #000;
  background-color: #fff;
  box-sizing: border-box;
}
.bloobloom-header-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.bloobloom-header-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.bloobloom-header-button {
  cursor: pointer;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid #000;
  border-left: 1px solid #000;

  width: 144px;
  color: #000;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 2px;
}
.menu-button {
  display: flex;
  border-left: none;
  height: calc(100% + 1px);
}
.menu-button-right {
  display: flex;
  border-right: none;
  height: calc(100% + 1px);
}
span {
  font-family: Acumin Pro;
}
.bloobloom-header-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
svg {
  width: 107.56px;
  height: 16.68px;
}
</style>
