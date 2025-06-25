"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { RiCalendar2Line } from "@remixicon/react";
import { format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@tremor/react";

// Tipos para los presets de fechas
export interface DatePreset {
  label: string;
  value: Date | { from: Date; to: Date };
}

// Props del componente
interface GascoDatePickerProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  dateRange?: { from: Date; to: Date };
  setDateRange?: (range: { from: Date; to: Date } | undefined) => void;
  presets?: DatePreset[];
  placeholder?: string;
  className?: string;
  showFooter?: boolean;
  mode?: "single" | "range";
  disabled?: boolean;
}

export function GascoDatePicker({
  date,
  setDate,
  dateRange,
  setDateRange,
  presets,
  placeholder = "Seleccionar fecha",
  className,
  showFooter = true,
  mode = "single",
  disabled = false,
}: GascoDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Estado interno para manejar la selección antes de aplicar
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(date);
  const [internalRange, setInternalRange] = React.useState(dateRange);

  // Formatear la fecha para mostrar
  const formatSelectedDate = () => {
    if (mode === "single" && date) {
      return format(date, "dd/MM/yyyy", { locale: es });
    } else if (mode === "range" && dateRange) {
      const { from, to } = dateRange;
      if (from && to) {
        return `${format(from, "dd/MM/yyyy", { locale: es })} - ${format(
          to,
          "dd/MM/yyyy",
          { locale: es }
        )}`;
      }
    }
    return placeholder;
  };

  // Manejar la selección de fecha
  const handleSelect: SelectSingleEventHandler = (selectedDate) => {
    if (mode === "single") {
      setInternalDate(selectedDate);
      if (!showFooter) {
        setDate?.(selectedDate);
        setIsOpen(false);
      }
    }
  };

  // Manejar la selección de preset
  const handlePresetSelect = (preset: DatePreset) => {
    if ("value" in preset) {
      if (preset.value instanceof Date) {
        if (mode === "single") {
          setInternalDate(preset.value);
          if (!showFooter) {
            setDate?.(preset.value);
            setIsOpen(false);
          }
        }
      } else {
        if (mode === "range") {
          setInternalRange(preset.value);
          if (!showFooter) {
            setDateRange?.(preset.value);
            setIsOpen(false);
          }
        }
      }
    }
  };

  // Aplicar la selección
  const handleApply = () => {
    if (mode === "single" && setDate) {
      setDate(internalDate);
    } else if (mode === "range" && setDateRange && internalRange) {
      setDateRange(internalRange);
    }
    setIsOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-tremor-default shadow-tremor-input outline-none",
            "hover:bg-tremor-background-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:hover:bg-dark-tremor-background-muted",
            "focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <span
            className={cn(
              "text-tremor-default",
              !date && !dateRange && "text-tremor-content-subtle"
            )}
          >
            {formatSelectedDate()}
          </span>
          <RiCalendar2Line className="ml-2 h-4 w-4 text-tremor-content-subtle" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className={cn(
            "z-50 mt-2 rounded-tremor-default border border-tremor-border bg-tremor-background p-4 shadow-tremor-dropdown dark:border-dark-tremor-border dark:bg-dark-tremor-background",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <div className="flex gap-4">
            {/* Calendario */}
            <div>
              <DayPicker
                mode={mode}
                selected={mode === "single" ? internalDate : internalRange}
                onSelect={
                  mode === "single"
                    ? handleSelect
                    : (range) =>
                        setInternalRange(
                          range as { from: Date; to: Date } | undefined
                        )
                }
                locale={es}
                showOutsideDays
                className="rounded-tremor-default border border-tremor-border p-3 dark:border-dark-tremor-border"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-tremor-content-subtle rounded-tremor-default w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-tremor-background-subtle dark:[&:has([aria-selected])]:bg-dark-tremor-background-subtle",
                    mode === "range" &&
                      "[&:has(>.day-range-end)]:rounded-r-tremor-default [&:has(>.day-range-start)]:rounded-l-tremor-default"
                  ),
                  day: cn(
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                    mode === "range" &&
                      "day-range hover:bg-tremor-brand-subtle hover:text-tremor-brand-inverted focus:bg-tremor-brand-subtle focus:text-tremor-brand-inverted aria-selected:bg-tremor-brand aria-selected:text-tremor-brand-inverted"
                  ),
                  day_selected:
                    "bg-tremor-brand text-tremor-brand-inverted hover:bg-tremor-brand-emphasis hover:text-tremor-brand-inverted focus:bg-tremor-brand-emphasis focus:text-tremor-brand-inverted",
                  day_today: "bg-tremor-background-subtle text-tremor-content",
                  day_outside: "text-tremor-content-subtle opacity-50",
                  day_disabled: "text-tremor-content-subtle opacity-50",
                  day_range_middle:
                    "aria-selected:bg-tremor-background-subtle aria-selected:text-tremor-content",
                  day_hidden: "invisible",
                }}
              />
            </div>

            {/* Presets */}
            {presets && presets.length > 0 && (
              <div className="flex min-w-[150px] flex-col gap-2 border-l border-tremor-border pl-4 dark:border-dark-tremor-border">
                <p className="text-sm font-medium text-tremor-content">
                  Períodos predefinidos
                </p>
                <div className="flex flex-col gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handlePresetSelect(preset)}
                      className={cn(
                        "rounded-tremor-default px-3 py-1 text-left text-sm",
                        "hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background-subtle",
                        "focus:outline-none focus:ring-2 focus:ring-tremor-brand-muted dark:focus:ring-dark-tremor-brand-muted"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer con botones */}
          {showFooter && (
            <div className="mt-4 flex justify-end gap-2 border-t border-tremor-border pt-4 dark:border-dark-tremor-border">
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 text-sm"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                className="px-3 py-1.5 text-sm"
              >
                Aplicar
              </Button>
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
} 