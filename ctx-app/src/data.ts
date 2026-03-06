export type IdeaStatus = 'open' | 'in-progress' | 'done'
export type QuestionStatus = 'open' | 'resolved'

export interface ThreadMessage {
  author: string
  initials: string
  color: string
  time: string
  text: string
}

export interface Attachment {
  type: 'doc' | 'pr' | 'branch'
  title: string
  meta: string
  additions?: number
  deletions?: number
}

export interface Idea {
  id: string
  title: string
  status: IdeaStatus
  assignee: { initials: string; color: string }
  description?: string
  attachments: Attachment[]
  thread: ThreadMessage[]
}

export interface Question {
  id: string
  text: string
  status: QuestionStatus
  author: { initials: string; color: string; name: string }
  created: string
  resolution?: string
  thread: ThreadMessage[]
}

export interface LinkedContext {
  contextId: string
  title: string
  color: string
  relation: string
}

export interface Context {
  id: string
  title: string
  description: string
  status: string
  created: string
  people: { initials: string; color: string }[]
  summary: string
  ideas: Idea[]
  questions: Question[]
  linkedContexts: LinkedContext[]
  thread: ThreadMessage[]
}

export const contexts = [
  { id: 'unified-search', title: 'Unified Search', color: '#4f46e5' },
  { id: 'auth-overhaul', title: 'Auth Overhaul', color: '#16a34a' },
  { id: 'onboarding-v2', title: 'Onboarding Flow v2', color: '#ea580c' },
  { id: 'rate-limiting', title: 'API Rate Limiting', color: '#7c3aed' },
  { id: 'dark-mode', title: 'Dark Mode', color: '#0891b2' },
  { id: 'billing', title: 'Billing Migration', color: '#a8a29e' },
]

export const activeContext: Context = {
  id: 'unified-search',
  title: 'Unified Search',
  description: 'Build a single search experience across all content types — issues, docs, threads, code, and PRs. Users should be able to search once and find everything, with filters and rich previews.',
  status: 'Active',
  created: '5 days ago',
  people: [
    { initials: 'C', color: '#4f46e5' },
    { initials: 'S', color: '#0891b2' },
    { initials: 'M', color: '#7c3aed' },
  ],
  summary: 'Index pipeline is complete and deployed. Chris is building the search API with filters and ranking. Maya is designing the results UI with grouped preview cards. Remaining work: finish API endpoint, build results UI, and integrate into Cmd+K.',
  ideas: [
    {
      id: 'idea-1',
      title: 'Set up search index schema and ingestion pipeline',
      status: 'done',
      assignee: { initials: 'S', color: '#0891b2' },
      description: 'Design and implement the search index schema using pg_trgm. Build the ingestion pipeline that indexes content incrementally as it\'s created or updated, targeting sub-200ms indexing latency.',
      attachments: [
        { type: 'doc', title: 'Search Architecture Spec', meta: 'Updated 2d ago' },
        { type: 'pr', title: 'feat/search-index', meta: 'PR #87 · Merged', additions: 324, deletions: 12 },
      ],
      thread: [
        { author: 'Seb', initials: 'S', color: '#0891b2', time: '3 days ago', text: 'Schema is set up. Using GIN indexes with pg_trgm for trigram matching. Benchmarking shows ~15ms query time on 100k documents.' },
        { author: 'Chris', initials: 'C', color: '#4f46e5', time: '3 days ago', text: 'Nice, that\'s plenty fast. Ship it.' },
      ],
    },
    {
      id: 'idea-2',
      title: 'Build search API endpoint with filters and ranking',
      status: 'in-progress',
      assignee: { initials: 'C', color: '#4f46e5' },
      description: 'Build the core search API that accepts a query string, optional filters (type:doc, author:chris), and returns ranked results grouped by content type. Should support pagination and return rich preview snippets with highlighted matches.',
      attachments: [
        { type: 'doc', title: 'Search Architecture Spec', meta: 'Updated 2d ago' },
        { type: 'doc', title: 'Search UI Explorations', meta: 'Updated 4d ago' },
        { type: 'pr', title: 'feat/unified-search', meta: 'PR #89 · Open', additions: 842, deletions: 31 },
      ],
      thread: [
        { author: 'Chris', initials: 'C', color: '#4f46e5', time: '2 days ago', text: 'Going with pg_trgm for now. Should search results include thread messages or just top-level objects?' },
        { author: 'Seb', initials: 'S', color: '#0891b2', time: '2 days ago', text: 'Include thread messages too. People search for things someone said. We can weight them lower in ranking.' },
        { author: 'Maya', initials: 'M', color: '#7c3aed', time: 'yesterday', text: 'Agree with @Seb. For the results UI I\'m thinking grouped by type with tabs. Pushing designs to Search UI Explorations today.' },
      ],
    },
    {
      id: 'idea-3',
      title: 'Search results UI with grouped preview cards',
      status: 'open',
      assignee: { initials: 'M', color: '#7c3aed' },
      description: 'Design and build the search results interface. Results should be grouped by content type with tabs (All | Ideas | Docs | Code | Threads). Each result shows a 2-line preview with the matching text highlighted.',
      attachments: [
        { type: 'doc', title: 'Search UI Explorations', meta: 'Updated 4d ago' },
      ],
      thread: [],
    },
    {
      id: 'idea-4',
      title: 'Integrate search into Cmd+K command bar',
      status: 'open',
      assignee: { initials: 'C', color: '#4f46e5' },
      attachments: [],
      thread: [],
    },
  ],
  questions: [
    {
      id: 'q-1',
      text: 'Should search results include thread messages or just top-level objects?',
      status: 'resolved',
      author: { initials: 'C', color: '#4f46e5', name: 'Chris' },
      created: '3 days ago',
      resolution: 'Include thread messages, weighted lower in ranking.',
      thread: [
        { author: 'Chris', initials: 'C', color: '#4f46e5', time: '3 days ago', text: 'We need to decide scope. Including threads means more results but better recall.' },
        { author: 'Seb', initials: 'S', color: '#0891b2', time: '3 days ago', text: 'Include them. People search for things someone said — we can weight them lower.' },
        { author: 'Maya', initials: 'M', color: '#7c3aed', time: '2 days ago', text: 'Agree. I\'ll make sure the UI can distinguish thread results from top-level ones.' },
      ],
    },
    {
      id: 'q-2',
      text: 'Do we need real-time search index updates, or is a 30-second delay acceptable?',
      status: 'open',
      author: { initials: 'S', color: '#0891b2', name: 'Seb' },
      created: '2 days ago',
      thread: [
        { author: 'Seb', initials: 'S', color: '#0891b2', time: '2 days ago', text: 'Real-time adds complexity (CDC / event streaming). 30s delay covers 95% of use cases and keeps the pipeline simple.' },
        { author: 'Chris', initials: 'C', color: '#4f46e5', time: '1 day ago', text: 'Leaning toward 30s for v1. We can always tighten it later. But want Maya\'s input on UX expectations.' },
      ],
    },
    {
      id: 'q-3',
      text: 'Should Cmd+K replace the current nav or overlay on top?',
      status: 'open',
      author: { initials: 'M', color: '#7c3aed', name: 'Maya' },
      created: '1 day ago',
      thread: [],
    },
  ],
  linkedContexts: [
    { contextId: 'auth-overhaul', title: 'Auth Overhaul', color: '#16a34a', relation: 'Search must respect permission scopes from Auth' },
    { contextId: 'rate-limiting', title: 'API Rate Limiting', color: '#7c3aed', relation: 'Search API needs rate limit rules' },
  ],
  thread: [
    { author: 'Chris', initials: 'C', color: '#4f46e5', time: '5 days ago', text: 'Kicking off the unified search effort. This is one of our biggest differentiators so let\'s get it right. I\'ve drafted a context with the main ideas broken out — let me know what you think.' },
    { author: 'Seb', initials: 'S', color: '#0891b2', time: '5 days ago', text: 'Looks good. I\'ll take the index pipeline since it needs to land first. Should be done in a couple days.' },
    { author: 'Maya', initials: 'M', color: '#7c3aed', time: '4 days ago', text: 'I\'ll start on UI explorations while the backend is in progress. That way we\'ll have designs ready when the API lands.' },
  ],
}
