import { BodyText, Headline, Avatar, IconV2, Pill, PillType, Button } from '@bamboohr/fabric';
import { payrollAssistantConversations } from '../data/payrollCloseData';
import type { AssistantOutcome } from '../data/payrollCloseData';
import './stages.css';

interface PayrollAssistantPanelProps {
  resolvedCount: number;
  routedCount: number;
}

const outcomeMeta: Record<AssistantOutcome, { label: string; pillType: PillType }> = {
  resolved: { label: 'Resolved', pillType: PillType.Success },
  'routed-to-maya': { label: 'Routed to you', pillType: PillType.Warning },
};

export function PayrollAssistantPanel({ resolvedCount, routedCount }: PayrollAssistantPanelProps) {
  return (
    <div className="pcl-assistant">
      <div className="pcl-assistant-head">
        <div className="pcl-assistant-icon">
          <IconV2 name="sparkles-solid" size={16} color="discovery-strong" />
        </div>
        <div>
          <BodyText size="medium" weight="semibold">Payroll Assistant</BodyText>
          <BodyText size="extra-small" color="neutral-weak">
            Answers paycheck, deduction, and timesheet questions. Routes to you when judgment is needed.
          </BodyText>
        </div>
      </div>

      <div className="pcl-assistant-stats">
        <div className="pcl-assistant-stat pcl-assistant-stat--resolved">
          <Headline size="extra-small" component="h4">{resolvedCount}</Headline>
          <BodyText size="extra-small" color="neutral-weak">Resolved this cycle</BodyText>
        </div>
        <div className="pcl-assistant-stat pcl-assistant-stat--routed">
          <Headline size="extra-small" component="h4">{routedCount}</Headline>
          <BodyText size="extra-small" color="neutral-weak">Routed to you</BodyText>
        </div>
      </div>

      <div className="pcl-assistant-section-head">
        <BodyText size="medium" weight="semibold">Recent activity</BodyText>
        <Button size="small" variant="outlined" color="secondary">View All</Button>
      </div>

      <ul className="pcl-conversation-list">
        {payrollAssistantConversations.map((c) => {
          const meta = outcomeMeta[c.outcome];
          return (
            <li key={c.id} className={`pcl-conversation pcl-conversation--${c.outcome}`}>
              <Avatar src={c.employeePhotoUrl} alt={`${c.employeeFirstName} ${c.employeeLastName}`} size={32} />
              <div className="pcl-conversation-body">
                <div className="pcl-conversation-meta">
                  <BodyText size="small" weight="semibold">{c.employeeFirstName} {c.employeeLastName}</BodyText>
                  <Pill muted type={meta.pillType}>{meta.label}</Pill>
                  <BodyText size="extra-small" color="neutral-weak">{c.ts}</BodyText>
                </div>
                <BodyText size="small" weight="medium">"{c.question}"</BodyText>
                <BodyText size="small" color="neutral-weak">{c.answerExcerpt}</BodyText>
                {c.routedReason && (
                  <div className="pcl-routed-reason">
                    <IconV2 name="arrow-right-regular" size={12} color="warning-strong" />
                    <BodyText size="extra-small" color="warning-strong">{c.routedReason}</BodyText>
                  </div>
                )}
                <div className="pcl-conversation-citations">
                  <IconV2 name="quote-left-regular" size={10} color="neutral-medium" />
                  <BodyText size="extra-small" color="neutral-weak">
                    Cited: {c.citations.join(' · ')}
                  </BodyText>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
