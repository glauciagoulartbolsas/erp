import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BarChart3, Package, DollarSign, Truck, ChevronDown } from 'lucide-react';
import { MENU_ITEMS } from '../../utils/constants';

const ICONS = {
  BarChart3,
  Package,
  DollarSign,
  Truck
} as const;

export default function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['/dashboard/sales']);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          const isExpanded = expandedItems.includes(item.path);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <div key={item.path} className="space-y-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={(e) => {
                  if (hasSubItems) {
                    e.preventDefault();
                    toggleExpand(item.path);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {hasSubItems && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`}
                  />
                )}
              </NavLink>

              {hasSubItems && isExpanded && (
                <div className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}