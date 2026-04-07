import { ChangeEvent, ComponentPropsWithoutRef, useId } from 'react';
import cn from 'classnames';

import css from './index.module.css';

type TextAreaProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
} & ComponentPropsWithoutRef<'textarea'>;

export function TextArea({ className, label, value, onChange, ...props }: TextAreaProps) {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <fieldset className={css.field}>
      {label && (
        <label className={css.label} htmlFor={`textarea_${id}`}>
          {label}
        </label>
      )}
      <textarea
        id={`textarea_${id}`}
        className={cn(css.textarea, className)}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </fieldset>
  );
}
