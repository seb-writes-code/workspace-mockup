import { contexts } from '../data'

interface SidebarProps {
  activeContextId: string
}

export function Sidebar({ activeContextId }: SidebarProps) {
  return (
    <aside className="bg-sidebar border-r border-border flex flex-col h-full overflow-y-auto py-4">
      {/* Space Logo */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <span className="w-5 h-5 rounded-[5px] bg-accent text-white text-[11px] font-bold flex items-center justify-center shrink-0">P</span>
        <span className="text-[15px] font-bold tracking-tight">Platform</span>
      </div>

      {/* Search */}
      <div className="mx-3 mb-3 px-2.5 py-1.5 rounded-md bg-black/4 text-muted text-[13px] flex items-center gap-2 cursor-pointer">
        <span className="text-[14px]">&#x1F50D;</span>
        <span>Search...</span>
        <kbd className="ml-auto text-[11px] bg-black/6 px-1.5 py-0 rounded text-muted font-sans">&#8984;K</kbd>
      </div>

      {/* Nav items */}
      <div className="flex flex-col">
        <SidebarItem icon="&#x2606;" label="My Work" />
        <SidebarItem icon="&#x25CB;" label="Drafts" />
      </div>

      <div className="h-px bg-border mx-3 my-2" />

      {/* Contexts section */}
      <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Contexts
      </div>

      <div className="flex flex-col">
        {contexts.map((ctx) => (
          <div
            key={ctx.id}
            className={`px-4 py-1.5 text-[13px] flex items-center gap-2 cursor-pointer transition-colors
              ${ctx.id === activeContextId
                ? 'bg-black/6 text-foreground font-medium'
                : 'text-muted-foreground hover:bg-black/4'
              }`}
          >
            <span
              className="w-[7px] h-[7px] rounded-full shrink-0"
              style={{ background: ctx.color }}
            />
            {ctx.title}
          </div>
        ))}
      </div>

      {/* User */}
      <div className="mt-auto pt-2 border-t border-border">
        <div className="px-4 py-2 flex items-center gap-2 text-[13px]">
          <span className="w-[22px] h-[22px] rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center">C</span>
          <span>Chris</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green ml-auto" />
        </div>
      </div>
    </aside>
  )
}

function SidebarItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="px-4 py-1.5 text-[13px] text-muted-foreground flex items-center gap-2 cursor-pointer hover:bg-black/4">
      <span className="w-4 text-center text-sm opacity-50" dangerouslySetInnerHTML={{ __html: icon }} />
      {label}
    </div>
  )
}
