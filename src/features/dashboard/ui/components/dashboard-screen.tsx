'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/features/dashboard/store/dashboard.store';
import { DashboardSkeleton } from '@/features/dashboard/ui/components/dashboard-skeleton';
import { KpiCard } from './kpi-card';

export function DashboardScreen() {
  const status = useDashboardStore((s) => s.status);
  const data = useDashboardStore((s) => s.data);
  const error = useDashboardStore((s) => s.error);
  const load = useDashboardStore((s) => s.load);

  useEffect(() => {
    void load();
  }, [load]);

  if (status === 'idle' || status === 'loading') return <DashboardSkeleton />;
  if (status === 'error') return <div className="p-6">{error}</div>;
  if (!data) return <div className="p-6">No data.</div>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.key} label={kpi.label} value={kpi.value} unit={kpi.unit} />
        ))}
      </div>
    </section>
  );
}
