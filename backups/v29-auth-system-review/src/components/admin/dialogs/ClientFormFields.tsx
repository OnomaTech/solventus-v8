import { Client } from "../../../types/clients"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { FieldError } from "./ClientFormStatus"
import { ClientTemplate } from "../../../types/clientTemplate"

interface ClientFormFieldsProps {
  formData: Partial<Client>
  errors: Record<string, string | undefined>
  updateField: (field: string, value: any) => void
  templates: ClientTemplate[]
}

export function ClientFormFields({
  formData,
  errors,
  updateField,
  templates
}: ClientFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              updateField('type', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="non-profit">Non-Profit</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <FieldError error={errors.type} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              updateField('status', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <FieldError error={errors.status} />}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template">Profile Template</Label>
        <Select
          value={formData.templateId}
          onValueChange={(value) =>
            updateField('templateId', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            updateField('firstName', e.target.value)
          }
          required
        />
        {errors.firstName && <FieldError error={errors.firstName} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            updateField('lastName', e.target.value)
          }
          required
        />
        {errors.lastName && <FieldError error={errors.lastName} />}
      </div>

      {formData.type !== 'individual' && (
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              updateField('companyName', e.target.value)
            }
            required
          />
          {errors.companyName && <FieldError error={errors.companyName} />}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            updateField('email', e.target.value)
          }
          required
        />
        {errors.email && <FieldError error={errors.email} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) =>
            updateField('phone', e.target.value)
          }
          required
        />
        {errors.phone && <FieldError error={errors.phone} />}
      </div>
    </>
  )
}
