// app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import React from 'react';

export const metadata = {
  title: 'Task Manager',
  description: 'Manage tasks easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
