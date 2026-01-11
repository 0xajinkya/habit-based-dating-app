import React from 'react';
import { cn } from '../../lib/utils';
interface Tab {
  id: string;
  label: string;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}
export function Tabs({
  tabs,
  activeTab,
  onChange,
  className
}: TabsProps) {
  return <div className={cn('flex overflow-x-auto no-scrollbar gap-2 pb-2', className)}>
      {tabs.map(tab => {
      const isActive = activeTab === tab.id;
      return <button key={tab.id} onClick={() => onChange(tab.id)} className={cn('whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors', isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
            {tab.label}
          </button>;
    })}
    </div>;
}