import { AuthProvider } from '@/app/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Tier List Maker',
  description: 'Create your own tier lists',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-[#242222] p-8 text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
