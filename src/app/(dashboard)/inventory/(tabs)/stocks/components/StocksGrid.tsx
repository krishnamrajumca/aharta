'use client'

import React from 'react'
import StockCard from './StockCard'

interface StockItem {
  id: number
  name: string
  category: string
  sku: string
  quantity: number
  unit: string
  price: number
  cost: number
  supplier: string
  status: string
  reorderPoint: number
  lastUpdated: string
  location: string
  expiryDate: string
  minOrder: number
  leadTime: number
}

interface StocksGridProps {
  stocks: StockItem[]
  onEdit: (item: StockItem) => void
  onRestock: (item: StockItem) => void
}

export default function StocksGrid({ stocks, onEdit, onRestock }: StocksGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((item) => (
        <StockCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onRestock={onRestock}
        />
      ))}
    </div>
  )
}
