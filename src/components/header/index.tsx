import { Terminal } from 'lucide-react';

import css from './index.module.css';

export function Header() {
  return (
    <header className={css.header}>
      <Terminal size={24} />
      <h1 className={css.title}>Natser UI</h1>
    </header>
  );
}
