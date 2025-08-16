'use client'

import React, { useState } from 'react'
import { 
  Settings, 
  Save, 
  User, 
  Bell, 
  Shield, 
  Globe,
  Database,
  Palette,
  Key,
  Mail,
  Smartphone,
  CreditCard,
  Zap,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dropdown, DropdownOption } from '@/components/ui/dropdown'

// Mock data for settings
const notificationSettings = {
  email: {
    orders: true,
    inventory: true,
    staff: false,
    reports: true,
    marketing: false
  },
  push: {
    orders: true,
    inventory: true,
    staff: true,
    reports: false,
    marketing: false
  },
  sms: {
    orders: false,
    inventory: false,
    staff: false,
    reports: false,
    marketing: false
  }
}

const securitySettings = {
  twoFactorAuth: true,
  sessionTimeout: 30,
  passwordExpiry: 90,
  failedLoginAttempts: 5,
  ipWhitelist: ['192.168.1.1', '10.0.0.1']
}

const integrations = [
  { name: 'Stripe', status: 'connected', icon: CreditCard, description: 'Payment processing' },
  { name: 'Slack', status: 'connected', icon: Zap, description: 'Team communication' },
  { name: 'Google Analytics', status: 'connected', icon: Globe, description: 'Website analytics' },
  { name: 'Mailchimp', status: 'disconnected', icon: Mail, description: 'Email marketing' },
  { name: 'Shopify', status: 'disconnected', icon: Database, description: 'E-commerce platform' }
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [notifications, setNotifications] = useState(notificationSettings)
  const [security, setSecurity] = useState(securitySettings)
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ]

  const handleSave = () => {
    console.log('Saving settings...')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleNotificationChange = (type: string, category: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [category]: value
      }
    }))
  }

  const handleSecurityChange = (setting: string, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const toggleIntegration = (integrationName: string) => {
    console.log('Toggling integration:', integrationName)
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-600" />
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <Dropdown
                options={languageOptions}
                value="English"
                onChange={(value) => console.log('Language changed:', value)}
                placeholder="Select language"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <Dropdown
                options={dateFormatOptions}
                value="MM/DD/YYYY"
                onChange={(value) => console.log('Date format changed:', value)}
                placeholder="Select date format"
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
          <CardDescription>Update your personal details and preferences</CardDescription>
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
                defaultValue="Restaurant manager with 10+ years of experience in the food service industry."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-gray-600" />
            <span>Password & Security</span>
          </CardTitle>
          <CardDescription>Change your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  defaultValue="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Strength</label>
              <div className="flex space-x-1">
                <div className="h-2 w-8 bg-red-400 rounded"></div>
                <div className="h-2 w-8 bg-red-400 rounded"></div>
                <div className="h-2 w-8 bg-gray-300 rounded"></div>
                <div className="h-2 w-8 bg-gray-300 rounded"></div>
              </div>
              <p className="text-xs text-red-600 mt-1">Weak password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-600" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>Configure which email notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications.email).map(([category, enabled]) => (
            <div key={category} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{category}</h4>
                <p className="text-sm text-gray-500">Receive notifications about {category}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  onChange={(e) => handleNotificationChange('email', category, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-gray-600" />
            <span>Push Notifications</span>
          </CardTitle>
          <CardDescription>Configure push notifications for your mobile device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications.push).map(([category, enabled]) => (
            <div key={category} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{category}</h4>
                <p className="text-sm text-gray-500">Receive push notifications about {category}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  onChange={(e) => handleNotificationChange('push', category, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <span>Security Preferences</span>
          </CardTitle>
          <CardDescription>Configure your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={security.twoFactorAuth}
                onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <Input 
                type="number" 
                value={security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (days)</label>
              <Input 
                type="number" 
                value={security.passwordExpiry}
                onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Failed Login Attempts</label>
              <Input 
                type="number" 
                value={security.failedLoginAttempts}
                onChange={(e) => handleSecurityChange('failedLoginAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IP Whitelist</label>
            <div className="space-y-2">
              {security.ipWhitelist.map((ip, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input value={ip} />
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm">Add IP Address</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-gray-600" />
            <span>Connected Services</span>
          </CardTitle>
          <CardDescription>Manage your third-party integrations and connections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <integration.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{integration.name}</h4>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  integration.status === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {integration.status === 'connected' ? <Check className="h-3 w-3 mr-1" /> : null}
                  {integration.status}
                </span>
                <Button
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => toggleIntegration(integration.name)}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderAppearance = () => (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-gray-600" />
            <span>Theme & Display</span>
          </CardTitle>
          <CardDescription>Customize the appearance of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="border-2 border-green-500 rounded-lg p-3 text-center cursor-pointer">
                <div className="w-8 h-8 bg-gray-900 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">Dark</span>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer">
                <div className="w-8 h-8 bg-white border border-gray-300 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">Light</span>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium">Auto</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
            <div className="grid grid-cols-6 gap-2">
              {['#16a34a', '#2563eb', '#dc2626', '#ea580c', '#9333ea', '#ec4899'].map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-400"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <Dropdown
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
              value="medium"
              onChange={(value) => console.log('Font size changed:', value)}
              placeholder="Select font size"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      case 'integrations':
        return renderIntegrations()
      case 'appearance':
        return renderAppearance()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure your system preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 inline mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      {renderContent()}
    </div>
  )
}
