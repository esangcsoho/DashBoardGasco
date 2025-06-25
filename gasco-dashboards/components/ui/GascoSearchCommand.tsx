"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/GascoDialog";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import {
  RiSearchLine,
  RiHome4Line,
  RiDashboard2Line,
  RiGasStationLine,
  RiTruckLine,
  RiTeamLine,
  RiSettings4Line,
  RiArrowRightLine,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

// Tipos para los resultados de búsqueda
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  href: string;
  category: "páginas" | "indicadores" | "cilindros" | "rutas" | "equipo";
}

// Datos de ejemplo para la búsqueda
const searchResults: SearchResult[] = [
  {
    id: "dashboard",
    title: "Panel Principal",
    description: "Vista general del sistema",
    icon: RiHome4Line,
    href: "/dashboard",
    category: "páginas",
  },
  {
    id: "indicadores",
    title: "Indicadores",
    description: "Métricas y KPIs",
    icon: RiDashboard2Line,
    href: "/dashboard/indicadores",
    category: "indicadores",
  },
  {
    id: "cilindros",
    title: "Gestión de Cilindros",
    description: "Inventario y trazabilidad",
    icon: RiGasStationLine,
    href: "/dashboard/cilindros",
    category: "cilindros",
  },
  {
    id: "rutas",
    title: "Rutas de Distribución",
    description: "Planificación y seguimiento",
    icon: RiTruckLine,
    href: "/dashboard/rutas",
    category: "rutas",
  },
  {
    id: "equipo",
    title: "Gestión de Equipo",
    description: "Personal y roles",
    icon: RiTeamLine,
    href: "/dashboard/equipo",
    category: "equipo",
  },
  {
    id: "configuracion",
    title: "Configuración",
    description: "Ajustes del sistema",
    icon: RiSettings4Line,
    href: "/dashboard/configuracion",
    category: "páginas",
  },
];

// Componente Command
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-tremor-default bg-tremor-background dark:bg-dark-tremor-background",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

// Componente CommandInput
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-tremor-border px-4 dark:border-dark-tremor-border"
    cmdk-input-wrapper=""
  >
    <RiSearchLine className="mr-2 size-4 shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-tremor-default bg-transparent py-3 text-sm outline-none placeholder:text-tremor-content-subtle disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-dark-tremor-content-subtle",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

// Componente CommandList
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

// Componente CommandEmpty
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Componente CommandGroup
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden px-2 py-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-tremor-content-strong dark:[&_[cmdk-group-heading]]:text-dark-tremor-content-strong",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// Componente CommandItem
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-tremor-small px-2 py-2 text-sm outline-none",
      "aria-selected:bg-tremor-background-muted aria-selected:text-tremor-content-strong dark:aria-selected:bg-dark-tremor-background-muted dark:aria-selected:text-dark-tremor-content-strong",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// Componente CommandSeparator
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-tremor-border dark:bg-dark-tremor-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Props para el componente principal
interface GascoSearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Componente principal GascoSearchCommand
export function GascoSearchCommand({ open, onOpenChange }: GascoSearchCommandProps) {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  // Agrupar resultados por categoría
  const groupedResults = React.useMemo(() => {
    return searchResults.reduce((acc, result) => {
      const category = result.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    }, {} as Record<string, SearchResult[]>);
  }, []);

  // Manejar la selección de un resultado
  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    onOpenChange(false);
  };

  // Efecto para el atajo de teclado
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-tremor-content-strong dark:[&_[cmdk-group-heading]]:text-dark-tremor-content-strong"
          value={value}
          onValueChange={setValue}
        >
          <CommandInput
            placeholder="Buscar en la aplicación..."
            className="h-12"
          />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            {Object.entries(groupedResults).map(([category, items]) => (
              <CommandGroup key={category} heading={category}>
                {items.map((result) => {
                  const Icon = result.icon || RiArrowRightLine;
                  return (
                    <CommandItem
                      key={result.id}
                      value={result.title}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Icon className="size-4 shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle" />
                      <div className="flex flex-col">
                        <span className="font-medium">{result.title}</span>
                        {result.description && (
                          <span className="text-xs text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
                            {result.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
} 