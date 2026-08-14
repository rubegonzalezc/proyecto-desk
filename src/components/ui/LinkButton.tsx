'use client'

import Link from 'next/link'
import { Button, type ButtonProps } from '@mui/material'

type LinkButtonProps = ButtonProps & { href: string }

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button component={Link} href={href} {...props} />
}
