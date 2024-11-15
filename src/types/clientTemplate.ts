export type FieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'phone' 
  | 'date' 
  | 'select' 
  | 'multiselect' 
  | 'checkbox' 
  | 'textarea'
  | 'currency'
  | 'percentage'
  | 'calculated'

export type LogicOperator = 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan'

export type CalculationType = 'sum' | 'multiply' | 'divide' | 'subtract' | 'percentage'

export interface FieldOption {
  label: string
  value: string
}

export interface FieldCondition {
  field: string
  operator: LogicOperator
  value: any
}

export interface FieldLogic {
  conditions: FieldCondition[]
  action: 'show' | 'hide' | 'require' | 'calculate'
  calculationType?: CalculationType
  targetFields?: string[]
}

export interface TemplateField {
  id: string
  fieldId: string  // Unique identifier for field references
  name: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  options?: FieldOption[]
  defaultValue?: any
  validation?: {
    pattern?: string
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
  }
  logic?: FieldLogic[]
  order: number
}

export interface TemplateSection {
  id: string
  name: string
  label: string
  description?: string
  fields: TemplateField[]
  order: number
}

export interface TemplateTab {
  id: string
  name: string
  label: string
  sections: TemplateSection[]
  order: number
}

export interface ClientTemplate {
  id: string
  name: string
  description?: string
  tabs: TemplateTab[]
  basicInfo: {
    sections: TemplateSection[]
  }
  preferences: {
    sections: TemplateSection[]
  }
  createdAt: string
  updatedAt: string
  version: number
  isDefault?: boolean
}

export interface ClientData {
  templateId: string
  templateVersion: number
  data: Record<string, any>
}

// Type aliases for backward compatibility
export type Field = TemplateField
export type Section = TemplateSection
export type Tab = TemplateTab
export type BasicInfoSection = TemplateSection
export type PreferencesSection = TemplateSection

// Type guards
export function hasOptions(field: TemplateField): field is TemplateField & { options: FieldOption[] } {
  return field.type === 'select' || field.type === 'multiselect'
}

export function hasLogic(field: TemplateField): field is TemplateField & { logic: FieldLogic[] } {
  return Boolean(field.logic && field.logic.length > 0)
}

export function isCalculatedField(field: TemplateField): boolean {
  return field.type === 'calculated' && hasLogic(field) && field.logic.some(l => l.action === 'calculate')
}

// Helper to get typed value based on field type
export function getTypedValue(field: TemplateField, value: any): any {
  switch (field.type) {
    case 'number':
    case 'currency':
    case 'percentage':
      return Number(value)
    case 'checkbox':
      return Boolean(value)
    case 'multiselect':
      return Array.isArray(value) ? value : []
    default:
      return value
  }
}

// Helper to evaluate field logic
export function evaluateFieldLogic(
  field: TemplateField,
  allFields: Record<string, any>,
  logic: FieldLogic
): boolean {
  return logic.conditions.every(condition => {
    const fieldValue = allFields[condition.field]
    const conditionValue = condition.value

    switch (condition.operator) {
      case 'equals':
        return fieldValue === conditionValue
      case 'notEquals':
        return fieldValue !== conditionValue
      case 'contains':
        return String(fieldValue).includes(String(conditionValue))
      case 'notContains':
        return !String(fieldValue).includes(String(conditionValue))
      case 'greaterThan':
        return Number(fieldValue) > Number(conditionValue)
      case 'lessThan':
        return Number(fieldValue) < Number(conditionValue)
      default:
        return false
    }
  })
}
