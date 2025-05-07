// app/admin/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin dashboard after loading
    router.push('/admin/dashboard');
  }, [router]);

  return null; // You can return null or a loading spinner here if you prefer
}
