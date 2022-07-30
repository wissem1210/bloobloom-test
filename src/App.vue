<template>
  <div>
    <the-header />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/nav/TheHeader.vue";

export default {
  components: {
    "the-header": TheHeader,
  },
};
</script>

<style></style>
