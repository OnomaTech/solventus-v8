import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    title: "The Future of AI in Business",
    excerpt: "Explore how artificial intelligence is shaping the future of business operations and decision-making.",
    date: "2023-05-15"
  },
  {
    title: "Implementing Machine Learning in Your Workflow",
    excerpt: "Learn practical steps to integrate machine learning into your existing business processes.",
    date: "2023-05-10"
  },
  {
    title: "AI Ethics: Navigating the Challenges",
    excerpt: "Discover the ethical considerations surrounding AI implementation and how to address them.",
    date: "2023-05-05"
  }
]

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - Solventus</title>
        <meta name="description" content="Read the latest insights on AI and business from Solventus experts" />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.excerpt}</p>
                <Link href="#" className="text-blue-600 hover:underline">Read more</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
