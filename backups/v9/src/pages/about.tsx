import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Your Company Name</title>
        <meta name="description" content="Learn more about our company" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Your company's mission statement or brief history goes here. Explain what makes your company unique and why customers should choose you.
        </p>
        <p className="mb-4">
          Highlight your company's values, achievements, or any other important information that you want to share with your visitors.
        </p>
      </div>
    </>
  )
}
