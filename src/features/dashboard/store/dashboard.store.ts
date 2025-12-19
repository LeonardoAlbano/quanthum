import { create } from 'zustand';
import type { DashboardData } from '../model/dashboard.types';
import { getDashboardData } from '../api/dashboard.api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export type DashboardState = {
  status: Status;
  data: DashboardData | null;
  error: string | null;
  load: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>()((set) => ({
  status: 'idle',
  data: null,
  error: null,
  load: async () => {
    set({ status: 'loading', error: null });

    try {
      const data = await getDashboardData();
      set({ status: 'success', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      set({ status: 'error', error: message });
    }
  },
}));
