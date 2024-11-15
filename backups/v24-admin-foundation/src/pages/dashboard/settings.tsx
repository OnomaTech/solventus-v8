import Head from 'next/head'
import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Notifications } from '@/components/Notifications'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (e.g., update user profile)
    alert('Profile updated!')
  }

  return (
    <>
      <Head>
        <title>Settings - Solventus Dashboard</title>
        <meta name="description" content="Manage your Solventus account settings" />
      </Head>
      <div className="flex h-screen bg-gray-100">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <Notifications />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-5">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
