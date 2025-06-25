"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  RiHome4Line,
  RiDashboard2Line,
  RiGasStationLine,
  RiTruckLine,
  RiTeamLine,
  RiSettings4Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiNotification3Line,
  RiSearchLine,
  RiUser3Line,
  RiLogoutBoxRLine,
} from "@remixicon/react";
import { Button } from "@tremor/react";
import { GascoSearchCommand } from "./GascoSearchCommand";

// Tipos para la navegación
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

// Configuración de navegación
const navigation: NavItem[] = [
  {
    name: "Inicio",
    href: "/dashboard",
    icon: RiHome4Line,
  },
  {
    name: "Indicadores",
    href: "/dashboard/indicadores",
    icon: RiDashboard2Line,
  },
  {
    name: "Cilindros",
    href: "/dashboard/cilindros",
    icon: RiGasStationLine,
    badge: 3,
  },
  {
    name: "Rutas",
    href: "/dashboard/rutas",
    icon: RiTruckLine,
  },
  {
    name: "Equipo",
    href: "/dashboard/equipo",
    icon: RiTeamLine,
  },
  {
    name: "Configuración",
    href: "/dashboard/configuracion",
    icon: RiSettings4Line,
  },
];

// Componente NavLink
interface NavLinkProps extends React.ComponentProps<typeof Link> {
  icon: React.ElementType;
  active?: boolean;
  collapsed?: boolean;
  badge?: number;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, icon: Icon, active, collapsed, badge, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          "group flex items-center gap-x-3 rounded-tremor-default px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted",
          active
            ? "bg-tremor-background-muted text-tremor-content-strong dark:bg-dark-tremor-background-muted dark:text-dark-tremor-content-strong"
            : "text-tremor-content dark:text-dark-tremor-content",
          className
        )}
        {...props}
      >
        <Icon
          className={cn(
            "size-5 shrink-0",
            active
              ? "text-tremor-brand dark:text-dark-tremor-brand"
              : "text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
          )}
        />
        <span
          className={cn(
            "transition-opacity",
            collapsed ? "opacity-0 invisible" : "opacity-100 visible"
          )}
        >
          {children}
        </span>
        {badge && (
          <span
            className={cn(
              "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-tremor-brand text-xs font-medium text-white dark:bg-dark-tremor-brand",
              collapsed && "opacity-0 invisible"
            )}
          >
            {badge}
          </span>
        )}
      </Link>
    );
  }
);
NavLink.displayName = "NavLink";

// Componente UserProfile
interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  collapsed?: boolean;
}

const UserProfile = ({ user, collapsed }: UserProfileProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-tremor-default p-3",
        "bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle"
      )}
    >
      <div className="relative shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="size-8 rounded-full"
          />
        ) : (
          <div className="flex size-8 items-center justify-center rounded-full bg-tremor-brand text-white dark:bg-dark-tremor-brand">
            <RiUser3Line className="size-4" />
          </div>
        )}
        <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-gray-950" />
      </div>
      {!collapsed && (
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {user.name}
          </div>
          <div className="truncate text-xs text-tremor-content dark:text-dark-tremor-content">
            {user.role}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal GascoSidebar
interface GascoSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export function GascoSidebar({ user }: GascoSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r border-tremor-border bg-tremor-background transition-all dark:border-dark-tremor-border dark:bg-dark-tremor-background",
          collapsed ? "w-[4.5rem]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-tremor-border px-4 dark:border-dark-tremor-border">
          <img
            src="/logo.png"
            alt="Gasco"
            className={cn("h-8 w-auto", collapsed && "mx-auto")}
          />
          {!collapsed && (
            <span className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Gasco
            </span>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              icon={item.icon}
              active={pathname === item.href}
              collapsed={collapsed}
              badge={item.badge}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-tremor-border p-3 dark:border-dark-tremor-border">
          <div className="mb-3 space-y-3">
            <Button
              variant="secondary"
              onClick={() => setShowSearch(true)}
              className="w-full justify-start gap-2"
            >
              <RiSearchLine className="size-4" />
              {!collapsed && (
                <>
                  <span>Buscar</span>
                  <kbd className="ml-auto rounded bg-tremor-background-subtle px-2 py-0.5 text-xs font-light text-tremor-content-subtle dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-subtle">
                    ⌘K
                  </kbd>
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            >
              <RiLogoutBoxRLine className="size-4" />
              {!collapsed && <span>Cerrar Sesión</span>}
            </Button>
          </div>
          <UserProfile user={user} collapsed={collapsed} />
        </div>

        {/* Botón Colapsar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-4 top-20 flex size-8 items-center justify-center rounded-full border border-tremor-border bg-tremor-background text-tremor-content-subtle shadow-tremor-dropdown dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-subtle",
            "hover:bg-tremor-background-muted hover:text-tremor-content dark:hover:bg-dark-tremor-background-muted dark:hover:text-dark-tremor-content"
          )}
        >
          {collapsed ? (
            <RiMenuUnfoldLine className="size-4" />
          ) : (
            <RiMenuFoldLine className="size-4" />
          )}
        </button>
      </aside>

      {/* Barra Superior Mobile */}
      <div className="sticky top-0 z-30 block border-b border-tremor-border bg-tremor-background lg:hidden dark:border-dark-tremor-border dark:bg-dark-tremor-background">
        <div className="flex h-16 items-center justify-between gap-8 px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => setCollapsed(!collapsed)}
            >
              <RiMenuUnfoldLine className="size-5" />
            </Button>
            <img src="/logo.png" alt="Gasco" className="h-8 w-auto" />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => setShowSearch(true)}
            >
              <RiSearchLine className="size-5" />
            </Button>
            <Button variant="secondary" size="xs">
              <RiNotification3Line className="size-5" />
            </Button>
            <Button variant="secondary" size="xs">
              <RiUser3Line className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Búsqueda */}
      <GascoSearchCommand open={showSearch} onOpenChange={setShowSearch} />
    </>
  );
} 