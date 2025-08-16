'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart3, 
  Menu, 
  Package, 
  Settings, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    description: 'Business insights and data'
  },
  {
    name: 'Menu',
    href: '/menu',
    icon: Menu,
    description: 'Product and service catalog'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Stock management and tracking'
  },
  {
    name: 'Members',
    href: '/members',
    icon: Users,
    description: 'Staff, roles and customers'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System configuration'
  }
]

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
    console.log('Sidebar toggled:', !collapsed)
  }

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-green-600">Aharta</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  {!collapsed && (
                    <div className="ml-3">
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      
    </div>
  )
}
