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
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Rebuilding Finances,<br />
              Restoring Confidence
            </h1>
            <p className="text-xl mb-8">
              The power of building your financial status the right way.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Image
                  src="/images/financial-assessment.svg"
                  alt="Financial Assessment"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Financial Assessment</h3>
              <p className="text-gray-600">
                Comprehensive evaluation of your current financial situation to create a tailored plan for improvement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Image
                  src="/images/debt-management.svg"
                  alt="Debt Management"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Debt Management</h3>
              <p className="text-gray-600">
                Strategic approaches to managing and reducing debt while building a stronger financial foundation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Image
                  src="/images/credit-repair.svg"
                  alt="Credit Repair"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Credit Repair</h3>
              <p className="text-gray-600">
                Expert guidance to improve your credit score and maintain long-term financial health.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Solventus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-600">Years of experience in financial solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized</h3>
              <p className="text-gray-600">Customized solutions for your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <p className="text-gray-600">Continuous guidance and assistance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Results</h3>
              <p className="text-gray-600">Proven track record of success</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8">
            Let us help you build a stronger financial future. Schedule your consultation today.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "Solventus helped me take control of my finances and create a clear path to debt freedom."
                </p>
                <p className="font-bold">- Sarah M.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "The personalized approach and expert guidance made all the difference in my financial journey."
                </p>
                <p className="font-bold">- Michael R.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  "Thanks to Solventus, I now have a solid financial foundation and peace of mind."
                </p>
                <p className="font-bold">- Jennifer K.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
