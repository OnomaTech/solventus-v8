import { ArrowLeft } from 'lucide-react'
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useState } from 'react'

interface SettingsFormProps {
  userEmail: string | null | undefined
  onClose: () => void
}

export function SettingsForm({ userEmail, onClose }: SettingsFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'ach'>('credit')

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-0 top-0"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={userEmail || ''} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tel">Telephone</Label>
                <Input id="tel" placeholder="(555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="cell">Cell Phone</Label>
                <Input id="cell" placeholder="(555) 987-6543" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="smsOptIn" className="rounded" />
                <Label htmlFor="smsOptIn">Opt in for SMS notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="emailOptIn" className="rounded" />
                <Label htmlFor="emailOptIn">Opt in for email notifications</Label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Profile</Button>
            </div>
          </div>

          {/* Billing Information Section */}
          <h2 className="text-xl font-bold mb-4">Billing Information</h2>
          <Tabs defaultValue="payment" className="w-full">
            <TabsList>
              <TabsTrigger value="payment">Payment Method</TabsTrigger>
              <TabsTrigger value="address">Billing Address</TabsTrigger>
            </TabsList>

            <TabsContent value="payment">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    variant={paymentMethod === 'credit' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    Credit Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('debit')}
                  >
                    Debit Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'ach' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('ach')}
                  >
                    ACH Transfer
                  </Button>
                </div>

                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">Security Code</Label>
                        <Input id="cvv" placeholder="123" type="password" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Card</Button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'ach' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input id="routingNumber" placeholder="123456789" />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="987654321" type="password" />
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Bank Account</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="address">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billingStreet">Street Address</Label>
                  <Input id="billingStreet" placeholder="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="billingApt">Apt/Suite (Optional)</Label>
                  <Input id="billingApt" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City</Label>
                    <Input id="billingCity" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State</Label>
                    <Input id="billingState" placeholder="NY" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingZip">ZIP Code</Label>
                    <Input id="billingZip" placeholder="10001" />
                  </div>
                  <div>
                    <Label htmlFor="billingCountry">Country</Label>
                    <Input id="billingCountry" placeholder="United States" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Billing Address</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
