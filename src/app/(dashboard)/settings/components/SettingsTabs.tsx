'use client'

import React from 'react'
import { Settings, User, Receipt, Tag } from 'lucide-react'

interface Tab {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const tabs: Tab[] = [
  { id: 'general', name: 'General', icon: Settings },
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'taxes', name: 'Taxes', icon: Receipt },
  { id: 'offers', name: 'Offers', icon: Tag }
]

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 inline mr-2" />
              {tab.name}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
