'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
};

export function PasswordField({ label, value, onChange, placeholder, disabled, name }: Props) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      {label ? (
        <Label htmlFor={id} className="text-white/85">
          {label}
        </Label>
      ) : null}

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="bg-white/5 border-white/15 text-white placeholder:text-white/40 pr-11 focus-visible:ring-2 focus-visible:ring-white/15"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md text-white/60 hover:text-white hover:bg-white/10"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
