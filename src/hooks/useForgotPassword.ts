import { useState } from 'react'

interface ForgotPasswordData {
  email: string
}

interface ForgotPasswordErrors {
  email?: string
  general?: string
}

export const useForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: ''
  })
  
  const [errors, setErrors] = useState<ForgotPasswordErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateField = (field: keyof ForgotPasswordData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Forgot password form submitted:', formData)
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors)
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Password reset email sent to:', formData.email)
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Password reset failed:', error)
      setErrors({ general: 'Failed to send reset email. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ email: '' })
    setErrors({})
    setIsSubmitted(false)
  }

  return {
    formData,
    errors,
    isLoading,
    isSubmitted,
    updateField,
    handleSubmit,
    resetForm
  }
}
