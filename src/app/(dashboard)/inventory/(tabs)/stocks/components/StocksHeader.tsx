'use client'

import React from 'react'
import { Plus, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StocksHeaderProps {
  onAddStock: () => void
  onExport: () => void
  onImport: () => void
}

export default function StocksHeader({ onAddStock, onExport, onImport }: StocksHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Inventory Stocks</h2>
        <p className="text-gray-600">Manage your inventory stock levels and track items</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={onImport}>
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={onAddStock} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock Item
        </Button>
      </div>
    </div>
  )
}
