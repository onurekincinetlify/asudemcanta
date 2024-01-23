<template>
  <router-view :key="route.fullPath"></router-view>
</template>

<style>

</style>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>