'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserRole(parsed.role); // role: 'admin' | 'manager' | 'user'
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
  };

  let links = [];

  if (userRole === 'admin') {
    links = [
      { href: '/admin/dashboard', label: 'Dashboard' },
      { href: '/admin/details', label: 'Details' },
      { href: '/login', label: 'Logout', onClick: logout },
    ];
  } else if (userRole === 'manager') {
    links = [
      { href: '/manager/dashboard', label: 'Dashboard' },
      { href: '/manager/tasks', label: 'Tasks' },
      { href: '/login', label: 'Logout', onClick: logout },
    ];
  } else if (userRole === 'user') {
    links = [
      { href: '/user/dashboard', label: 'Dashboard' },
      { href: '/user/tasks', label: 'Tasks' },
      { href: '/login', label: 'Logout', onClick: logout },
    ];
  } else {
    links = [
      { href: '/login', label: 'Login' },
      { href: '/register/dashboard', label: 'Register' },
    ];
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {links.map(({ href, label, onClick }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onClick}
              className={`${styles.navItem} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
