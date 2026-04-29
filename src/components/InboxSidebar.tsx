import { Link, useLocation } from 'react-router-dom';
import { IconV2, BodyText, Divider } from '@bamboohr/fabric';
import type { SidebarGroup, SidebarItem, InboxSection } from '../data/inboxData';

interface InboxSidebarProps {
  groups: SidebarGroup[];
}

function activeRoot(pathname: string): InboxSection {
  if (pathname.startsWith('/inbox/completed')) return 'completed';
  if (pathname.startsWith('/inbox/sent')) return 'sent';
  return 'inbox';
}

function isItemActive(pathname: string, item: SidebarItem): boolean {
  return pathname === item.path;
}

function isAncestorActive(pathname: string, item: SidebarItem): boolean {
  if (pathname === item.path) return true;
  if (!item.children) return false;
  return item.children.some((c) => isAncestorActive(pathname, c));
}

function SidebarLeaf({ item, depth }: { item: SidebarItem; depth: number }) {
  const { pathname } = useLocation();
  const active = isItemActive(pathname, item);
  const expanded = isAncestorActive(pathname, item);
  const hasChildren = !!item.children?.length;

  return (
    <div>
      <Link
        to={item.path}
        className={`inbox-sidebar-item${active ? ' inbox-sidebar-item--active' : ''}`}
        style={{ paddingLeft: depth === 0 ? undefined : 28 }}
      >
        {item.icon && (
          <IconV2
            name={item.icon as any}
            size={14}
            color={active ? 'primary-strong' : 'neutral-medium'}
          />
        )}
        <span className="inbox-sidebar-label">
          <BodyText
            size="small"
            weight={active ? 'semibold' : 'regular'}
            color={active ? 'primary-strong' : 'neutral-strong'}
          >
            {item.label}
            {item.count !== undefined && item.count > 0 && ` (${item.count})`}
          </BodyText>
        </span>
      </Link>
      {hasChildren && expanded && (
        <div className="inbox-sidebar-children">
          {item.children!.map((c) => (
            <SidebarLeaf key={c.id} item={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function InboxSidebar({ groups }: InboxSidebarProps) {
  const { pathname } = useLocation();
  const activeId = activeRoot(pathname);

  return (
    <div className="inbox-sidebar">
      {groups.map((group, idx) => {
        const expanded = group.id === activeId;
        return (
          <div key={group.id} className="inbox-sidebar-group">
            <Link
              to={group.path}
              className={`inbox-sidebar-item${expanded ? ' inbox-sidebar-item--active' : ''}`}
            >
              <IconV2
                name={group.icon as any}
                size={16}
                color={expanded ? 'primary-strong' : 'neutral-strong'}
              />
              <span className="inbox-sidebar-label">
                <BodyText
                  size="medium"
                  weight={expanded ? 'semibold' : 'regular'}
                  color={expanded ? 'primary-strong' : 'neutral-strong'}
                >
                  {group.label}
                  {group.count !== undefined && group.count > 0 && ` (${group.count})`}
                </BodyText>
              </span>
            </Link>
            {expanded && (
              <div className="inbox-sidebar-children" style={{ marginLeft: 0 }}>
                {group.children.map((c) => (
                  <SidebarLeaf key={c.id} item={c} depth={1} />
                ))}
              </div>
            )}
            {idx < groups.length - 1 && (
              <div className="inbox-sidebar-divider">
                <Divider />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default InboxSidebar;
