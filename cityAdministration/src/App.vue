<template>
  <div id="app">
    <Home />
    <Countup />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
// import Countup from "./components/ICountUp";

export default {
  name: "App",
  components: {
    Home
    // Countup
  }
};
</script>

<style>
/* @import url("../public/font/font.css"); */

@font-face {
  font-family: DINAlternate;
  src: url("../public/font/DINAlternateBold.ttf");
}
@font-face {
  font-family: SourceHanSansCN-Bold;
  src: url("../public/font/SourceHanSansCN-Bold.ttf");
}
@font-face {
  font-family: SourceHanSansCN;
  src: url("../public/font/SourceHanSansCN-Normal.ttf");
}

* {
  margin: 0;
  padding: 0;
}
</style>
