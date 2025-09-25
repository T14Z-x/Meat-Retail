import type { Metadata } from 'next';
import './globals.css';
import '../styles/variables.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

export const metadata: Metadata = {
  title: 'Meat Retail — Homepage',
  description: 'Placeholder retail site homepage',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
