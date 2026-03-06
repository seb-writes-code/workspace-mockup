import { activeContext } from '../data'
import { AvatarGroup } from './Avatar'
import { IdeaCard } from './IdeaCard'
import { Thread } from './Thread'

export function ContextView() {
  const ctx = activeContext
  const momentumLevels = [2, 5, 3, 1] // mock momentum for each idea

  return (
    <main className="bg-card overflow-y-auto h-full">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-border flex items-center gap-2 text-[13px] text-muted-foreground shrink-0">
        <span>Contexts</span>
        <span className="text-muted">/</span>
        <span className="text-foreground font-medium">{ctx.title}</span>
      </div>

      <div className="py-8 px-12 max-w-[860px] mx-auto w-full">
        {/* Context Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2.5 mb-2.5 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent-light text-accent text-[12px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {ctx.status}
            </span>
            <span>Created {ctx.created}</span>
          </div>

          <h1 className="text-[26px] font-semibold tracking-tight leading-tight mb-2">
            {ctx.title}
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {ctx.description}
          </p>

          <div className="flex gap-4 text-[13px] text-muted items-center">
            <div className="flex items-center gap-1.5">
              <AvatarGroup people={ctx.people} />
              <span>{ctx.people.length} people</span>
            </div>
            <div>{ctx.ideas.length} ideas</div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-[#f8f7ff] to-[#f0f4ff] border border-[#e0ddf5] rounded-lg px-4 py-3.5 mb-7 text-[13px] leading-relaxed text-muted-foreground">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-accent mb-1.5">
            Summary
          </div>
          {ctx.summary}
        </div>

        {/* Ideas */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-muted">Ideas</span>
          <span className="text-[11px] text-muted bg-black/5 px-1.5 py-0 rounded-lg">{ctx.ideas.length}</span>
        </div>

        {ctx.ideas.map((idea, i) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            momentum={momentumLevels[i]}
            defaultExpanded={idea.status === 'in-progress'}
          />
        ))}

        {/* Add idea */}
        <div className="flex items-center justify-center gap-1.5 border border-dashed border-border rounded-lg py-2.5 text-[13px] text-muted cursor-pointer mt-1 mb-8 hover:border-[#c7c5c2] hover:text-muted-foreground hover:bg-sidebar transition-colors">
          + New idea
        </div>

        {/* Context-level thread */}
        <div className="border-t border-border pt-6">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-muted mb-3">
            Context Thread
          </div>
          <Thread messages={ctx.thread} compact />
        </div>
      </div>
    </main>
  )
}
