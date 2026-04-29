import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconV2 } from '@bamboohr/fabric';

interface InboxHeaderMenuProps {
  onClose: () => void;
}

const items: { label: string; count?: number; path: string; icon?: string; isRoot?: boolean }[] = [
  { label: 'Inbox', path: '/inbox', icon: 'inbox-regular', isRoot: true },
  { label: 'Time Off Requests', count: 4, path: '/inbox/approvals/time-off-requests' },
  { label: 'Information Updates', count: 1, path: '/inbox/approvals/information-updates' },
  { label: 'Asset Request', count: 3, path: '/inbox/approvals/asset-request' },
  { label: 'Compensation', count: 3, path: '/inbox/approvals/compensation' },
  { label: 'Employment Status', count: 1, path: '/inbox/approvals/employment-status' },
  { label: 'Job Information', count: 1, path: '/inbox/approvals/job-information' },
  { label: 'Onboarding', count: 1, path: '/inbox/onboarding' },
];

export default function InboxHeaderMenu({ onClose }: InboxHeaderMenuProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const visible = items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()));

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="inbox-header-menu" ref={ref}>
      <div className="inbox-header-menu-search">
        <IconV2 name="magnifying-glass-regular" size={14} color="neutral-medium" />
        <input
          autoFocus
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="inbox-header-menu-list">
        {visible.map((it, idx) => (
          <div key={it.path}>
            <button
              className={`inbox-header-menu-item${it.isRoot ? ' inbox-header-menu-item--active' : ''}`}
              onClick={() => go(it.path)}
            >
              {it.icon && <IconV2 name={it.icon as any} size={14} color="neutral-medium" />}
              <span style={{ flex: 1 }}>
                {it.label}
                {it.count !== undefined ? ` (${it.count})` : ''}
              </span>
            </button>
            {it.isRoot && idx < visible.length - 1 && <div className="inbox-header-menu-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
