<template>
  <div class="menu" @mouseleave="clear">
    <div class="menu-list">
      <div
        :class="
          collectionType === 'spectacles' ? 'list-item-selected' : 'list-item'
        "
        @mouseover="isHover = true"
        @mouseout="isHover = false"
        @click="collectionType = 'spectacles'"
      >
        <span>SPECTACLES</span>
        <right-stroke
          :color="isHover || collectionType === 'spectacles' ? '#fff' : '#000'"
        />
      </div>
      <div
        :class="
          collectionType === 'sunglasses' ? 'list-item-selected' : 'list-item'
        "
        @mouseover="isHover = true"
        @mouseout="isHover = false"
        @click="collectionType = 'sunglasses'"
      >
        <span>SUNGLASSES</span>
        <right-stroke
          :color="isHover || collectionType === 'sunglasses' ? '#fff' : '#000'"
        />
      </div>
      <div class="list-item">HOME TRY ON</div>
      <div class="list-item">PAIR FOR PAIR</div>
    </div>
    <div v-show="collectionType !== ''" class="menu-list">
      <router-link
        class="list-item"
        :to="
          collectionType === 'spectacles'
            ? '/spectacles-women'
            : '/sunglasses-women'
        "
      >
        <span>WOMEN</span>
      </router-link>
      <router-link
        class="list-item"
        :to="
          collectionType === 'spectacles'
            ? '/spectacles-men'
            : '/sunglasses-men'
        "
      >
        <span>MEN</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import RightStroke from "@/icons/RightStroke.vue";
export default {
  components: {
    RightStroke,
  },
  data() {
    return {
      isHover: false,
      collectionType: "",
    };
  },
  methods: {
    clear() {
      this.collectionType = "";
    },
  },
};
</script>

<style scoped>
.menu {
  position: absolute;
  display: flex;
  width: 33%;
  height: 100%;
  z-index: 1000;
  overflow: hidden;
}
.menu-list {
  position: relative;
  display: block;
  width: 50%;
  background-color: white;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  overflow: hidden;
}

.list-item {
  border-bottom: 1px solid #000;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px 0 20px;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-decoration: none;
  color: #000;
}
.list-item:hover {
  background: #000;
  color: #fff;
}
.list-item-selected {
  background: #000;
  color: #fff;
  border-bottom: 1px solid #000;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px 0 20px;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
}
@media screen and (max-width: 1319px) {
  .menu {
    width: 50% !important;
  }
}
@media screen and (max-width: 500px) {
  .menu {
    width: 100% !important;
  }
}
</style>
