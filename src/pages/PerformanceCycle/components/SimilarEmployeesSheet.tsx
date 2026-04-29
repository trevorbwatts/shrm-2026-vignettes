import {
  StandardModal,
  BodyText,
  Button,
  TextButton,
  InlineMessage,
  Avatar,
  Pill,
  PillType,
} from '@bamboohr/fabric';
import type { CalibrationFlag, ReviewRating, ReviewedEmployee, AssessmentContext } from '../data/performanceCycleData';
import { assessmentContexts } from '../data/performanceCycleData';
import './stages.css';

interface SimilarEmployeesSheetProps {
  flag: CalibrationFlag;
  isOpen: boolean;
  onClose: () => void;
  onResolve?: (note: string) => void;
}

const ratingLabel = (r: ReviewRating) =>
  r === 'exceeds' ? 'Exceeds Expectations' : r === 'meets' ? 'Meets Expectations' : 'Below Expectations';

const ratingPillType = (r: ReviewRating): PillType =>
  r === 'exceeds' ? PillType.Success : r === 'meets' ? PillType.Info : PillType.Warning;

function EmployeeColumn({ employee, context }: { employee: ReviewedEmployee; context?: AssessmentContext }) {
  return (
    <div className="pc-compare-col">
      <div className="pc-compare-head">
        <Avatar src={employee.photoUrl} alt={`${employee.firstName} ${employee.lastName}`} size={48} />
        <div>
          <BodyText size="medium" weight="semibold">{employee.firstName} {employee.lastName}</BodyText>
          <BodyText size="small" color="neutral-weak">{employee.jobTitle}</BodyText>
        </div>
      </div>

      <div className="pc-compare-rating">
        <Pill muted type={ratingPillType(employee.rating)}>{ratingLabel(employee.rating)}</Pill>
        <BodyText size="small" color="neutral-weak">Score: {employee.reviewScore}</BodyText>
      </div>

      {context && (
        <>
          <section className="pc-compare-section">
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">Goals this cycle</BodyText>
            <ul className="pc-compare-bullets">
              {context.goals.map((g, i) => (
                <li key={i}><BodyText size="small">{g}</BodyText></li>
              ))}
            </ul>
          </section>

          <section className="pc-compare-section">
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">Wins recorded</BodyText>
            <div className="pc-compare-quotes">
              {context.winsRecord.map((w, i) => (
                <div key={i} className="pc-compare-quote">
                  <BodyText size="extra-small" color="neutral-weak">{w.date}</BodyText>
                  <BodyText size="small">{w.entry}</BodyText>
                </div>
              ))}
            </div>
          </section>

          <section className="pc-compare-section">
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">Peer feedback</BodyText>
            <div className="pc-compare-quotes">
              {context.peerFeedback.map((p, i) => (
                <div key={i} className="pc-compare-peer">
                  <Avatar src={p.authorPhotoUrl} alt={p.authorName} size={24} />
                  <div>
                    <BodyText size="extra-small" weight="medium">{p.authorName}</BodyText>
                    <BodyText size="small">"{p.quote}"</BodyText>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pc-compare-section">
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">Manager 1:1 notes</BodyText>
            <div className="pc-compare-quotes">
              {context.oneOnOneNotes.slice(0, 2).map((n, i) => (
                <div key={i} className="pc-compare-quote">
                  <BodyText size="extra-small" color="neutral-weak">{n.date}</BodyText>
                  <BodyText size="small">"{n.quote}"</BodyText>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export function SimilarEmployeesSheet({ flag, isOpen, onClose, onResolve }: SimilarEmployeesSheetProps) {
  if (!flag.pair) return null;
  const { a, b, differentiators } = flag.pair;
  const contextA = assessmentContexts[a.id];
  const contextB = assessmentContexts[b.id];

  return (
    <StandardModal isOpen={isOpen} onRequestClose={onClose}>
      <StandardModal.Body
        size="full"
        renderHeader={
          <StandardModal.Header title={`${a.firstName} ${a.lastName} vs. ${b.firstName} ${b.lastName}`} />
        }
        renderFooter={
          <StandardModal.Footer
            actions={[
              <Button
                key="match"
                variant="contained"
                color="primary"
                onClick={() => {
                  onResolve?.('Ratings flagged to be matched in calibration');
                  onClose();
                }}
              >
                Match Ratings in Calibration
              </Button>,
              <TextButton
                key="discuss"
                onClick={() => {
                  onResolve?.('Pair flagged for discussion');
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
              title="Why this pair was flagged"
              description="On the dimensions that drive ratings — scope, impact, peer feedback, and goal completion — these two are within a few points. The rating gap is wider than the underlying performance gap."
            />

            {differentiators.length > 0 && (
              <div className="pc-pair-diffs pc-pair-diffs--inline">
                <BodyText size="extra-small" weight="semibold" color="neutral-medium">What they share this cycle</BodyText>
                <ul>
                  {differentiators.map((d, i) => (
                    <li key={i}>
                      <BodyText size="small">{d}</BodyText>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pc-compare-grid">
              <EmployeeColumn employee={a} context={contextA} />
              <EmployeeColumn employee={b} context={contextB} />
            </div>
          </div>
        </StandardModal.UpperContent>
      </StandardModal.Body>
    </StandardModal>
  );
}
