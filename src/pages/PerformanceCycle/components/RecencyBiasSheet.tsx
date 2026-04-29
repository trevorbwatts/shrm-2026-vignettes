import { useState } from 'react';
import {
  StandardModal,
  BodyText,
  Headline,
  Button,
  TextButton,
  InlineMessage,
  Pill,
  PillType,
  IconV2,
  RadioGroup,
} from '@bamboohr/fabric';
import type { CalibrationFlag } from '../data/performanceCycleData';
import { theoMarshTimeline, assessmentContexts, reviewedEmployees } from '../data/performanceCycleData';
import './stages.css';

interface RecencyBiasSheetProps {
  flag: CalibrationFlag;
  isOpen: boolean;
  onClose: () => void;
  onResolve?: (note: string) => void;
}

const ratingOptions = [
  { label: 'Exceeds Expectations', value: 'exceeds' },
  { label: 'Meets Expectations', value: 'meets' },
  { label: 'Below Expectations', value: 'below' },
];

export function RecencyBiasSheet({ flag, isOpen, onClose, onResolve }: RecencyBiasSheetProps) {
  const employeeName = flag.recency?.employeeName ?? '';
  const firstName = employeeName.split(' ')[0];
  const employee = reviewedEmployees.find((e) => `${e.firstName} ${e.lastName}` === employeeName);
  const context = employee ? assessmentContexts[employee.id] : undefined;
  const events = theoMarshTimeline;

  const [proposedRating, setProposedRating] = useState<string>(employee?.rating ?? 'meets');

  return (
    <StandardModal isOpen={isOpen} onRequestClose={onClose}>
      <StandardModal.Body
        size="full"
        renderHeader={
          <StandardModal.Header title={`${employeeName} — rating timeline`} />
        }
        renderFooter={
          <StandardModal.Footer
            actions={[
              <Button
                key="adjust"
                variant="contained"
                color="primary"
                disabled={proposedRating === employee?.rating}
                onClick={() => {
                  onResolve?.(`${firstName}'s rating queued to ${proposedRating}`);
                  onClose();
                }}
              >
                Queue Rating Change
              </Button>,
              <TextButton
                key="discuss"
                onClick={() => {
                  onResolve?.(`${firstName}'s review flagged for discussion`);
                  onClose();
                }}
              >
                Flag for Discussion
              </TextButton>,
              <TextButton key="close" color="secondary" onClick={onClose}>
                Close
              </TextButton>,
            ]}
          />
        }
      >
        <StandardModal.UpperContent>
          <div className="pc-sheet">
            <div className="pc-sheet-subhead">
              <BodyText size="medium" color="neutral-medium">{flag.headline}</BodyText>
              <BodyText size="small" color="neutral-weak">{flag.body}</BodyText>
            </div>

            <InlineMessage
              status="ai"
              title="Why I Flagged This"
              description={`The submitted rating tracks closely with the most recent event in ${firstName}'s cycle. When I weight the cycle evenly, the picture changes. The two strong moments earlier in the cycle look underweighted relative to the recent recovery.`}
            />

            <div className="pc-recency-grid">
              <section className="pc-recency-col">
                <Headline size="extra-small" component="h4">Cycle events</Headline>
                <ol className="pc-timeline">
                  {events.map((e, i) => (
                    <li key={i}>
                      <span className={`pc-timeline-dot pc-timeline-dot--${e.impact}`} />
                      <div>
                        <BodyText size="extra-small" color="neutral-weak">{e.date}</BodyText>
                        <BodyText size="small" weight="medium">{e.event}</BodyText>
                        <div className="pc-recency-shift">
                          <IconV2
                            name={e.impact === 'positive' ? 'arrow-trend-up-solid' : 'arrow-trend-down-solid'}
                            size={12}
                            color={e.impact === 'positive' ? 'success-strong' : 'warning-strong'}
                          />
                          <BodyText
                            size="extra-small"
                            color={e.impact === 'positive' ? 'success-strong' : 'warning-strong'}
                          >
                            Inferred rating shift: {e.inferredRatingShift > 0 ? '+' : ''}{e.inferredRatingShift}
                          </BodyText>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="pc-recency-col">
                <Headline size="extra-small" component="h4">Full cycle context</Headline>

                <div className="pc-recency-summary">
                  <div className="pc-recency-summary-row">
                    <BodyText size="extra-small" color="neutral-weak">Submitted rating</BodyText>
                    <Pill
                      muted
                      type={
                        employee?.rating === 'exceeds'
                          ? PillType.Success
                          : employee?.rating === 'meets'
                          ? PillType.Info
                          : PillType.Warning
                      }
                    >
                      {employee?.rating === 'exceeds' ? 'Exceeds' : employee?.rating === 'meets' ? 'Meets' : 'Below'}
                    </Pill>
                  </div>
                  <div className="pc-recency-summary-row">
                    <BodyText size="extra-small" color="neutral-weak">AI-inferred even-weight rating</BodyText>
                    <Pill muted type={PillType.Success}>Exceeds</Pill>
                  </div>
                </div>

                {context && (
                  <div className="pc-recency-context-block">
                    <BodyText size="extra-small" weight="semibold" color="neutral-medium">Wins recorded this cycle</BodyText>
                    <div className="pc-compare-quotes">
                      {context.winsRecord.map((w, i) => (
                        <div key={i} className="pc-compare-quote">
                          <BodyText size="extra-small" color="neutral-weak">{w.date}</BodyText>
                          <BodyText size="small">{w.entry}</BodyText>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {context && (
                  <div className="pc-recency-context-block">
                    <BodyText size="extra-small" weight="semibold" color="neutral-medium">Manager 1:1 highlights</BodyText>
                    <div className="pc-compare-quotes">
                      {context.oneOnOneNotes.slice(0, 2).map((n, i) => (
                        <div key={i} className="pc-compare-quote">
                          <BodyText size="extra-small" color="neutral-weak">{n.date}</BodyText>
                          <BodyText size="small">"{n.quote}"</BodyText>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="pc-recency-adjust">
              <Headline size="extra-small" component="h4">Proposed rating</Headline>
              <BodyText size="small" color="neutral-weak">
                If you queue a change, the manager is notified before calibration so they can flag any context I missed.
              </BodyText>
              <RadioGroup
                ariaLabel={`Proposed rating for ${employeeName}`}
                name={`recency-rating-${employee?.id ?? 'unknown'}`}
                value={proposedRating}
                onChange={({ value }: { value: string }) => setProposedRating(value)}
                items={ratingOptions}
              />
            </div>
          </div>
        </StandardModal.UpperContent>
      </StandardModal.Body>
    </StandardModal>
  );
}
