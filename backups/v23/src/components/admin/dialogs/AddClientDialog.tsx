import { useState } from 'react'
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"

interface AddClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function AddClientDialog({ isOpen, onClose, onSubmit }: AddClientDialogProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cell: ""
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    },
    preferences: {
      smsOptIn: false,
      emailOptIn: false,
      preferredContact: "email"
    }
  })

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle>Add New Client</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.personal.firstName}
                        onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.personal.lastName}
                        onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personal.email}
                      onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.personal.phone}
                        onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cell">Cell Phone</Label>
                      <Input
                        id="cell"
                        value={formData.personal.cell}
                        onChange={(e) => handleInputChange("personal", "cell", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="address">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange("address", "street", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => handleInputChange("address", "city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => handleInputChange("address", "state", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.address.zipCode}
                        onChange={(e) => handleInputChange("address", "zipCode", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.address.country}
                        onChange={(e) => handleInputChange("address", "country", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="smsOptIn"
                      checked={formData.preferences.smsOptIn}
                      onChange={(e) => handleInputChange("preferences", "smsOptIn", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="smsOptIn">Opt in for SMS notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailOptIn"
                      checked={formData.preferences.emailOptIn}
                      onChange={(e) => handleInputChange("preferences", "emailOptIn", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="emailOptIn">Opt in for email notifications</Label>
                  </div>
                  <div>
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <select
                      id="preferredContact"
                      value={formData.preferences.preferredContact}
                      onChange={(e) => handleInputChange("preferences", "preferredContact", e.target.value)}
                      className="w-full border rounded-md px-3 py-2 mt-1"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Client
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
