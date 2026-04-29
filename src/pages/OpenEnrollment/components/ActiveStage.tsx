import { useState } from 'react';
import { Section, BodyText, Headline, InlineMessage, Button, TextButton, Pill, PillType, Avatar } from '@bamboohr/fabric';
import { reminderTiers, enrollmentExceptions, stageStats } from '../data/openEnrollmentData';
import { BenefitsAssistantPanel } from './BenefitsAssistantPanel';
import './stages.css';

const totalsBySurface = {
  'ask': 47,
  'benefits-page': 23,
  'enrollment-flow': 142,
};

export function ActiveStage() {
  const stats = stageStats.active;
  const completionPct = Math.round((stats.complete / stats.totalEmployees) * 100);
  const [exceptionResolved, setExceptionResolved] = useState<Set<string>>(new Set());

  const segments = [
    { key: 'complete', label: 'Complete', count: stats.complete, color: 'success' as const },
    { key: 'in-progress', label: 'In progress', count: stats.inProgress, color: 'info' as const },
    { key: 'incomplete', label: 'Incomplete', count: stats.incomplete, color: 'warning' as const },
    { key: 'not-started', label: 'Not started', count: stats.notStarted, color: 'error' as const },
  ];

  return (
    <div className="oe-stage">
      <InlineMessage
        status="ai"
        title={`${completionPct}% Complete With ${stats.daysRemaining} Days to Go`}
        description={`On pace to close on time. Tier 1 reminders go out tonight to ${reminderTiers[0].recipients} employees who haven't started. Manager loop activates in 4 days.`}
      />

      <Section>
        <Section.Header
          title="Enrollment Progress"
          icon="chart-pie-simple-solid"
          description={`${stats.complete} of ${stats.totalEmployees} employees complete`}
        />
        <div className="oe-completion-body">
          <div className="oe-completion-pct">
            <Headline size="medium" component="h4">{completionPct}%</Headline>
            <BodyText size="medium" color="neutral-weak">complete</BodyText>
          </div>

          <div className="oe-progress-bar">
            {segments.map((seg) => (
              <div
                key={seg.key}
                className={`oe-progress-seg oe-progress-seg--${seg.color}`}
                style={{ width: `${(seg.count / stats.totalEmployees) * 100}%` }}
                title={`${seg.label}: ${seg.count}`}
              />
            ))}
          </div>

          <div className="oe-progress-legend">
            {segments.map((seg) => (
              <div key={seg.key} className="oe-legend-item">
                <span className={`oe-legend-dot oe-legend-dot--${seg.color}`} />
                <BodyText size="small" weight="medium">{seg.count}</BodyText>
                <BodyText size="small" color="neutral-weak">{seg.label}</BodyText>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Section.Header
          title="Reminder Automation"
          icon="bell-solid"
          description="Running on its own. You don't need to send anything."
        />
        <div className="oe-stage">
          <div className="oe-tier-list">
            {reminderTiers.map((tier) => (
              <div key={tier.id} className="oe-tier-card oe-tier-card--compact">
                <div className="oe-tier-head">
                  <div>
                    <div className="oe-tier-title-row">
                      <BodyText size="medium" weight="semibold">{tier.label}</BodyText>
                      {tier.id === 'tier-1' && <Pill muted type={PillType.Info}>Goes out tonight</Pill>}
                      {tier.id === 'manager-loop' && <Pill muted type={PillType.Neutral}>Armed</Pill>}
                    </div>
                    <BodyText size="small" color="neutral-weak">
                      {tier.recipients > 0 ? `${tier.recipients} recipients · ` : ''}{tier.scheduledFor} · {tier.channel}
                    </BodyText>
                  </div>
                  <TextButton color="secondary">View</TextButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="oe-active-grid">
        <Section>
          <Section.Header
            title="Exceptions Needing Your Judgment"
            icon="hand-solid"
            description={`${enrollmentExceptions.length - exceptionResolved.size} open · the agent handled the standard questions. These need a real call from you.`}
          />
          <div className="oe-stage">
            <ul className="oe-exception-list">
              {enrollmentExceptions.map((x) => {
                const isResolved = exceptionResolved.has(x.id);
                return (
                  <li key={x.id} className={`oe-exception ${isResolved ? 'oe-exception--resolved' : ''}`}>
                    <div className="oe-exception-head">
                      <Avatar src={x.employee.photoUrl} alt={`${x.employee.firstName} ${x.employee.lastName}`} size={40} />
                      <div className="oe-exception-meta">
                        <BodyText size="small" weight="semibold">
                          {x.employee.firstName} {x.employee.lastName}
                        </BodyText>
                        <BodyText size="extra-small" color="neutral-weak">
                          {x.employee.jobTitle} · {x.employee.department}
                        </BodyText>
                      </div>
                      <div className="oe-exception-reason">
                        <Pill muted type={PillType.Warning}>{x.reason}</Pill>
                        <BodyText size="extra-small" color="neutral-weak">{x.receivedAt}</BodyText>
                      </div>
                    </div>

                    <div className="oe-exception-body">
                      <BodyText size="small">{x.context}</BodyText>
                      <div className="oe-exception-callout">
                        <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                          Why this needs your judgment
                        </BodyText>
                        <BodyText size="small">{x.whyJudgmentNeeded}</BodyText>
                      </div>
                      <div className="oe-exception-actions">
                        <BodyText size="extra-small" color="neutral-weak">
                          Suggested: {x.suggestedAction}
                        </BodyText>
                        <div className="oe-exception-buttons">
                          <TextButton onClick={() => setExceptionResolved((p) => new Set(p).add(x.id))}>
                            Mark Resolved
                          </TextButton>
                          <Button size="small" variant="outlined" color="secondary">
                            Open Case
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>

        <Section>
          <BenefitsAssistantPanel totalsBySurface={totalsBySurface} />
        </Section>
      </div>
    </div>
  );
}
