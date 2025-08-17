'use client'

import React from 'react'
import { Building2, MapPin, Phone, Clock, ChefHat, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dropdown } from '@/components/ui/dropdown'

interface RestaurantHours {
  monday: { open: string; close: string; isOpen: boolean }
  tuesday: { open: string; close: string; isOpen: boolean }
  wednesday: { open: string; close: string; isOpen: boolean }
  thursday: { open: string; close: string; isOpen: boolean }
  friday: { open: string; close: string; isOpen: boolean }
  saturday: { open: string; close: string; isOpen: boolean }
  sunday: { open: string; close: string; isOpen: boolean }
}

interface RestaurantConfigStepProps {
  formData: {
    restaurantName: string
    restaurantAddress: string
    restaurantPhone: string
    restaurantHours: RestaurantHours
    cuisineType: string
    restaurantDescription: string
  }
  errors: {
    restaurantName?: string
    restaurantAddress?: string
    restaurantPhone?: string
  }
  updateField: (field: 'restaurantName' | 'restaurantAddress' | 'restaurantPhone' | 'cuisineType' | 'restaurantDescription', value: string) => void
  updateRestaurantHours: (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function RestaurantConfigStep({
  formData,
  errors,
  updateField,
  updateRestaurantHours,
  onNext,
  onBack
}: RestaurantConfigStepProps) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  const cuisineTypes = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'greek', label: 'Greek' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'korean', label: 'Korean' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'african', label: 'African' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="space-y-6">
      {/* Restaurant Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-green-600" />
          <span>Restaurant Information</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="restaurantName" className="text-gray-700 font-medium">
              Restaurant Name
            </Label>
            <Input
              id="restaurantName"
              type="text"
              placeholder="e.g., Bella Vista Italian Restaurant"
              value={formData.restaurantName}
              onChange={(e) => updateField('restaurantName', e.target.value)}
              className={errors.restaurantName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            />
            {errors.restaurantName && (
              <p className="text-sm text-red-600 mt-1">{errors.restaurantName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="restaurantAddress" className="text-gray-700 font-medium">
              Restaurant Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="restaurantAddress"
                type="text"
                placeholder="123 Main Street, City, State, ZIP"
                value={formData.restaurantAddress}
                onChange={(e) => updateField('restaurantAddress', e.target.value)}
                className={`pl-10 ${errors.restaurantAddress ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              />
            </div>
            {errors.restaurantAddress && (
              <p className="text-sm text-red-600 mt-1">{errors.restaurantAddress}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="restaurantPhone" className="text-gray-700 font-medium">
              Restaurant Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="restaurantPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.restaurantPhone}
                onChange={(e) => updateField('restaurantPhone', e.target.value)}
                className={`pl-10 ${errors.restaurantPhone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              />
            </div>
            {errors.restaurantPhone && (
              <p className="text-sm text-red-600 mt-1">{errors.restaurantPhone}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="cuisineType" className="text-gray-700 font-medium">
              Cuisine Type
            </Label>
            <div className="relative">
              <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Dropdown
                options={cuisineTypes}
                value={formData.cuisineType}
                onChange={(value) => updateField('cuisineType', Array.isArray(value) ? value[0] : value)}
                placeholder="Select cuisine type"
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="restaurantDescription" className="text-gray-700 font-medium">
              Restaurant Description
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <textarea
                id="restaurantDescription"
                placeholder="Tell us about your restaurant, specialties, and atmosphere..."
                value={formData.restaurantDescription}
                onChange={(e) => updateField('restaurantDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Hours */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-green-600" />
          <span>Operating Hours</span>
        </h3>
        
        <div className="space-y-3">
          {days.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 min-w-[120px]">
                <input
                  type="checkbox"
                  id={`${key}-open`}
                  checked={formData.restaurantHours[key as keyof RestaurantHours].isOpen}
                  onChange={(e) => updateRestaurantHours(key, 'isOpen', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <Label htmlFor={`${key}-open`} className="text-sm font-medium text-gray-700 min-w-[60px]">
                  {label}
                </Label>
              </div>
              
              {formData.restaurantHours[key as keyof RestaurantHours].isOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={formData.restaurantHours[key as keyof RestaurantHours].open}
                    onChange={(e) => updateRestaurantHours(key, 'open', e.target.value)}
                    className="w-24 h-8 text-sm"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <Input
                    type="time"
                    value={formData.restaurantHours[key as keyof RestaurantHours].close}
                    onChange={(e) => updateRestaurantHours(key, 'close', e.target.value)}
                    className="w-24 h-8 text-sm"
                  />
                </div>
              ) : (
                <span className="text-gray-400 text-sm italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-6 py-2"
        >
          Back
        </Button>
        
        <Button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  )
}
