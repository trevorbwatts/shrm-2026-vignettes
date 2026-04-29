import { useState } from 'react';
import {
  StandardModal,
  BodyText,
  Headline,
  Button,
  TextButton,
  TextField,
  InlineMessage,
  Avatar,
  Pill,
  PillType,
  IconV2,
} from '@bamboohr/fabric';
import type { CalibrationFlag, ReviewRating } from '../data/performanceCycleData';
import { sarahOkaforReviews, sarahHeadsUpDraft } from '../data/performanceCycleData';
import './stages.css';

interface DistributionOutlierSheetProps {
  flag: CalibrationFlag;
  isOpen: boolean;
  onClose: () => void;
  onResolve?: (note: string) => void;
}

const ratingLabel = (r: ReviewRating) =>
  r === 'exceeds' ? 'Exceeds' : r === 'meets' ? 'Meets' : 'Below';

const ratingPillType = (r: ReviewRating): PillType =>
  r === 'exceeds' ? PillType.Success : r === 'meets' ? PillType.Info : PillType.Warning;

export function DistributionOutlierSheet({ flag, isOpen, onClose, onResolve }: DistributionOutlierSheetProps) {
  const [composeOpen, setComposeOpen] = useState(false);
  const [noteBody, setNoteBody] = useState(sarahHeadsUpDraft);
  const isForSarah = flag.distribution?.managerName === 'Sarah Okafor';
  const reviews = isForSarah ? sarahOkaforReviews : [];
  const managerName = flag.distribution?.managerName ?? 'this manager';

  const handleSend = () => {
    setComposeOpen(false);
    onResolve?.(`Heads-up sent to ${managerName}`);
    onClose();
  };

  return (
    <StandardModal isOpen={isOpen} onRequestClose={onClose}>
      <StandardModal.Body
        size="full"
        renderHeader={
          <StandardModal.Header title={`${managerName}'s review distribution`} />
        }
        renderFooter={
          <StandardModal.Footer
            actions={[
              <Button
                key="primary"
                variant="contained"
                color="primary"
                onClick={() => setComposeOpen(true)}
              >
                Send Heads-Up to {managerName.split(' ')[0]}
              </Button>,
              <TextButton
                key="secondary"
                onClick={() => {
                  onResolve?.(`Added to next 1:1 with ${managerName}`);
                  onClose();
                }}
              >
                Add to Next 1:1
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
              title="Suggested Approach"
              description={`The pattern is about ${managerName.split(' ')[0]}, not the individual ratings. A heads-up before calibration usually goes better than overriding her calls. I drafted talking points — review and send when ready.`}
            />

            <div className="pc-section-header">
              <BodyText size="medium" weight="semibold">All {reviews.length} reviews submitted by {managerName}</BodyText>
              <BodyText size="small" color="neutral-weak">{flag.distribution?.ratings.find((r) => r.rating === 'exceeds')?.count ?? 0} Exceeds · {flag.distribution?.ratings.find((r) => r.rating === 'meets')?.count ?? 0} Meets · {flag.distribution?.ratings.find((r) => r.rating === 'below')?.count ?? 0} Below</BodyText>
            </div>

            <div className="insights-table-container">
              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Rating</th>
                    <th>Score</th>
                    <th>Manager summary</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.employeeId}>
                      <td>
                        <div className="employee-cell">
                          <Avatar src={r.photoUrl} alt={r.employeeName} size={32} />
                          <div className="employee-info">
                            <BodyText size="small" weight="medium">{r.employeeName}</BodyText>
                            <BodyText size="extra-small" color="neutral-weak">{r.jobTitle}</BodyText>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Pill muted type={ratingPillType(r.rating)}>{ratingLabel(r.rating)}</Pill>
                      </td>
                      <td><BodyText size="small">{r.reviewScore}</BodyText></td>
                      <td className="pc-summary-cell">
                        <BodyText size="small" color="neutral-weak">{r.summaryExcerpt}</BodyText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </StandardModal.UpperContent>
      </StandardModal.Body>

      {/* Compose sheet: heads-up note */}
      <StandardModal isOpen={composeOpen} onRequestClose={() => setComposeOpen(false)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title={`Heads-up to ${managerName}`} />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setComposeOpen(false)}>Cancel</TextButton>,
                <Button
                  key="send"
                  variant="contained"
                  color="primary"
                  startIcon={<IconV2 name="paper-plane-regular" size={16} />}
                  disabled={noteBody.trim().length === 0}
                  onClick={handleSend}
                >
                  Send
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div className="pc-compose">
              <Headline size="small" component="h4">A friendly heads-up before calibration</Headline>
              <BodyText size="small" color="neutral-weak">
                Edit anything below — the goal is to invite a conversation, not pre-empt one.
              </BodyText>
              <TextField
                label="Message"
                value={noteBody}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNoteBody(e.target.value)}
                multiline
                rows={10}
              />
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
    </StandardModal>
  );
}
