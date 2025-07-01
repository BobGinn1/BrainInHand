<template>
  <div id="app">
    <StarWarsHeader />
    <router-view />
    <OpeningCrawl />
  </div>
</template>

<script setup lang="ts">
import StarWarsHeader from '@/Components/StarWarsHeader.vue';
import OpeningCrawl from '@/Components/OpeningCrawl.vue';
</script>

<style>
#app > *:not(.crawl-container) {
  position: relative;
  z-index: 10;
}
</style>
