import { DialogSurface } from './DialogSurface'
import type { ComponentProps } from 'react'

export function Drawer(
  props: Omit<ComponentProps<typeof DialogSurface>, 'drawer'>,
) {
  return <DialogSurface {...props} drawer />
}
