import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Solventus - AI Solutions</title>
        <meta name="description" content="Cutting-edge AI solutions and consulting services" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Solventus</h1>
        <p className="text-xl text-gray-600">
          We provide cutting-edge AI solutions and consulting services to help businesses innovate and grow.
        </p>
      </div>
    </>
  )
}
