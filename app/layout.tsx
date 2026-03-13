import './globals.css'

export const metadata = {
  title: "Julie's Dog Sitting - Boarding, Daycare & Walking in Georgetown, MA",
  description: 'Professional dog sitting, boarding, daycare, and walking services in Georgetown, Massachusetts. Trusted by pet parents. 4 years experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
