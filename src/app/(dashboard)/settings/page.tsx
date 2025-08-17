'use client'

import React, { useState } from 'react'
import { 
  Settings, 
  Save, 
  User, 
  Receipt,
  Tag,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Globe,
  Database,
  Building,
  Phone,
  Mail,
  MapPin,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for taxes
const taxes = [
  {
    id: 1,
    name: 'Sales Tax',
    rate: 8.875,
    type: 'percentage',
    description: 'New York State sales tax',
    status: 'active',
    appliesTo: ['food', 'beverages'],
    effectiveDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'Delivery Fee',
    rate: 2.99,
    type: 'fixed',
    description: 'Standard delivery charge',
    status: 'active',
    appliesTo: ['delivery'],
    effectiveDate: '2024-01-01'
  },
  {
    id: 3,
    name: 'Service Charge',
    rate: 18,
    type: 'percentage',
    description: 'Gratuity for dine-in service',
    status: 'active',
    appliesTo: ['dine-in'],
    effectiveDate: '2024-01-01'
  }
]

// Mock data for offers
const offers = [
  {
    id: 1,
    name: 'Happy Hour',
    description: '50% off on selected drinks',
    discountType: 'percentage',
    discountValue: 50,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeFrom: '16:00',
    timeTo: '19:00',
    status: 'active',
    minimumOrder: 0,
    maximumDiscount: 25
  },
  {
    id: 2,
    name: 'Student Discount',
    description: '15% off for students with valid ID',
    discountType: 'percentage',
    discountValue: 15,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeFrom: '00:00',
    timeTo: '23:59',
    status: 'active',
    minimumOrder: 10,
    maximumDiscount: 15
  },
  {
    id: 3,
    name: 'First Order',
    description: 'Free delivery on first order',
    discountType: 'fixed',
    discountValue: 5.99,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeFrom: '00:00',
    timeTo: '23:59',
    status: 'active',
    minimumOrder: 0,
    maximumDiscount: 5.99
  }
]

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

const taxTypeOptions: DropdownOption[] = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed Amount ($)' }
]

const discountTypeOptions: DropdownOption[] = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed Amount ($)' }
]

const daysOfWeekOptions: DropdownOption[] = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  
  // Tax management state
  const [showTaxModal, setShowTaxModal] = useState(false)
  const [editingTax, setEditingTax] = useState<any>(null)
  
  // Offer management state
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState<any>(null)
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{type: string, id: number} | null>(null)

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'taxes', name: 'Taxes', icon: Receipt },
    { id: 'offers', name: 'Offers', icon: Tag }
  ]

  const handleSave = () => {
    console.log('Saving settings...')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Tax management functions
  const openTaxModal = (tax?: any) => {
    setEditingTax(tax || null)
    setShowTaxModal(true)
  }

  const closeTaxModal = () => {
    setShowTaxModal(false)
    setEditingTax(null)
  }

  const handleTaxSubmit = (taxData: any) => {
    if (editingTax) {
      console.log('Updating tax:', taxData)
      // Update existing tax
    } else {
      console.log('Adding new tax:', taxData)
      // Add new tax
    }
    closeTaxModal()
  }

  const handleTaxDelete = (taxId: number) => {
    console.log('Deleting tax:', taxId)
    setShowDeleteConfirm(null)
    // Delete tax logic
  }

  // Offer management functions
  const openOfferModal = (offer?: any) => {
    setEditingOffer(offer || null)
    setShowOfferModal(true)
  }

  const closeOfferModal = () => {
    setShowOfferModal(false)
    setEditingOffer(null)
  }

  const handleOfferSubmit = (offerData: any) => {
    if (editingOffer) {
      console.log('Updating offer:', offerData)
      // Update existing offer
    } else {
      console.log('Adding new offer:', offerData)
      // Add new offer
    }
    closeOfferModal()
  }

  const handleOfferDelete = (offerId: number) => {
    console.log('Deleting offer:', offerId)
    setShowDeleteConfirm(null)
    // Delete offer logic
  }

  const renderGeneralSettings = () => (
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

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>Update your personal details and account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <Input defaultValue="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <Input defaultValue="Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input defaultValue="john.doe@aharta.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input defaultValue="+1-555-0123" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                placeholder="Tell us about yourself"
                defaultValue="Restaurant manager with 10+ years of experience in the food industry."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <span>Account Security</span>
          </CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTaxesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax Management</h2>
          <p className="text-gray-600">Configure tax rates and rules for your business</p>
        </div>
        <Button onClick={() => openTaxModal()} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Tax
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxes.map((tax) => (
          <Card key={tax.id} className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tax.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openTaxModal(tax)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm({type: 'tax', id: tax.id})}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{tax.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {tax.type === 'percentage' ? `${tax.rate}%` : `$${tax.rate}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{tax.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  tax.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Effective Date</span>
                <span className="text-sm font-medium text-gray-900">{tax.effectiveDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderOffersSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offer Management</h2>
          <p className="text-gray-600">Create and manage promotional offers and discounts</p>
        </div>
        <Button onClick={() => openOfferModal()} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{offer.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openOfferModal(offer)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm({type: 'offer', id: offer.id})}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{offer.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Discount</span>
                <span className="text-sm font-medium text-green-600">
                  {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `$${offer.discountValue}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Valid Period</span>
                <span className="text-sm font-medium text-gray-900">
                  {offer.validFrom} to {offer.validUntil}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time</span>
                <span className="text-sm font-medium text-gray-900">
                  {offer.timeFrom} - {offer.timeTo}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days</span>
                <span className="text-sm font-medium text-gray-900">
                  {offer.daysOfWeek.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'profile':
        return renderProfileSettings()
      case 'taxes':
        return renderTaxesSettings()
      case 'offers':
        return renderOffersSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">Manage your account and business preferences</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

      {/* Content */}
      {renderContent()}

      {/* Save Button for General and Profile */}
      {(activeTab === 'general' || activeTab === 'profile') && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      )}

      {/* Tax Modal */}
      {showTaxModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingTax ? 'Edit Tax' : 'Add New Tax'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeTaxModal}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Name</label>
                  <Input defaultValue={editingTax?.name || ''} placeholder="Enter tax name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type</label>
                  <Dropdown
                    options={taxTypeOptions}
                    value={editingTax?.type || 'percentage'}
                    onChange={(value) => console.log('Tax type changed:', value)}
                    placeholder="Select tax type"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingTax?.rate || ''} 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value={editingTax?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter tax description"
                  defaultValue={editingTax?.description || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                <Input type="date" defaultValue={editingTax?.effectiveDate || ''} />
              </div>
            </CardContent>
            <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeTaxModal}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingTax ? 'Update Tax' : 'Add Tax'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 shadow-sm">
              <CardTitle className="flex items-center justify-between">
                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeOfferModal}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer Name</label>
                  <Input defaultValue={editingOffer?.name || ''} placeholder="Enter offer name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <Dropdown
                    options={discountTypeOptions}
                    value={editingOffer?.discountType || 'percentage'}
                    onChange={(value) => console.log('Discount type changed:', value)}
                    placeholder="Select discount type"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingOffer?.discountValue || ''} 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Dropdown
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value={editingOffer?.status || 'active'}
                    onChange={(value) => console.log('Status changed:', value)}
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <Input type="date" defaultValue={editingOffer?.validFrom || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <Input type="date" defaultValue={editingOffer?.validUntil || ''} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time From</label>
                  <Input type="time" defaultValue={editingOffer?.timeFrom || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time To</label>
                  <Input type="time" defaultValue={editingOffer?.timeTo || ''} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Enter offer description"
                  defaultValue={editingOffer?.description || ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingOffer?.minimumOrder || ''} 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Discount</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingOffer?.maximumDiscount || ''} 
                    placeholder="0.00" 
                  />
                </div>
              </div>
            </CardContent>
            <div className="flex-shrink-0 shadow-sm bg-gray-50 p-6">
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeOfferModal}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  {editingOffer ? 'Update Offer' : 'Add Offer'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this {showDeleteConfirm.type}? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      if (showDeleteConfirm.type === 'tax') {
                        handleTaxDelete(showDeleteConfirm.id)
                      } else if (showDeleteConfirm.type === 'offer') {
                        handleOfferDelete(showDeleteConfirm.id)
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
