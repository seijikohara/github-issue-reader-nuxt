import { GitHub } from '@/plugins/github'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $github: GitHub
  }
}
