import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Workout Builder',
  description: 'Create and manage your workouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col md:flex-row bg-gray-700">
        <main className="flex-1 md:ml-16 p-4">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}
