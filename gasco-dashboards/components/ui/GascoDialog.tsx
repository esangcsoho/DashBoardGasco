"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "@tremor/react";

// Tipos para el diálogo
type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogVariant = "default" | "danger" | "warning" | "success";

const dialogSizes: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[95vw]",
};

const dialogVariants: Record<DialogVariant, string> = {
  default: "border-tremor-border dark:border-dark-tremor-border",
  danger: "border-red-200 dark:border-red-900",
  warning: "border-amber-200 dark:border-amber-900",
  success: "border-emerald-200 dark:border-emerald-900",
};

// Root component
const Dialog = DialogPrimitive.Root;

// Trigger component
const DialogTrigger = DialogPrimitive.Trigger;

// Close component
const DialogClose = DialogPrimitive.Close;

// Content component
interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: DialogSize;
  variant?: DialogVariant;
  showClose?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      size = "md",
      variant = "default",
      showClose = true,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
      />
      <DialogPrimitive.Content
        ref={forwardedRef}
        className={cn(
          // Base styles
          "fixed left-[50%] top-[50%] z-50 grid w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 dark:bg-gray-950",
          // Animation
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          // Size and variant
          dialogSizes[size],
          dialogVariants[variant],
          // Border radius
          "rounded-tremor-default",
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity",
              "hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-tremor-brand-muted focus:ring-offset-2 dark:focus:ring-dark-tremor-brand-muted",
              "disabled:pointer-events-none",
              "data-[state=open]:bg-tremor-background dark:data-[state=open]:bg-dark-tremor-background"
            )}
          >
            <RiCloseLine className="h-5 w-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle" />
            <span className="sr-only">Cerrar</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Header component
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

// Footer component
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

// Title component
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Description component
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-tremor-content dark:text-dark-tremor-content",
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Actions component
interface DialogActionsProps extends React.ComponentProps<"div"> {
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DialogActions = ({
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
  onConfirm,
  onCancel,
  className,
  ...props
}: DialogActionsProps) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  >
    <DialogClose asChild>
      <Button variant="secondary" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
    </DialogClose>
    <DialogClose asChild>
      <Button
        variant={variant === "danger" ? "error" : "primary"}
        onClick={onConfirm}
        loading={loading}
      >
        {confirmText}
      </Button>
    </DialogClose>
  </div>
);
DialogActions.displayName = "DialogActions";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogActions,
  type DialogContentProps,
  type DialogActionsProps,
}; 