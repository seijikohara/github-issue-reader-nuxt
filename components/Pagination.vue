<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li>
        <router-link
          class="pagination-link"
          :to="{
            path,
            query: {
              [paramNamePage]: currentPage - 1,
              [paramNamePerPage]: perPage,
            },
          }"
        >
          &lt;
        </router-link>
      </li>
      <li>
        <router-link
          class="pagination-link"
          :class="{ 'is-current': currentPage === 1 }"
          :to="{
            path,
            query: { [paramNamePage]: 1, [paramNamePerPage]: perPage },
          }"
        >
          1
        </router-link>
      </li>
      <li v-if="hasEllipsisFrom">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-for="(visiblePageNumber, index) in visiblePageNumbers" :key="index">
        <router-link
          class="pagination-link"
          :class="{ 'is-current': currentPage === visiblePageNumber }"
          :to="{
            path,
            query: {
              [paramNamePage]: visiblePageNumber,
              [paramNamePerPage]: perPage,
            },
          }"
        >
          {{ visiblePageNumber }}
        </router-link>
      </li>
      <li v-if="hasEllipsisTo">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <router-link
          class="pagination-link"
          :class="{ 'is-current': currentPage === totalPage }"
          :to="{
            path,
            query: {
              [paramNamePage]: totalPage,
              [paramNamePerPage]: perPage,
            },
          }"
        >
          {{ totalPage }}
        </router-link>
      </li>
      <li>
        <router-link
          class="pagination-link"
          :to="{
            path,
            query: {
              [paramNamePage]: currentPage + 1,
              [paramNamePerPage]: perPage,
            },
          }"
        >
          &gt;
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

type Props = {
  currentPage: number
  totalPage: number
  perPage: number
  path: string
  paramNamePage: string
  paramNamePerPage: string
  displayPageCount: number
}

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    paramNamePage: {
      type: String,
      required: true,
    },
    paramNamePerPage: {
      type: String,
      required: true,
    },
    displayPageCount: {
      type: Number,
      default: 3,
    },
  },
  setup(props: Props, { emit }) {
    const range = (from: number, to: number) =>
      [...Array(to - from)].map((_, i) => from + i)

    return {
      onClickPageButton: (index: number) => emit('page-change', index),
      visiblePageNumbers: computed(() => {
        if (props.totalPage <= props.displayPageCount) {
          return [range(1, props.totalPage)]
        }
        let from = props.currentPage - props.displayPageCount
        if (from < 2) from = 2
        let to = props.currentPage + props.displayPageCount
        if (to > props.totalPage - 1) to = props.totalPage - 1
        return range(from, to)
      }),
      hasEllipsisFrom: computed(
        () => props.currentPage - props.displayPageCount >= 3
      ),
      hasEllipsisTo: computed(
        () => props.currentPage + props.displayPageCount <= props.totalPage - 2
      ),
    }
  },
})
</script>
