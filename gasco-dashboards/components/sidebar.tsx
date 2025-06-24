"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Calendar,
  Database,
  ChevronDown,
  BarChart,
  FileText,
  Settings,
  ArrowLeftRight,
  Wrench,
  PieChart,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
} from "lucide-react"

const menuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Planificar Producción", icon: Calendar, href: "#" },
  {
    name: "Registrar Inventario",
    icon: Database,
    subItems: [{ name: "Sub Item 1", href: "#" }],
  },
  {
    name: "Consultar Inventario",
    icon: FileText,
    subItems: [
      { name: "Consulta Cilindros", href: "/dashboard-3" },
      { name: "Consulta Sellos", href: "#" },
      { name: "Consulta Pallets", href: "#" },
      { name: "Aprobación de Conteos", href: "#" },
    ],
  },
  { name: "Gestionar Producción en línea", icon: ArrowLeftRight, subItems: [] },
  { name: "Gestionar Masa Operativa", icon: PieChart, href: "/dashboard-2" },
  { name: "Cerrar Producción Diaria", icon: BarChart, href: "#" },
  { name: "Gestionar Inventario Mensual", icon: FileText, subItems: [] },
  {
    name: "Gestión e Indicadores",
    icon: Wrench,
    active: true,
    subItems: [
      { name: "Materia Prima", href: "/gestion-indicadores/materia-prima", active: true },
      { name: "Resumen Cilindros", href: "/gestion-indicadores/resumen-cilindros" },
      { name: "Resumen Masa Optima", href: "/gestion-indicadores/resumen-masa-optima" },
    ],
  },
  { name: "Administración", icon: Settings, subItems: [] },
  { name: "Catálogo de Componentes", icon: LayoutGrid, href: "/component-showcase" },
]

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  return (
    <aside className={`flex flex-col bg-white border-r transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-64'}`}>
      <div className={`h-16 flex items-center border-b px-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center w-full justify-between">
          {!isCollapsed && <Image src="/logo.png" alt="Gasco Logo" width={130} height={36} />}
          <button
            onClick={toggleSidebar}
            className="ml-2 flex items-center justify-center p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <nav className="flex-grow p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-1">
              <Link
                href={item.href || "#"}
                className={`flex items-center p-2 rounded-lg text-sm ${
                  item.active ? "bg-gray-100 text-gray-900 font-semibold" : "hover:bg-gray-100"
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon className={`w-5 h-5 ${!isCollapsed ? 'mr-3' : ''} ${item.active ? 'text-gray-800' : 'text-gray-500'}`} />
                {!isCollapsed && <span>{item.name}</span>}
                {!isCollapsed && item.subItems && item.subItems.length > 0 && (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                )}
              </Link>
              {!isCollapsed && item.subItems && item.active && (
                <ul className="pl-8 mt-1 border-l border-gray-200 ml-4">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name}>
                       <Link
                        href={subItem.href}
                        className={`block py-1 px-2 text-xs rounded-lg ${
                          subItem.active ? "text-blue-600 font-bold" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
} 