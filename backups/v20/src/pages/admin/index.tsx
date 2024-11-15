import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { AdminLayout } from "../../components/admin/AdminLayout"
import { Users, Calendar, FileText, DollarSign } from 'lucide-react'

const stats = [
  {
    title: "Total Clients",
    value: "2,345",
    icon: Users,
    change: "+12%",
    changeType: "positive" as const
  },
  {
    title: "Appointments",
    value: "145",
    icon: Calendar,
    change: "+4%",
    changeType: "positive" as const
  },
  {
    title: "Documents",
    value: "789",
    icon: FileText,
    change: "+8%",
    changeType: "positive" as const
  },
  {
    title: "Revenue",
    value: "$45,231",
    icon: DollarSign,
    change: "+23%",
    changeType: "positive" as const
  }
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Solventus</title>
      </Head>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
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
              {[
                "New client registration: John Smith",
                "Document uploaded: Financial Report Q3",
                "Appointment scheduled: Sarah Johnson",
                "Payment received: $1,200",
                "New blog post published: Financial Tips"
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span>{activity}</span>
                  <span className="text-sm text-muted-foreground">
                    {index === 0 ? "Just now" : 
                     index === 1 ? "2 hours ago" :
                     index === 2 ? "5 hours ago" :
                     index === 3 ? "Yesterday" : "2 days ago"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: "Michael Brown", time: "Today, 2:00 PM" },
                  { client: "Emma Wilson", time: "Today, 4:30 PM" },
                  { client: "James Lee", time: "Tomorrow, 10:00 AM" }
                ].map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{appointment.client}</span>
                    <span className="text-sm text-muted-foreground">
                      {appointment.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Q4 Financial Report.pdf",
                  "Client Agreement - Johnson.docx",
                  "Investment Strategy 2024.pdf",
                  "Tax Documents.zip"
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{doc}</span>
                    <span className="text-sm text-blue-500 cursor-pointer hover:underline">
                      View
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
