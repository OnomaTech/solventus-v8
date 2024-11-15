import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

export default function Home() {
  return (
    <>
      <Head>
        <title>Solventus - Financial Freedom</title>
        <meta name="description" content="Your path to financial freedom" />
      </Head>

      {/* Hero Section */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                Rebuilding Finances,<br />
                Restoring Confidence
              </h1>
              <p className="text-xl mb-8 animate-fade-in-delay">
                The power of building your financial status the right way.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 animate-bounce-slow">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="w-64 h-64 bg-secondary/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold animate-slide-up">$</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Financial Assessment",
              description: "Comprehensive evaluation of your current financial situation to create a tailored plan for improvement.",
              image: "/images/financial-assessment.svg"
            },
            {
              title: "Debt Management",
              description: "Strategic approaches to managing and reducing debt while building a stronger financial foundation.",
              image: "/images/debt-management.svg"
            },
            {
              title: "Credit Repair",
              description: "Expert guidance to improve your credit score and maintain long-term financial health.",
              image: "/images/credit-repair.svg"
            }
          ].map((service, index) => (
            <Card key={index} className="transform transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Solventus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary animate-slide-up">100%</div>
                </div>
                <div className="absolute inset-0 border-4 border-primary rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {[
                { title: "Expert Guidance", desc: "Years of experience in financial solutions" },
                { title: "Personalized Approach", desc: "Customized solutions for your needs" },
                { title: "Continuous Support", desc: "Ongoing guidance and assistance" },
                { title: "Proven Results", desc: "Track record of client success" }
              ].map((item, index) => (
                <div key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
              <p className="text-xl mb-8">
                Let us help you build a stronger financial future. Schedule your consultation today.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 animate-bounce-slow">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold animate-slide-up">→</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Solventus helped me take control of my finances and create a clear path to debt freedom.",
                author: "Sarah M."
              },
              {
                quote: "The personalized approach and expert guidance made all the difference in my financial journey.",
                author: "Michael R."
              },
              {
                quote: "Thanks to Solventus, I now have a solid financial foundation and peace of mind.",
                author: "Jennifer K."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="transform transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
