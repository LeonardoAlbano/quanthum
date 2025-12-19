'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { PasswordField } from '@/features/auth/ui/components/password-field';

export function LoginCard() {
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleGithub() {
    setLoadingGithub(true);
    try {
      await signIn('github', { callbackUrl: '/dashboard?login=success' });
    } catch {
      setLoadingGithub(false);
      toast.error('Não foi possível iniciar o login com GitHub.');
    }
  }

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingCredentials(true);

    try {
      toast.message('Login com usuário/senha ainda não implementado.');
    } finally {
      setLoadingCredentials(false);
    }
  }

  const disabled = loadingGithub || loadingCredentials;

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/12 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Login</h1>
        <p className="text-sm text-white/70">Welcome back, please login to your account</p>
      </div>

      <form onSubmit={handleCredentials} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white/85">
            User Name
          </Label>
          <Input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="leo@nortus.com"
            disabled={disabled}
            className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/15"
          />
        </div>

        <PasswordField
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          disabled={disabled}
        />

        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="cursor-ponter" />
          <Label htmlFor="remember" className="text-sm text-white/70">
            Remember me
          </Label>
        </div>

        {loadingCredentials ? (
          <Skeleton className="h-11 w-full rounded-2xl" />
        ) : (
          <Button
            type="submit"
            className="w-full rounded-2xl cursor-pointer"
            disabled={loadingGithub}
          >
            Entrar
          </Button>
        )}

        <div className="flex w-full items-center gap-3">
          <Separator className="flex-1 bg-white/15" />
          <span className="text-xs text-white/50">or</span>
          <Separator className="flex-1 bg-white/15" />
        </div>

        {loadingGithub ? (
          <Skeleton className="h-11 w-full rounded-2xl" />
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={handleGithub}
            className="w-full rounded-2xl cursor-pointer border-white/15 bg-white/5 text-white hover:bg-white/10"
            disabled={loadingCredentials}
          >
            Login com GitHub
          </Button>
        )}
      </form>

      <p className="mt-6 text-center cursor-pointer text-xs text-white/65">
        Não tem conta?{' '}
        <Link href="/signup" className="font-semibold text-white hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
