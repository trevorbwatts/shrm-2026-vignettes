import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, BodyText, IconV2 } from '@bamboohr/fabric';
import {
  ITEMS_PER_PAGE,
  mockInboxRequests,
  type InboxRequest,
  type InboxSection,
} from '../../data/inboxData';
import { getAssignment, subscribeAssignment } from './Inbox';

function rowsForRoute(
  section: string | undefined,
  subsection: string | undefined,
  detailcategory: string | undefined,
  assignment: 'me' | 'company',
): InboxRequest[] {
  // Determine which "section" the request lives in (inbox/completed/sent).
  let liveSection: InboxSection = 'inbox';
  if (section === 'completed') liveSection = 'completed';
  else if (section === 'sent') liveSection = 'sent';

  return mockInboxRequests.filter((r) => {
    if (assignment === 'me' && r.assignment !== 'me') return false;
    if (r.section !== liveSection) return false;

    // /inbox (root)
    if (!section) return r.section === 'inbox';

    // /inbox/approvals or /inbox/onboarding (single segment under inbox)
    if (liveSection === 'inbox') {
      if (section === 'approvals') {
        if (r.category !== 'approvals') return false;
        if (subsection && r.subcategory !== subsection) return false;
        return true;
      }
      if (section === 'onboarding') return r.category === 'onboarding';
      if (section === 'promotion') return r.category === 'promotion';
      if (section === 'offboarding') return r.category === 'offboarding';
    }

    // /inbox/completed/...
    if (liveSection === 'completed') {
      if (!subsection) return true; // root completed: show all
      if (subsection === 'approvals') {
        if (r.category !== 'completed-approvals') return false;
        if (detailcategory && r.subcategory !== detailcategory) return false;
        return true;
      }
      if (subsection === 'signatures') return r.category === 'signatures';
      if (subsection === 'onboarding') return r.category === 'completed-onboarding';
      if (subsection === 'feedback') return r.category === 'feedback';
    }

    // /inbox/sent/...
    if (liveSection === 'sent') {
      if (!subsection) return true; // root sent: show all
      if (subsection === 'approvals') {
        if (r.category !== 'sent-approvals') return false;
        if (detailcategory && r.subcategory !== detailcategory) return false;
        return true;
      }
      if (subsection === 'signatures') return r.category === 'sent-signatures';
      if (subsection === 'onboarding') return r.category === 'sent-onboarding';
      if (subsection === 'offboarding') return r.category === 'sent-offboarding';
    }

    return false;
  });
}

function StatusPill({ request }: { request: InboxRequest }) {
  if (request.status === 'approved' || request.status === 'completed' || request.status === 'signed') {
    const label =
      request.status === 'approved' ? 'Approved' : request.status === 'completed' ? 'Completed' : 'Signed';
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <IconV2 name="circle-check-regular" size={14} color="success-strong" />
        <BodyText size="small" weight="semibold" color="success-strong">
          {label}
        </BodyText>
      </span>
    );
  }
  if (request.status === 'denied') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <IconV2 name="circle-xmark-regular" size={14} color="error-strong" />
        <BodyText size="small" weight="semibold" color="error-strong">
          Denied
        </BodyText>
      </span>
    );
  }
  return null;
}

function RowIcon({ request }: { request: InboxRequest }) {
  if (request.iconType === 'avatar' && request.avatarUrl) {
    return <Avatar src={request.avatarUrl} alt={request.requesterName} size={32} />;
  }
  if (request.iconType === 'feedback') {
    return (
      <div className="inbox-row-icon">
        <IconV2 name="people-group-regular" size={18} color="neutral-medium" />
      </div>
    );
  }
  if (request.iconType === 'document') {
    return (
      <div className="inbox-row-icon">
        <IconV2 name="file-lines-regular" size={18} color="neutral-medium" />
      </div>
    );
  }
  return (
    <div className="inbox-row-icon">
      <IconV2 name="circle-user-solid" size={20} color="neutral-medium" />
    </div>
  );
}

export default function InboxListPage() {
  const { section, subsection, detailcategory } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(getAssignment());
  const [page, setPage] = useState(1);

  useEffect(() => subscribeAssignment(setAssignment), []);
  useEffect(() => setPage(1), [section, subsection, detailcategory, assignment]);

  const rows = useMemo(
    () => rowsForRoute(section, subsection, detailcategory, assignment),
    [section, subsection, detailcategory, assignment],
  );
  const total = rows.length;
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, total);
  const pageRows = rows.slice(startIdx, endIdx);
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const showSortDropdown = section === 'completed' || section === 'sent' || subsection;
  const showItemStatus = section === 'completed';

  return (
    <>
      {(showSortDropdown || showItemStatus) && (
        <div className="inbox-list-toolbar">
          <div />
          <div className="inbox-list-toolbar-filters">
            {showSortDropdown && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BodyText size="small" color="neutral-medium">
                  Sort by
                </BodyText>
                <select className="inbox-toolbar-select" disabled style={{ padding: '4px 8px', borderRadius: 4 }}>
                  <option>-Select-</option>
                </select>
              </div>
            )}
            {showItemStatus && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BodyText size="small" color="neutral-medium">
                  Item Status
                </BodyText>
                <select className="inbox-toolbar-select" disabled style={{ padding: '4px 8px', borderRadius: 4 }}>
                  <option>-Select-</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="inbox-list">
        {pageRows.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <BodyText size="small" color="neutral-medium">
              No requests in this view.
            </BodyText>
          </div>
        )}
        {pageRows.map((r) => (
          <div key={r.id} className="inbox-row" onClick={() => navigate(`/inbox/details/${r.id}`)}>
            <RowIcon request={r} />
            <div className="inbox-row-content">
              <div className="inbox-row-header">
                <BodyText size="medium" weight="semibold" color="neutral-strong">
                  {r.title}
                </BodyText>
                <BodyText size="medium" color="neutral-weak">
                  {' – '}
                  {r.date}
                </BodyText>
              </div>
              <div className="inbox-row-subtitle">
                <BodyText size="extra-small" color="neutral-medium">
                  {r.subtitle}
                </BodyText>
              </div>
              {r.detail.kind === 'time-off' && r.detail.warning && (
                <div className="inbox-row-warning">
                  <IconV2 name="triangle-exclamation-solid" size={12} color="warning-strong" />
                  <BodyText size="extra-small" color="warning-strong">
                    {r.detail.warning}
                  </BodyText>
                </div>
              )}
            </div>
            <div className="inbox-row-end">
              <StatusPill request={r} />
              <div className="inbox-row-arrow">
                <IconV2 name="chevron-right-solid" size={14} color="neutral-weak" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inbox-pagination">
        <BodyText size="small" color="neutral-weak">
          {total === 0 ? '0 of 0' : `${startIdx + 1}-${endIdx} of ${total}`}
        </BodyText>
        <div className="inbox-pagination-controls">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`inbox-page-button${p === page ? ' inbox-page-button--active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="inbox-next-button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <BodyText size="small" color={page === totalPages ? 'neutral-weak' : 'primary-strong'}>
              Next →
            </BodyText>
          </button>
        </div>
      </div>
    </>
  );
}
