<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        #{{ state.issue.number }} {{ state.issue.title }}
      </p>
    </header>
    <div class="card-content">
      <div class="content" v-html="state.bodyHtml"></div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click="onClickBack">戻る</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useAsync } from '@nuxtjs/composition-api'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

import { Issue } from '@/plugins/github'

export default defineComponent({
  name: 'Issue',
  setup(_props, { root }) {
    const { $route, $router, $github } = root
    const state = reactive({
      issueNumber: parseInt($route.params.issueNumber as string),
      issue: {} as Issue,
      bodyHtml: '',
    })

    useAsync(async () => {
      state.issue = await $github.getIssue(state.issueNumber)
      state.bodyHtml = sanitizeHtml(marked(state.issue.body))
    })

    return {
      state,
      onClickBack: () => $router.back(),
    }
  },
})
</script>
