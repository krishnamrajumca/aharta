'use client'

import React from 'react'
import { Globe, Database, Building } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

const timezoneOptions: DropdownOption[] = [
  { value: 'Eastern Time (ET)', label: 'Eastern Time (ET)' },
  { value: 'Central Time (CT)', label: 'Central Time (CT)' },
  { value: 'Mountain Time (MT)', label: 'Mountain Time (MT)' },
  { value: 'Pacific Time (PT)', label: 'Pacific Time (PT)' }
]

const currencyOptions: DropdownOption[] = [
  { value: 'USD ($)', label: 'USD ($)' },
  { value: 'EUR (€)', label: 'EUR (€)' },
  { value: 'GBP (£)', label: 'GBP (£)' },
  { value: 'CAD (C$)', label: 'CAD (C$)' }
]

const languageOptions: DropdownOption[] = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' }
]

const dateFormatOptions: DropdownOption[] = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
]

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-gray-600" />
            <span>Business Information</span>
          </CardTitle>
          <CardDescription>Update your business details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <Input defaultValue="Aharta Restaurant" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
              <Input defaultValue="Restaurant" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input defaultValue="+1-555-0123" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input defaultValue="info@aharta.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input defaultValue="123 Main Street, New York, NY 10001" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-gray-600" />
            <span>System Settings</span>
          </CardTitle>
          <CardDescription>Configure system preferences and defaults</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <Dropdown
                options={timezoneOptions}
                value="Eastern Time (ET)"
                onChange={(value) => console.log('Timezone changed:', value)}
                placeholder="Select timezone"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <Dropdown
                options={currencyOptions}
                value="USD ($)"
                onChange={(value) => console.log('Currency changed:', value)}
                placeholder="Select currency"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <Dropdown
                options={languageOptions}
                value="English"
                onChange={(value) => console.log('Language changed:', value)}
                placeholder="Select language"
                searchable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <Dropdown
                options={dateFormatOptions}
                value="MM/DD/YYYY"
                onChange={(value) => console.log('Date format changed:', value)}
                placeholder="Select date format"
                searchable
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
