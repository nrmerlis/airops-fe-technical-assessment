import { Icon, type IconName } from './Icon';
import { Button } from './Button';

interface IconButtonProps {
  icon: IconName;
  disabled?: boolean;
  onClick?: () => void;
}

export function IconButton({ icon, disabled, onClick }: IconButtonProps) {
  return (
    <Button variant="icon" disabled={disabled} onClick={onClick}>
      <Icon name={icon} />
    </Button>
  );
}
