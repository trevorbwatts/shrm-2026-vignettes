import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyText, IconV2, TextButton, PageHeaderV2 } from '@bamboohr/fabric';
import { InboxSidebar } from '../../components/InboxSidebar';
import {
  sidebarGroups,
  sidebarGroupsCompany,
  type InboxAssignment,
} from '../../data/inboxData';
import './Inbox.css';

interface InboxProps {
  children: ReactNode;
}

interface InboxOutletContext {
  assignment: InboxAssignment;
}

// Use a tiny global for the assignment so the list page can read it without a router context provider.
// (Prototype-only — real app would use React Context.)
let _assignment: InboxAssignment = 'me';
const _listeners = new Set<(a: InboxAssignment) => void>();
export function getAssignment(): InboxAssignment {
  return _assignment;
}
export function subscribeAssignment(fn: (a: InboxAssignment) => void) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}
function setAssignment(a: InboxAssignment) {
  _assignment = a;
  _listeners.forEach((l) => l(a));
}

function AssignmentDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<InboxAssignment>(getAssignment());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const choose = (v: InboxAssignment) => {
    setValue(v);
    setAssignment(v);
    setOpen(false);
  };

  return (
    <div className="inbox-assignment" ref={ref}>
      <button className="inbox-assignment-trigger" onClick={() => setOpen((o) => !o)}>
        <IconV2 name="circle-user-regular" size={14} color="neutral-medium" />
        <BodyText size="small" color="neutral-strong">
          {value === 'me' ? 'Assigned to Me' : 'Assigned to Company'}
        </BodyText>
        <IconV2 name="chevron-down-solid" size={10} color="neutral-medium" />
      </button>
      {open && (
        <div className="inbox-assignment-menu">
          <button
            className={`inbox-assignment-option${value === 'me' ? ' inbox-assignment-option--active' : ''}`}
            onClick={() => choose('me')}
          >
            <IconV2 name="circle-user-regular" size={14} color="neutral-medium" />
            Assigned to Me
          </button>
          <button
            className={`inbox-assignment-option${value === 'company' ? ' inbox-assignment-option--active' : ''}`}
            onClick={() => choose('company')}
          >
            <IconV2 name="building-regular" size={14} color="neutral-medium" />
            Assigned to Company
          </button>
        </div>
      )}
    </div>
  );
}

export default function Inbox({ children }: InboxProps) {
  const navigate = useNavigate();
  const [assignment, setLocalAssignment] = useState<InboxAssignment>(getAssignment());

  useEffect(() => {
    return subscribeAssignment((a) => setLocalAssignment(a));
  }, []);

  const groups = assignment === 'company' ? sidebarGroupsCompany : sidebarGroups;

  return (
    <div className="inbox-page">
      <div className="inbox-back">
        <TextButton
          startIcon={<IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />}
          size="small"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </TextButton>
      </div>

      <PageHeaderV2 title="Requests" />

      <div className="inbox-content">
        <div>
          <AssignmentDropdown />
          <InboxSidebar groups={groups} />
        </div>

        <div className="inbox-list-container">{children}</div>
      </div>
    </div>
  );
}

export type { InboxOutletContext };
