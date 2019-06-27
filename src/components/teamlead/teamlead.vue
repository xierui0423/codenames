
<template>
  <div class="teamlead">
    <div class="teamlead__item" v-for="(item,index) in items" :key="index" :class="item.color">
      <div class="teamlead__item-inner">
        <div class="teamlead__item-inner-text">{{item.word}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  components: {},

  data() {
    return {
      items: []
    };
  },

  methods: {},

  mounted() {
    let data =
      window.location.hash.indexOf("=") > -1 &&
      window.location.hash.substring(window.location.hash.indexOf("=") + 1);
    if (!data) {
      this.$router.replace("landing");
    } else {
      this.items = JSON.parse(Base64.decode(data));
    }
  }
};
</script>

<style lang="scss">
.teamlead {
  width: 100vw;
  max-width: 149vh;
  margin: auto;
  font-size: 0;
  display: flex;
  flex-wrap: wrap;

  &__item {
    font-size: 50px;
    width: 20%;
    display: inline-block;
    border: 2px solid #fff;
    box-sizing: border-box;
    text-align: center;
    line-height: 100%;
    vertical-align: top;
    position: relative;

    &-inner {
      padding-top: 67%;

      &-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .yellow {
    background-color: $yellow;
  }

  .red {
    background-color: $red;
    color: #fff;
  }

  .blue {
    background-color: $blue;
    color: #fff;
  }

  .black {
    background-color: $black;
    color: #fff;
  }
}
</style>

