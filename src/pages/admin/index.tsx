import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BarChart, Users, Calendar, FileText } from 'lucide-react'
import { AdminLayout } from '../../components/admin/AdminLayout'

const stats = [
  {
    title: 'Total Clients',
    value: '150',
    change: '+12.3%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Appointments Today',
    value: '8',
    change: '+4.5%',
    icon: Calendar,
    trend: 'up'
  },
  {
    title: 'Documents Processed',
    value: '342',
    change: '+28.4%',
    icon: FileText,
    trend: 'up'
  },
  {
    title: 'Revenue',
    value: '$48.2K',
    change: '+10.1%',
    icon: BarChart,
    trend: 'up'
  }
]

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAdmin, loading } = useAdminAuth()

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login')
    }
  }, [user, isAdmin, loading, router])

  // Show loading state while checking auth
  if (loading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Solventus</title>
      </Head>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity items would go here */}
              <div className="text-sm text-gray-500">
                No recent activity to display.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/admin/clients/new')}
                className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-5 w-5 mb-2" />
                <div className="font-medium">Add New Client</div>
                <div className="text-sm text-gray-500">Create a new client profile</div>
              </button>
              <button
                onClick={() => router.push('/admin/appointments/new')}
                className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Calendar className="h-5 w-5 mb-2" />
                <div className="font-medium">Schedule Appointment</div>
                <div className="text-sm text-gray-500">Book a new appointment</div>
              </button>
              <button
                onClick={() => router.push('/admin/documents/new')}
                className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-5 w-5 mb-2" />
                <div className="font-medium">Upload Document</div>
                <div className="text-sm text-gray-500">Add new documentation</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
