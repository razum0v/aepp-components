<template>
  <div class="ae-hr-progress-bar">
    <ae-hr branded :style="{ width: `${ratio * 100}%` }" />
    <ae-hr />
  </div>
</template>

<script>
  import AeHr from '../aeHr/aeHr.vue';

  export default {
    name: 'ae-hr-progress-bar',
    components: { AeHr },
    props: {
      ratio: { type: Number },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../variables";

  .ae-hr-progress-bar {
    display: flex;
    flex-direction: row;
    align-items: center;

    .ae-hr:nth-child(1) {
      flex-grow: 0;
      flex-shrink: 0;
    }

    .ae-hr:nth-child(2) {
      flex-grow: 1;
    }
  }
</style>
