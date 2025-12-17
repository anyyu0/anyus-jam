import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: "anyu's jam",
  description: 'The diary of anyu\'s music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}