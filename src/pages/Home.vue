<template>
  <div class="p-home">
    <TimeComponent />

    <SearchBarComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeComponent from '@/components/Time.vue';
import SearchBarComponent from '@/components/SearchBar.vue';

export default defineComponent({
  name: 'HomePage',

  components: { SearchBarComponent, TimeComponent },

  setup() {}
});
</script>

<style scoped>
.p-home {
  padding-top: 10rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
  grid-auto-columns: 100%;
  justify-content: center;
}
</style>
