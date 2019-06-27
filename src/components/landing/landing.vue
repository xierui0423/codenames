
<template>
  <div class="landing">
    <div class="landing__ui">
      <router-link :to="`board?data=${this.data}`">开始</router-link>
      <router-link :to="`teamlead?data=${this.data}`">队长</router-link>
      <button @click="refresh">重置</button>
    </div>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  components: {},

  data() {
    return {
      data: "",
      colors: [
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "blue",
        "blue",
        "blue",
        "blue",
        "blue",
        "blue",
        "blue",
        "blue",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "yellow",
        "black"
      ]
    };
  },

  methods: {
    refresh(e) {
      const shuffledColors = Util.shuffle(this.colors);
      this.data = Base64.encodeURI(
        JSON.stringify(
          Util.shuffle(window.words)
            .slice(0, 25)
            .map((word, index) => {
              return {
                word,
                color: shuffledColors[index]
              };
            })
        )
      );
      this.$router.replace(`landing?data=${this.data}`);
    }
  },

  mounted() {
    let data =
      window.location.hash.indexOf("=") > -1 &&
      window.location.hash.substring(window.location.hash.indexOf("=") + 1);
    if (!data) {
      this.refresh();
    } else {
      this.data = data;
    }
  }
};
</script>

<style lang="scss">
.landing {
  height: 100vh;
  width: 100vw;
  background-image: url("/images/landing.jpg");
  background-size: contain;
  background-position: center;

  &__ui {
    position: absolute;
    top: 56%;
    left: 52%;

    > a,
    > button {
      text-decoration: none;
      margin-left: 30px;
      color: #fff;
      font-size: 100px;
    }
  }
}
</style>

