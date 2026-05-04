import { useState, useEffect } from 'react';
import {
  StandardModal,
  Avatar,
  BodyText,
  Button,
  TextButton,
  InlineMessage,
} from '@bamboohr/fabric';
import type { AutomationException } from '../data/automationsData';
import { castAvatar, getCastMember } from '../data/homeCast';
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
  const member = getCastMember(exception.employeeId);
  const employeeName = `${member.firstName} ${member.lastName}`;
  const employeeAvatar = castAvatar(exception.employeeId);
  const firstName = member.firstName;

  const [noteBody, setNoteBody] = useState(buildDraftNote(firstName));

  useEffect(() => {
    if (isOpen) {
      setNoteBody(buildDraftNote(firstName));
    }
  }, [isOpen, firstName]);

  const isComposeEmpty = noteBody.trim().length === 0;

  const composeFooter = (
    <StandardModal.Footer
      actions={[
        <TextButton key="cancel" onClick={onClose}>
          Cancel
        </TextButton>,
        <Button
          key="send"
          variant="contained"
          color="primary"
          disabled={isComposeEmpty}
          onClick={() =>
            onResolve(exception.id, `Personal note sent to ${employeeName}`)
          }
        >
          Send Note
        </Button>,
      ]}
    />
  );

  return (
    <StandardModal isOpen={isOpen} onRequestClose={onClose}>
      <StandardModal.Body
        size="medium"
        renderHeader={
          <StandardModal.Header title={`Send a Note to ${employeeName}`} />
        }
        renderFooter={composeFooter}
      >
        <StandardModal.UpperContent>
          <div className="ers-compose">
            <div className="ers-compose-recipient">
              <Avatar src={employeeAvatar} alt={employeeName} size={40} />
              <div className="ers-compose-recipient-text">
                <BodyText size="extra-small" color="neutral-weak">
                  To
                </BodyText>
                <BodyText size="medium" weight="semibold" color="neutral-strong">
                  {employeeName}
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
  );
}
