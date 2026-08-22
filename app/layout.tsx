import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sunaina Sharma — Frontend & Full Stack Mobile Developer',
  description:
    'Portfolio of Sunaina Sharma, Frontend & Mobile App Engineer specializing in React.js, React Native, Node.js, Express, MongoDB, and Google Play Store publishing.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'React Native Mobile Developer',
    'Play Store Apps',
    'Sunaina Sharma Portfolio',
  ],
  openGraph: {
    title: 'Sunaina Sharma — Frontend & Full Stack Mobile Developer',
    description:
      'I build fast, scalable, and user-focused web and mobile applications with modern technologies.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0f19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} bg-background scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden w-full max-w-full" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
