import type { ThreadMessage } from '../data'
import { UserAvatar } from './Avatar'

interface ThreadProps {
  messages: ThreadMessage[]
  compact?: boolean
}

export function Thread({ messages, compact }: ThreadProps) {
  if (messages.length === 0) return null

  return (
    <div className={compact ? '' : 'border-t border-border-light pt-3'}>
      {!compact && (
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-2.5">
          Thread
        </div>
      )}

      {messages.map((msg, i) => (
        <div key={i}>
          {i > 0 && <hr className="border-t border-border-light my-2" />}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <UserAvatar initials={msg.initials} color={msg.color} size={20} />
              <span className="text-[13px] font-semibold">{msg.author}</span>
              <span className="text-[12px] text-muted">{msg.time}</span>
            </div>
            <div className="pl-7 text-[13px] leading-relaxed text-muted-foreground">
              {msg.text}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-2.5 border border-border rounded-md px-2.5 py-2 text-[13px] text-muted cursor-text">
        Reply...
      </div>
    </div>
  )
}
