import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Modal = React.forwardRef(({ className, children, isOpen, onClose, ...props }, ref) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        ref={ref}
        className={cn(
          "relative bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
Modal.displayName = "Modal"

const ModalHeader = React.forwardRef(({ className, children, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-4 border-b border-neutral-200", className)}
    {...props}
  >
    {children}
    {onClose && (
      <button
        onClick={onClose}
        className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
      >
        <X className="h-5 w-5 text-neutral-500" />
      </button>
    )}
  </div>
))
ModalHeader.displayName = "ModalHeader"

const ModalContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
ModalContent.displayName = "ModalContent"

const ModalTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-neutral-900", className)}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

export { Modal, ModalHeader, ModalContent, ModalTitle }