import { DialogSurface } from './DialogSurface'
import type { ComponentProps } from 'react'

export function Modal(
  props: Omit<ComponentProps<typeof DialogSurface>, 'drawer'>,
) {
  return <DialogSurface {...props} />
}
