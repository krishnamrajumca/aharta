'use client'

import React, { useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Import components
import SettingsTabs from './components/SettingsTabs'
import GeneralSettings from './components/GeneralSettings'
import ProfileSettings from './components/ProfileSettings'
import TaxesSettings from './components/TaxesSettings'
import OffersSettings from './components/OffersSettings'
import TaxModal from './components/TaxModal'
import OfferModal from './components/OfferModal'
import DeleteConfirmModal from '@/components/DeleteConfirmModal'

// Mock data for taxes
const taxes = [
  {
    id: 1,
    name: 'Sales Tax',
    rate: 8.875,
    type: 'percentage' as const,
    description: 'New York State sales tax',
    status: 'active' as const,
    appliesTo: ['food', 'beverages'],
    effectiveDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'Delivery Fee',
    rate: 2.99,
    type: 'fixed' as const,
    description: 'Standard delivery charge',
    status: 'active' as const,
    appliesTo: ['delivery'],
    effectiveDate: '2024-01-01'
  },
  {
    id: 3,
    name: 'Service Charge',
    rate: 18,
    type: 'percentage' as const,
    description: 'Gratuity for dine-in service',
    status: 'active' as const,
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
    discountType: 'percentage' as const,
    discountValue: 50,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeFrom: '16:00',
    timeTo: '19:00',
    status: 'active' as const,
    minimumOrder: 0,
    maximumDiscount: 25
  },
  {
    id: 2,
    name: 'Student Discount',
    description: '15% off for students with valid ID',
    discountType: 'percentage' as const,
    discountValue: 15,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeFrom: '00:00',
    timeTo: '23:59',
    status: 'active' as const,
    minimumOrder: 10,
    maximumDiscount: 15
  },
  {
    id: 3,
    name: 'First Order',
    description: 'Free delivery on first order',
    discountType: 'fixed' as const,
    discountValue: 5.99,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeFrom: '00:00',
    timeTo: '23:59',
    status: 'active' as const,
    minimumOrder: 0,
    maximumDiscount: 5.99
  }
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

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />
      case 'profile':
        return <ProfileSettings />
      case 'taxes':
        return (
          <TaxesSettings
            taxes={taxes}
            onAddTax={() => openTaxModal()}
            onEditTax={openTaxModal}
            onDeleteTax={(taxId) => setShowDeleteConfirm({type: 'tax', id: taxId})}
          />
        )
      case 'offers':
        return (
          <OffersSettings
            offers={offers}
            onAddOffer={() => openOfferModal()}
            onEditOffer={openOfferModal}
            onDeleteOffer={(offerId) => setShowDeleteConfirm({type: 'offer', id: offerId})}
          />
        )
      default:
        return <GeneralSettings />
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
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
      <TaxModal
        isOpen={showTaxModal}
        editingTax={editingTax}
        onClose={closeTaxModal}
        onSubmit={handleTaxSubmit}
      />

      {/* Offer Modal */}
      <OfferModal
        isOpen={showOfferModal}
        editingOffer={editingOffer}
        onClose={closeOfferModal}
        onSubmit={handleOfferSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!showDeleteConfirm}
        type={showDeleteConfirm?.type === 'tax' ? 'tax' : showDeleteConfirm?.type === 'offer' ? 'offer' : 'general'}
        itemName={showDeleteConfirm?.type === 'tax' 
          ? taxes.find(t => t.id === showDeleteConfirm?.id)?.name || ''
          : showDeleteConfirm?.type === 'offer'
          ? offers.find(o => o.id === showDeleteConfirm?.id)?.name || ''
          : ''
        }
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          if (showDeleteConfirm?.type === 'tax') {
            handleTaxDelete(showDeleteConfirm.id)
          } else if (showDeleteConfirm?.type === 'offer') {
            handleOfferDelete(showDeleteConfirm.id)
          }
        }}
      />
    </div>
  )
}
