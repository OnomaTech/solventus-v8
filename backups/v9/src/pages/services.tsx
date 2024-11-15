import Head from 'next/head'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - Solventus</title>
        <meta name="description" content="Our AI consulting and solution services" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Consulting</CardTitle>
              <CardDescription>Strategic guidance for AI implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Expert consultation on integrating AI solutions into your business processes.
                We help identify opportunities and develop implementation strategies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom AI Solutions</CardTitle>
              <CardDescription>Tailored AI development services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Development of custom AI solutions designed specifically for your business needs.
                From machine learning models to natural language processing systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Training</CardTitle>
              <CardDescription>Educational programs and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive training programs to help your team understand and work with AI technologies.
                From basics to advanced implementations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
