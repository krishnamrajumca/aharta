'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  searchable?: boolean
  multiSelect?: boolean
  disabled?: boolean
  className?: string
  error?: boolean
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  multiSelect = false,
  disabled = false,
  className,
  error = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [position, setPosition] = useState<'above' | 'below'>('below')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const selectedValues = multiSelect ? (Array.isArray(value) ? value : []) : [value]
  const selectedOptions = options.filter(option => selectedValues.includes(option.value))

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !option.disabled
      )
    : options.filter(option => !option.disabled)

  // Calculate position based on available space
  const calculatePosition = () => {
    if (!buttonRef.current) return 'below'
    
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = 240 // Approximate height of dropdown (max-h-60 = 240px)
    
    // Check if there's enough space below
    const spaceBelow = viewportHeight - buttonRect.bottom
    const spaceAbove = buttonRect.top
    
    // If not enough space below but enough above, position above
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      return 'above'
    }
    
    return 'below'
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (disabled) return
    
    if (!isOpen) {
      // Calculate position before opening
      setPosition(calculatePosition())
    }
    
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchQuery('')
    }
  }

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue]
      onChange(newValues)
    } else {
      onChange(optionValue)
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  const handleRemoveValue = (optionValue: string) => {
    if (multiSelect && Array.isArray(value)) {
      const newValues = value.filter(v => v !== optionValue)
      onChange(newValues)
    }
  }

  const getDisplayText = () => {
    if (multiSelect) {
      if (selectedOptions.length === 0) return placeholder
      if (selectedOptions.length === 1) return selectedOptions[0].label
      return `${selectedOptions.length} items selected`
    }
    
    const selectedOption = options.find(option => option.value === value)
    return selectedOption ? selectedOption.label : placeholder
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
          error 
            ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300 focus:ring-green-500 focus:border-green-500",
          disabled 
            ? "bg-gray-50 text-gray-400 cursor-not-allowed" 
            : "hover:border-gray-400 cursor-pointer",
          isOpen && "border-green-500 ring-2 ring-green-500 ring-opacity-50"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-1 min-h-6">
            {multiSelect && selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveValue(option.value)
                    }}
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className={cn(
                "block truncate",
                !value || (Array.isArray(value) && value.length === 0) ? "text-gray-500" : "text-gray-900"
              )}>
                {getDisplayText()}
              </span>
            )}
          </div>
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform",
              isOpen && "transform rotate-180"
            )} 
          />
        </div>
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",
            position === 'above' 
              ? "bottom-full mb-1" 
              : "top-full mt-1"
          )}
        >
          {searchable && (
            <div className="sticky top-0 p-2 bg-white border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                {searchable && searchQuery ? 'No options found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = multiSelect 
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm transition-colors",
                      isSelected
                        ? "bg-green-50 text-green-900"
                        : "text-gray-900 hover:bg-gray-50",
                      option.disabled && "text-gray-400 cursor-not-allowed hover:bg-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
