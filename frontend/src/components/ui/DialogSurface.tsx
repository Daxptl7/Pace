import { useEffect, useId, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { IconButton } from './IconButton'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

function DialogContent({
  onClose,
  title,
  children,
  drawer,
}: Omit<DialogProps, 'open'> & { drawer: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef(onClose)
  const titleId = useId()
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])
  useEffect(() => {
    const dialog = ref.current
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])
  return (
    <motion.dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`dialog ${drawer ? 'dialog--drawer' : 'dialog--modal'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      onCancel={(event) => {
        event.preventDefault()
        closeRef.current()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeRef.current()
      }}
    >
      <motion.div
        className="dialog-panel"
        initial={
          drawer
            ? { x: reduceMotion ? 0 : '100%' }
            : { y: reduceMotion ? 0 : 12 }
        }
        animate={{ x: 0, y: 0 }}
        exit={drawer ? { x: reduceMotion ? 0 : '100%' } : { y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      >
        <div className="dialog-heading">
          <h2 id={titleId}>{title}</h2>
          <IconButton label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </motion.dialog>
  )
}

export function DialogSurface({
  open,
  drawer = false,
  ...props
}: DialogProps & { drawer?: boolean }) {
  return createPortal(
    <AnimatePresence>
      {open && <DialogContent {...props} drawer={drawer} />}
    </AnimatePresence>,
    document.body,
  )
}
