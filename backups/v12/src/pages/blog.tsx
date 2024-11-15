import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Building a Strong Financial Foundation",
    description: "Essential steps to establish and maintain financial stability in today's economy.",
    date: "November 1, 2023",
    readTime: "5 min read",
    category: "Financial Planning"
  },
  {
    id: 2,
    title: "Smart Debt Management Strategies",
    description: "Effective approaches to managing and reducing debt while maintaining financial health.",
    date: "October 28, 2023",
    readTime: "7 min read",
    category: "Debt Management"
  },
  {
    id: 3,
    title: "Understanding Credit Scores",
    description: "A comprehensive guide to credit scores and how to improve them over time.",
    date: "October 25, 2023",
    readTime: "6 min read",
    category: "Credit"
  },
  {
    id: 4,
    title: "Creating an Emergency Fund",
    description: "Why emergency funds are crucial and how to build one that works for you.",
    date: "October 20, 2023",
    readTime: "4 min read",
    category: "Savings"
  },
  {
    id: 5,
    title: "Budgeting for Success",
    description: "Practical budgeting techniques to help you achieve your financial goals.",
    date: "October 15, 2023",
    readTime: "8 min read",
    category: "Budgeting"
  },
  {
    id: 6,
    title: "Investment Basics for Beginners",
    description: "An introduction to investment concepts and strategies for new investors.",
    date: "October 10, 2023",
    readTime: "10 min read",
    category: "Investing"
  }
]

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - Solventus</title>
        <meta name="description" content="Financial advice and insights from Solventus" />
      </Head>

      <div className="bg-[#002B5C] text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Financial Insights & Advice
            </h1>
            <p className="text-xl mb-8">
              Expert guidance and practical tips for your financial journey
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-sm text-gray-500 mb-2">
                  {post.category} • {post.readTime}
                </div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl text-gray-600">
              Subscribe to our newsletter for the latest financial insights and tips delivered directly to your inbox.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
