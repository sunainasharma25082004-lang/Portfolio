import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })
const sora = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Sunaina Sharma — Frontend Web and App Developer',
  description:
    'Portfolio of Sunaina Sharma, a Frontend & MERN Stack Developer building fast, scalable, and user-focused web applications with React, Node.js, Express, and MongoDB.',
  generator: 'v0.app',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Web Developer Portfolio',
  ],
  openGraph: {
    title: 'Sunaina Sharma — Frontend Web and App Developer',
    description:
      'I build fast, scalable, and user-focused web applications with modern technologies.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0F172A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
