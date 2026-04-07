import { ChangeEvent, ComponentPropsWithoutRef, useId } from 'react';

import cn from 'classnames';

import css from './index.module.css';

type InputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
} & ComponentPropsWithoutRef<'input'>;

export function Input({ className, label, value, onChange, type = 'text', ...props }: InputProps) {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <fieldset className={css.field}>
      {label && (
        <label className={css.label} htmlFor={`input_${id}`}>
          {label}
        </label>
      )}
      <input
        id={`input_${id}`}
        className={cn(css.input, className)}
        type={type}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </fieldset>
  );
}
