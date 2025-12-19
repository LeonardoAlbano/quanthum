import type { DashboardData } from '../model/dashboard.types';

export async function getDashboardData(): Promise<DashboardData> {
  return {
    title: 'Dashboard',
    kpis: [
      { key: 'retention', label: 'Retention', value: 72, unit: '%' },
      { key: 'conversion', label: 'Conversion', value: 4.8, unit: '%' },
      { key: 'churn', label: 'Churn', value: 1.2, unit: '%' },
      { key: 'arpu', label: 'ARPU', value: 19.4, unit: '$' },
    ],
  };
}
