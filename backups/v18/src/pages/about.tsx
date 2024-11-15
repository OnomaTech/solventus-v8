import Head from 'next/head'
import Image from 'next/image'
import { Card, CardContent } from "../components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion"

const faqs = [
  {
    question: "What makes Solventus different from other financial services?",
    answer: "We take a personalized, holistic approach to financial guidance. Our team focuses on understanding your unique situation and providing tailored solutions that address your specific needs and goals."
  },
  {
    question: "How long does the financial assessment process take?",
    answer: "The initial assessment typically takes 1-2 hours. During this time, we review your current financial situation, discuss your goals, and begin developing a customized plan for your success."
  },
  {
    question: "Do you offer ongoing support after the initial consultation?",
    answer: "Yes, we provide continuous support throughout your financial journey. This includes regular check-ins, progress monitoring, and strategy adjustments as needed to ensure you stay on track to meet your goals."
  },
  {
    question: "What types of financial challenges can you help with?",
    answer: "We assist with a wide range of financial challenges, including debt management, credit improvement, budgeting, savings strategies, and long-term financial planning."
  },
  {
    question: "How do I get started with Solventus?",
    answer: "Getting started is easy. Simply contact us through our website or call us directly to schedule your initial consultation. We'll guide you through the process and help you take the first steps toward financial freedom."
  }
]

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Solventus</title>
        <meta name="description" content="Guiding You to Financial Clarity and Control" />
      </Head>

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Guiding You to Financial<br />
              Clarity and Control.
            </h1>
            <p className="text-xl mb-8">
              Championing Informed Choices for a Stronger Financial Path.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Solventus, we're dedicated to helping individuals and families achieve financial freedom through personalized guidance and proven strategies. Our mission is to empower you with the knowledge and tools needed to make informed financial decisions.
            </p>
            <p className="text-gray-600">
              We understand that every financial journey is unique, and we're committed to providing tailored solutions that address your specific needs and goals.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/images/financial-guidance.jpg"
              alt="Financial Guidance"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                <p className="text-gray-600">
                  We maintain the highest standards of honesty and transparency in all our client relationships.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Empowerment</h3>
                <p className="text-gray-600">
                  We believe in equipping our clients with knowledge and tools for long-term financial success.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive to deliver exceptional service and results through continuous improvement and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
