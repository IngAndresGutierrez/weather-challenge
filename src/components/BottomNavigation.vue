<template>
  <v-bottom-navigation :elevation="3" grow>
    <v-btn value="favorites" @click="onClickHome">
      <v-icon>mdi-home</v-icon>
      <span>Search</span>
    </v-btn>

    <v-btn value="history" @click="onClickHistory">
      <v-icon>mdi-history</v-icon>
      <span>History</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const onClickHome = () => {
    router.push('/')
  }

  const onClickHistory = () => {
    router.push('/history')
  }
</script>
