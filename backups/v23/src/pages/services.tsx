import Head from 'next/head'
import Image from 'next/image'
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { StepsToSuccess } from "../components/StepsToSuccess"

const services = [
  {
    id: "financial-assessment",
    title: "Financial Assessment",
    description: "Comprehensive evaluation of your current financial situation",
    content: [
      "In-depth analysis of your financial health",
      "Identification of strengths and areas for improvement",
      "Custom action plan development",
      "Goal setting and milestone creation"
    ],
    image: "/images/financial-assessment.svg"
  },
  {
    id: "debt-management",
    title: "Debt Management",
    description: "Strategic approaches to managing and reducing debt",
    content: [
      "Debt consolidation strategies",
      "Interest rate optimization",
      "Payment structuring",
      "Credit score improvement plans"
    ],
    image: "/images/debt-management.svg"
  },
  {
    id: "credit-repair",
    title: "Credit Repair",
    description: "Professional guidance to improve your credit score",
    content: [
      "Credit report analysis",
      "Dispute resolution",
      "Credit building strategies",
      "Ongoing monitoring and support"
    ],
    image: "/images/credit-repair.svg"
  },
  {
    id: "financial-education",
    title: "Financial Education",
    description: "Knowledge and tools for long-term financial success",
    content: [
      "Personal finance workshops",
      "Budgeting techniques",
      "Investment basics",
      "Financial planning principles"
    ],
    image: "/images/financial-assessment.svg"
  },
  {
    id: "savings-strategies",
    title: "Savings Strategies",
    description: "Effective methods to build and maintain savings",
    content: [
      "Emergency fund planning",
      "Goal-based savings programs",
      "Automated savings solutions",
      "Investment opportunities"
    ],
    image: "/images/debt-management.svg"
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support",
    description: "Continuous guidance throughout your financial journey",
    content: [
      "Regular progress reviews",
      "Strategy adjustments",
      "Financial coaching",
      "Resource access"
    ],
    image: "/images/credit-repair.svg"
  }
]

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - Solventus</title>
        <meta name="description" content="Financial Services and Solutions" />
      </Head>

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Focused on Your Financial<br />
              Success
            </h1>
            <p className="text-xl mb-8">
              Proven Strategies and Support for Every Step of Your Journey
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <Tabs defaultValue={services[0].id} className="space-y-8">
          <TabsList className="flex flex-wrap justify-center gap-2">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="px-6 py-2"
              >
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <ul className="space-y-4">
                        {service.content.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <StepsToSuccess />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-xl text-gray-600">
              We're dedicated to providing personalized financial solutions that work for your unique situation. Our team of experts is here to guide you every step of the way, ensuring you have the support and resources needed to achieve your financial goals.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
