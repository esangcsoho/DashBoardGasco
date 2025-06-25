"use client";

import * as React from "react";
import { useForm, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@tremor/react";
import {
  RiErrorWarningLine,
  RiCheckLine,
  RiInformationLine,
} from "@remixicon/react";

// Componente Form
interface FormProps<T extends FieldValues> extends React.ComponentProps<"form"> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
}

function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </form>
  );
}

// Componente FormField
interface FormFieldProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  error,
  description,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = React.useId();

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
        >
          {label}
          {required && <span className="text-red-500 dark:text-red-400">*</span>}
        </label>
      )}
      {children}
      {description && (
        <p className="text-sm text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
          {description}
        </p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
          <RiErrorWarningLine className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

// Componente Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block w-full rounded-tremor-default border px-3 py-2 text-tremor-default shadow-tremor-input outline-none",
          "bg-tremor-background dark:bg-dark-tremor-background",
          "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle",
          "border-tremor-border dark:border-dark-tremor-border",
          "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-200/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Componente Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <select
        className={cn(
          "block w-full rounded-tremor-default border px-3 py-2 text-tremor-default shadow-tremor-input outline-none",
          "bg-tremor-background dark:bg-dark-tremor-background",
          "border-tremor-border dark:border-dark-tremor-border",
          "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-200/20",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";

// Componente Textarea
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "block w-full rounded-tremor-default border px-3 py-2 text-tremor-default shadow-tremor-input outline-none",
          "bg-tremor-background dark:bg-dark-tremor-background",
          "placeholder:text-tremor-content-subtle dark:placeholder:text-dark-tremor-content-subtle",
          "border-tremor-border dark:border-dark-tremor-border",
          "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-200/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Componente FormAlert
interface FormAlertProps {
  type: "success" | "error" | "info";
  message: string;
  className?: string;
}

function FormAlert({ type, message, className }: FormAlertProps) {
  const styles = {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      border: "border-emerald-200 dark:border-emerald-900",
      text: "text-emerald-800 dark:text-emerald-200",
      icon: <RiCheckLine className="h-5 w-5 text-emerald-500" />,
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/50",
      border: "border-red-200 dark:border-red-900",
      text: "text-red-800 dark:text-red-200",
      icon: <RiErrorWarningLine className="h-5 w-5 text-red-500" />,
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/50",
      border: "border-blue-200 dark:border-blue-900",
      text: "text-blue-800 dark:text-blue-200",
      icon: <RiInformationLine className="h-5 w-5 text-blue-500" />,
    },
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-tremor-default border p-4",
        styles[type].bg,
        styles[type].border,
        styles[type].text,
        className
      )}
    >
      {styles[type].icon}
      <p className="text-sm">{message}</p>
    </div>
  );
}

// Componente FormActions
interface FormActionsProps extends React.ComponentProps<"div"> {
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

function FormActions({
  isSubmitting,
  submitText = "Guardar",
  cancelText = "Cancelar",
  onCancel,
  className,
  ...props
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {onCancel && (
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {cancelText}
        </Button>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
        loading={isSubmitting}
      >
        {submitText}
      </Button>
    </div>
  );
}

export {
  Form,
  FormField,
  Input,
  Select,
  Textarea,
  FormAlert,
  FormActions,
  type FormProps,
  type FormFieldProps,
  type InputProps,
  type SelectProps,
  type TextareaProps,
  type FormAlertProps,
  type FormActionsProps,
}; 