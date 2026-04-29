import { useState, useEffect } from 'react';
import {
  StandardModal,
  Avatar,
  BodyText,
  Headline,
  Button,
  TextButton,
  Pill,
  PillType,
  InlineMessage,
  IconV2,
} from '@bamboohr/fabric';
import type { AutomationException } from '../data/automationsData';
import './ExceptionReviewSheet.css';

interface ExceptionReviewSheetProps {
  exception: AutomationException;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (exceptionId: string, confirmation: string) => void;
}

const buildDraftNote = (firstName: string) =>
  `Hi ${firstName},

I noticed you haven't had a chance to submit your direct deposit info yet — no rush, just wanted to check in personally. If anything's tripping you up or you have questions, I'm happy to walk you through it.

Let me know how I can help.

— Maya`;

export function ExceptionReviewSheet({
  exception,
  isOpen,
  onClose,
  onResolve,
}: ExceptionReviewSheetProps) {
  const { employee, issue, issueDescription, daysOverdue, aiInsight, timeline } = exception;
  const firstName = employee.name.split(' ')[0];

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [noteBody, setNoteBody] = useState(buildDraftNote(firstName));

  useEffect(() => {
    if (isOpen) {
      setIsComposeOpen(false);
      setNoteBody(buildDraftNote(firstName));
    }
  }, [isOpen, firstName]);

  const isComposeEmpty = noteBody.trim().length === 0;

  const reviewFooter = (
    <StandardModal.Footer
      actions={[
        <TextButton
          key="resolve"
          onClick={() =>
            onResolve(exception.id, `Marked ${employee.name}'s record as resolved`)
          }
        >
          Mark Resolved
        </TextButton>,
        <Button
          key="ai-note"
          color="ai"
          variant="outlined"
          onClick={() => setIsComposeOpen(true)}
        >
          Send a personal note
        </Button>,
        <Button
          key="profile"
          variant="contained"
          color="primary"
          onClick={() =>
            onResolve(exception.id, `Opened ${employee.name}'s profile`)
          }
        >
          Open Employee Profile
        </Button>,
      ]}
    />
  );

  const composeFooter = (
    <StandardModal.Footer
      actions={[
        <TextButton key="cancel" onClick={() => setIsComposeOpen(false)}>
          Cancel
        </TextButton>,
        <Button
          key="send"
          variant="contained"
          color="primary"
          disabled={isComposeEmpty}
          onClick={() =>
            onResolve(exception.id, `Personal note sent to ${employee.name}`)
          }
        >
          Send Note
        </Button>,
      ]}
    />
  );

  return (
    <>
      <StandardModal isOpen={isOpen} onRequestClose={onClose}>
        <StandardModal.Body
          size="medium"
          renderHeader={
            <StandardModal.Header title={`${employee.name} — ${issue}`} />
          }
          renderFooter={reviewFooter}
        >
          <StandardModal.UpperContent>
            <div className="ers-review">
              <div className="ers-review-employee">
                <Avatar src={employee.avatar} alt={employee.name} size={56} />
                <div className="ers-review-employee-text">
                  <Headline size="small" component="h4" color="neutral-strong">
                    {employee.name}
                  </Headline>
                  <BodyText size="small" color="neutral-weak">
                    {employee.role} · {employee.department}
                  </BodyText>
                </div>
              </div>

              <div className="ers-review-issue">
                <div>
                  <Pill muted type={PillType.Warning}>
                    {daysOverdue} days overdue
                  </Pill>
                </div>
                <BodyText size="medium" color="neutral-strong">
                  {issueDescription}
                </BodyText>
              </div>

              <InlineMessage
                status="ai"
                title="Here's what I noticed"
                description={aiInsight}
              />

              <div className="ers-review-timeline">
                <BodyText size="small" weight="semibold" color="neutral-strong">
                  What I've already tried
                </BodyText>
                <div className="ers-review-timeline-list">
                  {timeline.map((entry, index) => (
                    <div key={index} className="ers-review-timeline-item">
                      <div className="ers-review-timeline-icon">
                        <IconV2 name="circle-check-regular" size={16} color="neutral-medium" />
                      </div>
                      <div className="ers-review-timeline-text">
                        <BodyText size="small" weight="medium" color="neutral-strong">
                          {entry.action}
                        </BodyText>
                        <BodyText size="extra-small" color="neutral-weak">
                          {entry.date} · {entry.status}
                        </BodyText>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>

      <StandardModal isOpen={isOpen && isComposeOpen} onRequestClose={() => setIsComposeOpen(false)}>
        <StandardModal.Body
          size="medium"
          renderHeader={
            <StandardModal.Header title={`Send a Note to ${employee.name}`} />
          }
          renderFooter={composeFooter}
        >
          <StandardModal.UpperContent>
            <div className="ers-compose">
              <div className="ers-compose-recipient">
                <Avatar src={employee.avatar} alt={employee.name} size={40} />
                <div className="ers-compose-recipient-text">
                  <BodyText size="extra-small" color="neutral-weak">
                    To
                  </BodyText>
                  <BodyText size="medium" weight="semibold" color="neutral-strong">
                    {employee.name}
                  </BodyText>
                </div>
              </div>

              <InlineMessage
                status="ai"
                title="I've drafted a note for you"
                description="Edit anything you'd like before sending. I'll send it from your account."
              />

              <div className="ers-compose-field">
                <label className="ers-compose-label" htmlFor="ers-note-body">
                  <BodyText size="small" weight="semibold" color="neutral-strong">
                    Message
                  </BodyText>
                </label>
                <textarea
                  id="ers-note-body"
                  className="ers-compose-textarea"
                  value={noteBody}
                  onChange={(e) => setNoteBody(e.target.value)}
                  rows={10}
                  aria-label="Personal note message"
                />
                <BodyText size="extra-small" color="neutral-weak">
                  Sent as an email from your BambooHR account.
                </BodyText>
              </div>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
    </>
  );
}
