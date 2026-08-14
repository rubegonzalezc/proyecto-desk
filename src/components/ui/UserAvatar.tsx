import { Avatar, type AvatarProps } from '@mui/material'

const hues = ['#2563EB', '#0F172A', '#10B981', '#1D4ED8', '#475467', '#0EA5E9']

function colorFromName(name: string) {
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return hues[index % hues.length]
}

type UserAvatarProps = AvatarProps & {
  name: string
  initials?: string
  size?: number
}

export default function UserAvatar({ name, initials, size = 36, sx, ...props }: UserAvatarProps) {
  const label =
    initials ??
    name
      .split(' ')
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()

  return (
    <Avatar
      {...props}
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        fontWeight: 700,
        bgcolor: colorFromName(name),
        letterSpacing: '-0.02em',
        ...sx,
      }}
    >
      {label}
    </Avatar>
  )
}
