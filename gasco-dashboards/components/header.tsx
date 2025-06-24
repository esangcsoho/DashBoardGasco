"use client"

import {
  ChevronDown,
  Bell,
  User as UserIcon,
  LogOut,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header({
  breadcrumb,
  title,
}: {
  breadcrumb: { name: string; href: string }[]
  title: string
}) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <nav className="text-sm text-gray-500">
            {breadcrumb.map((item, index) => (
              <span key={item.name}>
                {index > 0 && <span className="mx-1">/</span>}
                <a href={item.href} className="hover:underline">{item.name}</a>
              </span>
            ))}
          </nav>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              <span>Gasco GLP</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Planta Maipú</DropdownMenuItem>
              <DropdownMenuItem>Planta Ñuñoa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
               <Avatar className="w-9 h-9">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-semibold">User@gasco.cl</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="w-4 h-4 mr-2" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <span>Ajustes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 