import { useState } from 'react';
import { Section, BodyText, Headline, InlineMessage, Button, TextButton, Avatar, Pill, PillType, IconV2 } from '@bamboohr/fabric';
import { timesheetExceptions, cleanApprovalSummary, stageStats, cycleDates } from '../data/payrollCloseData';
import type { ExceptionType } from '../data/payrollCloseData';
import { PayrollAssistantPanel } from './PayrollAssistantPanel';
import './stages.css';

const exceptionMeta: Record<ExceptionType, { label: string; icon: string; pillType: PillType }> = {
  'outside-policy': { label: 'Outside policy', icon: 'shield-exclamation-solid', pillType: PillType.Warning },
  'pending-edit': { label: 'Pending edit', icon: 'pen-to-square-solid', pillType: PillType.Info },
  'missing-punch': { label: 'Missing punch', icon: 'clock-solid', pillType: PillType.Error },
};

export function ApprovalStage() {
  const stats = stageStats.approval;
  const [exceptionResolved, setExceptionResolved] = useState<Set<string>>(new Set());

  const openExceptionsCount = timesheetExceptions.length - exceptionResolved.size;

  return (
    <div className="pcl-stage">
      <InlineMessage
        status="ai"
        title={`Payroll Close on Track · ${openExceptionsCount} Exception${openExceptionsCount === 1 ? '' : 's'} Need Your Call`}
        description={`${stats.autoApproved} timesheets auto-approved. The Payroll Assistant resolved ${stats.questionsThisCycle - stats.questionsRoutedToMaya} of ${stats.questionsThisCycle} employee questions this cycle. Approval deadline ${cycleDates.approvalDeadline}.`}
      />

      <Section>
        <Section.Header
          title="Cycle Snapshot"
          icon="circle-dollar-solid"
          description={`Pay period ${cycleDates.periodStart} – ${cycleDates.periodEnd} · Paycheck ${cycleDates.paycheckDate}`}
        />
        <div className="pcl-snapshot-grid">
          <div className="pcl-snapshot-tile pcl-snapshot-tile--success">
            <Headline size="medium" component="h4">{stats.autoApproved}</Headline>
            <BodyText size="small" color="neutral-weak">Auto-approved</BodyText>
            <BodyText size="extra-small" color="success-strong">Clean weeks · no questions</BodyText>
          </div>
          <div className="pcl-snapshot-tile pcl-snapshot-tile--warning">
            <Headline size="medium" component="h4">{stats.exceptions}</Headline>
            <BodyText size="small" color="neutral-weak">Exceptions</BodyText>
            <BodyText size="extra-small" color="warning-strong">Need your judgment</BodyText>
          </div>
          <div className="pcl-snapshot-tile">
            <Headline size="medium" component="h4">{stats.questionsThisCycle}</Headline>
            <BodyText size="small" color="neutral-weak">Employee questions</BodyText>
            <BodyText size="extra-small" color="neutral-medium">{stats.questionsThisCycle - stats.questionsRoutedToMaya} resolved · {stats.questionsRoutedToMaya} routed to you</BodyText>
          </div>
          <div className="pcl-snapshot-tile">
            <Headline size="medium" component="h4">{stats.timesheetsApproved}<span className="pcl-snapshot-fraction"> / {stats.timesheetsTotal}</span></Headline>
            <BodyText size="small" color="neutral-weak">Timesheets approved</BodyText>
            <BodyText size="extra-small" color="neutral-medium">{stats.timesheetsTotal - stats.timesheetsApproved} pending exceptions</BodyText>
          </div>
        </div>
      </Section>

      <div className="pcl-approval-grid">
        <Section>
          <Section.Header
            title="Exceptions Needing Your Judgment"
            icon="hand-solid"
            description={`${openExceptionsCount} open · the assistant handled the routine questions. These need a real call from you.`}
          />
          <ul className="pcl-exception-list">
            {timesheetExceptions.map((x) => {
              const meta = exceptionMeta[x.type];
              const isResolved = exceptionResolved.has(x.id);
              return (
                <li key={x.id} className={`pcl-exception ${isResolved ? 'pcl-exception--resolved' : ''}`}>
                  <div className="pcl-exception-head">
                    <Avatar src={x.employee.photoUrl} alt={`${x.employee.firstName} ${x.employee.lastName}`} size={40} />
                    <div className="pcl-exception-meta">
                      <BodyText size="small" weight="semibold">
                        {x.employee.firstName} {x.employee.lastName}
                      </BodyText>
                      <BodyText size="extra-small" color="neutral-weak">
                        {x.employee.jobTitle} · {x.employee.department}
                      </BodyText>
                    </div>
                    <div className="pcl-exception-tag">
                      <Pill muted type={meta.pillType}>
                        <span className="pcl-exception-tag-label">
                          <IconV2 name={meta.icon} size={12} color="neutral-strong" />
                          {meta.label}
                        </span>
                      </Pill>
                      <BodyText size="extra-small" color="neutral-weak">{x.receivedAt}</BodyText>
                    </div>
                  </div>

                  <div className="pcl-exception-body">
                    <BodyText size="small" weight="medium">{x.headline}</BodyText>
                    <BodyText size="small" color="neutral-weak">{x.context}</BodyText>
                    <div className="pcl-exception-callout">
                      <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                        Why this needs your judgment
                      </BodyText>
                      <BodyText size="small">{x.whyJudgmentNeeded}</BodyText>
                    </div>
                    <div className="pcl-exception-actions">
                      <BodyText size="extra-small" color="neutral-weak">
                        Suggested: {x.suggestedAction}
                      </BodyText>
                      <div className="pcl-exception-buttons">
                        <TextButton onClick={() => setExceptionResolved((p) => new Set(p).add(x.id))}>
                          Mark Resolved
                        </TextButton>
                        <Button size="small" variant="outlined" color="secondary">
                          Open Timesheet
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section>
          <PayrollAssistantPanel
            resolvedCount={stats.questionsThisCycle - stats.questionsRoutedToMaya}
            routedCount={stats.questionsRoutedToMaya}
          />
        </Section>
      </div>

      <Section>
        <Section.Header
          title="Auto-Approved This Cycle"
          icon="circle-check-solid"
          description={`${cleanApprovalSummary.count} clean timesheets totaling ${cleanApprovalSummary.totalHours.toLocaleString()} hours. Review if you want, but you don't need to.`}
        />
        <div className="pcl-clean-grid">
          {cleanApprovalSummary.byDepartment.map((d) => (
            <div key={d.department} className="pcl-clean-card">
              <div className="pcl-clean-head">
                <BodyText size="small" weight="semibold">{d.department}</BodyText>
                <Pill muted type={PillType.Success}>{d.count} clean</Pill>
              </div>
              <BodyText size="extra-small" color="neutral-weak">{d.totalHours.toLocaleString()} hours</BodyText>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
