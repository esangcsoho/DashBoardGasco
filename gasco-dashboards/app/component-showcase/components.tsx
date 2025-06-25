"use client";

import React from "react";
import { Card, Title, Text } from "@tremor/react";
import GascoAreaChart from "@/components/charts/GascoAreaChart";
import GascoCategoryBar from "@/components/charts/GascoCategoryBar";
import { GascoProgressCircle } from "@/components/charts/GascoProgressCircle";
import GascoLineChart from "@/components/charts/GascoLineChart";
import { GascoSearchCommand } from "@/components/ui/GascoSearchCommand";
import {
  RiDashboardLine,
  RiFilterLine,
  RiGasStationLine,
  RiMapPinLine,
  RiTruckLine,
  RiAddLine,
  RiAlertLine,
  RiCheckLine,
  RiCloseLine,
  RiLoader4Line,
} from "@remixicon/react";
import { GascoDatePicker } from "@/components/ui/GascoDatePicker";
import { addDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { GascoDataTable } from "@/components/ui/GascoDataTable";
import { Badge } from "@tremor/react";
import {
  Form,
  FormField,
  Input,
  Select,
  Textarea,
  FormAlert,
  FormActions,
} from "@/components/ui/GascoForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogActions,
} from "@/components/ui/GascoDialog";
import { Button } from "@/components/ui/GascoButton";
import { GascoSidebar } from "@/components/ui/GascoSidebar";

// Componentes base para CompendioSesiones
export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-6">
      <Title>{title}</Title>
      {children}
    </div>
  );
};

export const VersionBlock = ({ 
  version, 
  description, 
  children 
}: { 
  version: string; 
  description: string; 
  children: React.ReactNode;
}) => {
  return (
    <Card>
      <div className="space-y-2">
        <Title className="text-lg">{version}</Title>
        <Text className="text-gray-600">{description}</Text>
        {children}
      </div>
    </Card>
  );
};

// Datos de ejemplo para los gráficos
const stockData = [
  { fecha: "2024-01", propano: 1200, butano: 800, mezcla: 950 },
  { fecha: "2024-02", propano: 1150, butano: 850, mezcla: 900 },
  { fecha: "2024-03", propano: 1300, butano: 750, mezcla: 1000 },
  { fecha: "2024-04", propano: 1250, butano: 820, mezcla: 980 },
  { fecha: "2024-05", propano: 1400, butano: 780, mezcla: 920 },
  { fecha: "2024-06", propano: 1350, butano: 900, mezcla: 960 },
];

const rendimientoData = [
  { fecha: "2024-01", real: 95, objetivo: 98 },
  { fecha: "2024-02", real: 96, objetivo: 98 },
  { fecha: "2024-03", real: 97, objetivo: 98 },
  { fecha: "2024-04", real: 94, objetivo: 98 },
  { fecha: "2024-05", real: 98, objetivo: 98 },
  { fecha: "2024-06", real: 97, objetivo: 98 },
];

// Tipos para los datos de ejemplo
type Cilindro = {
  id: string;
  tipo: string;
  capacidad: number;
  estado: "Disponible" | "En uso" | "Mantenimiento";
  ubicacion: string;
  ultimaRevision: string;
};

type Pedido = {
  id: string;
  cliente: string;
  fecha: string;
  estado: "Pendiente" | "En proceso" | "Entregado" | "Cancelado";
  total: number;
  direccion: string;
};

export function CylinderDistributionExample() {
  const data = [
    {
      label: "Cilindros 5kg",
      value: 12500,
      color: "#0066FF",
    },
    {
      label: "Cilindros 11kg",
      value: 45000,
      color: "#22C55E",
    },
    {
      label: "Cilindros 15kg",
      value: 32500,
      color: "#F59E0B",
    },
    {
      label: "Cilindros 45kg",
      value: 10000,
      color: "#EF4444",
    },
  ];

  const formatValue = (value: number) => 
    new Intl.NumberFormat("es-CL").format(value);

  return (
    <GascoCategoryBar
      title="Distribución de Cilindros por Tipo"
      description="Distribución actual del inventario de cilindros por capacidad"
      data={data}
      marker={{
        value: 60000,
        label: "Objetivo",
      }}
      formatValue={formatValue}
    />
  );
}

export function CylinderStatusExample() {
  const data = [
    {
      label: "Disponible",
      value: 75000,
      color: "#22C55E", // Verde para disponible
    },
    {
      label: "En Ruta",
      value: 15000,
      color: "#0066FF", // Azul para en ruta
    },
    {
      label: "En Mantenimiento",
      value: 8000,
      color: "#F59E0B", // Naranja para mantenimiento
    },
    {
      label: "Fuera de Servicio",
      value: 2000,
      color: "#EF4444", // Rojo para fuera de servicio
    },
  ];

  const formatValue = (value: number) => 
    new Intl.NumberFormat("es-CL").format(value);

  return (
    <GascoCategoryBar
      title="Estado de Cilindros en Flota"
      description="Distribución actual de cilindros según su estado operacional"
      data={data}
      marker={{
        value: 90000,
        label: "Capacidad Total",
      }}
      formatValue={formatValue}
    />
  );
}

export function KPIProgressExample() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Eficiencia Operacional */}
      <GascoProgressCircle
        value={92}
        variant="primary"
        title="Eficiencia Operacional"
        description="Rendimiento general de la planta"
      />

      {/* Cumplimiento de Mantenimiento */}
      <GascoProgressCircle
        value={85}
        variant="success"
        title="Mantenimiento Preventivo"
        description="Cumplimiento del programa mensual"
      />

      {/* Nivel de Stock */}
      <GascoProgressCircle
        value={68}
        variant="warning"
        title="Nivel de Stock"
        description="Capacidad actual de almacenamiento"
      />

      {/* Incidentes */}
      <GascoProgressCircle
        value={15}
        variant="danger"
        title="Tasa de Incidentes"
        description="Porcentaje mensual de reportes"
        formatValue={(value) => `${value} casos`}
      />
    </div>
  );
}

export function LineChartExamples() {
  // Datos de ejemplo para consumo de gas
  const consumoData = [
    { fecha: "2024-01", residencial: 1200, industrial: 3500, comercial: 850 },
    { fecha: "2024-02", residencial: 1150, industrial: 3600, comercial: 900 },
    { fecha: "2024-03", residencial: 1300, industrial: 3400, comercial: 950 },
    { fecha: "2024-04", residencial: 1400, industrial: 3300, comercial: 1000 },
    { fecha: "2024-05", residencial: 1600, industrial: 3200, comercial: 1100 },
    { fecha: "2024-06", residencial: 1800, industrial: 3100, comercial: 1200 },
  ];

  // Datos de ejemplo para niveles de stock
  const stockData = [
    { fecha: "2024-01", propano: 85, butano: 75, mezcla: 90 },
    { fecha: "2024-02", propano: 82, butano: 78, mezcla: 88 },
    { fecha: "2024-03", propano: 80, butano: 80, mezcla: 85 },
    { fecha: "2024-04", propano: 75, butano: 85, mezcla: 82 },
    { fecha: "2024-05", propano: 70, butano: 88, mezcla: 80 },
    { fecha: "2024-06", propano: 68, butano: 90, mezcla: 78 },
  ];

  return (
    <div className="space-y-8">
      {/* Gráfico de Consumo por Sector */}
      <GascoLineChart
        data={consumoData}
        index="fecha"
        categories={["residencial", "industrial", "comercial"]}
        title="Consumo de Gas por Sector"
        description="Evolución mensual del consumo de gas por tipo de cliente"
        valueFormatter={(value) => `${value} m³`}
        xAxisLabel="Período"
        yAxisLabel="Consumo (m³)"
      />

      {/* Gráfico de Niveles de Stock */}
      <GascoLineChart
        data={stockData}
        index="fecha"
        categories={["propano", "butano", "mezcla"]}
        title="Niveles de Stock"
        description="Porcentaje de capacidad disponible por tipo de gas"
        valueFormatter={(value) => `${value}%`}
        minValue={0}
        maxValue={100}
        xAxisLabel="Período"
        yAxisLabel="Capacidad (%)"
      />
    </div>
  );
}

export function SearchCommandExample() {
  const commands = [
    {
      id: "dashboard",
      label: "Ver Dashboard",
      type: "navigation" as const,
      shortcut: "d",
      icon: <RiDashboardLine className="h-4 w-4" />,
      action: () => console.log("Navegando al dashboard"),
    },
    {
      id: "cilindros",
      label: "Buscar Cilindros",
      type: "action" as const,
      shortcut: "c",
      icon: <RiGasStationLine className="h-4 w-4" />,
      action: () => console.log("Abriendo búsqueda de cilindros"),
    },
    {
      id: "rutas",
      label: "Gestionar Rutas",
      type: "navigation" as const,
      shortcut: "r",
      icon: <RiTruckLine className="h-4 w-4" />,
      action: () => console.log("Navegando a gestión de rutas"),
    },
    {
      id: "plantas",
      label: "Ver Plantas",
      type: "navigation" as const,
      shortcut: "p",
      icon: <RiMapPinLine className="h-4 w-4" />,
      action: () => console.log("Navegando a vista de plantas"),
    },
    {
      id: "filtros",
      label: "Filtros Avanzados",
      type: "filter" as const,
      shortcut: "f",
      icon: <RiFilterLine className="h-4 w-4" />,
      action: () => console.log("Abriendo filtros avanzados"),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Presiona <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs dark:border-gray-700 dark:bg-gray-800">⌘</kbd> + <kbd className="rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs dark:border-gray-700 dark:bg-gray-800">K</kbd> para abrir
        </p>
      </div>
      
      <GascoSearchCommand
        commands={commands}
        placeholder="Buscar acciones, reportes, filtros..."
        onSearch={(query) => console.log("Buscando:", query)}
      />
    </div>
  );
}

export function DatePickerExamples() {
  // Estados para el selector de fecha única
  const [date, setDate] = React.useState<Date>();

  // Estados para el selector de rango
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>();

  // Presets para fecha única
  const singleDatePresets = [
    {
      label: "Hoy",
      value: new Date(),
    },
    {
      label: "Ayer",
      value: addDays(new Date(), -1),
    },
    {
      label: "Hace una semana",
      value: addDays(new Date(), -7),
    },
  ];

  // Presets para rango de fechas
  const rangeDatePresets = [
    {
      label: "Mes actual",
      value: {
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
      },
    },
    {
      label: "Mes anterior",
      value: {
        from: startOfMonth(subMonths(new Date(), 1)),
        to: endOfMonth(subMonths(new Date(), 1)),
      },
    },
    {
      label: "Últimos 30 días",
      value: {
        from: addDays(new Date(), -30),
        to: new Date(),
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Selector de fecha única */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Fecha única</h3>
          <p className="text-sm text-gray-500">
            Selecciona una fecha específica
          </p>
        </div>
        <GascoDatePicker
          date={date}
          setDate={setDate}
          presets={singleDatePresets}
          placeholder="Seleccionar fecha"
          mode="single"
        />
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="font-medium">Fecha seleccionada:</p>
          <p className="mt-1 font-mono text-gray-600 dark:text-gray-400">
            {date?.toLocaleDateString("es-CL") || "Sin selección"}
          </p>
        </div>
      </div>

      {/* Selector de rango de fechas */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Rango de fechas</h3>
          <p className="text-sm text-gray-500">
            Selecciona un período de tiempo
          </p>
        </div>
        <GascoDatePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          presets={rangeDatePresets}
          placeholder="Seleccionar rango de fechas"
          mode="range"
        />
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="font-medium">Rango seleccionado:</p>
          <p className="mt-1 font-mono text-gray-600 dark:text-gray-400">
            {dateRange
              ? `${dateRange.from.toLocaleDateString(
                  "es-CL"
                )} - ${dateRange.to.toLocaleDateString("es-CL")}`
              : "Sin selección"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DataTableExamples() {
  // Datos de ejemplo para cilindros
  const cilindros: Cilindro[] = [
    {
      id: "CIL001",
      tipo: "GLP Doméstico",
      capacidad: 15,
      estado: "Disponible",
      ubicacion: "Planta Santiago",
      ultimaRevision: "2024-02-15",
    },
    {
      id: "CIL002",
      tipo: "GLP Industrial",
      capacidad: 45,
      estado: "En uso",
      ubicacion: "Cliente Industrial A",
      ultimaRevision: "2024-01-20",
    },
    {
      id: "CIL003",
      tipo: "GLP Doméstico",
      capacidad: 11,
      estado: "Mantenimiento",
      ubicacion: "Taller Central",
      ultimaRevision: "2024-03-01",
    },
    {
      id: "CIL004",
      tipo: "GLP Industrial",
      capacidad: 33,
      estado: "Disponible",
      ubicacion: "Planta Valparaíso",
      ultimaRevision: "2024-02-28",
    },
    {
      id: "CIL005",
      tipo: "GLP Doméstico",
      capacidad: 15,
      estado: "En uso",
      ubicacion: "Distribuidor Local",
      ultimaRevision: "2024-02-10",
    },
  ];

  // Datos de ejemplo para pedidos
  const pedidos: Pedido[] = [
    {
      id: "PED001",
      cliente: "Juan Pérez",
      fecha: "2024-03-10",
      estado: "Pendiente",
      total: 45000,
      direccion: "Av. Providencia 1234, Santiago",
    },
    {
      id: "PED002",
      cliente: "Empresa ABC",
      fecha: "2024-03-09",
      estado: "En proceso",
      total: 150000,
      direccion: "Av. Las Condes 5678, Las Condes",
    },
    {
      id: "PED003",
      cliente: "María González",
      fecha: "2024-03-08",
      estado: "Entregado",
      total: 30000,
      direccion: "Calle Nueva 432, Ñuñoa",
    },
    {
      id: "PED004",
      cliente: "Restaurant XYZ",
      fecha: "2024-03-07",
      estado: "Cancelado",
      total: 90000,
      direccion: "Av. Kennedy 9876, Vitacura",
    },
    {
      id: "PED005",
      cliente: "Ana Silva",
      fecha: "2024-03-06",
      estado: "Entregado",
      total: 45000,
      direccion: "Pasaje Los Aromos 123, La Florida",
    },
  ];

  // Columnas para la tabla de cilindros
  const columnasCilindros = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "capacidad",
      header: "Capacidad (kg)",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string;
        const color = {
          Disponible: "emerald",
          "En uso": "blue",
          Mantenimiento: "amber",
        }[estado];
        return <Badge color={color}>{estado}</Badge>;
      },
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
    },
    {
      accessorKey: "ultimaRevision",
      header: "Última Revisión",
      cell: ({ row }) => {
        const fecha = new Date(row.getValue("ultimaRevision"));
        return fecha.toLocaleDateString("es-CL");
      },
    },
  ];

  // Columnas para la tabla de pedidos
  const columnasPedidos = [
    {
      accessorKey: "id",
      header: "ID Pedido",
    },
    {
      accessorKey: "cliente",
      header: "Cliente",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => {
        const fecha = new Date(row.getValue("fecha"));
        return fecha.toLocaleDateString("es-CL");
      },
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string;
        const color = {
          Pendiente: "amber",
          "En proceso": "blue",
          Entregado: "emerald",
          Cancelado: "rose",
        }[estado];
        return <Badge color={color}>{estado}</Badge>;
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const total = row.getValue("total") as number;
        return total.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        });
      },
    },
    {
      accessorKey: "direccion",
      header: "Dirección",
    },
  ];

  const handleRowClick = (row: any) => {
    console.log("Fila seleccionada:", row);
  };

  return (
    <div className="space-y-8">
      {/* Tabla de Cilindros */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Inventario de Cilindros</h3>
          <p className="text-sm text-gray-500">
            Tabla con selección múltiple y estados visuales
          </p>
        </div>
        <GascoDataTable
          columns={columnasCilindros}
          data={cilindros}
          enableRowSelection
          pageSize={5}
        />
      </div>

      {/* Tabla de Pedidos */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Registro de Pedidos</h3>
          <p className="text-sm text-gray-500">
            Tabla con formato de moneda y fechas
          </p>
        </div>
        <GascoDataTable
          columns={columnasPedidos}
          data={pedidos}
          onRowClick={handleRowClick}
          pageSize={5}
        />
      </div>
    </div>
  );
}

// Esquema de validación para el formulario de pedido
const pedidoSchema = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingrese un email válido"),
  telefono: z
    .string()
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .max(12, "El teléfono no puede tener más de 12 dígitos"),
  tipo: z.enum(["domicilio", "empresa", "distribuidor"], {
    required_error: "Seleccione un tipo de cliente",
  }),
  direccion: z.string().min(10, "La dirección debe tener al menos 10 caracteres"),
  notas: z.string().optional(),
});

type PedidoFormValues = z.infer<typeof pedidoSchema>;

// Esquema de validación para el formulario de cilindro
const cilindroSchema = z.object({
  codigo: z.string().min(5, "El código debe tener al menos 5 caracteres"),
  tipo: z.enum(["domestico", "industrial", "comercial"], {
    required_error: "Seleccione un tipo de cilindro",
  }),
  capacidad: z
    .number({
      required_error: "Ingrese la capacidad",
      invalid_type_error: "La capacidad debe ser un número",
    })
    .min(5, "La capacidad mínima es 5kg")
    .max(45, "La capacidad máxima es 45kg"),
  ubicacion: z.string().min(3, "Ingrese una ubicación válida"),
  estado: z.enum(["disponible", "en_uso", "mantenimiento"], {
    required_error: "Seleccione un estado",
  }),
  notas: z.string().optional(),
});

type CilindroFormValues = z.infer<typeof cilindroSchema>;

export function FormExamples() {
  // Estado para mostrar mensajes de éxito
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Form para pedido
  const pedidoForm = useForm<PedidoFormValues>({
    resolver: zodResolver(pedidoSchema),
    defaultValues: {
      tipo: "domicilio",
    },
  });

  // Form para cilindro
  const cilindroForm = useForm<CilindroFormValues>({
    resolver: zodResolver(cilindroSchema),
    defaultValues: {
      tipo: "domestico",
      estado: "disponible",
    },
  });

  // Manejadores de submit
  const onPedidoSubmit = async (values: PedidoFormValues) => {
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Pedido:", values);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    pedidoForm.reset();
  };

  const onCilindroSubmit = async (values: CilindroFormValues) => {
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Cilindro:", values);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    cilindroForm.reset();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Formulario de Pedido */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Registro de Pedido</h3>
          <p className="text-sm text-gray-500">
            Formulario con validación y campos requeridos
          </p>
        </div>

        <Form
          form={pedidoForm}
          onSubmit={onPedidoSubmit}
          className="rounded-tremor-default border border-tremor-border p-4 dark:border-dark-tremor-border"
        >
          <FormField
            label="Cliente"
            error={pedidoForm.formState.errors.cliente?.message}
            required
          >
            <Input
              placeholder="Nombre del cliente"
              error={!!pedidoForm.formState.errors.cliente}
              {...pedidoForm.register("cliente")}
            />
          </FormField>

          <FormField
            label="Email"
            error={pedidoForm.formState.errors.email?.message}
            required
          >
            <Input
              type="email"
              placeholder="email@ejemplo.com"
              error={!!pedidoForm.formState.errors.email}
              {...pedidoForm.register("email")}
            />
          </FormField>

          <FormField
            label="Teléfono"
            error={pedidoForm.formState.errors.telefono?.message}
            required
          >
            <Input
              type="tel"
              placeholder="+56 9 1234 5678"
              error={!!pedidoForm.formState.errors.telefono}
              {...pedidoForm.register("telefono")}
            />
          </FormField>

          <FormField
            label="Tipo de Cliente"
            error={pedidoForm.formState.errors.tipo?.message}
            required
          >
            <Select
              error={!!pedidoForm.formState.errors.tipo}
              options={[
                { value: "domicilio", label: "Domicilio" },
                { value: "empresa", label: "Empresa" },
                { value: "distribuidor", label: "Distribuidor" },
              ]}
              {...pedidoForm.register("tipo")}
            />
          </FormField>

          <FormField
            label="Dirección"
            error={pedidoForm.formState.errors.direccion?.message}
            required
          >
            <Input
              placeholder="Dirección de entrega"
              error={!!pedidoForm.formState.errors.direccion}
              {...pedidoForm.register("direccion")}
            />
          </FormField>

          <FormField
            label="Notas"
            error={pedidoForm.formState.errors.notas?.message}
            description="Instrucciones especiales o comentarios adicionales"
          >
            <Textarea
              placeholder="Notas adicionales..."
              error={!!pedidoForm.formState.errors.notas}
              {...pedidoForm.register("notas")}
            />
          </FormField>

          <FormActions
            isSubmitting={pedidoForm.formState.isSubmitting}
            onCancel={() => pedidoForm.reset()}
          />
        </Form>
      </div>

      {/* Formulario de Cilindro */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Registro de Cilindro</h3>
          <p className="text-sm text-gray-500">
            Formulario con validación numérica y estados
          </p>
        </div>

        <Form
          form={cilindroForm}
          onSubmit={onCilindroSubmit}
          className="rounded-tremor-default border border-tremor-border p-4 dark:border-dark-tremor-border"
        >
          <FormField
            label="Código"
            error={cilindroForm.formState.errors.codigo?.message}
            required
          >
            <Input
              placeholder="CIL-00000"
              error={!!cilindroForm.formState.errors.codigo}
              {...cilindroForm.register("codigo")}
            />
          </FormField>

          <FormField
            label="Tipo"
            error={cilindroForm.formState.errors.tipo?.message}
            required
          >
            <Select
              error={!!cilindroForm.formState.errors.tipo}
              options={[
                { value: "domestico", label: "Doméstico" },
                { value: "industrial", label: "Industrial" },
                { value: "comercial", label: "Comercial" },
              ]}
              {...cilindroForm.register("tipo")}
            />
          </FormField>

          <FormField
            label="Capacidad (kg)"
            error={cilindroForm.formState.errors.capacidad?.message}
            required
          >
            <Input
              type="number"
              placeholder="15"
              error={!!cilindroForm.formState.errors.capacidad}
              {...cilindroForm.register("capacidad", { valueAsNumber: true })}
            />
          </FormField>

          <FormField
            label="Ubicación"
            error={cilindroForm.formState.errors.ubicacion?.message}
            required
          >
            <Input
              placeholder="Planta o ubicación"
              error={!!cilindroForm.formState.errors.ubicacion}
              {...cilindroForm.register("ubicacion")}
            />
          </FormField>

          <FormField
            label="Estado"
            error={cilindroForm.formState.errors.estado?.message}
            required
          >
            <Select
              error={!!cilindroForm.formState.errors.estado}
              options={[
                { value: "disponible", label: "Disponible" },
                { value: "en_uso", label: "En Uso" },
                { value: "mantenimiento", label: "Mantenimiento" },
              ]}
              {...cilindroForm.register("estado")}
            />
          </FormField>

          <FormField
            label="Notas"
            error={cilindroForm.formState.errors.notas?.message}
            description="Observaciones o detalles adicionales"
          >
            <Textarea
              placeholder="Notas..."
              error={!!cilindroForm.formState.errors.notas}
              {...cilindroForm.register("notas")}
            />
          </FormField>

          <FormActions
            isSubmitting={cilindroForm.formState.isSubmitting}
            onCancel={() => cilindroForm.reset()}
          />
        </Form>
      </div>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="col-span-full">
          <FormAlert
            type="success"
            message="Los datos se han guardado correctamente"
          />
        </div>
      )}
    </div>
  );
}

export function DialogExamples() {
  // Estado para simular carga
  const [loading, setLoading] = React.useState(false);

  // Manejador de confirmación con delay
  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Diálogo Simple */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Diálogo Simple</h3>
          <p className="text-sm text-gray-500">
            Diálogo básico con título y descripción
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir Diálogo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Información del Pedido</DialogTitle>
              <DialogDescription>
                Revise los detalles del pedido antes de continuar.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-tremor-content dark:text-dark-tremor-content">
                Este es un ejemplo de contenido en el diálogo. Puede contener
                cualquier tipo de contenido, incluyendo formularios, tablas o
                gráficos.
              </p>
            </div>
            <DialogActions />
          </DialogContent>
        </Dialog>
      </div>

      {/* Diálogo de Confirmación */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Diálogo de Confirmación</h3>
          <p className="text-sm text-gray-500">
            Diálogo para confirmar acciones importantes
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="error">Eliminar Pedido</Button>
          </DialogTrigger>
          <DialogContent variant="danger" size="sm">
            <DialogHeader>
              <DialogTitle>¿Eliminar Pedido?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el
                pedido #123 del sistema.
              </DialogDescription>
            </DialogHeader>
            <DialogActions
              variant="danger"
              confirmText="Eliminar"
              loading={loading}
              onConfirm={handleConfirm}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Diálogo con Formulario */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Diálogo con Formulario</h3>
          <p className="text-sm text-gray-500">
            Diálogo que contiene un formulario
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Nuevo Cliente</Button>
          </DialogTrigger>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Registrar Cliente</DialogTitle>
              <DialogDescription>
                Complete el formulario para registrar un nuevo cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField label="Nombre" required>
                <Input placeholder="Nombre completo" />
              </FormField>
              <FormField label="Email" required>
                <Input type="email" placeholder="email@ejemplo.com" />
              </FormField>
              <FormField label="Tipo de Cliente" required>
                <Select
                  options={[
                    { value: "domicilio", label: "Domicilio" },
                    { value: "empresa", label: "Empresa" },
                    { value: "distribuidor", label: "Distribuidor" },
                  ]}
                />
              </FormField>
            </div>
            <DialogActions confirmText="Guardar" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Diálogo con Éxito */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Diálogo con Éxito</h3>
          <p className="text-sm text-gray-500">
            Diálogo para confirmar operaciones exitosas
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Ver Confirmación</Button>
          </DialogTrigger>
          <DialogContent variant="success" size="sm">
            <DialogHeader>
              <DialogTitle>¡Operación Exitosa!</DialogTitle>
              <DialogDescription>
                El pedido #123 ha sido procesado correctamente y está listo para
                ser entregado.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormAlert
                type="success"
                message="Se ha enviado una notificación al cliente con los detalles del pedido."
              />
            </div>
            <DialogActions confirmText="Entendido" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function SidebarExample() {
  // Usuario de ejemplo
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@gasco.cl",
    role: "Supervisor de Planta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-tremor-default border border-tremor-border dark:border-dark-tremor-border">
      <GascoSidebar user={user} />
      <div className="lg:pl-64">
        <div className="p-8">
          <div className="mx-auto max-w-2xl space-y-8">
            <div>
              <h3 className="text-lg font-medium">Navegación Lateral</h3>
              <p className="text-sm text-gray-500">
                Barra lateral con navegación, perfil de usuario y búsqueda global
              </p>
            </div>

            <div className="rounded-tremor-default border border-tremor-border bg-tremor-background-subtle p-4 dark:border-dark-tremor-border dark:bg-dark-tremor-background-subtle">
              <h4 className="font-medium">Características Principales:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-tremor-content dark:text-dark-tremor-content">
                <li>Modo colapsado para optimizar espacio</li>
                <li>Navegación con íconos y badges</li>
                <li>Perfil de usuario con estado en línea</li>
                <li>Búsqueda global con atajo de teclado (⌘K)</li>
                <li>Diseño responsive con barra superior en móvil</li>
                <li>Soporte para tema claro/oscuro</li>
              </ul>
            </div>

            <div className="rounded-tremor-default border border-tremor-border bg-tremor-background-subtle p-4 dark:border-dark-tremor-border dark:bg-dark-tremor-background-subtle">
              <h4 className="font-medium">Instrucciones:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-tremor-content dark:text-dark-tremor-content">
                <li>
                  Haz clic en el botón de colapsar para cambiar el modo de
                  visualización
                </li>
                <li>
                  Presiona ⌘K o haz clic en el botón de búsqueda para abrir la
                  búsqueda global
                </li>
                <li>
                  Prueba la navegación y observa los estados activos de los enlaces
                </li>
                <li>
                  Ajusta el tamaño de la ventana para ver el comportamiento
                  responsive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ButtonExamples() {
  const [loading, setLoading] = React.useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Botones</h3>
        <p className="text-sm text-gray-500">
          Componente de botón con diferentes variantes, tamaños y estados
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-3 font-medium">Variantes</h4>
          <div className="flex flex-wrap gap-3">
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="light">Light</Button>
            <Button variant="success" icon={RiCheckLine}>
              Éxito
            </Button>
            <Button variant="warning" icon={RiAlertLine}>
              Advertencia
            </Button>
            <Button variant="danger" icon={RiCloseLine}>
              Peligro
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Tamaños</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Estados</h4>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Deshabilitado</Button>
            <Button loading>Cargando</Button>
            <Button
              loading={loading}
              icon={loading ? RiLoader4Line : RiAddLine}
              onClick={handleLoadingClick}
            >
              {loading ? "Procesando..." : "Click para cargar"}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Íconos</h4>
          <div className="flex flex-wrap gap-3">
            <Button icon={RiAddLine}>Ícono Izquierda</Button>
            <Button icon={RiAddLine} iconPosition="right">
              Ícono Derecha
            </Button>
            <Button icon={RiAddLine} variant="secondary">
              Ícono Secundario
            </Button>
            <Button icon={RiAddLine} variant="light">
              Ícono Light
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <Title className="mb-6">Gráficos de Área</Title>
        
        {/* Ejemplo 1: Evolución de Stock */}
        <div className="mb-8">
          <Text className="mb-4">Evolución de Stock por Producto</Text>
          <GascoAreaChart
            title="Stock de Materia Prima"
            description="Evolución del stock de productos en los últimos 6 meses"
            data={stockData}
            categories={["propano", "butano", "mezcla"]}
            valueFormatter={(value) => `${value} TON`}
          />
        </div>

        {/* Ejemplo 2: Rendimiento vs Objetivo */}
        <div className="mb-8">
          <Text className="mb-4">Rendimiento vs Objetivo</Text>
          <GascoAreaChart
            title="Rendimiento de Masa Óptima"
            description="Comparación entre rendimiento real y objetivo"
            data={rendimientoData}
            categories={["real", "objetivo"]}
            colors={["#0066FF", "#22C55E"]}
            valueFormatter={(value) => `${value}%`}
          />
        </div>
      </section>

      <div className="space-y-8">
        <h2 className="mb-4 text-2xl font-semibold">Distribución de Categorías</h2>
        <CylinderDistributionExample />
        <CylinderStatusExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Indicadores de Progreso</h2>
        <KPIProgressExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Gráficos de Línea</h2>
        <LineChartExamples />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Barra de Búsqueda y Comandos</h2>
        <SearchCommandExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Selector de Fechas</h2>
        <DatePickerExamples />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tablas de Datos</h2>
        <DataTableExamples />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Formularios</h2>
        <FormExamples />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Diálogos</h2>
        <DialogExamples />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Navegación</h2>
        <SidebarExample />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Botones</h2>
        <ButtonExamples />
      </div>
    </div>
  );
} 