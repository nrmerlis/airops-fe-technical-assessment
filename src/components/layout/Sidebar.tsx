import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

const navItems = [
  { icon: 'connections' as const, label: 'Data Name' },
  { icon: 'metrics' as const, label: 'Monitoring' },
  { icon: 'settings' as const, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-gray-200 p-2 flex flex-col">
      <div className="flex items-center gap-2 mb-2 mt-0 ml-4">

        <div className="w-9 h-9 bg-indigo-400 rounded" />
        <span className="font-semibold text-lg">AirOps</span>

      </div>
      <Button variant="secondary">
        New +
      </Button>

      <nav className="mt-6 flex flex-col">
        {navItems.map((item) => (
          <a
            key={item.label}
            className="flex gap-2 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
