import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { IconName, DynamicIcon } from 'lucide-react/dynamic';

import cn from 'classnames';

import css from './index.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon: IconName;
} & ComponentPropsWithoutRef<'button'> &
  PropsWithChildren;

export function Button({ children, variant = 'primary', icon, className, ...props }: ButtonProps) {
  return (
    <button className={cn(css.btn, css[variant], className)} {...props}>
      {icon && <DynamicIcon name={icon} size={16} />}
      {children}
    </button>
  );
}
