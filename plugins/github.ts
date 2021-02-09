/* eslint-disable camelcase */
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

import axios from 'axios'

const api = axios.create({
  baseURL: `https://api.github.com/repos/nuxt/nuxt.js`,
})
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export interface Pullrequest {
  url: string
  html_url: string
  diff_url: string
  patch_url: string
}

export interface Label {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description?: string
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  labels: Label[]
  state: string
  locked: boolean
  assignee?: unknown
  assignees: unknown[]
  milestone?: unknown
  comments: number
  created_at: string
  updated_at: string
  closed_at?: unknown
  author_association: string
  active_lock_reason?: unknown
  body: string
  performed_via_github_app?: unknown
  pull_request?: Pullrequest
}

export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface License {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url?: unknown
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  temp_clone_token?: unknown
  organization?: Owner
  network_count: number
  subscribers_count: number
}

export class GitHub {
  async getRepo(): Promise<Repo> {
    const response = await api.get(``)
    return response.data
  }

  async getIssues(page?: number, perPage?: number): Promise<Issue[]> {
    const response = await api.get('/issues', {
      params: {
        page,
        per_page: perPage,
      },
    })
    return response.data
  }

  async getIssue(issueNumber: number): Promise<Issue> {
    const response = await api.get(`/issues/${issueNumber}`)
    return response.data
  }
}

export default (_context: Context, inject: Inject) => {
  inject('github', new GitHub())
}
