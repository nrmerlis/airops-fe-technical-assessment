import { useMemo } from 'react';

export type IconName = 'connections' | 'delete' | 'edit' | 'metrics' | 'settings' | 'sort' | 'search';

interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  const iconUrl = useMemo(
    () => new URL(`../../assets/icons/${name}.svg`, import.meta.url).href,
    [name]
  );
  
  return <img src={iconUrl} alt={name} />;
}
