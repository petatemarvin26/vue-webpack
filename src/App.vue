<template>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Test from './Test/index.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      message: 'HELLO WORLD'
    };
  },
  components: {
    Test
  }
});
</script>

<style></style>
