<template>
  <div class="contain">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script>
import Left from "./ContainLeft";
import Center from "./ContainCenter";
import Right from "./ContainRight";
export default {
  name: "contain",
  components: {
    Left,
    Center,
    Right
  },
  data() {
    return {};
  },
  created() {},
  methods: {},

  mounted() {}
};
</script>
<style lang="scss" scoped>
.contain {
  widows: 1920px;
  height: 927px;
  display: grid;
  grid-template-columns: 450px 1020px 450px;
}
</style>
lang="scss">
