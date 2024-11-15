import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Select } from '../../ui/select'
import { Switch } from '../../ui/switch'
import { 
  FieldType, 
  TemplateField, 
  FieldLogic, 
  LogicOperator, 
  CalculationType,
  FieldCondition 
} from '../../../types/clientTemplate'

const FIELD_TYPES: { label: string; value: FieldType }[] = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Date', value: 'date' },
  { label: 'Select', value: 'select' },
  { label: 'Multi Select', value: 'multiselect' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Currency', value: 'currency' },
  { label: 'Percentage', value: 'percentage' },
  { label: 'Calculated', value: 'calculated' }
]

const createEmptyField = (): TemplateField => ({
  id: crypto.randomUUID(),
  fieldId: crypto.randomUUID(),
  name: '',
  type: 'text',
  label: '',
  required: false,
  order: 0
})

const LOGIC_OPERATORS: { label: string; value: LogicOperator }[] = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not Equals', value: 'notEquals' },
  { label: 'Contains', value: 'contains' },
  { label: 'Not Contains', value: 'notContains' },
  { label: 'Greater Than', value: 'greaterThan' },
  { label: 'Less Than', value: 'lessThan' }
]

const CALCULATION_TYPES: { label: string; value: CalculationType }[] = [
  { label: 'Sum', value: 'sum' },
  { label: 'Multiply', value: 'multiply' },
  { label: 'Divide', value: 'divide' },
  { label: 'Subtract', value: 'subtract' },
  { label: 'Percentage', value: 'percentage' }
]

interface FieldManagerProps {
  fields: TemplateField[]
  onFieldsChange: (fields: TemplateField[]) => void
  availableFields?: TemplateField[]
}

export function FieldManager({ fields, onFieldsChange, availableFields = [] }: FieldManagerProps) {
  const [selectedField, setSelectedField] = useState<TemplateField | null>(null)

  const handleAddField = () => {
    const newField = createEmptyField()
    onFieldsChange([...fields, newField])
    setSelectedField(newField)
  }

  const handleFieldChange = (field: TemplateField, updates: Partial<TemplateField>) => {
    const updatedFields = fields.map(f => 
      f.id === field.id ? { ...f, ...updates } : f
    )
    onFieldsChange(updatedFields)
    if (selectedField?.id === field.id) {
      setSelectedField({ ...field, ...updates })
    }
  }

  const handleAddLogic = (field: TemplateField) => {
    const newLogic: FieldLogic = {
      conditions: [{
        field: '',
        operator: 'equals',
        value: ''
      }],
      action: 'show'
    }

    handleFieldChange(field, {
      logic: [...(field.logic || []), newLogic]
    })
  }

  const handleLogicChange = (field: TemplateField, logicIndex: number, updates: Partial<FieldLogic>) => {
    const updatedLogic = field.logic?.map((l, i) => 
      i === logicIndex ? { ...l, ...updates } : l
    ) || []

    handleFieldChange(field, { logic: updatedLogic })
  }

  const handleAddCondition = (field: TemplateField, logicIndex: number) => {
    const logic = field.logic?.[logicIndex]
    if (!logic) return

    const newCondition: FieldCondition = {
      field: '',
      operator: 'equals',
      value: ''
    }

    handleLogicChange(field, logicIndex, {
      conditions: [...logic.conditions, newCondition]
    })
  }

  const handleConditionChange = (
    field: TemplateField,
    logicIndex: number,
    conditionIndex: number,
    updates: Partial<FieldCondition>
  ) => {
    const logic = field.logic?.[logicIndex]
    if (!logic) return

    const updatedConditions = logic.conditions.map((c, i) =>
      i === conditionIndex ? { ...c, ...updates } : c
    )

    handleLogicChange(field, logicIndex, {
      conditions: updatedConditions
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Fields</h3>
        <Button onClick={handleAddField}>Add Field</Button>
      </div>

      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id} className="border p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Field Name"
                value={field.name}
                onChange={e => handleFieldChange(field, { name: e.target.value })}
              />
              <Input
                placeholder="Field Label"
                value={field.label}
                onChange={e => handleFieldChange(field, { label: e.target.value })}
              />
              <Select
                value={field.type}
                onValueChange={value => handleFieldChange(field, { type: value as FieldType })}
              >
                {FIELD_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={field.required}
                  onCheckedChange={(checked: boolean) => handleFieldChange(field, { required: checked })}
                />
                <span>Required</span>
              </div>
            </div>

            {field.type === 'select' || field.type === 'multiselect' ? (
              <div className="space-y-2">
                <h4 className="font-medium">Options</h4>
                <Input
                  placeholder="Options (comma separated)"
                  value={field.options?.map(opt => opt.value).join(', ') || ''}
                  onChange={e => {
                    const options = e.target.value.split(',').map(value => ({
                      label: value.trim(),
                      value: value.trim()
                    }))
                    handleFieldChange(field, { options })
                  }}
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Logic</h4>
                <Button variant="outline" onClick={() => handleAddLogic(field)}>
                  Add Logic
                </Button>
              </div>

              {field.logic?.map((logic, logicIndex) => (
                <div key={logicIndex} className="border p-4 rounded-lg space-y-4">
                  <Select
                    value={logic.action}
                    onValueChange={value => 
                      handleLogicChange(field, logicIndex, { 
                        action: value as FieldLogic['action']
                      })
                    }
                  >
                    <option value="show">Show</option>
                    <option value="hide">Hide</option>
                    <option value="require">Require</option>
                    <option value="calculate">Calculate</option>
                  </Select>

                  {logic.action === 'calculate' && (
                    <Select
                      value={logic.calculationType}
                      onValueChange={value =>
                        handleLogicChange(field, logicIndex, {
                          calculationType: value as CalculationType
                        })
                      }
                    >
                      {CALCULATION_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Select>
                  )}

                  <div className="space-y-2">
                    {logic.conditions.map((condition, conditionIndex) => (
                      <div key={conditionIndex} className="grid grid-cols-3 gap-2">
                        <Select
                          value={condition.field}
                          onValueChange={value =>
                            handleConditionChange(field, logicIndex, conditionIndex, {
                              field: value
                            })
                          }
                        >
                          <option value="">Select Field</option>
                          {availableFields.map(f => (
                            <option key={f.fieldId} value={f.fieldId}>
                              {f.label}
                            </option>
                          ))}
                        </Select>

                        <Select
                          value={condition.operator}
                          onValueChange={value =>
                            handleConditionChange(field, logicIndex, conditionIndex, {
                              operator: value as LogicOperator
                            })
                          }
                        >
                          {LOGIC_OPERATORS.map(op => (
                            <option key={op.value} value={op.value}>
                              {op.label}
                            </option>
                          ))}
                        </Select>

                        <Input
                          placeholder="Value"
                          value={condition.value}
                          onChange={e =>
                            handleConditionChange(field, logicIndex, conditionIndex, {
                              value: e.target.value
                            })
                          }
                        />
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => handleAddCondition(field, logicIndex)}
                    >
                      Add Condition
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
