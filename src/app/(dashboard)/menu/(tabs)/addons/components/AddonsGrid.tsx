'use client'

import React from 'react'
import AddonCard from './AddonCard'

interface Addon {
  id: number
  name: string
  price: number
  category: string
  status: string
  position: number
  description: string
}

interface AddonsGridProps {
  addons: Addon[]
  onEdit: (addon: Addon) => void
  onDelete: (addon: Addon) => void
  onDragStart: (e: React.DragEvent, addon: Addon) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, addon: Addon) => void
}

export default function AddonsGrid({ 
  addons, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: AddonsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {addons.map((addon) => (
        <AddonCard
          key={addon.id}
          addon={addon}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  )
}
