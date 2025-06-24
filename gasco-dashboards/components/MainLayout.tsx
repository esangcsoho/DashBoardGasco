"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'

export function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col bg-[#F7F8FA] transition-all duration-300">
        {children}
      </main>
    </div>
  )
} 