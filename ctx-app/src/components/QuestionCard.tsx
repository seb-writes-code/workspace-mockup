import { useState } from 'react'
import type { Question, QuestionStatus } from '../data'
import { UserAvatar } from './Avatar'
import { Thread } from './Thread'

function QuestionBadge({ status }: { status: QuestionStatus }) {
  const config = {
    'open': { bg: 'bg-[#fef3c7]', text: 'text-[#b45309]', label: 'Open' },
    'resolved': { bg: 'bg-green-light', text: 'text-green', label: 'Resolved' },
  }
  const c = config[status]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${c.bg} ${c.text} shrink-0 whitespace-nowrap`}>
      <span className="text-[10px]">{status === 'open' ? '?' : '✓'}</span>
      {c.label}
    </span>
  )
}

interface QuestionCardProps {
  question: Question
  defaultExpanded?: boolean
}

export function QuestionCard({ question, defaultExpanded = false }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div
      className={`border rounded-lg mb-2 transition-all ${
        expanded
          ? question.status === 'open'
            ? 'border-[#d97706] border-[1.5px]'
            : 'border-green border-[1.5px]'
          : 'border-border hover:border-[#c7c5c2]'
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <QuestionBadge status={question.status} />
        <span className="text-sm font-medium flex-1">{question.text}</span>

        {!expanded && question.thread.length > 0 && (
          <span className="text-[11px] text-muted bg-black/3 px-1.5 py-0.5 rounded">
            💬 {question.thread.length}
          </span>
        )}

        <span className="text-[12px] text-muted shrink-0">{question.created}</span>
        <UserAvatar initials={question.author.initials} color={question.author.color} size={20} />
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-border-light">
          {/* Resolution */}
          {question.resolution && (
            <div className="mt-3 mb-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-md px-3 py-2.5 text-[13px] text-[#166534]">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#15803d] block mb-1">
                Resolution
              </span>
              {question.resolution}
            </div>
          )}

          {/* Thread */}
          <div className="mt-2">
            <Thread messages={question.thread} />
          </div>
        </div>
      )}
    </div>
  )
}
