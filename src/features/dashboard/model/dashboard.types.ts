export type KpiKey = 'retention' | 'conversion' | 'churn' | 'arpu';

export type Kpi = {
  key: KpiKey;
  label: string;
  value: number;
  unit?: string;
};

export type DashboardData = {
  title: string;
  kpis: Kpi[];
};
