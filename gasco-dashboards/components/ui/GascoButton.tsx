"use client";

import * as React from "react";
import { Button as TremorButton, type ButtonProps as TremorButtonProps } from "@tremor/react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<TremorButtonProps, "variant" | "size"> {
  variant?:
    | "primary"
    | "secondary"
    | "light"
    | "danger"
    | "warning"
    | "success";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    // Mapear variantes de Gasco a variantes de Tremor
    const tremorVariant = React.useMemo(() => {
      switch (variant) {
        case "primary":
          return undefined; // Tremor's default is primary
        case "secondary":
          return "secondary";
        case "light":
          return "light";
        case "danger":
          return undefined; // We'll handle this with custom styles
        case "warning":
          return undefined; // We'll handle this with custom styles
        case "success":
          return undefined; // We'll handle this with custom styles
        default:
          return undefined;
      }
    }, [variant]);

    // Estilos personalizados basados en la variante
    const customStyles = React.useMemo(() => {
      switch (variant) {
        case "danger":
          return "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white";
        case "warning":
          return "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white";
        case "success":
          return "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white";
        default:
          return "";
      }
    }, [variant]);

    // Mapear tamaños de Gasco a tamaños de Tremor
    const tremorSize = React.useMemo(() => {
      switch (size) {
        case "xs":
          return "xs";
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "lg";
        default:
          return "md";
      }
    }, [size]);

    return (
      <TremorButton
        ref={ref}
        variant={tremorVariant as TremorButtonProps["variant"]}
        size={tremorSize}
        className={cn(
          // Base styles
          "relative font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tremor-brand dark:focus-visible:ring-dark-tremor-brand",
          // Custom variant styles
          customStyles,
          // Loading state styles
          loading &&
            "cursor-wait text-opacity-80 before:absolute before:inset-0 before:z-[1] before:bg-tremor-background/20 dark:before:bg-dark-tremor-background/20",
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div
            className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
            role="status"
          >
            <div className="size-4 animate-spin rounded-full border-2 border-tremor-border border-t-tremor-brand dark:border-dark-tremor-border dark:border-t-dark-tremor-brand" />
            <span className="sr-only">Cargando...</span>
          </div>
        )}
        
        {/* Content wrapper */}
        <span
          className={cn(
            "flex items-center gap-2",
            loading && "invisible",
            iconPosition === "right" && "flex-row-reverse"
          )}
        >
          {Icon && <Icon className="size-4 shrink-0" />}
          {children}
        </span>
      </TremorButton>
    );
  }
);
Button.displayName = "Button"; 