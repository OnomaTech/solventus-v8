import { useState } from 'react'
import {
  validatePhone,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateRoutingNumber,
  validateAccountNumber,
  validateZipCode,
  formatPhoneNumber,
  formatCardNumber,
  formatExpiry
} from './useFormValidation'

interface FormErrors {
  telephone?: string
  cellPhone?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  routingNumber?: string
  accountNumber?: string
  zipCode?: string
}

export const useSettingsForm = () => {
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validatePhoneField = (value: string, field: 'telephone' | 'cellPhone') => {
    if (!validatePhone(value)) {
      setErrors(prev => ({
        ...prev,
        [field]: 'Please enter a valid phone number: (555) 123-4567'
      }))
      return false
    }
    setErrors(prev => ({ ...prev, [field]: undefined }))
    return true
  }

  const validateCardFields = (cardNumber: string, expiry: string, cvv: string) => {
    let isValid = true
    const newErrors: FormErrors = {}

    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number'
      isValid = false
    }

    if (!validateExpiry(expiry)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
      isValid = false
    }

    if (!validateCVV(cvv)) {
      newErrors.cvv = 'Please enter a valid CVV'
      isValid = false
    }

    setErrors(prev => ({ ...prev, ...newErrors }))
    return isValid
  }

  const validateBankFields = (routingNumber: string, accountNumber: string) => {
    let isValid = true
    const newErrors: FormErrors = {}

    if (!validateRoutingNumber(routingNumber)) {
      newErrors.routingNumber = 'Please enter a valid 9-digit routing number'
      isValid = false
    }

    if (!validateAccountNumber(accountNumber)) {
      newErrors.accountNumber = 'Please enter a valid account number'
      isValid = false
    }

    setErrors(prev => ({ ...prev, ...newErrors }))
    return isValid
  }

  const validateZip = (zip: string) => {
    if (!validateZipCode(zip)) {
      setErrors(prev => ({
        ...prev,
        zipCode: 'Please enter a valid ZIP code'
      }))
      return false
    }
    setErrors(prev => ({ ...prev, zipCode: undefined }))
    return true
  }

  return {
    errors,
    isSubmitting,
    setIsSubmitting,
    validatePhoneField,
    validateCardFields,
    validateBankFields,
    validateZip,
    formatPhoneNumber,
    formatCardNumber,
    formatExpiry
  }
}
