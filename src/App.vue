<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  data() {
    return {message: 'HELLO WORLD'};
  },
  methods: {
    changeMsg() {
      this.message = 5;
    }
  }
});
</script>
<style src="./styles.module.css" module></style>

<template>
  <div :class="$style.main">{{ message }}!</div>
</template>
