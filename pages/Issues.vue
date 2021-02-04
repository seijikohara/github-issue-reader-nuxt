<template>
  <div>
    <table class="table">
      <thead>
        <th>issue番号</th>
        <th>タイトル</th>
      </thead>
      <tbody>
        <tr v-for="(issue, i) in state.issues" :key="i">
          <th>
            <router-link :to="`/issues/${issue.number}`">
              #{{ issue.number }}
            </router-link>
          </th>
          <td>{{ issue.title }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :current-page="state.pageParam"
      :total-page="state.totalPage"
      :per-page="state.perPageParam"
      path="/issues"
      param-name-page="page"
      param-name-per-page="per_page"
      @page-change="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useAsync } from '@nuxtjs/composition-api'

import { GitHub, Issue } from '@/plugins/github'

import Pagination from '@/components/Pagination.vue'

type Dictionary<T> = { [key: string]: T }
const resolveQueryParams = (query: Dictionary<string | (string | null)[]>) => {
  state.pageParam = parseInt(query.page as string) || 1
  state.perPageParam = parseInt(query.per_page as string) || defaultPerPage
}

const defaultPerPage = 10

const state = reactive({
  issues: [] as Issue[],
  pageParam: 1,
  perPageParam: defaultPerPage,
  totalPage: 1,
})

const github = new GitHub()

export default defineComponent({
  name: 'Issues',
  components: { Pagination },
  beforeRouteUpdate(to, _from, next) {
    resolveQueryParams(to.query)
    github
      .getIssues(state.pageParam, state.perPageParam)
      .then((newIssues) => (state.issues = newIssues))
    next()
  },
  setup(_props, { root }) {
    const { $route, $router, $github } = root

    resolveQueryParams($route.query)

    useAsync(async () => {
      const repo = await $github.getRepo()
      const openIssueCount = repo.open_issues_count
      state.totalPage = Math.ceil(openIssueCount / state.perPageParam)

      state.issues = await $github.getIssues(
        state.pageParam,
        state.perPageParam
      )
    })

    const onPageChange = (page: number) =>
      $router.push({
        path: '/issues',
        query: {
          page: String(page),
          per_page: String(state.perPageParam),
        },
      })

    return {
      state,
      onPageChange,
    }
  },
})
</script>
