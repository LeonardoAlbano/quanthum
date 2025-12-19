import { Card, CardContent } from '@/components/ui/card';

type Props = {
  label: string;
  value: number;
  unit?: string;
};

export function KpiCard({ label, value, unit }: Props) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {unit ? <p className="text-sm text-muted-foreground">{unit}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
