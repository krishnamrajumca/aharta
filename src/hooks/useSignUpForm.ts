import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SignUpFormData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  
  // Step 2: Restaurant Information
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  restaurantHours: {
    monday: { open: string; close: string; isOpen: boolean }
    tuesday: { open: string; close: string; isOpen: boolean }
    wednesday: { open: string; close: string; isOpen: boolean }
    thursday: { open: string; close: string; isOpen: boolean }
    friday: { open: string; close: string; isOpen: boolean }
    saturday: { open: string; close: string; isOpen: boolean }
    sunday: { open: string; close: string; isOpen: boolean }
  }
  cuisineType: string
  restaurantDescription: string
}

interface SignUpFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  restaurantName?: string
  restaurantAddress?: string
  restaurantPhone?: string
  cuisineType?: string
  restaurantDescription?: string
  general?: string
}

export const useSignUpForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    restaurantAddress: '',
    restaurantPhone: '',
    restaurantHours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '10:00', close: '16:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: false }
    },
    cuisineType: '',
    restaurantDescription: ''
  })
  
  const [errors, setErrors] = useState<SignUpFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const updateField = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field as keyof SignUpFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const updateRestaurantHours = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      restaurantHours: {
        ...prev.restaurantHours,
        [day]: {
          ...prev.restaurantHours[day as keyof typeof prev.restaurantHours],
          [field]: value
        }
      }
    }))
  }

  const nextStep = () => {
    console.log('Attempting to go to next step from step:', currentStep)
    if (validateCurrentStep()) {
      console.log('Validation passed, moving to step:', currentStep + 1)
      setCurrentStep(prev => prev + 1)
      setErrors({})
    } else {
      console.log('Validation failed, staying on step:', currentStep)
    }
  }

  const prevStep = () => {
    console.log('Going back to step:', currentStep - 1)
    setCurrentStep(prev => prev - 1)
    setErrors({})
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: SignUpFormErrors = {}
    
    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    } else if (currentStep === 2) {
      if (!formData.restaurantName.trim()) {
        newErrors.restaurantName = 'Restaurant name is required'
      }
      
      if (!formData.restaurantAddress.trim()) {
        newErrors.restaurantAddress = 'Restaurant address is required'
      }
      
      if (!formData.restaurantPhone.trim()) {
        newErrors.restaurantPhone = 'Restaurant phone number is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign up form submitted:', formData)
    
    if (!validateCurrentStep()) {
      console.log('Form validation failed:', errors)
      return
    }
    
    if (currentStep < 2) {
      nextStep()
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Sign up successful for:', formData.email)
      // Redirect to home page after successful sign up
      router.push('/home')
      
    } catch (error) {
      console.error('Sign up failed:', error)
      setErrors({ general: 'Sign up failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentStep,
    formData,
    errors,
    isLoading,
    updateField,
    updateRestaurantHours,
    nextStep,
    prevStep,
    handleSubmit
  }
}
