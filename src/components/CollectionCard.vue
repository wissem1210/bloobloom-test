<template>
  <div class="collection-card">
    <div class="name">{{ name }}</div>
    <img :src="url" />
  </div>
</template>

<script>
export default {
  props: ["name", "url"],
};
</script>

<style scoped>
img {
  position: relative;
  display: block;
  height: auto;
  overflow: hidden;
}
.collection-card {
  height: auto;
}
.name {
  position: absolute;
  top: 20px;
  z-index: 10;
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
</style>
