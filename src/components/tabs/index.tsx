import { Activity, Box, LucideIcon } from 'lucide-react';
import cn from 'classnames';

import css from './index.module.css';

export type TabId = 'core' | 'jetstream';

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  { id: 'core', label: 'NATS Core', icon: Activity },
  { id: 'jetstream', label: 'JetStream', icon: Box },
];

type TabsProps = {
  activeTab: TabId;
  onChange: (id: TabId) => void;
};

export const Tabs = ({ activeTab, onChange }: TabsProps) => {
  return (
    <nav className={css.tabs}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={cn(css.button, activeTab === id && css.active)}
          onClick={() => onChange(id)}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </nav>
  );
};
