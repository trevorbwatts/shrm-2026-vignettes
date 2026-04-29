import { BodyText, Avatar, IconV2 } from '@bamboohr/fabric';
import type { AssessmentContext } from '../data/performanceCycleData';
import './stages.css';

interface AssessmentCopilotProps {
  context: AssessmentContext;
  employeeFirstName: string;
}

export function AssessmentCopilot({ context, employeeFirstName }: AssessmentCopilotProps) {
  return (
    <div className="pc-copilot">
      <div className="pc-copilot-header">
        <div className="pc-copilot-icon">
          <IconV2 name="sparkles-solid" size={16} color="discovery-strong" />
        </div>
        <div>
          <BodyText size="small" weight="semibold">Assessment Co-pilot</BodyText>
          <BodyText size="extra-small" color="neutral-weak">Context for this review</BodyText>
        </div>
      </div>

      <section className="pc-copilot-section">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">Goals from this cycle</BodyText>
        <ul className="pc-copilot-goals">
          {context.goals.map((g, i) => (
            <li key={i}>
              <BodyText size="small">{g}</BodyText>
            </li>
          ))}
        </ul>
      </section>

      <section className="pc-copilot-section">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">From 1:1 notes</BodyText>
        <div className="pc-copilot-quotes">
          {context.oneOnOneNotes.map((n, i) => (
            <div key={i} className="pc-copilot-quote">
              <BodyText size="extra-small" color="neutral-weak">{n.date}</BodyText>
              <BodyText size="small">"{n.quote}"</BodyText>
            </div>
          ))}
        </div>
      </section>

      <section className="pc-copilot-section">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">Peer feedback</BodyText>
        <div className="pc-copilot-quotes">
          {context.peerFeedback.map((p, i) => (
            <div key={i} className="pc-copilot-peer">
              <Avatar src={p.authorPhotoUrl} alt={p.authorName} size={24} />
              <div>
                <BodyText size="extra-small" weight="medium">{p.authorName}</BodyText>
                <BodyText size="small">"{p.quote}"</BodyText>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pc-copilot-section">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">{employeeFirstName}'s wins &amp; impact</BodyText>
        <div className="pc-copilot-quotes">
          {context.winsRecord.map((w, i) => (
            <div key={i} className="pc-copilot-quote">
              <BodyText size="extra-small" color="neutral-weak">{w.date}</BodyText>
              <BodyText size="small">{w.entry}</BodyText>
            </div>
          ))}
        </div>
      </section>

      <section className="pc-copilot-section">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">Meeting highlights</BodyText>
        <div className="pc-copilot-quotes">
          {context.meetingHighlights.map((m, i) => (
            <div key={i} className="pc-copilot-quote">
              <BodyText size="extra-small" color="neutral-weak">{m.date} · {m.topic}</BodyText>
              <BodyText size="small">{m.highlight}</BodyText>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
