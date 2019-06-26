<template>
  <main class="main-container">
    <keep-alive>
      <router-view :letter="letter"></router-view>
    </keep-alive>
  </main>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      letter: window.letter,
      answer: null
    };
  },

  computed: {},

  methods: {},

  created() {

},

  mounted() {
   this.$router.replace('landing');
  }
};
</script>

<style lang="scss">
</style>
