import { Card, CardContent } from "./ui/card"

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We begin with a comprehensive review of your current financial situation and goals."
  },
  {
    number: "02",
    title: "Custom Plan Development",
    description: "Our team creates a tailored financial strategy designed specifically for your needs."
  },
  {
    number: "03",
    title: "Implementation",
    description: "We help you put your financial plan into action with clear, actionable steps."
  },
  {
    number: "04",
    title: "Progress Monitoring",
    description: "Regular check-ins to track your progress and make adjustments as needed."
  }
]

export function StepsToSuccess() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple Steps to Financial Success
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="relative">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-secondary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
