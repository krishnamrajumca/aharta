'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

interface ItemsFiltersProps {
  searchQuery: string
  selectedCategory: string
  viewMode: 'grid' | 'list'
  onSearchChange: (query: string) => void
  onCategoryChange: (value: string | string[]) => void
  onViewModeChange: (value: string | string[]) => void
}

const categoryOptions: DropdownOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'Appetizers', label: 'Appetizers' },
  { value: 'Main Courses', label: 'Main Courses' },
  { value: 'Desserts', label: 'Desserts' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Sides', label: 'Sides' },
  { value: 'Specials', label: 'Specials' }
]

const viewModeOptions: DropdownOption[] = [
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
]

export default function ItemsFilters({ 
  searchQuery, 
  selectedCategory, 
  viewMode, 
  onSearchChange, 
  onCategoryChange, 
  onViewModeChange 
}: ItemsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Dropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Category"
          searchable
        />
        <Dropdown
          options={viewModeOptions}
          value={viewMode}
          onChange={onViewModeChange}
          placeholder="View"
        />
      </div>
    </div>
  )
}
