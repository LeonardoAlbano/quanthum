'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function LoginSuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const value = searchParams.get('login');
    if (value !== 'success') return;

    toast.success('Login realizado com sucesso.');

    const next = new URLSearchParams(searchParams.toString());
    next.delete('login');

    const qs = next.toString();
    router.replace(qs ? `/dashboard?${qs}` : '/dashboard', { scroll: false });
  }, [searchParams, router]);

  return null;
}
