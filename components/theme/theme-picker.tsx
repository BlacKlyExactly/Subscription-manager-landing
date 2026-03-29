'use client'

import { useEffect, useId, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

export function ThemePicker({ className }: {
  className?: string
}) {
  const id = useId()
  const { setTheme, resolvedTheme } = useTheme();
  const [checked, setChecked] = useState(() => resolvedTheme === 'dark');
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return
    setTheme(checked ? 'dark' : 'light')
  }, [checked])

  if (!mounted) return null;

  const toggleSwitch = () => setChecked(prev => !prev)

  return (
    <div className={cn('group inline-flex items-center gap-2', className)} data-state={checked ? 'checked' : 'unchecked'}>
      <span
        id={`${id}-light`}
        className='group-data-[state=checked]:text-muted-foreground/70 cursor-pointer text-left text-sm font-medium'
        aria-controls={id}
        onClick={() => setChecked(false)}
      >
        <SunIcon className='size-4' aria-hidden='true' />
      </span>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={toggleSwitch}
        aria-labelledby={`${id}-dark ${id}-light`}
        aria-label='Toggle between dark and light mode'
      />
      <span
        id={`${id}-dark`}
        className='group-data-[state=unchecked]:text-muted-foreground/70 cursor-pointer text-right text-sm font-medium'
        aria-controls={id}
        onClick={() => setChecked(true)}
      >
        <MoonIcon className='size-4' aria-hidden='true' />
      </span>
    </div>
  )
}


