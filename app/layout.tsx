import type { Metadata } from 'next';
import './globals.css';
import '../styles/variables.css';
import '../styles/transitions.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import PageTransition from '../components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Meat Retail — Homepage',
  description: 'Placeholder retail site homepage',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
