import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'secondary-light' | 'ghost' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-lg font-medium';

  const variantStyles = {
    primary: 'px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 justify-center font-semibold',
    'secondary-light': 'px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50',
    ghost: 'px-4 py-2 text-gray-600 hover:bg-gray-100',
    icon: 'p-2 bg-gray-100 hover:bg-gray-200',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
