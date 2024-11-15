import { useState, useCallback } from 'react'
import { Client } from '../types/clients'

interface UseClientFormProps {
  initialData: Partial<Client>
}

type FormErrors = Record<string, string | undefined>

export function useClientForm({ initialData }: UseClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Create a new errors object without the field being updated
    setErrors(prev => {
      const { [field]: _, ...rest } = prev
      return rest
    })
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required'
    }

    if (formData.type !== 'individual' && !formData.companyName?.trim()) {
      newErrors.companyName = 'Company name is required for non-individual clients'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData(initialData)
    setErrors({})
    setIsSubmitting(false)
  }, [initialData])

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    updateField,
    validateForm,
    resetForm
  }
}
