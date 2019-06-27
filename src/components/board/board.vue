
<template>
  <div class="board">
    <div class="red-score" @click="pass" :class="{active: this.activeRed && !win, win: this.win === 'red'}">
      <div v-show="win === 'red'">红方探员集合完毕，任务成功！<br><br><br><router-link to="landing">重新开始</router-link></div>
      <div v-show="!win">未识别探员 {{redLeft}}</div>
    </div>
    <div class="blue-score" @click="pass" :class="{active: !this.activeRed && !win, win: this.win === 'blue'}">
      <div v-show="win === 'blue'">蓝方探员集合完毕，任务成功！<br><br><br><router-link to="landing">重新开始</router-link></div>
      <div v-show="!win">未识别探员 {{blueLeft}}</div>
    </div>

    <div class="board__items">
      <div
        class="board__item"
        v-for="(item,index) in items"
        :key="index"
        :class="{[item.color]: revealed[index]}"
        @click="click(index)"
      >
        <div class="board__item-inner">
          <div class="board__item-inner-text">{{item.word}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      activeRed: true,
      redLeft: 9,
      blueLeft: 8,
      items: [],
      revealed: {},
      win: null
    };
  },

  methods: {
    click(index) {
      if (!this.revealed[index]) {
        this.revealed[index] = true;

        switch (this.items[index].color) {
          case "red":
            this.redLeft--;
            if (this.redLeft === 0) {
              this.win = "red";
            }
            if (!this.activeRed) {
              this.activeRed = true;
            }
            break;
          case "blue":
            this.blueLeft--;
            if (this.blueLeft === 0) {
              this.win = "blue";
            }
            if (this.activeRed) {
              this.activeRed = false;
            }
            break;
          case "black":
            if (this.activeRed) {
              this.win = "blue";
            } else {
              this.win = "red";
            }
            break;
          default:
            this.activeRed = !this.activeRed;
            break;
        }
        this.$forceUpdate();
      }
    },

    pass(){
      this.activeRed = !this.activeRed;
    }
  },

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
@keyframes shine {
  from {
    color: #fff;
  }

  50% {
    color: $black;
  }

  to {
    color: #fff;
  }
}

.board {
  .red-score,
  .blue-score {
    &.active {
      animation: shine 2s infinite;
    }

    &.win {
      z-index: 100;
      writing-mode: initial;
      width: 100%;

      div {
        width: 100%;
        text-align: center;
        top: 50%;

        a {
          color: #fff !important;
        }
      }
    }

    color: #fff;
    position: fixed;
    height: 100%;
    width: calc((100% - 100vh * 1.5) / 2);
    font-size: 80px;
    writing-mode: vertical-lr;
    text-orientation: upright;
    transition: width 1s;

    div {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .red-score {
    background: $red;
    left: 0;
  }

  .blue-score {
    background: $blue;
    right: 0;
  }

  &__items {
    width: 100vw;
    max-width: 149vh;
    margin: auto;
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
    background-color: #838383;
  }

  &__item {
    font-size: 50px;
    width: 20%;
    display: inline-block;
    color: #fff;
    border: 2px solid #fff;
    box-sizing: border-box;
    text-align: center;
    line-height: 100%;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    background-size: contain;

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
    color: transparent;
    background-image: url("/images/yellow1.png");
  }

  .red {
    color: transparent;
    background-image: url("/images/red2.png");
  }

  .blue {
    color: transparent;
    background-image: url("/images/blue2.png");
  }

  .black {
    color: transparent;
    background-image: url("/images/black.png");
  }
}
</style>

