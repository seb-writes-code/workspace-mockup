interface AvatarProps {
  initials: string
  color: string
  size?: number
}

export function UserAvatar({ initials, color, size = 22 }: AvatarProps) {
  return (
    <span
      className="rounded-full text-white font-semibold flex items-center justify-center shrink-0"
      style={{
        background: color,
        width: size,
        height: size,
        fontSize: size * 0.45,
      }}
    >
      {initials}
    </span>
  )
}

interface AvatarGroupProps {
  people: { initials: string; color: string }[]
}

export function AvatarGroup({ people }: AvatarGroupProps) {
  return (
    <div className="flex">
      {people.map((p, i) => (
        <span
          key={i}
          className="rounded-full text-white font-semibold flex items-center justify-center shrink-0 border-2 border-white"
          style={{
            background: p.color,
            width: 22,
            height: 22,
            fontSize: 10,
            marginLeft: i === 0 ? 0 : -6,
          }}
        >
          {p.initials}
        </span>
      ))}
    </div>
  )
}
