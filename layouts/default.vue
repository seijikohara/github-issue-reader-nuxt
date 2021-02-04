<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"> Issue Reader </router-link>
      </div>
    </nav>

    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    useContext()
  },
})
</script>
