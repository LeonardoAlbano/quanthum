import { LoginCard } from '@/features/auth/ui/components/login-card';

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_55%),linear-gradient(to_bottom,rgba(2,6,23,1),rgba(15,23,42,1))]">
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <LoginCard />
      </div>
    </main>
  );
}
