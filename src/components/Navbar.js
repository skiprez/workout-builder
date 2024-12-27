'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FitnessCenter, ListAlt, Settings } from '@mui/icons-material';

const navItems = [
  { href: '/', icon: <Home />, label: 'Home' },
  { href: '/workouts', icon: <FitnessCenter />, label: 'Workouts' },
  { href: '/exercises', icon: <ListAlt />, label: 'Exercises' },
  { href: '/settings', icon: <Settings />, label: 'Settings' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="md:mt-[400px] md:mr-2 md:flex flex-col justify-center items-center bg-gray-800 text-white p-4 w-16 md:w-14 md:h-[300px] rounded-md shadow-md shadow-black">
      {navItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-row md:flex-col p-4 items-center md:items-center gap-2 md:gap-4 w-full ${
            pathname === href ? 'text-blue-400' : 'text-gray-400'
          }`}
        >
          <div className="text-3xl">{icon}</div>
        </Link>
      ))}
    </nav>
  );
}
