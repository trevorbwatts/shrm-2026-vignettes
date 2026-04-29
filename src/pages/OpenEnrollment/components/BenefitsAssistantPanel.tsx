import { BodyText, Headline, Avatar, IconV2, Pill, PillType, Button } from '@bamboohr/fabric';
import { assistantConversations } from '../data/openEnrollmentData';
import type { AssistantSurface } from '../data/openEnrollmentData';
import './stages.css';

const surfaceMeta = {
  ask: {
    label: 'Ask BambooHR',
    icon: 'message-question-solid',
    color: 'discovery-strong',
    bg: 'pc-surface-ask',
  },
  'benefits-page': {
    label: 'Benefits page',
    icon: 'heart-pulse-solid',
    color: 'success-strong',
    bg: 'pc-surface-benefits',
  },
  'enrollment-flow': {
    label: 'Enrollment Q&A',
    icon: 'clipboard-list-solid',
    color: 'info-strong',
    bg: 'pc-surface-enrollment',
  },
} as const;

interface BenefitsAssistantPanelProps {
  totalsBySurface: Record<AssistantSurface, number>;
}

export function BenefitsAssistantPanel({ totalsBySurface }: BenefitsAssistantPanelProps) {
  return (
    <div className="oe-assistant">
      <div className="oe-assistant-head">
        <div className="oe-assistant-icon">
          <IconV2 name="sparkles-solid" size={16} color="discovery-strong" />
        </div>
        <div>
          <BodyText size="medium" weight="semibold">Benefits Assistant</BodyText>
          <BodyText size="extra-small" color="neutral-weak">
            One agent. Trained on your plan documents. Powering three surfaces.
          </BodyText>
        </div>
      </div>

      <div className="oe-assistant-surfaces">
        {(Object.keys(surfaceMeta) as AssistantSurface[]).map((s) => {
          const meta = surfaceMeta[s];
          return (
            <div key={s} className={`oe-surface-card ${meta.bg}`}>
              <div className="oe-surface-icon">
                <IconV2 name={meta.icon} size={12} color={meta.color} />
              </div>
              <div className="oe-surface-meta">
                <BodyText size="extra-small" color="neutral-weak">{meta.label}</BodyText>
                <Headline size="extra-small" component="h4">{totalsBySurface[s]}</Headline>
                <BodyText size="extra-small" color="neutral-weak">conversations</BodyText>
              </div>
            </div>
          );
        })}
      </div>

      <div className="oe-section-header">
        <BodyText size="medium" weight="semibold">Recent activity</BodyText>
        <Button size="small" variant="outlined" color="secondary">View All</Button>
      </div>

      <ul className="oe-conversation-list">
        {assistantConversations.map((c) => {
          const meta = surfaceMeta[c.surface];
          return (
            <li key={c.id} className="oe-conversation">
              <Avatar src={c.employeePhotoUrl} alt={c.employeeFirstName} size={32} />
              <div className="oe-conversation-body">
                <div className="oe-conversation-meta">
                  <BodyText size="small" weight="semibold">{c.employeeFirstName}</BodyText>
                  <Pill muted type={c.surface === 'ask' ? PillType.Discovery : c.surface === 'benefits-page' ? PillType.Success : PillType.Info}>
                    {meta.label}
                  </Pill>
                  <BodyText size="extra-small" color="neutral-weak">{c.ts}</BodyText>
                </div>
                <BodyText size="small" weight="medium">"{c.question}"</BodyText>
                <BodyText size="small" color="neutral-weak">{c.answerExcerpt}</BodyText>
                <div className="oe-conversation-citations">
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
