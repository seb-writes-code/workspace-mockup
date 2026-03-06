import { useState } from 'react'
import type { Idea, IdeaStatus } from '../data'
import { UserAvatar } from './Avatar'
import { Thread } from './Thread'

function StatusBadge({ status }: { status: IdeaStatus }) {
  const config = {
    'open': { bg: 'bg-accent-light', text: 'text-accent', label: 'Open' },
    'in-progress': { bg: 'bg-orange-light', text: 'text-orange', label: 'In Progress' },
    'done': { bg: 'bg-green-light', text: 'text-green', label: 'Done' },
  }
  const c = config[status]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${c.bg} ${c.text} shrink-0 whitespace-nowrap`}>
      <span className="w-[5px] h-[5px] rounded-full bg-current" />
      {c.label}
    </span>
  )
}

function AttachmentBadge({ type, count }: { type: string; count: number }) {
  const icons: Record<string, string> = { doc: '☰', pr: '⌥', branch: '⌥' }
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] text-muted bg-black/3 px-1.5 py-0.5 rounded">
      <span className="text-[11px] opacity-50">{icons[type] || '·'}</span>
      {count}
    </span>
  )
}

function MomentumBar({ level }: { level: number }) {
  return (
    <div className="flex gap-[2px] items-center shrink-0" title={`Momentum: ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all"
          style={{
            height: i <= level ? 8 + (i * 2) : 6,
            background: i <= level ? '#4f46e5' : '#e7e5e4',
          }}
        />
      ))}
    </div>
  )
}

interface IdeaCardProps {
  idea: Idea
  momentum: number
  defaultExpanded?: boolean
}

export function IdeaCard({ idea, momentum, defaultExpanded = false }: IdeaCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const docCount = idea.attachments.filter(a => a.type === 'doc').length
  const prCount = idea.attachments.filter(a => a.type === 'pr' || a.type === 'branch').length

  return (
    <div
      className={`border rounded-lg mb-2 transition-all ${
        expanded ? 'border-accent border-[1.5px]' : 'border-border hover:border-[#c7c5c2]'
      }`}
    >
      {/* Header - always visible */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <StatusBadge status={idea.status} />
        <span className="text-sm font-medium flex-1">{idea.title}</span>

        {!expanded && (
          <div className="flex items-center gap-2">
            {docCount > 0 && <AttachmentBadge type="doc" count={docCount} />}
            {prCount > 0 && <AttachmentBadge type="pr" count={prCount} />}
            {idea.thread.length > 0 && (
              <span className="text-[11px] text-muted bg-black/3 px-1.5 py-0.5 rounded">
                💬 {idea.thread.length}
              </span>
            )}
          </div>
        )}

        <MomentumBar level={momentum} />
        <UserAvatar initials={idea.assignee.initials} color={idea.assignee.color} size={20} />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-border-light">
          {/* Description */}
          {idea.description && (
            <div className="text-[13px] leading-relaxed text-muted-foreground py-3">
              {idea.description}
            </div>
          )}

          {/* Attachments */}
          {idea.attachments.length > 0 && (
            <div className="flex flex-col gap-1.5 mb-3">
              {idea.attachments.map((att, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-background rounded-md cursor-pointer hover:bg-[#f0efed] text-[13px]"
                >
                  <span className="text-sm opacity-45 w-[18px] text-center shrink-0">
                    {att.type === 'doc' ? '☰' : '⌥'}
                  </span>
                  <span className="flex-1">{att.title}</span>
                  {att.additions && (
                    <>
                      <span className="text-green text-[12px] font-medium">+{att.additions}</span>
                      <span className="text-red-600 text-[12px] font-medium">−{att.deletions}</span>
                    </>
                  )}
                  <span className="text-[12px] text-muted shrink-0">{att.meta}</span>
                </div>
              ))}
            </div>
          )}

          {/* Thread */}
          <Thread messages={idea.thread} />
        </div>
      )}
    </div>
  )
}
