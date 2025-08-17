'use client'

import React from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DeleteConfirmModalProps {
  isOpen: boolean
  type: 'menu-item' | 'category' | 'addon' | 'addon-category' | 'staff' | 'role' | 'customer' | 'stock' | 'vendor' | 'recipe' | 'tax' | 'offer' | 'general'
  itemName: string
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
  customWarning?: string
}

export default function DeleteConfirmModal({ 
  isOpen, 
  type, 
  itemName, 
  onClose, 
  onConfirm, 
  isDeleting = false,
  customWarning
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  const getTypeInfo = () => {
    switch (type) {
      case 'menu-item':
        return {
          title: 'Delete Menu Item',
          description: 'Are you sure you want to delete this menu item? This action cannot be undone.',
          warning: 'This will remove the item from all menus and may affect existing orders.',
          icon: '🍽️'
        }
      case 'category':
        return {
          title: 'Delete Category',
          description: 'Are you sure you want to delete this menu category? This action cannot be undone.',
          warning: 'All menu items in this category will be moved to "Uncategorized".',
          icon: '📁'
        }
      case 'addon':
        return {
          title: 'Delete Addon',
          description: 'Are you sure you want to delete this addon? This action cannot be undone.',
          warning: 'This will remove the addon from all menu items that use it.',
          icon: '➕'
        }
      case 'addon-category':
        return {
          title: 'Delete Addon Category',
          description: 'Are you sure you want to delete this addon category? This action cannot be undone.',
          warning: 'All addons in this category will be moved to "Uncategorized".',
          icon: '🏷️'
        }
      case 'staff':
        return {
          title: 'Delete Staff Member',
          description: 'Are you sure you want to delete this staff member? This action cannot be undone.',
          warning: 'This will remove all access and permissions for this staff member.',
          icon: '👤'
        }
      case 'role':
        return {
          title: 'Delete Role',
          description: 'Are you sure you want to delete this role? This action cannot be undone.',
          warning: 'All staff members with this role will need to be reassigned.',
          icon: '🔑'
        }
      case 'customer':
        return {
          title: 'Delete Customer',
          description: 'Are you sure you want to delete this customer? This action cannot be undone.',
          warning: 'This will remove all customer data and order history.',
          icon: '👥'
        }
      case 'stock':
        return {
          title: 'Delete Stock Item',
          description: 'Are you sure you want to delete this stock item? This action cannot be undone.',
          warning: 'This will remove the item from inventory and may affect menu items that use it.',
          icon: '📦'
        }
      case 'vendor':
        return {
          title: 'Delete Vendor',
          description: 'Are you sure you want to delete this vendor? This action cannot be undone.',
          warning: 'This will remove all vendor information and may affect stock items.',
          icon: '🏢'
        }
      case 'recipe':
        return {
          title: 'Delete Recipe',
          description: 'Are you sure you want to delete this recipe? This action cannot be undone.',
          warning: 'This will remove the recipe and may affect menu items that use it.',
          icon: '📖'
        }
      case 'tax':
        return {
          title: 'Delete Tax',
          description: 'Are you sure you want to delete this tax? This action cannot be undone.',
          warning: 'This will remove the tax from all applicable orders and menu items.',
          icon: '💰'
        }
      case 'offer':
        return {
          title: 'Delete Offer',
          description: 'Are you sure you want to delete this offer? This action cannot be undone.',
          warning: 'This will remove the offer and may affect active promotions.',
          icon: '🎯'
        }
      default:
        return {
          title: 'Delete Item',
          description: 'Are you sure you want to delete this item? This action cannot be undone.',
          warning: customWarning || 'This action cannot be undone.',
          icon: '⚠️'
        }
    }
  }

  const typeInfo = getTypeInfo()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex-shrink-0 shadow-sm">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{typeInfo.icon}</span>
              <span>{typeInfo.title}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              disabled={isDeleting}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            {typeInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Item Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-gray-900">Item to Delete:</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 mt-1">{itemName}</p>
          </div>

          {/* Warning Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Warning</p>
                <p className="text-sm text-orange-700 mt-1">{typeInfo.warning}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete {type === 'menu-item' ? 'Item' : type === 'category' ? 'Category' : type === 'addon' ? 'Addon' : type === 'addon-category' ? 'Category' : type === 'staff' ? 'Staff Member' : type === 'role' ? 'Role' : type === 'customer' ? 'Customer' : type === 'stock' ? 'Stock Item' : type === 'vendor' ? 'Vendor' : type === 'recipe' ? 'Recipe' : type === 'tax' ? 'Tax' : type === 'offer' ? 'Offer' : 'Item'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
