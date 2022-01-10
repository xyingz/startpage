<template>
  <div class="column">
    <div class="col-5 column justify-end q-gutter-md">
      <TimeComponent />
      <SearchBarComponent />
    </div>

    <div class="col-7">
      <ToolboxComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeComponent from '@/components/time/Time.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ToolboxComponent from '@/components/ToolBox.vue';
</script>

<style scoped lang="scss"></style>
