'use client'

import React from 'react'
import { X, Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForgotPassword } from '@/hooks/useForgotPassword'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const { formData, errors, isLoading, isSubmitted, updateField, handleSubmit, resetForm } = useForgotPassword()

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
        <CardHeader className="space-y-1 text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
            {isSubmitted ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <Mail className="w-6 h-6 text-white" />
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
          </CardTitle>
          
          <CardDescription className="text-gray-600">
            {isSubmitted 
              ? `We've sent a password reset link to ${formData.email}`
              : 'Enter your email address and we will send you a link to reset your password.'
            }
          </CardDescription>
        </CardHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-gray-700 font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-3">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="w-full text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  If an account with that email exists, you'll receive a password reset link shortly.
                </p>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p>Didn't receive the email? Check your spam folder.</p>
                <p>You can also try using a different email address.</p>
              </div>
            </div>
          </CardContent>
        )}
        
        {isSubmitted && (
          <CardFooter className="flex flex-col space-y-3">
            <Button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              Send to Different Email
            </Button>
            
            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
