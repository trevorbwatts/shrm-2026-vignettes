import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, BodyText, Button, Checkbox, IconV2, Pill, PillType, StyledBox, TextButton } from '@bamboohr/fabric';
import {
  getRequestById,
  type AssetDetail,
  type CompensationDetail,
  type DiffField,
  type EmploymentStatusDetail,
  type FeedbackDetail,
  type InboxRequest,
  type InfoUpdateDetail,
  type JobInfoDetail,
  type OffboardingTaskDetail,
  type OnboardingTaskDetail,
  type SignatureDetail,
  type TimeOffDetail,
} from '../../data/inboxData';

// ---------- Detail card body components ----------

function FieldList({ fields, strikethrough = false }: { fields: DiffField[]; strikethrough?: boolean }) {
  return (
    <div className="inbox-detail-fields-list">
      {fields.map((f) => (
        <div key={f.label}>
          <BodyText size="small" color="neutral-medium">
            {f.label}
          </BodyText>
          <div style={{ textDecoration: strikethrough ? 'line-through' : undefined }}>
            <BodyText size="small" color={strikethrough ? 'neutral-medium' : 'neutral-strong'}>
              {f.value}
            </BodyText>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiffSection({ title, edited, old, color }: { title?: string; edited: DiffField[]; old: DiffField[]; color?: 'success' | 'neutral' }) {
  return (
    <>
      {title && (
        <div className="inbox-detail-section-label">
          <BodyText size="small" weight="semibold" color={color === 'success' ? 'success-strong' : 'neutral-strong'}>
            {title}
          </BodyText>
        </div>
      )}
      <div className="inbox-detail-diff-grid">
        <div>
          <BodyText size="small" weight="semibold" color="success-strong">
            Edited
          </BodyText>
          <div style={{ marginTop: 8 }}>
            <FieldList fields={edited} />
          </div>
        </div>
        <div>
          <BodyText size="small" weight="semibold" color="neutral-medium">
            Old
          </BodyText>
          <div style={{ marginTop: 8 }}>
            <FieldList fields={old} strikethrough />
          </div>
        </div>
      </div>
    </>
  );
}

function CompensationBody({ d, requesterName, requesterAvatar }: { d: CompensationDetail; requesterName: string; requesterAvatar: string }) {
  return (
    <>
      <div className="inbox-detail-employee">
        <Avatar src={requesterAvatar} alt={requesterName} size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            {requesterName}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Customer Retention Manager
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Reports Directly to Charlotte Abbott
          </BodyText>
        </div>
      </div>

      <div className="inbox-detail-section-label">
        <BodyText size="small" weight="semibold" color="success-strong">
          Added
        </BodyText>
      </div>
      <div className="inbox-detail-fields-list">
        {d.reason && (
          <div>
            <BodyText size="small" color="neutral-medium">
              Compensation Change Reason
            </BodyText>
            <BodyText size="small" color="neutral-strong">
              {d.reason}
            </BodyText>
          </div>
        )}
        {d.comments && (
          <div>
            <BodyText size="small" color="neutral-medium">
              Compensation comments
            </BodyText>
            <BodyText size="small" color="neutral-strong">
              {d.comments}
            </BodyText>
          </div>
        )}
      </div>

      <DiffSection edited={d.edited} old={d.old} />

      <div className="inbox-detail-section-label">
        <BodyText size="small" weight="semibold" color="neutral-strong">
          Compensation
        </BodyText>
      </div>
      <div className="inbox-detail-diff-grid">
        <div>
          <BodyText size="small" weight="semibold" color="success-strong">
            Edited
          </BodyText>
          <div style={{ marginTop: 8 }}>
            <BodyText size="small" color="neutral-medium">
              Pay rate
            </BodyText>
            <BodyText size="small" color="neutral-strong">
              ••• Show
            </BodyText>
          </div>
        </div>
        <div>
          <BodyText size="small" weight="semibold" color="neutral-medium">
            Old
          </BodyText>
          <div style={{ marginTop: 8 }}>
            <BodyText size="small" color="neutral-medium">
              Pay rate
            </BodyText>
            <BodyText size="small" color="neutral-strong">
              ••• Show
            </BodyText>
          </div>
        </div>
      </div>
    </>
  );
}

function EmploymentStatusBody({ d, requesterName, requesterAvatar }: { d: EmploymentStatusDetail; requesterName: string; requesterAvatar: string }) {
  return (
    <>
      <div className="inbox-detail-employee">
        <Avatar src={requesterAvatar} alt={requesterName} size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            Karin Petty
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Sales Director
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Reports Directly to Daniel Vance
          </BodyText>
        </div>
      </div>

      {d.comments && (
        <>
          <div className="inbox-detail-section-label">
            <BodyText size="small" weight="semibold" color="success-strong">
              Added
            </BodyText>
          </div>
          <div>
            <BodyText size="small" color="neutral-medium">
              Employment status comments
            </BodyText>
            <BodyText size="small" color="neutral-strong">
              {d.comments}
            </BodyText>
          </div>
        </>
      )}

      <DiffSection edited={d.edited} old={d.old} />
    </>
  );
}

function JobInfoBody({ d }: { d: JobInfoDetail }) {
  return (
    <>
      <div className="inbox-detail-employee">
        <Avatar src="https://i.pravatar.cc/150?img=21" alt="Karin Petty" size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            Karin Petty
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Sales Director
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            Reports Directly to Daniel Vance
          </BodyText>
        </div>
      </div>

      <DiffSection edited={d.edited} old={d.old} />

      {d.jobInfoEdited && d.jobInfoOld && (
        <DiffSection title="Job Information" edited={d.jobInfoEdited} old={d.jobInfoOld} />
      )}
    </>
  );
}

function InfoUpdateBody({ d, requesterName, requesterAvatar }: { d: InfoUpdateDetail; requesterName: string; requesterAvatar: string }) {
  return (
    <>
      <div className="inbox-detail-employee">
        <Avatar src={requesterAvatar} alt={requesterName} size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            {requesterName}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.hiredOn}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.department}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.location}
          </BodyText>
        </div>
      </div>

      <div className="inbox-detail-section-label">
        <BodyText size="small" weight="semibold" color="success-strong">
          Added
        </BodyText>
      </div>
      <FieldList fields={d.added} />
    </>
  );
}

function AssetBody({ d, requesterName, requesterAvatar }: { d: AssetDetail; requesterName: string; requesterAvatar: string }) {
  return (
    <>
      <div className="inbox-detail-employee">
        <Avatar src={requesterAvatar} alt={requesterName} size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            {requesterName}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.role}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.reportsTo}
          </BodyText>
        </div>
      </div>

      <div className="inbox-detail-section-label">
        <BodyText size="small" weight="semibold" color="success-strong">
          Assets
        </BodyText>
      </div>
      <div className="inbox-detail-section-label" style={{ marginTop: 4, paddingBottom: 0, borderBottom: 'none' }}>
        <BodyText size="small" weight="semibold" color="success-strong">
          Added
        </BodyText>
      </div>
      <FieldList fields={d.added} />

      {d.comments && d.comments.length > 0 && (
        <div className="inbox-detail-thread">
          {d.comments.map((c, idx) => (
            <div key={idx} className="inbox-detail-comment">
              <Avatar src={c.avatar} alt={c.author} size={28} />
              <div className="inbox-detail-comment-body">
                <div className="inbox-detail-comment-meta">
                  <BodyText size="small" weight="semibold" color="primary-strong">
                    {c.author}
                  </BodyText>
                  <BodyText size="extra-small" color="neutral-medium">
                    {c.date}
                  </BodyText>
                </div>
                <BodyText size="small" color="neutral-strong">
                  {c.body}
                </BodyText>
                <span className="inbox-detail-reply-link">
                  <IconV2 name="reply-solid" size={12} color="primary-strong" />
                  <TextButton size="small">Reply</TextButton>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function TimeOffBody({ d, requesterName, requesterAvatar }: { d: TimeOffDetail; requesterName: string; requesterAvatar: string }) {
  // build a 6x7 calendar grid with the selected range highlighted.
  // Static / illustrative — month structure assumes prev-month tail + days 1-31 + next-month head.
  const cells: { day: number; selected: boolean; other?: boolean }[] = [];
  // 2 prev-month days
  for (let i = 29; i <= 30; i++) cells.push({ day: i, other: true, selected: false });
  for (let i = 1; i <= 31; i++) {
    cells.push({ day: i, selected: i >= d.selectedRange.start && i <= d.selectedRange.end, other: false });
  }
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - 32, other: true, selected: false });

  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <>
      <div className="inbox-detail-employee inbox-detail-employee--top">
        <Avatar src={requesterAvatar} alt={requesterName} size={40} />
        <div className="inbox-detail-employee-text">
          <BodyText size="medium" weight="semibold" color="neutral-strong">
            {requesterName}
          </BodyText>
          <BodyText size="small" color="neutral-strong">
            {d.hours} hours of {d.policy}
          </BodyText>
          <BodyText size="small" color="neutral-strong">
            {d.startDate.split(',')[0]} - {d.endDate.split(', ')[0].split(' ').slice(-1)[0]}, {d.endDate.split(', ')[1]}
          </BodyText>
          {d.warning && (
            <div className="inbox-detail-warning">
              <IconV2 name="triangle-exclamation-solid" size={12} color="warning-strong" />
              <BodyText size="extra-small" color="warning-strong">
                {d.warning}
              </BodyText>
            </div>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <IconV2 name="calendar-regular" size={12} color="primary-strong" />
            <TextButton size="small">View in Calendar</TextButton>
          </span>
        </div>
      </div>

      {d.calendarNote && (
        <div style={{ marginTop: 12 }}>
          <BodyText size="small" color="neutral-strong">
            {d.calendarNote}
          </BodyText>
        </div>
      )}

      <div className="inbox-detail-time-off-grid">
        <div className="inbox-detail-mini-cal-card">
          <div className="inbox-detail-mini-cal-header">
            <BodyText size="small" weight="semibold" color="neutral-strong">
              {d.monthLabel}
            </BodyText>
            <span style={{ display: 'flex', gap: 8 }}>
              <IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />
              <IconV2 name="chevron-right-solid" size={12} color="neutral-medium" />
            </span>
          </div>
          <div className="inbox-detail-mini-cal-grid">
            {dows.map((d, i) => (
              <div key={i} className="dow">
                {d}
              </div>
            ))}
            {cells.map((c, i) => (
              <div key={i} className={`${c.other ? 'other' : ''} ${c.selected ? 'selected' : ''}`}>
                {c.day}
              </div>
            ))}
          </div>
        </div>

        <div>
          <BodyText size="small" weight="semibold" color="success-strong">
            Who else will be out?
          </BodyText>
          <div className="inbox-detail-out-list" style={{ marginTop: 8 }}>
            {d.whoElseOut.length === 0 && (
              <BodyText size="extra-small" color="neutral-medium">
                No overlap.
              </BodyText>
            )}
            {d.whoElseOut.map((p, idx) => (
              <div key={p.name} className={`inbox-detail-out-row${idx > 0 ? ' inbox-detail-out-row--bordered' : ''}`}>
                <Avatar src={p.avatar} alt={p.name} size={36} />
                <div className="inbox-detail-out-row-text">
                  <BodyText size="small" weight="semibold" color="neutral-strong">
                    {p.name}
                  </BodyText>
                  <BodyText size="extra-small" color="neutral-medium">
                    {p.dateRange}
                  </BodyText>
                </div>
                <IconV2 name="circle-check-regular" size={16} color="success-strong" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function OnboardingTaskBody({ d }: { d: OnboardingTaskDetail }) {
  return (
    <>
      <div className="inbox-detail-task-row">
        <Checkbox checked={false} onChange={() => {}} />
        <div>
          <div className="meta">
            <BodyText size="small" weight="semibold" color="neutral-strong">
              {d.taskTitle}
            </BodyText>
            <BodyText size="extra-small" color="neutral-medium">
              {d.assignedBy} – {d.assignedDate}
            </BodyText>
          </div>
          <BodyText size="small" color="neutral-strong">
            {d.body}
          </BodyText>
        </div>
      </div>
    </>
  );
}

function OffboardingTaskBody({ d }: { d: OffboardingTaskDetail }) {
  return (
    <div className="inbox-detail-task-row">
      <Checkbox checked={false} onChange={() => {}} />
      <div>
        <div className="meta">
          <BodyText size="small" weight="semibold" color="neutral-strong">
            {d.taskTitle}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.forEmployee} – {d.date}
          </BodyText>
        </div>
      </div>
    </div>
  );
}

function SignatureBody({ d }: { d: SignatureDetail }) {
  return (
    <>
      <div className="inbox-detail-signature-row">
        <div className="inbox-detail-signature-icon">
          <IconV2 name="file-pen-regular" size={18} color="discovery-strong" />
        </div>
        <div style={{ flex: 1 }}>
          <BodyText size="small" weight="semibold" color="neutral-strong">
            {d.documentName}
          </BodyText>
          <BodyText size="extra-small" color="neutral-medium">
            {d.regarding}
          </BodyText>
          {d.completedDate && (
            <BodyText size="extra-small" color="neutral-medium">
              You completed this on {d.completedDate}
            </BodyText>
          )}
        </div>
      </div>
      <div style={{ marginTop: 12, padding: 12, background: 'var(--fabric-surface-color-neutral-extra-extra-weak, #f7f6f5)', borderRadius: 8 }}>
        <BodyText size="small" color="neutral-strong">
          {d.prompt}
        </BodyText>
      </div>
    </>
  );
}

function FeedbackBody({ d }: { d: FeedbackDetail }) {
  return (
    <>
      <BodyText size="small" color="neutral-strong">
        Hi Shawn,
      </BodyText>
      <div style={{ marginTop: 8 }}>
        <BodyText size="small" color="neutral-strong">
          Please select people to provide feedback on members of your team for {d.cycle}. You will be able to see the feedback once it's completed.
        </BodyText>
      </div>
      <div style={{ marginTop: 12 }}>
        <BodyText size="small" weight="semibold" color="neutral-strong">
          Team members will be asked the following questions:
        </BodyText>
        <ol style={{ marginTop: 4, paddingLeft: 24 }}>
          {d.questions.map((q, i) => (
            <li key={i}>
              <BodyText size="small" color="neutral-strong">
                {q}
              </BodyText>
            </li>
          ))}
        </ol>
      </div>
      <ul style={{ marginTop: 8, paddingLeft: 24 }}>
        <li>
          <BodyText size="small" color="neutral-strong">
            Your team members will <strong>NOT</strong> be able to see the feedback.
          </BodyText>
        </li>
        <li>
          <BodyText size="small" color="neutral-strong">
            You can always request more feedback (up to 10) from the employee's profile page.
          </BodyText>
        </li>
      </ul>
      <div style={{ marginTop: 12, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, background: 'var(--fabric-surface-color-success-extra-weak, #e6f4ea)', color: 'var(--fabric-text-color-success-strong, #2e7918)', fontSize: 12 }}>
        <IconV2 name="circle-check-solid" size={12} color="success-strong" />
        Completed on {d.completedDate}.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <BodyText size="small" weight="semibold" color="neutral-medium">
          Employee
        </BodyText>
        <BodyText size="small" weight="semibold" color="neutral-medium">
          Get Feedback from...
        </BodyText>
      </div>

      {d.pairs.map((p, idx) => (
        <div key={idx} className="inbox-detail-feedback-pair">
          <div className="inbox-detail-feedback-employee">
            <div style={{ display: 'flex', gap: 10 }}>
              <Avatar src={p.employee.avatar} alt={p.employee.name} size={32} />
              <div>
                <BodyText size="small" weight="semibold" color="neutral-strong">
                  {p.employee.name}
                </BodyText>
                <BodyText size="extra-small" color="neutral-medium">
                  {p.employee.title}
                </BodyText>
                <BodyText size="extra-small" color="neutral-medium">
                  {p.employee.location}
                </BodyText>
              </div>
            </div>
          </div>
          <div className="inbox-detail-feedback-arrow">
            <IconV2 name="arrow-right-solid" size={14} color="neutral-medium" />
          </div>
          <div className="inbox-detail-feedback-reviewers">
            {p.reviewers.map((r) => (
              <div key={r.name} className="inbox-detail-feedback-reviewer-row">
                <div className="inbox-detail-feedback-reviewer-avatar">
                  <IconV2 name="user-solid" size={14} color="neutral-medium" />
                </div>
                <BodyText size="small" color="neutral-strong">
                  {r.name}
                </BodyText>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// ---------- Status pill (header right) ----------

function HeaderInlineStatus({ status }: { status: InboxRequest['status'] }) {
  if (status === 'approved' || status === 'completed' || status === 'signed') {
    const label = status === 'approved' ? 'Approved' : status === 'completed' ? 'Completed' : 'Signed';
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <IconV2 name="circle-check-regular" size={14} color="success-strong" />
        <BodyText size="small" weight="semibold" color="success-strong">
          {label}
        </BodyText>
      </span>
    );
  }
  if (status === 'denied') {
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

function ResolutionCard({ request }: { request: InboxRequest }) {
  const status = request.status;
  let pillType: PillType;
  let label: string;
  let subtitle: string;
  let bg: string;

  if (status === 'pending') {
    pillType = PillType.Warning;
    label = 'Pending';
    subtitle = '1 Pending Approval';
    bg = 'warning-extra-weak';
  } else if (status === 'approved' || status === 'completed' || status === 'signed') {
    pillType = PillType.Success;
    label = status === 'approved' ? 'Approved' : status === 'completed' ? 'Completed' : 'Signed';
    subtitle =
      request.detail.kind === 'signature' && request.detail.completedDate
        ? request.detail.completedDate
        : 'Dec 8, 2024';
    bg = 'success-extra-weak';
  } else if (status === 'denied') {
    pillType = PillType.Error;
    label = 'Denied';
    subtitle = request.date;
    bg = 'error-extra-weak';
  } else {
    return null;
  }

  return (
    <StyledBox
      borderRadius="medium"
      backgroundColor={bg as any}
      paddingY="10px"
      paddingX="14px"
      className="inbox-detail-resolution"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Pill muted type={pillType}>
            {label}
          </Pill>
          <Avatar src="https://i.pravatar.cc/150?img=33" alt="Reviewer" size={20} />
        </span>
        <BodyText size="extra-small" color="neutral-medium">
          {subtitle}
        </BodyText>
      </div>
    </StyledBox>
  );
}

// ---------- Header actions per request type ----------

function HeaderActions({ request }: { request: InboxRequest }) {
  const k = request.detail.kind;
  const isSent = request.section === 'sent';
  if (isSent && (k === 'onboarding-task' || k === 'offboarding-task')) {
    return (
      <>
        <Button color="default" size="small" variant="contained">
          Edit
        </Button>
        <Button color="default" size="small" variant="contained">
          Delete
        </Button>
      </>
    );
  }
  if (k === 'signature') {
    return (
      <Button color="default" size="small" variant="contained">
        View Signed Document
      </Button>
    );
  }
  if (request.status === 'pending') {
    return (
      <>
        <Button color="primary" size="small" variant="contained">
          Approve
        </Button>
        <Button color="default" size="small" variant="contained">
          Deny
        </Button>
      </>
    );
  }
  return null;
}

// ---------- Card title per request type ----------

function cardTitle(request: InboxRequest): string {
  switch (request.detail.kind) {
    case 'compensation':
      return 'Compensation Change';
    case 'info-update':
      return 'Change Information Request';
    case 'asset':
      return 'Asset Request Change';
    case 'employment-status':
      return 'Employment Status Change';
    case 'job-info':
      return 'Job Information Change';
    case 'time-off':
      return 'Time Off Request';
    case 'onboarding-task':
      return 'Onboarding Task';
    case 'offboarding-task':
      return 'Offboarding Task';
    case 'signature':
      return 'New Signature Request';
    case 'feedback':
      return 'Get Feedback About Your Team';
  }
}

// ---------- Main component ----------

export default function InboxDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = id ? getRequestById(id) : undefined;

  if (!request) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <BodyText size="medium" color="neutral-medium">
          Request not found.
        </BodyText>
      </div>
    );
  }

  const renderBody = () => {
    const d = request.detail;
    switch (d.kind) {
      case 'compensation':
        return <CompensationBody d={d} requesterName="Amy Granger" requesterAvatar={request.requesterAvatar} />;
      case 'info-update':
        return <InfoUpdateBody d={d} requesterName={request.requesterName} requesterAvatar={request.requesterAvatar} />;
      case 'asset':
        return <AssetBody d={d} requesterName={request.requesterName} requesterAvatar={request.requesterAvatar} />;
      case 'employment-status':
        return <EmploymentStatusBody d={d} requesterName={request.requesterName} requesterAvatar={request.requesterAvatar} />;
      case 'job-info':
        return <JobInfoBody d={d} />;
      case 'time-off':
        return <TimeOffBody d={d} requesterName={request.requesterName} requesterAvatar={request.requesterAvatar} />;
      case 'onboarding-task':
        return <OnboardingTaskBody d={d} />;
      case 'offboarding-task':
        return <OffboardingTaskBody d={d} />;
      case 'signature':
        return <SignatureBody d={d} />;
      case 'feedback':
        return <FeedbackBody d={d} />;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="inbox-detail-back">
        <TextButton
          startIcon={<IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />}
          size="small"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </TextButton>
      </div>

      {(() => {
        const isResolved = request.status !== 'pending';
        const titleSecondary = isResolved ? request.requestSummary : request.date;
        const subtitleText = isResolved
          ? `You ${
              request.status === 'approved'
                ? 'approved'
                : request.status === 'denied'
                  ? 'denied'
                  : 'completed'
            } this on Dec 8, 2024`
          : request.subtitle;

        return (
          <div className="inbox-detail-header">
            <Avatar src={request.requesterAvatar} alt={request.requesterName} size={32} />
            <div className="inbox-detail-header-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <BodyText size="small" weight="semibold" color="primary-strong">
                  {request.requesterName}
                </BodyText>
                <BodyText size="small" color="neutral-strong">
                  – {titleSecondary}
                </BodyText>
                {isResolved && <IconV2 name="comment-regular" size={12} color="neutral-medium" />}
              </div>
              <BodyText size="extra-small" color="neutral-medium">
                {subtitleText}
              </BodyText>
            </div>
            <div className="inbox-detail-header-status">
              <HeaderInlineStatus status={request.status} />
              <ResolutionCard request={request} />
            </div>
          </div>
        );
      })()}

      <div className="inbox-detail-card-wrapper">
        <div className="inbox-detail-card">
          <div className="inbox-detail-card-header">
            <span className="inbox-detail-card-header-title">{cardTitle(request)}</span>
            <div className="inbox-detail-card-header-actions">
              <HeaderActions request={request} />
            </div>
          </div>
          <div className="inbox-detail-card-body">{renderBody()}</div>
          <div className="inbox-detail-comment-section">
            <div className="inbox-detail-comment-input">
              <Avatar src="https://i.pravatar.cc/150?img=33" alt="You" size={32} />
              <input placeholder="Add a comment..." />
              <IconV2 name="paperclip-regular" size={14} color="neutral-medium" />
            </div>
            {request.status !== 'pending' && (
              <div className="inbox-detail-existing-comment">
                <Avatar src="https://i.pravatar.cc/150?img=33" alt="Shawn Murdock" size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <BodyText size="small" weight="semibold" color="primary-strong">
                      Shawn Murdock
                    </BodyText>
                    <BodyText size="extra-small" color="neutral-medium">
                      12/08/2024 8:55 AM MST
                    </BodyText>
                  </div>
                  <BodyText size="small" color="neutral-strong">
                    personal time
                  </BodyText>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <IconV2 name="reply-solid" size={12} color="primary-strong" />
                    <TextButton size="small">Reply</TextButton>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
