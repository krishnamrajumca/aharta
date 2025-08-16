'use client'

import React, { useState } from 'react'
import { 
  ChefHat, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Clock,
  DollarSign,
  Tag,
  GripVertical,
  X,
  Users,
  Package,
  Scale,
  Calculator,
  FileText,
  Eye,
  Download,
  Upload
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recipe Management</h2>
          <p className="text-gray-600">Manage recipes for menu items and addons</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search recipes by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Dropdown
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'appetizers', label: 'Appetizers' },
              { value: 'main-courses', label: 'Main Courses' },
              { value: 'desserts', label: 'Desserts' }
            ]}
            value="all"
            onChange={(value) => console.log('Category changed:', value)}
            placeholder="Category"
            searchable
          />
          <Dropdown
            options={[
              { value: 'grid', label: 'Grid View' },
              { value: 'list', label: 'List View' }
            ]}
            value={viewMode}
            onChange={(value) => setViewMode(Array.isArray(value) ? value[0] as 'grid' | 'list' : 'grid')}
            placeholder="View"
          />
        </div>
      </div>

      {/* Recipe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Total Recipes</p>
                <p className="text-xl font-bold text-blue-900">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Menu Items</p>
                <p className="text-xl font-bold text-green-900">67</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Tag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800">Addons</p>
                <p className="text-xl font-bold text-purple-900">22</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Avg. Margin</p>
                <p className="text-xl font-bold text-orange-900">52%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Placeholder */}
      <Card>
        <CardContent className="p-12 text-center">
          <ChefHat className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recipe Management</h3>
          <p className="text-gray-600 mb-4">Manage your menu item and addon recipes with detailed ingredients, costs, and preparation instructions.</p>
          <Button onClick={() => console.log('Add recipe clicked')} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


